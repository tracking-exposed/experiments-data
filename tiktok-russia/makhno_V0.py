from tqdm import tqdm
import time
import random
import pickle
import pandas as pd
import subprocess

def is_profile_available(username, timeout=10):
    url = "https://www.tiktok.com/@" + username
    # forge = "curl  -A 'Mozilla/5.0 (X11; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/81.0' " + url

    # This allows to set a timeout
    p = subprocess.check_output(
        ["curl", "-A", "'Mozilla/5.0 (X11; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/81.0'", url],
        timeout=timeout,
        stderr=subprocess.STDOUT)

    returned_page = str(p)

    if returned_page.find('"ItemModule":{}') > 0: 
        return False
    else:
        try:
            assert returned_page.find('"ItemModule":{')
            return True
        except:
            return returned_page

results_file = 'data/video_availability.pkl'



channels = pd.read_csv('data/videos_to_check.csv', sep=';')
channels.columns.values[0] = 'username'
channels.sort_values('view_count', ascending = False, inplace=True)
channels.set_index('username', inplace=True)

try:
    with open(results_file, 'rb') as handle:
        results = pickle.load(handle)
except:
    print('no results file found, creating empty dict')
    results = {}


for username in tqdm(list(channels.index)):
    try:
        if username not in results.keys():
            results[username] = is_profile_available(username)
            time.sleep(random.randint(80, 210) / 100)

            with open(results_file, 'wb') as handle:
                pickle.dump(results, handle, protocol=pickle.HIGHEST_PROTOCOL)
    except:
        print('error querying', username)
        pass


with open(results_file, 'wb') as handle:
    pickle.dump(results, handle, protocol=pickle.HIGHEST_PROTOCOL)

