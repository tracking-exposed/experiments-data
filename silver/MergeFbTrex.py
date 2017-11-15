# -*- coding: utf-8 -*-
"""
Created on Sun Nov 12 11:47:26 2017

@author: Fede
"""

import pandas 
import numpy as np


def merge(left="E:\HOME\impressions - 16 days.json",right="E:\HOME\posts - 16 days.json",output="E:\HOME\Merged.json"):
    leftdf= pandas.read_json(left)
    rightdf= pandas.read_json(right)
    print(rightdf.columns)
    mergedf= leftdf.merge(rightdf,left_on="id",right_on="externals",how='outer')
    mergedf.to_json(output)
        

    
    
merge()    
   
"""    
    df1 = pandas.DataFrame(leftdf)
    df2 = pandas.DataFrame(rightdf, columns=['appears', 'externals', 'pageName', 'postId', 'publicationTime',
       'text'])
    newlist = list()
    for key,value in df2:
        newlist.append(key,value)
        
        
        #print(rightdf['externals'])
    newlist = []
    for key,value in rightdf:
        newlist.append(key)
        print(newlist)
        
        
        
         #for key,value in rightdf:
        #newlist1.append(key,value)
        #print(newlist1)
        #mergedf= leftdf.merge(rightdf,left_on="id",right_on="externals",how='outer')
        #mergedf.to_json(output)
        
        
"""        

    