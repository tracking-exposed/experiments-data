**This is the logic used to produce the JSON files**

### impressions and posts

```
user@user:~/facebook$ STARTDAY="2017-12-07" ENDDAY="2017-12-20" DEBUG=* mongo-scripts/silver.js 
  silver [+] All the impressions are 12670 +10ms
  silver Opening and eventually overwritting 'impressions - 13 days.json' +903ms
  silver [+] Unique posts are 2348 +3s
  silver Opening and eventually overwritting 'posts - 13 days.json' +294ms
  silver Done! files saved +114ms
```
### API-collected-posts 

This file import the product of Facebook API to get insight on the actual amount of posts publiched by the sources, the import script is `apiimport.js`

### gauss

The file gauss.json analyze the visualizationDiff value, rounding the value in hours. It could help to study the competitiion among the same post, as the log show:

```
user@user:~/experiments-data/wto$ DEBUG=* ../competition.js 
  competition Opening file impressions - 14 days.json +0ms
  competition Writings gauss.json, 13905 visualization object: done! +1s
```

it is based on the impressions.

### truthcheck

This compare the API collected post vs the timeline observed posts
