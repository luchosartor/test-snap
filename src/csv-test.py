__author__ = 'Luciano'
import csv
import snap
import time


class Matrix():
    pathes = {}

    def addPath(self, i, j, path):
        if i not in self.pathes:
            self.pathes[i] = {j: path}
        else:
            self.pathes[i][j] = path

    def getIJ(self, i, j):
        if i in self.pathes:
            if j in self.pathes[i]:
                return self.pathes[i][j]
            else:
                return self.pathes[j][i]
        else:
            return self.pathes[j][i]


def readFile(g, netname):
    with open(netname, 'rb') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        dummy = 0
        for row in reader:
            if dummy == 0:
                dummy = 1
                continue
            srcNodeId = int(row[1])
            if not g.IsNode(srcNodeId):
                g.AddNode(srcNodeId)
            destNodeId = int(row[5])
            if not g.IsNode(destNodeId):
                g.AddNode(destNodeId)
            g.AddEdge(srcNodeId, destNodeId)
    csvfile.close()


def createGraphWithShortPath(netname):
    start = time.time()
    g = snap.TUNGraph.New()
    readFile(g, netname)
    # pathes = {}  # match each node to all in graph and saves the shortest path
    source = g.BegNI()
    titlerow = []  # for matrix writing to csv
    while source < g.EndNI():
        sId = source.GetId()
        # dest = g.GetNI(sId)
        # dest.Next()
        titlerow.append(str(sId))
        # while dest < g.EndNI():
        # dId = dest.GetId()
        # if sId not in pathes:
        # if dId not in pathes:
        #         pathes[sId] = {}
        #         pathes[sId][dId] = snap.GetShortPath(g, sId, dId)
        #     else:
        #         pathes[dId][sId] = snap.GetShortPath(g, sId, dId)
        # else:
        #     pathes[sId][dId] = snap.GetShortPath(g, sId, dId)
        #  dest.Next()
        source.Next()
    with open('matrix-' + netname, 'wb') as writefile:
        matrixwriter = csv.writer(writefile, delimiter=',')
        matrixwriter.writerow(['#'] + titlerow)
        for i in range(0, len(titlerow)):
            thisrow = []
            for j in range(0, len(titlerow)):
                if i == j:
                    thisrow.append("0")
                    continue
                jId = int(titlerow[j])
                iId = int(titlerow[i])
                thisrow.append(str(snap.GetShortPath(g, iId, jId)))
                # if iId in pathes:
                # if jId in pathes[iId]:
                # thisrow.append(str(pathes[iId][jId]))
                # else:
                # thisrow.append(str(pathes[jId][iId]))
                # else:
                # thisrow.append(str(pathes[jId][iId]))
            matrixwriter.writerow([titlerow[i]] + thisrow)
    writefile.close()
    print str(((time.time() - start) / 20) * 10000).replace('.', ',')


def createGraphWithPathes(netname):
    realstart = time.time()
    g = snap.TUNGraph.New()
    readFile(g, netname)
    print "reading and creating graph: "+str((time.time()-realstart))
    start = time.time()
    pathes = {}  # match each node to all in graph and saves the shortest path
    source = g.BegNI()
    titlerow = []  # for matrix writing to csv
    while source < g.EndNI():
        sId = source.GetId()
        dest = g.GetNI(sId)
        dest.Next()
        titlerow.append(sId)
        while dest < g.EndNI():
            dId = dest.GetId()
            if sId not in pathes:
                if dId not in pathes:
                    pathes[sId] = {}
                    pathes[sId][dId] = snap.GetShortPath(g, sId, dId)
                else:
                    pathes[dId][sId] = snap.GetShortPath(g, sId, dId)
            else:
                pathes[sId][dId] = snap.GetShortPath(g, sId, dId)
            dest.Next()
        source.Next()
    print "creating pathes: %f" % (time.time()-start)
    start = time.time()
    with open('matrix-' + netname, 'wb') as writefile:
        matrixwriter = csv.writer(writefile, delimiter=',')
        matrixwriter.writerow(['#'] + titlerow)
        for i in range(0, len(titlerow)):
            thisrow = []
            for j in range(0, len(titlerow)):
                if i == j:
                    thisrow.append("0")
                    continue
                jId = titlerow[j]
                iId = titlerow[i]
                if iId in pathes:
                    if jId in pathes[iId]:
                        thisrow.append(str(pathes[iId][jId]))
                    else:
                        thisrow.append(str(pathes[jId][iId]))
                else:
                    thisrow.append(str(pathes[jId][iId]))
            matrixwriter.writerow([titlerow[i]] + thisrow)
    writefile.close()
    print "writing: %f" % (time.time()-start)
    print str((time.time() - realstart)).replace('.', ',')

