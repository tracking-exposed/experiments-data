#!/usr/bin/env nodejs
var _ = require('lodash');
var moment = require('moment');
var Promise = require('bluebird');
var debug = require('debug')('apiimport');
var fs = Promise.promisifyAll(require('fs'));
var CSV = require('csv-string');

function loadCSVfile(day, fname) {
    var fpath = 'collected/' + day + '/' + fname;
    var sname = fname.replace(/\(\d+\)/, '').replace(/\.csv$/, '');
    return fs
        .readFileAsync(fpath, "utf-8")
        .then(function(content) {
            var doublelist  = CSV.parse(content);
            var keys = _.first(doublelist);
            return _.reduce(doublelist, function(memo, e) {
                if(e[0] === keys[0])
                    return memo;
                var no = {};
                _.each(e, function(value, i) {
                    _.set(no, keys[i], value);
                });
                memo.push(no);
                return memo;
            }, []);
        })
        .map(function(tobecl) {
            var combo = _.split(tobecl.post_id, '_');
            tobecl.from_id = tobecl.from_id.replace(/_/, '');
            tobecl.author_id = combo[0];
            tobecl.postId = combo[1];
            tobecl.uniq = _.join([
                sname.substring(0, 5),
                moment(tobecl.created_time).valueOf() 
            ], '--');
            // tobecl.pageName = sname;
            // ^^^^^^^^^^^^^^^^^^^^^^^
            // This is not very clean, there are numbers at the end of
            // the name by a mistake of the importer script. But also,
            // they are not really useful, we have from and author 
            _.unset(tobecl, 'post_id');
            return tobecl;
        })
        .tap(function(check) {
            if(!_.size(check))
                throw new Error("File " + fname + " #" + _.size(check));
        });
};

function filtertime(collection) {
    /* This because my computer is in CET */
    var startday = moment("2018-01-05").utcOffset(60);
    var endday = moment("2018-03-09").utcOffset(60);

    var nc = _.filter(collection, function(e) {
        return moment(e.created_time).isAfter(startday) &&
            moment(e.created_time).isBefore(endday);
    });

    debug("Kept posts between %s and %s, now are just %d",
        startday.format("DDD DD HH:mm"), endday.format("DDD DD HH:mm"), _.size(nc));
    return nc;
};

var days = _.map(_.range(5, 80), function(day) {
    var x = moment({
        year: 2018,
        month: day / 2, // WTF, start from 0
        day: day}).format("YYYY-MM-DD");
    debug("test %d %s", day, x);
    return x;
});

var destF = "API-collected-posts.json";

return Promise.map(days, function(d) {
    var csvimport = _.partial(loadCSVfile, d);

    return fs
        .readdirAsync("collected/" + d)
        .map(csvimport)
        .then(function(dailycollection) {
            var total = _.flatten(dailycollection);
            debug("Day %s has %d files %d posts",
                d, _.size(dailycollection), _.size(total));
            return filtertime(total);
        })
        /* this is for internal debug */
        .map(function(e) {
            e.fbtrex_day = d;
            return e;
        })
        .catch(function(error) {
            debug("+error with %s: %s", d, error);
            return [];
        });
}, {concurrency: 1})
.then(_.flatten)
.then(function(all) {
    /* clean duplicated by postId */
    debug("Before uniqBy postId: %d", _.size(all));
    return _.uniqBy(all, 'postId');
})
.then(function(clean) {
    var e = _.countBy(clean, 'uniq');
    var f = _.filter(e, function(o, k) {
        if(o !== 1)
            console.log(k);
        return o !== 1;
    });
    console.log(JSON.stringify(f, undefined, 3));
    debug("Unique id not postId %d in a dataset of %d", _.size(e), _.size(clean));
    return _.orderBy(clean, 'created_time');
})
.tap(function(result) {
    return fs
        .writeFileAsync(destF, JSON.stringify(result, undefined, 2), "utf-8")
        .tap(function(a) {
            debug("written %s: %d", destF, _.size(result));
        });
});
