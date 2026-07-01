var orderDiscovered = [];
var orderExplored = [];


function DFS(startNode, endNode){
    
    startNode.setDiscovered(true);
    orderDiscovered.push(startNode);

    for(let i = 0; i < startNode.Adjacent.length; i++){
        if(startNode.Adjacent[i].isDisabled()){
            continue;
        }
        else{
            if(startNode.Adjacent[i] === endNode){
                return -1;
            }
            if(startNode.Adjacent[i].isDiscovered() == false){ ///we can make this go in random directions to be more fun instead of always going to the left then right then up then down
                var x = DFS(startNode.Adjacent[i], endNode);
                if(x === -1) return -1;
            }
        }
    }

    startNode.setExplored(true);
    orderDiscovered.push(startNode);
}