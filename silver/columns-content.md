### pageName
*example:* "Canal7deJujuy"

Page name is the Facebook name of the page. It comes from the link where the page is reachable. It comes from the URL: facebook.com/Canal7deJujuy is the address of the page “Canal 7 de Juyuy” which is one of our source under analysis.

### profile
*example:* "Camila",

Our 9 users have some names, in this way we can recognize them. Each of them is differently polarized.

### postId
*example:* "1973964699483029",

The postId comes from Facebook and is unique for every content shared. An album, a picture a video and a post have a postId.

### externals
*example:* 

    [
      {
        "link": "http://www.somosjujuy.com.ar/noticias/locales/el-frente-jujeno-cambiemos-festejo-el-triunfo",
        "id": "159fcf41ff77c22bfc40fb1166099993bb64104c"
      }
    ]

If the source shared a post with a link pointing outside of Facebook, these links will appear here. The “id” in unique, and can be used in the database entities to access the semantic data analysis made in link

### impressionTime
*example*: "2017-10-23T18:03:33-03:00"

impressionTime is the precise hour where the post show up on the profile newsfeed. publicationTime is the time when the post has been published. visualizationDiff is the number of seconds passed since the publication to the time of the impression. An user can see the same postId many times, but every time, in different timeline.

### publicationTime
*example*: "2017-10-22T23:47:31-03:00"

In Buenos Aires timezone, the time when the post has been published by the source. postId it is assume to have only one publicationTime

### visualizationDiff
*example*: 65762

Is the difference in seconds between the time the post get published (publicationTime) and what it has been display (impressionTime)

### Likes

or **Hah**, **Love**, the reactions expressed with the Facebook like button, are here reported. Note, if a number is more than 1000 units, it is rounded (1411 becames 1.4k that I can parse as 1400)

### Comments
### Shares

Same as **Likes**

### rtotal

The sum of all the reactions via Like button (Hah + Love + Thankful + Likes + Sad + Angry)

Note: when a reaction is more than 1000, the number get rounded by Facebook and we can’t have the precise number, only, for example 1.5k (reported here as  1500)

### displayName
*example:* "Canal 7 de Jujuy",

This is the name display on top of the post, please note, some of these name also say “SourceName has shared 9 pictures”, this displayName can change based on the post kind.

### _Maldonado
*example:* 5

The \_ in front of the keywords, means the fields is named after the keyword we were looking for.
These are the keyword we search for. In the entire HTML code of the post, the patterns above are searched case-insensitive. We report the number of occurrencies.

### impressionOrder
*example:* 50

This is the position in the newsfeed where the post show up.

### id
*example:* "884a1089e39425bf64482849e37687c310bb04b4",

This is a unique identifier of the post, you can see the metadata extracted and the original html in https://facebook.tracking.exposed/revision/$id 

### type
*example:* "post",

Based on the permaLink of the post, we can extract the kind of content (album, picture, video, post). 

### timelineId
*example:* "0a6ca3648ddffea4f5123dfe2650314a8622d28c"

Every post belong to a timeline, a timeline has an average of 45-50 posts, and the timelineId is in common. impressionOrder+timelineId are unique.
