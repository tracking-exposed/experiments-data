
The files in the directory **silver** are encrypted, they are available upon explicit agreement.
**Confidentiality**: the filename with (.zip) at the end, are encrypted, their leakage should be avoid until the report is not ready.
**Data format**: read the file named *columns-content.md*, it explains the fields in the JSONs

## Files

  * fbtrex-data-0.json.zip: it is the first exported data, is outdated now. It is **not necessay use this file**, has been cleaned as documented below. from a file with suffix -0 has been generated two files with suffix -1.
  * semantic-entities.json.zip: It contains semantic analysis of all the externally linked url

### reduction and cleaning of file -0

  * reactions and interactions stop to be dictionary and collections, making the object flat.
  * hrefType is a too much technical working, now is type
  * the total amount of reaction collected by the post at `impressionTime`, (sum of all the *likes*, *HaHa*, *Wow!*, *Sad*, *Love*, *Thankful* buttons) is named `rtotal`

### content check

using the file "Media and Influences.ods(.zip)" the sources has been verified.

  * some posts had not the displayName and pageName properly extracted, this was happening on `album`, now is fixed.

### results

Using the command: `STARTDAY="2017-10-08" ENDDAY="2017-10-24" DEBUG=* node mongo-scripts/silver.js`

  * This has produced the file **fbtrex-data-1.json(.zip)** which is the one you should use for your analysis, contains all the improvement described above.
  * a list of all the posts, ordered by first appearence (publicationTime), and their appearence map, their text display, is in **post-publication-1.json(.zip)**

# Data Format Sample

All the .json files contains a list of object, below is reported one of the object, in order to highlight the relationship between the three files.

### fbtrex-data-2.json

every object represent an **impression**, there are 57686 impressions collected from 9 different profiles following 45 sources
Note: following the suggestion of #1, the `external` fields has been moved from **impression** to this collection (the file got the new suffix of -2)

```
  {
    "pageName": "nytimes",
    "profile": "Claudio",
    "postId": "17744444444666666",
    "impressionTime": "2017-10-21T15:02:41-03:00",
    "publicationTime": "2017-10-21T14:10:02-03:00",
    "visualizationDiff": 3159,
    "type": "photo",
    "love": 1,
    "like": 6,
    "sad": 0,
    "haha": 0,
    "wow": 0,
    "angry": 0,
    "thankful": 0,
    "_keywordWeLookForNumberOne": 0,
    "_keywordWeLookForNumberTwo": 0,
    "_keywordWeLookForNumberThree": 0,
    "_keywordWeLookForNumberFour": 0,
    "_keywordWeLookForNumberFive": 4,
    "impressionOrder": 34,
    "id": "ca2c2fa65199e1e29495de455453689293fc5c1a",
    "permaLink": "/nytimes/photos/a.126983925862.111686.51631931312/10151115811551563/?type=3",
    "rtotal": "7",
    "comments": "1",
    "shares": "0",
    "timelineId": "37bf45dae7481f29bfc7790778b12342b295c1a2"
  }

```

### semantic-entities.json

**relationships**: using the `externals.id` from the object above, you can find the semantic analysis of all the externally linked URLs. also `original` contains the same URL of `externals.link`. The format is the one documented on the third party webiste we relay on (dandelion.eu)[https://dandelion.eu/docs/api/datatxt/nex/v1/].

```
  {
    "id": "c26b59f275872774e32f7ce8bc46f570e9c73fc7",
    "original": "http://bit.ly/4444UDX",
    "time": IGNORE IT, depends on the third party services,
    "annotation": [ list of entities extracted, position, and wikipedia references ],
    "lang": "es",
    "text": FULL TEXT of the ARTICLE
    "url": "https://nytimes.com/blah",
    "publicationTime": this will differ from the publicationTime above, it talks on the URL publication, not of the facebook publication
  }
```

Import made easy:

```
node
> fs = require('fs');
> a = JSON.parse(fs.readFileSync("semantic-entities.json", "utf-8"))

```

### post-publication-2.json

every object represent a facebook post, there are 13291 unique fb posts; for example, this means the post above it is appear to *Claudio*, and then to *Andrea* and *Juan*.
Note: following the suggestion of #1, the `external` fields has been moved from **impression** to this collection, and the file got the new suffix of -2

**relationships**:  `postId` (it is even a relationship toward facebook),  `appears[].id` reference to an unique ID from the impressions.

```
  {
    "postId": "17744444444666666",
    "externals": [
      {
        "link": "http://bit.ly/4444UDX",
        "id": "c26b59f275872774e32f7ce8bc46f570e9c73fc7"
      }
    ],
    "publicationTime": "2017-10-21T14:10:02-03:00",
    "pageName": "nytimes",
    "text": could or could not be present, depends on the post type
    "appears": [
      {
        "visualizationDiff": 246630,
        "impressionOrder": 42,
        "profile": "Claudio",
        "id": "ca2c2fa65199e1e29495de455453689293fc5c1a",
      },
      {
        "visualizationDiff": 247791,
        "impressionOrder": 37,
        "profile": "Andrea",
        "id": "12cc5ee87ca3424240dd0465f129862bcd479a36"
      },
      {
        "visualizationDiff": 331341,
        "impressionOrder": 73,
        "profile": "Juan",
        "id": "e6345ec885edd8adbd774dd98b2403938cf660ce"
      }
    ]
  }
```