def createGraphWithPathes2(netname):
    realstart = time.time()
    g = snap.TUNGraph.New()
    nodesIds = []
    readFile2(g, netname, nodesIds)
    print "reading and creating graph: "+str((time.time()-realstart))
    start = time.time()
    pathes = {}  # match each node to all in graph and saves the shortest path
    for i in range(0, len(nodesIds)):
        sId = nodesIds[i]
        for j in range(i+1, len(nodesIds)):
            dId = nodesIds[j]
            if sId not in pathes:
                if dId not in pathes:
                    pathes[sId] = {}
                    pathes[sId][dId] = snap.GetShortPath(g, sId, dId)
                else:
                    pathes[dId][sId] = snap.GetShortPath(g, sId, dId)
            else:
                pathes[sId][dId] = snap.GetShortPath(g, sId, dId)
    print "creating pathes: %f" % (time.time()-start)
    start = time.time()
    with open('matrix-' + netname, 'wb') as writefile:
        matrixwriter = csv.writer(writefile, delimiter=',')
        matrixwriter.writerow(['#'] + nodesIds)
        for i in range(0, len(nodesIds)):
            thisrow = []
            for j in range(0, len(nodesIds)):
                if i == j:
                    thisrow.append("0")
                    continue
                jId = nodesIds[j]
                iId = nodesIds[i]
                if iId in pathes:
                    if jId in pathes[iId]:
                        thisrow.append(str(pathes[iId][jId]))
                    else:
                        thisrow.append(str(pathes[jId][iId]))
                else:
                    thisrow.append(str(pathes[jId][iId]))
            matrixwriter.writerow([nodesIds[i]] + thisrow)
    writefile.close()
    print "writing: %f" % (time.time()-start)
    print str((time.time() - realstart)).replace('.', ',')

def readFile2(g, netname, nodesIds):
    with open(netname, 'rb') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        dummy = 0
        for row in reader:
            if dummy == 0:
                dummy = 1
                continue
            srcNodeId = int(row[1])
            if not g.IsNode(srcNodeId):
                g.AddNode(srcNodeId)
            destNodeId = int(row[5])
            if not g.IsNode(destNodeId):
                g.AddNode(destNodeId)
            g.AddEdge(srcNodeId, destNodeId)
            if srcNodeId not in nodesIds:
                nodesIds.append(srcNodeId)
            if destNodeId not in nodesIds:
                nodesIds.append(destNodeId)
    csvfile.close()

def readFile3(g, netname, nodesIds, pathes):
    with open(netname, 'rb') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        dummy = 0
        for row in reader:
            if dummy == 0:
                dummy = 1
                continue
            srcNodeId = int(row[1])
            if not g.IsNode(srcNodeId):
                g.AddNode(srcNodeId)
            destNodeId = int(row[5])
            if not g.IsNode(destNodeId):
                g.AddNode(destNodeId)
            g.AddEdge(srcNodeId, destNodeId)
            if srcNodeId not in pathes:
                if destNodeId not in pathes:
                    pathes[srcNodeId] = {}
                    pathes[srcNodeId][destNodeId] = 1
                else:
                    pathes[destNodeId][srcNodeId] = 1
            else:
                pathes[srcNodeId][destNodeId] = 1
            if srcNodeId not in nodesIds:
                nodesIds.append(srcNodeId)
            if destNodeId not in nodesIds:
                nodesIds.append(destNodeId)
    csvfile.close()

