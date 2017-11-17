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

var impressionsF = "impressions - 16 days.json"
var postsF = "posts - 16 days.json"
var semanticF = "semantic-entities.json"
var gaussF = "gauss.json"

/*
 * competition among posts can be seen as "the top 10 posts which
 * ignored chronological order 
 */
return loadJSONfile(impressionsF)
    .map(function(impression) {
        var fields = ['pageName', 'postId', 'profile', 'impressionTime'];
        var ret = _.pick(impression, fields);
        ret.hours = _.round(moment.duration(impression.visualizationDiff * 1000).asHours());
        debugger;
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
