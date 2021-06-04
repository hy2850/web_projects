const MINIUTE = 60;

// FOR TESTING
// let init_time = Math.floor(0.1*MINIUTE) - 4;
///

let init_time = Math.floor(60*MINIUTE) // in seconds

let update_time = (time)=>{
    var min = Math.floor(time/MINIUTE); min = min.toString();
    var sec = time%MINIUTE; sec = sec.toString();
    document.getElementById("timer").innerHTML = min.padStart(2, '0') + ":" + sec.padStart(2, '0');
}        
update_time(init_time); // init

let started = false; // only respond to 'start' when started == false
let refreshIntervalId = null; // setInterval ID for clearing
function countDown(){
    if (started) return;
    else started = true;

    let time = init_time;
    refreshIntervalId = setInterval(() => {
        if(time == 0) {
            beep();
            reset();
            return;
        }
        time--;
        update_time(time);        
    }, 1000);
    
    //alert("End!");
} 

function reset(){
    clearInterval(refreshIntervalId);
    started = false;
    update_time(init_time);
} 

function beep() {
    var audio = new Audio('bell.mp3');
    audio.play();
}