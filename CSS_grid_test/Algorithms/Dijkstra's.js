var orderDiscovered = [];

function Dijkstras(startNode, endNode){

    var distances = [];

    for(let i = 0; i < Nodes.length; i++){
        distances.push(Infinity);
    }

    startNode.setDiscovered(true);
    orderDiscovered.push(startNode);
    distances[startNode.ID] = 0;

    var node;
    while(true){
        var temp = -1;
        orderDiscovered.forEach(n => {
            if(n.isExplored() === false){
                if(temp === -1 || distances[n.ID] < temp){
                    temp = distances[n.ID];
                    node = n;
                }
            }
        });

        if(temp === -1){
            break;
        }
        if(node === endNode){
            break;
        }
        node.setExplored(true);


        node.Adjacent.forEach(adjacentNode => {
            if(adjacentNode.isDisabled() === false){
                if(adjacentNode.isDiscovered() === false){
                    adjacentNode.parent = node;
                    adjacentNode.setDiscovered(true);
                    orderDiscovered.push(adjacentNode);
                }
                distances[adjacentNode.ID] = distances[node] + 1;
            }
        });
    }
    

}
