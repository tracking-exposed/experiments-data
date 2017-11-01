
The files in the directory **silver** are encrypted, they are available upon explicit agreement.
The files here will be deleted and the repository `git reset --hard`, when the data become public.

**Confidentiality**: the filename with (.zip) at the end, are encrypted, their leakage should be reduced until the report is not ready.

## Files

  * fbtrex-data-0.json.zip: It is **not necessay use this file**, has been cleaned and reduced as documented below.
  * semantic-entities.json.zip: semantic analysis of all the externally linked url

### reduction and cleaning of file -0

  * reactions and interactions stop to be dictionary and collections, making the object flat.
  * hrefType is a too much technical working, now is type
  * the total amount of reaction collected by the post at `impressionTime`, (sum of all the *likes*, *HaHa*, *Wow!*, *Sad*, *Love*, *Thankful* buttons) is named `rtotal`

### content check

using the file "Media and Influences.ods(.zip)" the sources has been extracted and put in pages.json(.zip)

  * some posts belonging to pages not followed by the profiles are been found (Facebook decision, we are not following these)

--- work in progress

This has produced the file **fbtrex-data-1.json.zip** which is the one you should use for your analysis


