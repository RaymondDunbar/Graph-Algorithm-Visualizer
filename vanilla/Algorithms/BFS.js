var orderDiscovered = [];

function BFS(startNode, endNode){
    var queue = [];
    var distances = [];
    for(let i = 0; i < Nodes.length; i++){
        distances.push(Infinity);
    }

    startNode.setDiscovered(true);
    orderDiscovered.push(startNode);
    queue.push(startNode);
    distances[startNode.ID] = 0;

    while(queue.length !== 0){
        var node = queue.shift();
        node.setExplored(true);
        node.Adjacent.forEach(AdjacentNode => {

            if(AdjacentNode.isDisabled() === false && AdjacentNode.isDiscovered() === false){
                AdjacentNode.setDiscovered(true);
                orderDiscovered.push(AdjacentNode);

                if(distances[AdjacentNode.ID] === Infinity){
                    queue.push(AdjacentNode)
                    distances[AdjacentNode.ID] = distances[node] + 1;
                    AdjacentNode.parent = node;
                }

                if(AdjacentNode === endNode){
                    queue = [];
                    return;
                }
                if(distances[endNode.ID] !== Infinity){
                    queue = [];
                    return;
                }
            }
        });
    }

    console.log(endNode.parent);
    if(endNode.parent === -1){
        return 0;
    }
    else{
        return 1;
    }
}