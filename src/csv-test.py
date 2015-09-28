__author__ = 'Luciano'
import csv    # file reading and writing
import snap   # library for network analysis
import time   # module for printing how long the step takes
import csv_read_file as crf

# Class to use as a matrix, uses a Python dictionary and has methods to add a value to the matrix and get it passing
# the nodes' ids


class Matrix():
    def __init__(self):
        pass

    paths = {}

    def add_path(self, i, j, path):
        if i not in self.paths:
            self.paths[i] = {j: path}
        else:
            self.paths[i][j] = path

    def get_ij(self, i, j):
        if i in self.paths:
            if j in self.paths[i]:
                return self.paths[i][j]
            else:
                return self.paths[j][i]
        else:
            return self.paths[j][i]


# All create_graph or create_paths receives the .csv file's name. Then calls the corresponding read_file method passing
# net_name (the file's name). After creating the graph, starts creating the matrix with all shortest path. Finally,
# the matrix is written to a new .csv file with all the shortest paths. Additionally, each method prints how long each
# step took in seconds. TUNGraph from snap is an undirected graph.


def create_graph_without_paths(net_name):
    start = time.time()
    g = snap.TUNGraph.New()
    crf.read_file(g, net_name)
    source = g.BegNI()
    title_row = []  # for matrix writing to csv
    while source < g.EndNI():
        s_id = source.GetId()
        title_row.append(str(s_id))
        source.Next()
    with open('matrix-' + net_name, 'wb') as writefile:
        matrix_writer = csv.writer(writefile, delimiter=',')
        matrix_writer.writerow(['#'] + title_row)
        for i in range(0, len(title_row)):
            this_row = []
            for j in range(0, len(title_row)):
                if i == j:
                    this_row.append("0")
                    continue
                j_id = int(title_row[j])
                i_id = int(title_row[i])
                this_row.append(str(snap.GetShortPath(g, i_id, j_id)))
            matrix_writer.writerow([title_row[i]] + this_row)
    writefile.close()
    print str(((time.time() - start) / 20) * 10000).replace('.', ',')


def create_graph_using_paths(net_name):
    real_start = time.time()
    g = snap.TUNGraph.New()
    crf.read_file(g, net_name)
    print "reading and creating graph: " + str((time.time() - real_start))
    start = time.time()
    paths = {}  # match each node to all in graph and saves the shortest path
    source = g.BegNI()
    title_row = []  # for matrix writing to csv
    while source < g.EndNI():
        s_id = source.GetId()
        dest = g.GetNI(s_id)
        dest.Next()
        title_row.append(s_id)
        while dest < g.EndNI():
            d_id = dest.GetId()
            if s_id not in paths:
                if d_id not in paths:
                    paths[s_id] = {}
                    paths[s_id][d_id] = snap.GetShortPath(g, s_id, d_id)
                else:
                    paths[d_id][s_id] = snap.GetShortPath(g, s_id, d_id)
            else:
                paths[s_id][d_id] = snap.GetShortPath(g, s_id, d_id)
            dest.Next()
        source.Next()
    print "creating paths: %f" % (time.time() - start)
    start = time.time()
    with open('matrix-' + net_name, 'wb') as writefile:
        matrix_writer = csv.writer(writefile, delimiter=',')
        matrix_writer.writerow(['#'] + title_row)
        for i in range(0, len(title_row)):
            this_row = []
            for j in range(0, len(title_row)):
                if i == j:
                    this_row.append("0")
                    continue
                j_id = title_row[j]
                i_id = title_row[i]
                if i_id in paths:
                    if j_id in paths[i_id]:
                        this_row.append(str(paths[i_id][j_id]))
                    else:
                        this_row.append(str(paths[j_id][i_id]))
                else:
                    this_row.append(str(paths[j_id][i_id]))
            matrix_writer.writerow([title_row[i]] + this_row)
    writefile.close()
    print "writing: %f" % (time.time() - start)
    print str((time.time() - real_start)).replace('.', ',')


