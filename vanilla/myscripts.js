
var grid = document.getElementById("grid");
var startButton = document.getElementById('StartButton');
var BFSButton = document.getElementById('BFSButton');
var DFSButton = document.getElementById('DFSButton');
var DijkstraButton = document.getElementById('DijkstraButton');
var fastButton = document.getElementById('fastButton');
var mediumButton = document.getElementById('mediumButton');
var slowButton = document.getElementById('slowButton');
var ClearButton = document.getElementById('Clear');
var ClearWalls = document.getElementById('ClearWalls');
var randomMazeButton = document.getElementById('random');
var americaMaze = document.getElementById('america');
var enableStartButton = document.getElementById('startTool');
var enableEndButton = document.getElementById('endTool');
var enableDragWall = false;
var startSelection = false;
var endSelection = false;
var Nodes = [];
var startNode = 949;
var endNode = 988;
var selection = 'BFS';
var speed = 'fast';
var amongusMaze = [];
var america = [1785, 1713, 1640, 1568, 1495, 1423, 132, 1281, 1210, 1139, 1067, 994, 922, 851, 780, 708, 637, 565, 408, 494, 495, 496, 423, 352, 281, 210, 138, 66, 64, 62, 134, 205, 204, 275, 274, 345, 416, 487, 558, 630, 629, 628, 556, 485, 413, 340, 411, 482, 553, 552, 480, 337, 266, 194, 193, 264, 191, 262, 261, 260, 45, 116, 187, 186, 185, 113, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 79, 6, 5, 76, 148, 219, 290, 362, 434, 506, 578, 650, 722, 795, 867, 940, 1012, 1085, 1157, 1230, 1303, 1304, 1377, 1450, 1352, 1523, 1524, 1525, 1526, 1527, 1600, 1601, 1602, 1531, 1604, 1605, 1606, 1679, 1752, 1758, 1687, 1616, 1617, 1546, 1619, 1548, 1549, 1622, 1623, 1696, 1697, 1698, 1626, 1553, 1480, 1481, 1482, 1411, 1484, 1413, 1414, 1487, 1488, 1489, 1562, 1634, 1707, 1636, 1708, 1781, 17, 1825, 1898, 1971, 1900, 1829, 1854, 1927, 2000, 1858, 2002, 2001, 1930];
generateGrid();
document.getElementById(startNode).style.background = 'green';
document.getElementById(endNode).style.background = 'red';
document.addEventListener("mousedown", function(){
    enableDragWall = true;
});
document.addEventListener("mouseup", function(){
    enableDragWall = false;
});



function generateGrid(){

    //current configuration is 72 nodes in a row.
    for(let i =0; i< 2088; i++){
        const node = new Node(i);
        Nodes.push(node);
        document.getElementById('grid').appendChild(node.div);
    }

        
    Nodes.forEach(node => {
        if(node.ID-1 >= 0){
            node.Adjacent.push(iDToNode(node.ID - 1));
        }
        if(node.ID+1 < 2088){
            node.Adjacent.push(iDToNode(node.ID + 1));
        }
        if(node.ID-72 >= 0){
            node.Adjacent.push(iDToNode(node.ID - 72));
        }
        if(node.ID+72 < 2088){
            node.Adjacent.push(iDToNode(node.ID + 72));
        }
    })

    let i = 72;
    while(i <= 2016){
        Nodes[i].Adjacent.shift();
        i += 72;
    }

    i = 71;
    while(i < 2087){
        Nodes[i].Adjacent.splice(1, 1);
        i += 72;
    }
    
}

function generateRandomMaze(){

    while(true){
        var pair1 = new pair(0,28);
        var pair2 = new pair(0,71);
        vertLineArray = [];
        horiLineArray = [];
        generateRandomMaze_rec(pair1, pair2, vertLineArray, horiLineArray, -1,-1);

        if(BFS(Nodes[startNode], Nodes[endNode]) === 1){
            clearNonWalls();
            break;
        }
        clearBoard();
    }
}

