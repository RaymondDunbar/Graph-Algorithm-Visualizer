
function coordinateToID(x,y){
    var ret;
    Nodes.forEach(node => {
        if(node.x === x && node.y === y){
            console.log("returning: " + node.ID);
            ret = node.ID;
        }
    });

    return ret;
}

function coordinateToNode(a, b){
    var ret;

    for(let i = 0; i < Nodes.length; i++){
        if(Nodes[i].x === a && Nodes[i].y === b){
            ret = Nodes[i];
            break;
        }
    }
    return ret;
}

function iDToCoordinate(ID){
    var ret = [];
    Nodes.forEach(node => {
        if(node.ID === ID){
            ret.push(node.x);
            ret.push(node.y);
        }
    })

    return ret;
}

function iDToNode(ID){
    var ret;
    Nodes.forEach(node => {
        if(node.ID === ID){
            ret = node;
        }
    })

    return ret;
}

function divToId(div){
    var ret;
    Nodes.forEach(node => {
        console.log(div.id);
        if(node.ID == div.id){
            ret = node.ID;
        }
    });

    return ret;
}

function setDiscovered(node){
    node.discovered = "true";
}

class pair{
    constructor(first, second){
        this.first = first;
        this.second = second;
        this.length = Math.abs(first - second);
    }

    first() {
        return this.first;
    }
    second(){
        return this.second;
    }
}

