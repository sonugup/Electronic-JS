let [sec, min, hour] = [0, 0, 0];

    let disTime = document.getElementById("playTime");

    let times=null;
    function stopwatching() {

        sec++;
        if(sec ===60 ){
            sec=0;
            min++;
            if(min===60){
                min=0;
                hour++
            }
        
        }

        let h=hour <10 ? "0"+hour : hour;
        let m=min <10 ? "0"+min :min;
        let s=sec <10 ? "0"+sec :sec;

        disTime.innerHTML = h+":" +m+":"+s;
    }

    function startWatch() {
        if(times !== null){
            clearInterval(times)
        }
      times=  setInterval(stopwatching, 1000);
    }

    function stopWatch(){
        clearInterval(times)
    }
    
    function resetWatch(){
        clearInterval(times);
        [sec, min, hour] = [0, 0, 0];
        disTime.innerHTML="00:00:00"
    }
