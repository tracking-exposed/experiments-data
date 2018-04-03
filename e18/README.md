# Files

  * opendata-e18.array.json.gz: this is a collection, like `[{},{},{}]` it is the proper JSON format
  * opendata-e18.tableau.json.gz: this is a file with `{}\n{}\n{}\n`, has one object every line, it works for Tableau while the one above doesn't
  * api-posts-e18.array.json.gz: this file follow the same format of the Facebook API, plus there is a `publisherOrientation` field.
  * api-posts-e18.tableau.json.gz: this file has the same format `{}\n{}\n{}\n` usable by Tableau.

### Object "opendata-e18" structure 

The collection contains 193808 object with these fields:

    "_id" : ObjectId("5ab919032076215038537c36"),
    "impressionOrder" : 42,
    "impressionTime" : ISODate("2018-01-10T19:07:34.000Z"),
    "profileName" : "Michele",
    "profileAlign" : "far-right",
    "publicationTime" : ISODate("2018-01-10T17:55:00.000Z"),
    "visualizationDiff" : 4354,
    "postId" : "10156069251662459",
    "utype" : "post",
    "displayName" : "Il Giornale",
    "externals" : 1,
    "timelineId" : "38bf77cb13909f633fb2de38d7ec9ca0ead2a91b",
    "permaLink" : "/ilGiornale/posts/10156069251662459",
    "rtotal" : "6",
    "comments" : "0",
    "shares" : "0",
    "id" : "27acd5e4caaa123301115e9e10e4547e15acc578",
    "by" : "fbtrex",
    "publisherName" : "Il Giornale",
    "publisherOrientation" : "right",
    "observed" : 1

### Fields description

Every object represent a Facebook post appear in the profile timeline. The profiles are six, the pages they were following 30.
All the objects are a combo of these two lists. These object take name of **impression** because the post is a unique publication
from a `publisherName`, with a unique `postId`. The same `postId` can appear more to more `profileName` and even to the same `profileName` in different `timelineId`, imply a different `impressionTime` and probably a different `impressionOrder`.

  * "_id" : ObjectId("5ab919032076215038537c36")  `native MongoDB ID, you can ignore it.`
  * "profileName" : "Michele"  `name of the profile, they are six, every name has the same profileAlign`
  * "impressionOrder" : 42  `position in the timeline of the post`
  * "impressionTime" : ISODate("2018-01-10T19:07:34.000Z")  `time of visualization`
  * "profileAlign" : "far-right"  `political orientation we forced upon the profile, by liking selected content`
  * "publicationTime" : ISODate("2018-01-10T17:55:00.000Z")  `time of publication, this is linked to postId`
  * "visualizationDiff" : 4354  `seconds of different between publicationTime and impressionTime`
  * "postId" : "10156069251662459"  `unique post Identified took from Facebook, every post has a different one`
  * "utype" : "post"  `kind of content: post, photos, video`
  * "displayName" : "Il Giornale"  `the name display on the timeline, it can be also "Il Giornal shared 6 picuture", for a more stable page Id, use publisherName`
  * "externals" : 1  `number of external links`
  * "timelineId" : "38bf77cb13909f633fb2de38d7ec9ca0ead2a91b"  `identifier unique among all the impressions of the same timeline`
  * "permaLink" : "/ilGiornale/posts/10156069251662459"  `facebook permaLink, in case you want to compose the facebook URL of the post`
  * "rtotal" : "6"  `total reactions at impressionTime. rtotal is the number of likes+sad+angry+wow+love buttons`
  * "comments" : "0"  `number of comment at impressionTime`
  * "shares" : "0"  `number of shares at impressionTime`
  * "id" : "27acd5e4caaa123301115e9e10e4547e15acc578"  `unique id, it is different from every impression, and you can retrieve the original HTML collected by us` by [changing the ID in this URL](https://facebook.tracking.exposed/revision/27acd5e4caaa123301115e9e10e4547e15acc578)
  * "by" : "fbtrex"  `this is fixed in this collection`
  * "publisherName" : "Il Giornale"  `name of the page publishing the postId`
  * "publisherOrientation" : "right"  `political affiliation we attributed to this publisherName`
  * "observed" : 1  `number of time the postId appear on this profileName`
