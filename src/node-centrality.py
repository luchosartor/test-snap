__author__ = 'Lab Gamer'
import snap
import csv_read_file as crf
import csv
import time
import json


def get_node_centrality(net_name):
    start = time.time()
    g = snap.TUNGraph.New()
    nodes_info = {}
    crf.read_file_centrality(g, net_name, nodes_info)
    betweenness = snap.TIntFltH()
    snap.GetBetweennessCentr(g, betweenness)
    n = 0
    with open(net_name.replace('input/', 'output/centrality-'), 'wb') as writefile:
        centrality_writer = csv.writer(writefile, delimiter=',')
        centrality_writer.writerow(['startup_id', 'startup_name', 'degree', 'betweenness', 'closeness'])
        rows = []
        for node in nodes_info:
            n += 1
            rows.append([node, nodes_info[node], snap.GetDegreeCentr(g, node), betweenness[node],
                         snap.GetClosenessCentr(g, node)])
        centrality_writer.writerows(rows)
        writefile.close()
    print(time.time() - start)
    print n
    print g.GetEdges()


def print_csv_to_json():
    my_json = []
    with open("output/centrality-startup-net-arg-mini.csv", 'rb') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        dummy = 0
        for row in reader:
            if dummy == 0:
                dummy = 1
                continue
            my_json.append(row)
    csvfile.close()
    with open("output/json-startup-net-arg-mini.json", 'wb') as json_file:
        json.dump(my_json, json_file)
        json_file.close()
    return json.dumps(my_json)

# get_node_centrality('input/startup-net-arg-mini.csv')


print_csv_to_json()
