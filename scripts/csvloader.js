const fs = require('fs');
const parse = require('csv-parse/lib/sync')
const _ = require('lodash');

function getJ(filename) {
    csvdata = fs.readFileSync(filename, 'utf-8')
    return parse(csvdata, { columns: true, skip_emty_lines: true })
}

function reducer(memo, entry) {

    // notes to make this function 'generic' ?
    // .recommendedVideoId is the pivot field
    let exists = _.get(memo, entry.recommendedVideoId);
    if(exists) {
        memo[entry.recommendedVideoId].foryou += (entry.recommendedForYou === 'true') ? 1 : 0;
        memo[entry.recommendedVideoId].top20 += (entry.top20 === 'true') ? 1 : 0;
        memo[entry.recommendedVideoId].times++;
    } else {
        memo[entry.recommendedVideoId] = {
            foryou: (entry.recommendedForYou === 'true') ? 1 : 0,
            top20: (entry.top20 === 'true') ? 1 : 0,
            times: 1,
            author: entry.recommendedAuthor,
            title: entry.recommendedTitle,
            uxLang: entry.uxLang,
        }
    }
    return memo;
}

module.exports = {
    getJ,
    reducer,
    _,
    fs
}
