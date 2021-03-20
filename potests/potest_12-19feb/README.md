### Raw Dataset

The file `search_homes.csv.gz` it is a compressed dataset; it is originally large 60Mb, and it contains different videos that were present in the homepages of 16 different logged in users on PH, collected daily between the 12th and the 19th of February 2021.

`search_homes_clean.csv`

is the dataset without errors, same numbers of unique homepages and same geolocalization.

### Clean Dataset

By using the python notebook:

```bash
cleaning_potrex_19feb.ipynb
``` 

It would produce the "\_clean.csv" version of the dataset, check the comments in the python notebook
