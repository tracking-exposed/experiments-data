#!/usr/bin/env nodejs
var _ = require('lodash');
var moment = require('moment');
var Promise = require('bluebird');
var debug = require('debug')('truthsayer');
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

function filtertime(collection) {
    // this to mark the comparison at 0 
    var startday = moment.utc("2017-12-07");
    var endday = moment.utc("2017-12-20");

    var nc = _.filter(collection, function(e) {
        return moment(e.publicationTime).isAfter(startday) &&
            moment(e.publicationTime).isBefore(endday);
    });

    debug("Kept fbtrex posts published between %s and %s, now are %d",
        startday.format(), endday.format(), _.size(nc));
    return nc;
};

function timeconv(collection) {
    return _.map(collection, function(e) {
        e.uniq = _.join([
            e.pageName.substring(0, 5),
            moment(e.publicationTime).valueOf()
        ], '--');
        return e;
    });
};

var postsF = "posts - 13 days.json";
var APIF = "API-collected-posts.json";
var truthF = "truthcheck.json";

/*
 * This script acquire the API posts and the observed post. For each of them,
 * verify is there is occurency or not in the other DB.
 *
 * { postId: xxx, sourceName: xxx, created_time: xxx, outreach: 0-6 }
 */

return Promise
    .all([ loadJSONfile(postsF), loadJSONfile(APIF) ])
    .tap(function(mixed) {
        var cleanPosts = timeconv(filtertime(mixed[0]));
        debug("Starting with %d posts from API and %d from fbtrex (%d timef)",
            _.size(mixed[1]), _.size(mixed[0]), _.size(cleanPosts) );
        var sidecheck = 0;
        var result = _.map(mixed[1], function(apie) {
            var x = _.find(cleanPosts, {uniq: apie.uniq});
            var r = _.pick(apie, ['postId', 'pageName', 'created_time']);
            if(x) sidecheck++;
            r.outreach = x ? _.size(_.uniq(_.map(x.appears, 'profile'))) : 0;
            return r;
        });
        debug("Check, all the post found are %d (%d missing)",
            sidecheck, _.size(cleanPosts) - sidecheck);

        var c = _.countBy(result, 'outreach');
        debug("Stats: %s, %s",
            JSON.stringify(c, undefined, 2),
            JSON.stringify(_.map(c, function(x, i) {
                return "Visualized to " + i + " users: " +
                    _.round((x / _.size(result) ) * 100, 2) + "%";
            }), undefined, 2)
        );
        return fs
            .writeFileAsync(truthF, JSON.stringify(result, undefined, 2), "utf-8")
            .tap(function() {
                debug("Writings %s, %d visualization object: done!", truthF, _.size(result));
            });
    })
    .tap(function(mixed) {
        var cleanPosts = filtertime(mixed[0]);
        debug("Doublecheck %d posts from API and %d from fbtrex (%d timef)",
            _.size(mixed[1]), _.size(mixed[0]), _.size(cleanPosts) );
        var errors = 0;
        _.each(cleanPosts, function(visualized) {
            var x = _.find(mixed[1], { uniq: visualized.uniq });
            if(!x) 
                errors++;
                // debug("Error with %s %s %s %d", visualized.postId, visualized.pageName, visualized.publicationTime, _.size(visualized.appears));
        });
        debug("errors: %d post not found, with fbtrex obj searched into API objects", errors);
    });
