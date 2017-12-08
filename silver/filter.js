#!/usr/bin/env nodejs
var _ = require('lodash');
var moment = require('moment');
var Promise = require('bluebird');
var debug = require('debug')('filter-check:');
var fs = Promise.promisifyAll(require('fs'));

function loadJSONfile(fname) {
    debug("Opening file %s", fname);
    return fs
        .readFileAsync(fname, "utf-8")
        .then(JSON.parse)
        .tap(function(check) {
            if(!_.size(check))
                throw new Error("File " + fname + " #" + _.size(check));
        });
};

function loadList() {
    var profiles = [
        "doublecheck/andrea-likes.txt",
        "doublecheck/antoine-follow.txt",
        "doublecheck/britta-likes.txt",
        "doublecheck/camila-likes.txt",
        "doublecheck/juan-follow.txt",
        "doublecheck/julieta-likes.txt",
        "doublecheck/michael-likes.txt",
        "doublecheck/olivier-likes.txt",
        "doublecheck/santiago-follow.txt"
    ];

    return Promise.map(profiles, function(sn) {
        var profile = sn.split('/')[1].split('-')[0];

        return fs
            .readFileAsync(sn, "utf-8")
            .then(function(pl) {
                return _.compact(_.split(pl, '\n'));
            })
            .map(_.toLower)
            .map(function(page) {
                if(!_.endsWith(page, '/'))
                    page = page + '/';
                return page;
            })
            .then(function(lis) {
                debug(" %s %d", profile, _.size(lis));
                return { name: profile, sources: lis };
            });
    })
    .then(function(all) {
        var uniques = _.uniq(_.flatten(_.map(all, 'sources')));
        debug("all uniq sources are %d", _.size(uniques));
        var names = _.map(all, 'name');
        /* initialization, page are all false */
        var table = _.map(uniques, function(u) {
            var r = { page: u };
            _.each(names, function(n) {
                _.set(r, n, false);
            });
            return r;
        });
        /* loop over the profiles/page, and mark as true if fits */
        _.each(all, function(profile) {
            _.each(profile.sources, function(s) {
                _.set(_.find(table, { page: s }), profile.name, true);
            });
        });
        var csv = _.reduce(table, function(memo, e) {
            memo += e.page
            memo += _.reduce(e, function(m, info) {
                if(_.isBoolean(info)) {
                    m += ",";
                    m += info ? "Y" : "N";
                }
                return m;
            }, "");
            memo += "\n"
            return memo;
        }, "page," + _.join(names, ",") + "\n" );

        debugger;

        /* do the sum of all the true */
        _.each(table, function(e) {
            /* iterate over the { antoine: false, julieta: true ... } */
            e.nine = _.reduce(_.pick(e, names), function(memo, presence, name) {
                return (memo && presence == true);
            }, true);
            e.eight = _.reduce(_.pick(e, names), function(memo, presence, name) {
                if(name === 'julieta')
                    return memo;
                return (memo && presence == true);
            }, true);
        });

        tot1 = _.countBy(table, 'nine');
        tot2 = _.countBy(table, 'eight');
        debug("Nine profile check: %j, Eight %j", tot1, tot2);

        var csvf = "profilemap.csv";
        debug("Writing %s", csvf);

        return fs
            .writeFileAsync(csvf, csv, "utf-8")
            .return(table);
    });
}

var impressionsF = "impressions - 16 days.json"

/*
 * competition among posts can be seen as "the top 10 posts which
 * ignored chronological order 
 */
return Promise.all([
        loadJSONfile(impressionsF),
        loadList()
    ])
    .then(function(x) {
        debugger;
        /* partiont creates two array: the first for which the function return true */
        return _.partition(x[0], function(impression) {
 	    var check = _.toLower(impression.pageName);
            return x[1].indexOf(check) === -1;
	});
    })
    .tap(function(partition) {
	debug("Accepted pageName %d, unrecognized %d", _.size(partition[1]), _.size(partition[0]));
	console.log(JSON.stringify(_.countBy(partition[0], 'pageName'), undefined, 2));
        debugger;
    })
    .map(function(impression) {
        var fields = ['pageName', 'postId', 'profile', 'impressionTime'];
        var ret = _.pick(impression, fields);
        ret.hours = _.round(moment.duration(impression.visualizationDiff * 1000).asHours());
        ret.position = _.round(impression.impressionOrder / 10);
        return ret;
    })
    .tap(function(result) {
        return fs
            .writeFileAsync(gaussF, JSON.stringify(result, undefined, 2), "utf-8")
            .tap(function() {
                debug("Writings %s, %d visualization object: done!", gaussF, _.size(result));
            });
    });
