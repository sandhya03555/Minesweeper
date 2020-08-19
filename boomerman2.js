"use strict";
//function startGame()
let score=0;
let root=document.getElementById("root");
let points=document.getElementById("points");
let startGame=document.getElementById("start");
let congo=document.getElementById("congo");
let bombIndexes= Array.from({length:10},()=>Math.floor(Math.random()*81));
console.log("Her",bombIndexes);
let visited=[];
let gameOver=false;

let cnt=0;
for(let i=0;i<9;i++){
    let row=document.createElement("div");
   // row.setAttribute("id", "firstrow");
    
    row.style.height="40px";
    row.setAttribute("class", "rows");
    for(let x=0;x<9;x++){
        let currentindex=i*9+x;
        let cell=document.createElement("div");
        cell.style.height="40px";
        cell.style.width="40px";
        cell.innerHTML="";
        cell.style.display="inline-block";
        cell.style.border="1px solid black";
        cell.setAttribute("id",currentindex);
        
        cell.addEventListener("click",()=>{
            if(!bombIndexes.includes(currentindex)){
                if(!visited.includes(currentindex)&&!gameOver){
                    visited.push(currentindex);
                    score++;
                    points.innerHTML=score;   
                    cell.style.position="relative";
                    cell.style.top="-27px";
                    cell.style.background="green";
                    for(let y=0;y<8;y++){
                        let idx=safe(y,i,x);
                        
                        if(idx[0]>=0 && idx[0]<9 && idx[1]>=0 && idx[1]<9)
                        {
                            let curr_idx=idx[0]*9+idx[1];
                            //console.log(curr_idx);
                            if(bombIndexes.includes(curr_idx))      cnt++;
                        }
                    }
                    //console.log(currentindex);
                    cell.innerHTML=cnt;
                    cnt=0;
                    if(score===72){
                        congo.style.display="block";
                        gameOver=true;
                         startGame.style.display="block";
                    }
                }
            }
            else{
                for(let j=0;j<10;j++){
                    gameOver=true;
                    let bomb=bombIndexes[j];

                    let bombNode=document.getElementById(bomb);       ///get by id  bomb?
                    bombNode.style.background="red";
                    bombNode.style.verticalAlign="27px";
                    bombNode.innerHTML="&#128163";
                }
                startGame.style.display="block";
            }
        })
        row.appendChild(cell);
    }
    root.appendChild(row);
}
startGame.addEventListener("click",()=>{
    location.reload();
})
function safe(y,i,j){
    if(y==0)    return [i-1,j-1];
    if(y==1)    return [i-1,j];
    if(y==2)    return [i-1,j+1];
    if(y==3)    return [i,j+1];
    if(y==4)    return [i+1,j+1];
    if(y==5)    return [i+1,j];
    if(y==6)    return [i+1,j-1];
    if(y==7)    return [i,j-1];
}
// function genrateRandomNumArray(){
//     let set=new set();
//     for(let i=1;set.size!=10;i++){
//         set.add(Math.ceil(81*Math.random()));
//     }
//     return set;
// }