function generateRandomMaze_rec(pair1, pair2 ,vertLineArray, horiLineArray, restrictX, restrictY){

    if(pair1.length < 4){
        return;
    }
    if(pair2.length < 4){
        return;
    }

    var loopBuster = 0;
    var vertLine;
    while(true){
        if(loopBuster > 25){
            return;
        }
        else {
            vertLine = pair2.first + Math.floor(Math.random()*pair2.length);
            if(vertLine < pair2.first){
                continue;
                loopBuster++;
            }
            else if(vertLine > pair2.second){
                loopBuster++;
                continue;
            }
            else if(vertLineArray.includes(vertLine -1) || vertLineArray.includes(vertLine +1)){
                loopBuster++;
                continue;
            }
            else if(vertLine === restrictX){
                loopBuster++;
                continue;
            }
            else{
                vertLineArray.push(vertLine);
                break;
            }
        }
    } 

    var horiLine;
    while(true){
        if(loopBuster > 25){
            return;
        }
        else{
            horiLine = pair1.first + Math.floor(Math.random()*pair1.length);
            if(horiLine < pair1.first){
                loopBuster++;
                continue;
            }
            else if(horiLine > pair1.second){
                loopBuster++;
                continue;
            }
            else if(horiLineArray.includes(horiLine -1) || horiLineArray.includes(horiLine +1)){
                loopBuster++;
                continue;
            }
            else if(horiLine === restrictY){
                loopBuster++;
                continue;
            }
            else{
                horiLineArray.push(horiLine);
                break;
            }
        }
    }

    var orientation;
    if(pair1.length > pair2.length){
        orientation = "horizontal";
        console.log(horiLine);
    }
    else{
        orientation = "vertical";
        console.log(vertLine);
    }

    console.log(orientation);


    var array = [];
    if(orientation === "vertical"){
        for(let i = pair1.first; i <= pair1.second; i++){
            for(let j = pair2.first; j <= pair2.second; j++){
                if(coordinateToNode(j, i).x === vertLine){
                    node = coordinateToNode(j,i);
                    if(node.ID === startNode || node.ID === endNode){
                        continue;
                    }
                    array.push(node);
                    node.setDisabled(true);
                }
            }
        }

        while(true){
            rand = Math.floor(Math.random()*array.length);
            if(rand === 0){
                continue;
            }
            else if(rand === array.length-1){
                continue;
            }
            else{
                break;
            }
        }
        array[rand].setDisabled(false);
        newrestrictY = array[rand].y;

        var p1 = pair1;
        var p2Left = new pair(pair2.first, vertLine);
        var p2Right = new pair(vertLine, pair2.second);

        generateRandomMaze_rec(p1, p2Left, vertLineArray, horiLineArray, -1, newrestrictY);
        generateRandomMaze_rec(p1, p2Right, vertLineArray, horiLineArray, -1, newrestrictY);
    }

    else if(orientation === "horizontal"){
        for(let i = pair1.first; i <= pair1.second; i++){
            for(let j = pair2.first; j <= pair2.second; j++){
                if(coordinateToNode(j, i).y === horiLine){
                    node = coordinateToNode(j,i);
                    if(node.ID === startNode || node.ID === endNode){
                        continue;
                    }
                    array.push(node);
                    node.setDisabled(true);
                }
            }
        }

        var rand;
        while(true){
            rand = Math.floor(Math.random()*array.length);
            if(rand === 0){
                continue;
            }
            else if(rand === array.length-1){
                continue;
            }
            else{
                break;
            }
        }
        array[rand].setDisabled(false);
        newrestrictX = array[rand].x;

        var p1Up = new pair(pair1.first, horiLine);
        var p1Down = new pair(horiLine, pair1.second);
        var p2 = pair2;

        generateRandomMaze_rec(p1Up, p2, vertLineArray, horiLineArray, newrestrictX, -1);
        generateRandomMaze_rec(p1Down, p2, vertLineArray, horiLineArray, newrestrictX, -1);
    }

}

