
const electron = require("electron");
const path = require("path")
const BrowserWindow = electron.remote.BrowserWindow


function timer() {
    let timer=new Date();
    let hours=timer.getHours();
    let mint=timer.getMinutes();
    let second=timer.getSeconds();

    if(hours>12){
        hours=hours-12;
    }
    if(hours===0){
        hours=12;
    }
    if(hours<12){
        hours="0"+hours;
    }
    if(mint<10){
        mint='0'+mint
    }
    if(second<10){
        second='0'+second;
    }

     document.getElementById("hour").innerHTML=hours;
    document.getElementById("minte").innerHTML=mint;
     document.getElementById("sec").innerHTML=second;
   
}
timer();

setInterval(timer, 1000)

