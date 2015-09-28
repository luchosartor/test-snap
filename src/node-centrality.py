__author__ = 'Lab Gamer'
import snap
import csv_read_file as crf
import csv


def get_node_centrality(net_name):
    g = snap.TUNGraph.New()
    nodes_info = {}
    crf.read_file_centrality(g, net_name, nodes_info)
    betweenness = snap.TIntFltH()
    snap.GetBetweennessCentr(g, betweenness)
    with open('centrality-' + net_name, 'wb') as writefile:
        centrality_writer = csv.writer(writefile, delimiter=',')
        centrality_writer.writerow(['startup_id', 'startup_name', 'degree', 'betweenness', 'closeness'])
        rows = []
        for node in nodes_info:
            rows.append([node, nodes_info[node], snap.GetDegreeCentr(g, node), betweenness[node],
                         snap.GetClosenessCentr(g, node)])
        centrality_writer.writerows(rows)
        writefile.close()


get_node_centrality('startup-net-arg-mini.csv')