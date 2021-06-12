// Variables
const MINIUTE = 60;
const SHORT = 0, LONG = 1;
let init_time = [Math.floor(60*MINIUTE), Math.floor(60*MINIUTE)]

// Elements and Event listeners 
const short_box = document.querySelector('.timerBox[data-short]');
const long_box = document.querySelector('.timerBox[data-long]');

const short_start = short_box.querySelector('.button.start');
const long_start = long_box.querySelector('.button.start');
short_start.onclick = ()=>{countDown(SHORT)};
long_start.onclick = ()=>{countDown(LONG)};

const short_reset = short_box.querySelector('.button.reset');
const long_reset = long_box.querySelector('.button.reset');
short_reset.onclick = ()=>{reset(SHORT)};
long_reset.onclick = ()=>{reset(LONG)};

//======================================================
// Main functions

timer = [short_box.querySelector('#timer'), long_box.querySelector('#timer')];
let update_time = (time, clockIdx = SHORT)=>{ 
    var min = Math.floor(time/MINIUTE); min = min.toString();
    var sec = time%MINIUTE; sec = sec.toString();
    timer[clockIdx].innerHTML = min.padStart(2, '0') + ":" + sec.padStart(2, '0');
}        
// init clock
update_time(init_time[SHORT], SHORT);
update_time(init_time[LONG], LONG);


let didStart = [false, false]; // only respond to 'start' when started == false
let refreshInterval = [null, null] // setInterval ID for clearing
function countDown(clockIdx = SHORT){
    if (didStart[clockIdx]) return;
    else didStart[clockIdx] = true;

    time = init_time[clockIdx];
    refreshInterval[clockIdx] = setInterval(() => {
        if(time == 0) {
            beep();
            reset(clockIdx);
            return;
        }
        time--;
        update_time(time, clockIdx);        
    }, 1000);
} 

function reset(clockIdx = SHORT){
    clearInterval(refreshInterval[clockIdx]);
    refreshInterval[clockIdx] = null;

    didStart[clockIdx] = false;
    update_time(init_time[clockIdx], clockIdx);
} 

function beep() {
    var audio = new Audio('bell.mp3');
    audio.play();
}