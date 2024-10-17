
//Node Object
class Node{
    constructor(ID){

        this.ID = ID;
        this.CityID;
        this.parent = -1;
        this.discovered = false;
        this.explored = false;
        this.Disabled = false;
        this.div = document.createElement('div');
        this.div.className = "node";
        this.x = Math.floor((this.ID)%72);
        this.y = Math.floor((this.ID)/72);
        this.div.id = ID;
        this.Adjacent = [];
        this.div.addEventListener("mouseover", function(){
            if(enableDragWall === true){
                if(startSelection === false && endSelection === false){
                    if(Nodes[this.id].isDisabled() == false){
                        Nodes[this.id].setDisabled(true);
                    }
                }
            }
        })
        this.div.addEventListener("click", function(){

            if(startSelection === true){
                Nodes[startNode].div.style.background = 'white';
                startNode = Nodes[this.id].ID;
                document.getElementById(startNode).style.background = 'green';
                console.log("Order Discovered length is: " + orderDiscovered.length);
                if(orderDiscovered.length != 0){
                    clearNonWalls();
                    switch(selection){
                        case "BFS":
                            BFS(Nodes[startNode], Nodes[endNode]);
                            showAlgo(orderDiscovered);
                            break;
                        case  "DFS":
                            DFS(Nodes[startNode], Nodes[endNode]);
                            VisualizeAlgo(orderDiscovered, speed);
                            break;
                        case "Dijkstra":
                            Dijkstras(Nodes[startNode], Nodes[endNode]);
                            showAlgo(orderDiscovered);
                            break;
                    }
                }
            }
            else if(endSelection === true){
                Nodes[endNode].div.style.background = 'white';
                endNode = Nodes[this.id].ID;
                document.getElementById(endNode).style.background = 'red';
                if(orderDiscovered.length != 0){
                    clearNonWalls();
                    switch(selection){
                        case "BFS":
                            BFS(Nodes[startNode], Nodes[endNode]);
                            showAlgo(orderDiscovered);
                            break;
                        case  "DFS":
                            DFS(Nodes[startNode], Nodes[endNode]);
                            VisualizeAlgo(orderDiscovered, speed);
                            break;
                        case "Dijkstra":
                            Dijkstras(Nodes[startNode], Nodes[endNode]);
                            showAlgo(orderDiscovered);
                            break;
                    }
                }
            }
            else if(startSelection === false && endSelection === false){
                if(Nodes[this.id].isDisabled() == false){
                    Nodes[this.id].setDisabled(true);
                }
                else{
                    Nodes[this.id].setDisabled(false);
                }
            }

            
        });

        //this.div.textContent = ID;
    }

    printID(){
        console.log(this.ID);
    }
    isDiscovered(){
        if(this.discovered)
            return true;
        else
            return false;
    }
    isExplored(){
        if(this.explored)
            return true;
        else
            return false;
    }
    setDiscovered(bool){
        this.discovered = bool;
    }
    setExplored(bool){
        this.explored = bool;
    }

    animate(selection){
        switch(selection){
            case 'BFS':
                this.div.className = "nodeBeingSearchedBFS";
                this.div.classNae = "node";
                this.div.style.background = 'LightSeaGreen';
                break;
            case 'DFS':
                this.div.className = "nodeBeingSearchedDFS";
                this.div.classNae = "node";
                this.div.style.background = 'grey';
                break;
            case 'Dijkstra':
                this.div.className = "nodeBeingSearchedDijkstra";
                this.div.className = "node";
                this.div.style.background = '#85144b';
                break;
        }
    }

    instantAnimate(selection){
        switch(selection){
            case 'BFS':
                this.div.style.background = 'LightSeaGreen';
                break;
            case 'DFS':
                this.div.style.background = 'grey';
                break;
            case 'Dijkstra':
                this.div.style.background = '#85144b';
                break;
        }
    }
    
    isDisabled(){
        if(this.Disabled)
            return true;
        else
            return false;
    }
    setDisabled(bool){
        this.Disabled = bool;
        if(this.Disabled === true){
            this.div.style.background = '#000036';
            this.div.className = "wall";
            //this.div.style.background = 'Black';
        }
        if(this.Disabled === false){
            this.div.className = "node";
            this.div.style.background = 'white';
            //this.div.style.background = 'white';
        }
    }
    reset(){
        this.parent = -1;
        this.discovered = false;
        this.explored = false;
        this.Disabled = false;
        this.div.className = "node";
        this.x = Math.floor((this.ID)%72);
        this.y = Math.floor((this.ID)/72);
        this.div.style.background = 'white';
    }

    resetNonDisabled(){
        if(this.Disabled === true){
            return;
        }
        else{
            this.parent = -1;
            this.discovered = false;
            this.explored = false;
            this.Disabled = false;
            this.div.className = "node";
            this.x = Math.floor((this.ID)%72);
            this.y = Math.floor((this.ID)/72);
            this.div.style.background = 'white';
        }
    }
}
