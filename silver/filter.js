#!/usr/bin/env nodejs
var _ = require('lodash');
var moment = require('moment');
var Promise = require('bluebird');
var debug = require('debug')('competition');
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
    var pages = "page-list.txt"
    return fs
        .readFileAsync(pages, "utf-8")
	.then(function(pl) {
            return _.compact(_.split(pl, '\n'));
	})
	.map(_.toLower);
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
