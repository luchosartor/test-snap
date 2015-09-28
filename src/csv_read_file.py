__author__ = 'Lab Gamer'
import csv
import snap


def read_file(g, net_name):
    with open(net_name, 'rb') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        dummy = 0
        for row in reader:
            if dummy == 0:
                dummy = 1
                continue
            src_node_id = int(row[1])
            if not g.IsNode(src_node_id):
                g.AddNode(src_node_id)
            dest_node_id = int(row[5])
            if not g.IsNode(dest_node_id):
                g.AddNode(dest_node_id)
            g.AddEdge(src_node_id, dest_node_id)
    csvfile.close()


def read_file3(g, net_name, nodes_ids, paths):
    with open(net_name, 'rb') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        dummy = 0
        for row in reader:
            if dummy == 0:
                dummy = 1
                continue
            src_node_id = int(row[1])
            if not g.IsNode(src_node_id):
                g.AddNode(src_node_id)
            dest_node_id = int(row[5])
            if not g.IsNode(dest_node_id):
                g.AddNode(dest_node_id)
            g.AddEdge(src_node_id, dest_node_id)
            if src_node_id not in paths:
                if dest_node_id not in paths:
                    paths[src_node_id] = {}
                    paths[src_node_id][dest_node_id] = 1
                else:
                    paths[dest_node_id][src_node_id] = 1
            else:
                paths[src_node_id][dest_node_id] = 1
            if src_node_id not in nodes_ids:
                nodes_ids.append(src_node_id)
            if dest_node_id not in nodes_ids:
                nodes_ids.append(dest_node_id)
    csvfile.close()


def best_read_file(g, net_name, nodes_ids):
    with open(net_name, 'rb') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        dummy = 0
        for row in reader:
            if dummy == 0:
                dummy = 1
                continue
            src_node_id = int(row[1])
            if not g.IsNode(src_node_id):
                g.AddNode(src_node_id)
            dest_node_id = int(row[5])
            if not g.IsNode(dest_node_id):
                g.AddNode(dest_node_id)
            g.AddEdge(src_node_id, dest_node_id)
            if src_node_id not in nodes_ids:
                nodes_ids.append(src_node_id)
            if dest_node_id not in nodes_ids:
                nodes_ids.append(dest_node_id)
    csvfile.close()


def read_file_centrality(g, net_name, nodes_info):
    with open(net_name, 'rb') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        dummy = 0
        for row in reader:
            if dummy == 0:
                dummy = 1
                continue
            src_node_id = int(row[1])
            if not g.IsNode(src_node_id):
                g.AddNode(src_node_id)
            dest_node_id = int(row[5])
            if not g.IsNode(dest_node_id):
                g.AddNode(dest_node_id)
            g.AddEdge(src_node_id, dest_node_id)
            if src_node_id not in nodes_info:
                nodes_info[src_node_id] = row[2]
            if dest_node_id not in nodes_info:
                nodes_info[dest_node_id] = row[6]
    csvfile.close()