def create_graph_with_paths_3(net_name):
    real_start = time.time()
    g = snap.TUNGraph.New()
    nodes_ids = []
    paths = {}  # match each node to all in graph and saves the shortest path
    crf.read_file3(g, net_name, nodes_ids, paths)
    print "reading and creating graph: " + str((time.time() - real_start))
    start = time.time()
    for i in range(0, len(nodes_ids)):
        s_id = nodes_ids[i]
        for j in range(i + 1, len(nodes_ids)):
            d_id = nodes_ids[j]
            if s_id not in paths:
                if d_id not in paths:
                    paths[s_id] = {}
                    paths[s_id][d_id] = snap.GetShortPath(g, s_id, d_id)
                else:
                    if s_id not in paths[d_id]:
                        paths[d_id][s_id] = snap.GetShortPath(g, s_id, d_id)
            else:
                if d_id not in paths[s_id]:
                    paths[s_id][d_id] = snap.GetShortPath(g, s_id, d_id)
    print "creating paths: %f" % (time.time() - start)
    start = time.time()
    with open('matrix-' + net_name, 'wb') as writefile:
        matrix_writer = csv.writer(writefile, delimiter=',')
        matrix_writer.writerow(['#'] + nodes_ids)
        for i in range(0, len(nodes_ids)):
            this_row = []
            for j in range(0, len(nodes_ids)):
                if i == j:
                    this_row.append("0")
                    continue
                j_id = nodes_ids[j]
                i_id = nodes_ids[i]
                if i_id in paths:
                    if j_id in paths[i_id]:
                        this_row.append(str(paths[i_id][j_id]))
                    else:
                        this_row.append(str(paths[j_id][i_id]))
                else:
                    this_row.append(str(paths[j_id][i_id]))
            matrix_writer.writerow([nodes_ids[i]] + this_row)
    writefile.close()
    print "writing: %f" % (time.time() - start)
    print str((time.time() - real_start)).replace('.', ',')


def create_graph_with_matrix_class(net_name):
    start = time.time()
    g = snap.TUNGraph.New()
    crf.read_file(g, net_name)
    matrix = Matrix()
    title = []
    node = g.BegNI()
    end = g.EndNI()
    while node < end:
        n = g.GetNI(node.GetId())
        title.append(node.GetId())
        while n < end:
            matrix.add_path(node.GetId(), n.GetId(), snap.GetShortPath(g, node.GetId(), n.GetId()))
            n.Next()
        node.Next()
    with open('matrix-' + net_name, 'wb') as writefile:
        matrix_writer = csv.writer(writefile, delimiter=',')
        matrix_writer.writerow(['#'] + title)
        for i in range(0, len(title)):
            this_row = []
            for j in range(0, len(title)):
                if i == j:
                    this_row.append(0)
                else:
                    this_row.append(matrix.get_ij(title[i], title[j]))
            matrix_writer.writerow([title[i]] + this_row)
        writefile.close()
    print str(((time.time() - start) * 20) * 10000).replace('.', ',')


def create_paths_matrix_best_method(net_name):
    real_start = time.time()
    g = snap.TUNGraph.New()
    nodes_ids = []
    crf.best_read_file(g, net_name, nodes_ids)
    print "reading and creating graph: " + str((time.time() - real_start))
    start = time.time()
    paths = {}  # match each node to all in graph and saves the shortest path
    for i in range(0, len(nodes_ids)):
        s_id = nodes_ids[i]
        for j in range(i + 1, len(nodes_ids)):
            d_id = nodes_ids[j]
            if s_id not in paths:
                if d_id not in paths:
                    paths[s_id] = {}
                    paths[s_id][d_id] = snap.GetShortPath(g, s_id, d_id)
                else:
                    paths[d_id][s_id] = snap.GetShortPath(g, s_id, d_id)
            else:
                paths[s_id][d_id] = snap.GetShortPath(g, s_id, d_id)
    print "creating paths: %f" % (time.time() - start)
    start = time.time()
    with open('matrix-' + net_name, 'wb') as writefile:
        matrix_writer = csv.writer(writefile, delimiter=',')
        matrix_writer.writerow(['#'] + nodes_ids)
        for i in range(0, len(nodes_ids)):
            this_row = []
            for j in range(0, len(nodes_ids)):
                if i == j:
                    this_row.append("0")
                    continue
                j_id = nodes_ids[j]
                i_id = nodes_ids[i]
                if i_id in paths:
                    if j_id in paths[i_id]:
                        this_row.append(str(paths[i_id][j_id]))
                    else:
                        this_row.append(str(paths[j_id][i_id]))
                else:
                    this_row.append(str(paths[j_id][i_id]))
            matrix_writer.writerow([nodes_ids[i]] + this_row)
    writefile.close()
    print "writing: %f" % (time.time() - start)
    print str((time.time() - real_start)).replace('.', ',')


# All "read_file" methods receives the .csv file's name and a graph to save the data. There are minor changes in each
# of them for optimization. The final method chosen one y "best_read_file"




# method testing.
create_paths_matrix_best_method('startup-net-arg-small.csv')