def createGraphWithPathes3(netname):
    realstart = time.time()
    g = snap.TUNGraph.New()
    nodesIds = []
    pathes = {}  # match each node to all in graph and saves the shortest path
    readFile3(g, netname, nodesIds, pathes)
    print "reading and creating graph: "+str((time.time()-realstart))
    start = time.time()
    for i in range(0, len(nodesIds)):
        sId = nodesIds[i]
        for j in range(i+1, len(nodesIds)):
            dId = nodesIds[j]
            if sId not in pathes:
                if dId not in pathes:
                    pathes[sId] = {}
                    pathes[sId][dId] = snap.GetShortPath(g, sId, dId)
                else:
                    if sId not in pathes[dId]:
                        pathes[dId][sId] = snap.GetShortPath(g, sId, dId)
            else:
                if dId not in pathes[sId]:
                    pathes[sId][dId] = snap.GetShortPath(g, sId, dId)
    print "creating pathes: %f" % (time.time()-start)
    start = time.time()
    with open('matrix-' + netname, 'wb') as writefile:
        matrixwriter = csv.writer(writefile, delimiter=',')
        matrixwriter.writerow(['#'] + nodesIds)
        for i in range(0, len(nodesIds)):
            thisrow = []
            for j in range(0, len(nodesIds)):
                if i == j:
                    thisrow.append("0")
                    continue
                jId = nodesIds[j]
                iId = nodesIds[i]
                if iId in pathes:
                    if jId in pathes[iId]:
                        thisrow.append(str(pathes[iId][jId]))
                    else:
                        thisrow.append(str(pathes[jId][iId]))
                else:
                    thisrow.append(str(pathes[jId][iId]))
            matrixwriter.writerow([nodesIds[i]] + thisrow)
    writefile.close()
    print "writing: %f" % (time.time()-start)
    print str((time.time() - realstart)).replace('.', ',')

def createGraphWithMatrix(netname):
    start = time.time()
    g = snap.TUNGraph.New()
    readFile(g, netname)
    matrix = Matrix()
    title = []
    node = g.BegNI()
    end = g.EndNI()
    while node < end:
        n = g.GetNI(node.GetId())
        title.append(node.GetId())
        while n < end:
            matrix.addPath(node.GetId(), n.GetId(), snap.GetShortPath(g, node.GetId(), n.GetId()))
            n.Next()
        node.Next()
    with open('matrix-' + netname, 'wb') as writefile:
        matrixwriter = csv.writer(writefile, delimiter=',')
        matrixwriter.writerow(['#'] + title)
        for i in range(0, len(title)):
            thisrow = []
            for j in range(0, len(title)):
                if i == j:
                    thisrow.append(0)
                else:
                    thisrow.append(matrix.getIJ(title[i], title[j]))
            matrixwriter.writerow([title[i]] + thisrow)
        writefile.close()
    print str(((time.time() - start) * 20) * 10000).replace('.', ',')


#createGraphWithMatrix('startup-net-arg-mini.csv')
print "------------------Pathes2"
createGraphWithPathes2('startup-net-arg-small.csv')



#createGraphWithShortPath('startup-net-arg-mini.csv')

# while source < g.EndNI():               method that works
#     sId = source.GetId()
#     dest = g.GetNI(sId)
#     dest.Next()
#     titlerow.append(sId)
#     while dest < g.EndNI():
#         dId = dest.GetId()
#         if sId not in pathes:
#             if dId not in pathes:
#                 pathes[sId] = {}
#                 pathes[sId][dId] = snap.GetShortPath(g, sId, dId)
#             else:
#                 pathes[dId][sId] = snap.GetShortPath(g, sId, dId)
#         else:
#             pathes[sId][dId] = snap.GetShortPath(g, sId, dId)
#         dest.Next()
#     source.Next()