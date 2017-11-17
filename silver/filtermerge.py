#!/user/bin/env python3
# -*- encoding: utf8 -*-
import json
import sys

def doSemanticFilter(semantics):
    lookFor = 'Bono' # "Foro Económico Mundial"
    selected = []
    for se in semantics:
        postOK = False
        try:
            assert se['annotations']
        except AssertionError:
            continue
        except KeyError:
            continue

        for ann in se['annotations']:
            """
            keys in $ann:
              [u'confidence', u'end', u'title', u'spot', 
               u'uri', u'label', u'start', u'id']
            """
            if(ann['label'] == lookFor):
                postOK = True

        if postOK:
            selected.append({
                'semanticId': se['id'],
                'semanticText': se['text'],
                'url': se['url'],
                'lang': se['lang'],
                'annotations': se['annotations']
            })
        
    print("Semantic research complete, from %d object, %d are filtered" % ( len(semantics), len(selected) ))
    return selected


def loadJSON(fileName):
    print("loadJSON %s" % fileName)
    with file(fileName, 'r') as fp:
        content = json.load(fp)
        print("loadJSON Loaded %d entries from %s" % (len(content), fileName))
        return content


# Here begin the code
impressionsF = "impressions - 16 days.json"
postsF = "posts - 16 days.json"
semanticF = "semantic-entities.json"
outputF = sys.argv[1] if len(sys.argv) > 1 else "merged.json"

# load the file we need to filter
semantics = loadJSON(semanticF)
filtered = doSemanticFilter(semantics)

# in 'fitered' we have the content we need,
# (annotations, semanticId, text, url)
# we can intersect the externalId with the $posts
# and save the results. This is enough to complete
# investigation 1

posts = loadJSON(postsF)
selected = []

for po in posts:
    try:
        externals = po['externals']
    except KeyError:
        continue

    for ex in externals:
        for match in filtered:
            if(match['semanticId'] == ex['id']):
                po['semanticText'] = match['semanticText']
                po['annotations'] = match['annotations']
                po['semanticId'] = match['semanticId']
                po['url'] = match['url']
                selected.append(po)

print("Extended post list is composed by %d" % len(selected))

with file(outputF, 'w+') as fp:
    json.dump(selected, fp);
    print("Written %s with results" % outputF);


