#!/usr/bin/env nodejs
var _ = require('lodash');
var moment = require('moment');
var Promise = require('bluebird');
var debug = require('debug')('keeponlythree');
var fs = Promise.promisifyAll(require('fs'));

/* this script is intended to keep only three user out of 9 
 *
 * Britta+Olivier+Antoine
 *
 * */

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
var output = "impressions - onlythree.json"

return loadJSONfile(impressionsF)
    .then(function(x) {
        debugger;
        var equals = [ "Britta", "Olivier", "Antoine" ];

        var selected = _.flatten(_.map(equals, function(e) {
            return _.filter(x, { profile: e });
        }));
        return fs
            .writeFileAsync(output, JSON.stringify(selected, undefined, 2), "utf-8")
            .tap(function() {
                debug("Writing %s, %d vobject: done!", output, _.size(x));
            });
    });