function generatePresetMaze(type){
    switch(type){
        case 'america':
            america.forEach(node => {
                Nodes[node].setDisabled(true);
            })
    }
}

function clearBoard(){
    Nodes.forEach(node => {
        node.reset();
    });

    orderDiscovered = [];
    document.getElementById(startNode).style.background = 'green';
    document.getElementById(endNode).style.background = 'red';
    startSelection = false;
}

function clearNonWalls(){
    Nodes.forEach(node => {
        node.resetNonDisabled();
    });

    orderDiscovered = [];
    document.getElementById(startNode).style.background = 'green';
    document.getElementById(endNode).style.background = 'red';
    
}

function clearWalls(){
    Nodes.forEach(node => {
        if(node.isDisabled() === true){
            node.reset();
        }
    })
}

BFSButton.onclick = function() {
    startButton.innerHTML = "Visualize BFS!";
    selection = 'BFS';
}
DFSButton.onclick = function() {
    startButton.innerHTML = "Visualize DFS!";
    selection = 'DFS';
}
DijkstraButton.onclick = function() {
    startButton.innerHTML = "Visualize Dijkstra's!";
    selection = 'Dijkstra';
}
fastButton.onclick = function() {
    speed = 'fast';
}
mediumButton.onclick = function(){
    speed = 'medium';
}
slowButton.onclick = function(){
    speed = 'slow';
}
ClearButton.onclick = function() {
    clearBoard();
}
ClearWalls.onclick = function(){
    clearWalls();
}
randomMazeButton.onclick = function(){
    clearBoard();
    generateRandomMaze();
}
americaMaze.onclick = function(){
    clearBoard();
    generatePresetMaze('america');
}
enableStartButton.onclick = function(){
    if(startSelection === false){
        startSelection = true;
        endSelection = false;
    }
    else{
        startSelection = false;
    }
}
enableEndButton.onclick = function(){
    if(endSelection === false){
        endSelection = true;
        startSelection = false;
    }
    else{
        endSelection = false;
    }
}
startButton.onclick = function Start(){

    if(orderDiscovered.length != 0){
        clearNonWalls();
    }

    switch(selection){
    case "BFS":
        BFS(Nodes[startNode], Nodes[endNode]);
        VisualizeAlgo(orderDiscovered, speed);
        break;
    case  "DFS":
        DFS(Nodes[startNode], Nodes[endNode]);
        VisualizeAlgo(orderDiscovered, speed);
        break;
    case "Dijkstra":
        Dijkstras(Nodes[startNode], Nodes[endNode]);
        VisualizeAlgo(orderDiscovered, speed);
        break;
    }
}

function VisualizeAlgo(list, speed){
    
    var x;
    switch(speed){
        case 'slow':
            x = 20;
            break;
        case 'medium': 
           x = 7;
            break;
        case 'fast':
            x = 2;
            break;
        case 'instant':
            x = .5;
    }

    for(let i = 0; i < list.length; i++){
        setTimeout(() => {
            if(i===1){
                document.getElementById(startNode).style.background = 'green';
                document.getElementById(endNode).style.background = 'red';
            }
            list[i].animate(selection);
        }, x * i);
        
    }

    setTimeout(function() {showPath(Nodes[endNode])}, orderDiscovered.length*speedToint(speed));
}

function showAlgo(list){
    for(let i = 0; i < list.length; i++){
        list[i].instantAnimate(selection);
        showPath(Nodes[endNode]);
    }
}

function showPath(node){
    while(node.parent !== Nodes[startNode]){
        node.parent.div.style.background = 'yellow';
        node = node.parent;
    }

    document.getElementById(startNode).style.background = 'green';
    document.getElementById(endNode).style.background = 'red';
}

function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function speedToint(speed){
    var x;
    switch(speed){
        case 'slow':
            x = 20;
            break;
        case 'medium': 
           x = 7;
            break;
        case 'fast':
            x = 2;
            break;
    }
    return x;
}

