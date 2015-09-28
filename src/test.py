__author__ = 'Luciano'

import snap
import csv
import collections

UGraph = snap.GenRndGnm(snap.PUNGraph, 100, 1000)
Nodes = snap.TIntFltH()

for node in Nodes:
    print "node: %d centrality: %f" % (node, Nodes[node])