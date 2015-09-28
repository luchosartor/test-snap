__author__ = 'Luciano'

import snap
import csv
import collections
import time
import json

a = [222, 'asda', 4.3, 1.2, 45.3]
print json.dumps(a)
data = json.loads(json.dumps(a))
print data
b = [a, [2, 'second list']]
daata2 = json.loads(json.dumps(b))
print(daata2)
for d in daata2[0]:
    print(d)

