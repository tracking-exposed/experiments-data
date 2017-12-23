#!/usr/bin/env nodejs
var _ = require('lodash');
var moment = require('moment');
var Promise = require('bluebird');
var debug = require('debug')('truthsayer');
var fs = Promise.promisifyAll(require('fs'));
var jsonexport = require('jsonexport');

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

function selectMatch(matches, postId, permaLink) {
    /* this select the correct one */
    if(_.size(matches) > 1) {
        var maybe = _.find(matches, { postId: postId});
        if(maybe) {
            // debug("postId worked here!");
            return maybe;
        }

        var complete = 'https://www.facebook.com' + permaLink;
        var nau = _.find(matches, { link: complete });
        if(nau) {
            // debug("permaLink worked here!");
            return nau;
        }

        debug("Problem! %s", JSON.stringify(matches, undefined, 2));
        throw new Error("XXX");
    } else
        return _.first(matches);
};

var impressionsF = "impressions - 13 days.json";
var APIF = "API-collected-posts.json";
var truthF = "truthcheck.json";

/*
 * This script merge the impressions and the API-derived file, and create a CSV.
 * keys
 * API: from from_id message picture link name description type created_time (renamed publicationTime) author_id postId
 * FBTREX: impressionTime impressionOrder publicationTime timelineId profile pageName
 * a key names "sortBy" with publicationTime and impressionTime will be created
 * the collection get sorted in that way
 * the time get shifted by three hours to be in Buenos Aires time (all the 'time' variables are moment-js obj)
 * the key named "sortBy" removed
 * the CSV format
 */

return Promise
    .all([ loadJSONfile(impressionsF), loadJSONfile(APIF) ])
    .then(function(mixed) {

        var impressions = timeconv(filtertime(mixed[0]));
        var merged = [];
        var impf = [ 'impressionOrder', 'timelineId', 'profile', 'pageName',
          "visualizationDiff", "love", "like", "sad", "haha", "wow", "angry",
          "thankful", "id", "permaLink", "rtotal", "comments", "shares" ];

        var apif = [ 'from', 'from_id', 'message', 'picture', 'link', 'name', 'description', 'type', 'author_id', 'postId' ];

        /*
        _.each(mixed[1], function(apie) {
            var e = _.pick(apie, apif);
            e.sortBy = moment(apie.created_time);
            e.publicationTime = moment(apie.created_time);
            merged.push(e);
        });
        debug("Imported the API source: %d entries", _.size(merged));
*/
        _.each(impressions, function(impression) {
            /* link the impression to the post, if exists.
             * and if not: it is an issue */
            var matches = _.filter(mixed[1], {uniq: impression.uniq});
            var correctOne = selectMatch(matches, impression.postId, impression.permaLink);
            
            var e = _.merge({
                sortBy: moment(impression.impressionTime),
                impressionTime: moment(impression.impressionTime),
                publicationTime: moment(impression.publicationTime)
            },
                _.pick(correctOne, apif),
                _.pick(impression, impf)
            );
            merged.push(e);
        });
        debug("Imported the fbtrex source: %d entries", _.size(merged));

        return _.sortBy(merged, 'sortBy');
    })
    .map(function(e) {
        _.unset(e, 'sortBy');
        e.publicationTime.utcOffset(-180);
        e.publicationTime = e.publicationTime.toISOString();

        if(e.impressionTime) {
            e.impressionTime.utcOffset(-180);
            e.impressionTime = e.impressionTime.toISOString();
        }
        return e;
    })
    .then(function(coll) {

        var ImpOnly = "impression-extended-table.csv";
        jsonexport(coll ,function(err, csv){
            if(err) return console.log(err);
            return fs
                .writeFileAsync(ImpOnly, csv, "utf-8");
        });
    });

