// ---- Variables ----
const MINIUTE = 60;
const SHORT = 0, LONG = 1;
let TIMER_CNT = 1;
let init_time = [Math.floor(15*MINIUTE), Math.floor(50*MINIUTE)]
//let init_time = [Math.floor(3), Math.floor(1)] // DEBUGGING
//let init_break = [Math.floor(1*MINIUTE), Math.floor(10*MINIUTE)]
let init_break = [Math.floor(3), Math.floor(5)]

let didStart = [false, false]; // used in 'start response' and 'pause' function
let refreshInterval = [null, null]; // setInterval ID for clearing
let onBreak = [false, false]; // check break mode : used in countDown, reset

// separate time for each clock (for countDown function)
// invariant : -1 for reset, otherwise for pause
let cur_time = [-1, -1];


// ---- Elements and Event listeners ----
const short_box = document.querySelector('.timerBox[data-short]');
const long_box = document.querySelector('.timerBox[data-long]');

const short_start = short_box.querySelector('.button.start');
const long_start = long_box.querySelector('.button.start');
short_start.onclick = ()=>{countDown(SHORT)};
long_start.onclick = ()=>{countDown(LONG)};

const short_pause = short_box.querySelector('.button.pause');
const long_pause = long_box.querySelector('.button.pause');
short_pause.onclick = ()=>{pause(SHORT)};
long_pause.onclick = ()=>{pause(LONG)};

const short_reset = short_box.querySelector('.button.reset');
const long_reset = long_box.querySelector('.button.reset');
short_reset.onclick = ()=>{onBreak[SHORT] = false; reset(SHORT)};
long_reset.onclick = ()=>{onBreak[LONG] = false; reset(LONG)};

timer = [short_box.querySelector('#timer'), long_box.querySelector('#timer')];


//======================================================
// Main functions
let update_time = (time, clockIdx = SHORT)=>{ 
    let min = Math.floor(time/MINIUTE); min = min.toString();
    let sec = time%MINIUTE; sec = sec.toString();
    timer[clockIdx].innerHTML = min.padStart(2, '0') + ":" + sec.padStart(2, '0');
}        
// init clock
(()=>{
    // localStorage.clear();
    example = {}
    let cache = [localStorage.getItem('short-json'), localStorage.getItem('long-json')]
    for(idx = 0; idx < 2; idx++){
        data = cache[idx];
        if (data){
            data = JSON.parse(data);
            init_time[idx] = data.timer_time;
        } 
    }
    update_time(init_time[SHORT], SHORT);
    update_time(init_time[LONG], LONG);
})();


function countDown(clockIdx = SHORT){
    if (didStart[clockIdx]) return;
    else didStart[clockIdx] = true;

    const check_time = cur_time[clockIdx]; // if -1 (init) : start new timer, else : resume from pause
    if (check_time == -1) cur_time[clockIdx] = onBreak[clockIdx] ? init_break[clockIdx] : init_time[clockIdx];

    refreshInterval[clockIdx] = setInterval(() => {
        if(cur_time[clockIdx] == 0) {
            beep(clockIdx);
            onBreak[clockIdx] = !onBreak[clockIdx]; // toggle break status
            reset(clockIdx);
            if (onBreak[clockIdx]) countDown(clockIdx); // start break
            // else (option.autostart) countDonw(clockIdx); // option : autostart (Inf Loop? Stack?)
            return;
        }
        cur_time[clockIdx]--;
        
        // ===================================================
        // DEBUGGING
        console.log(`${clockIdx} : ${cur_time[clockIdx]}`);
        // ===================================================

        update_time(cur_time[clockIdx], clockIdx);        
    }, 1000);
} 


function reset(clockIdx = SHORT, doPause = false){
    // Stop 'setInterval'
    clearInterval(refreshInterval[clockIdx]);
    refreshInterval[clockIdx] = null;    
    didStart[clockIdx] = false;

    // resetting, not pause
    if(!doPause) {
        cur_time[clockIdx] = -1;
        update_time(onBreak[clockIdx] ? init_break[clockIdx] : init_time[clockIdx], clockIdx);
    }
} 


function beep(clockIdx = SHORT) {
    let audio;
    if (clockIdx == SHORT)
        audio = new Audio('bell.mp3');
    else if (clockIdx == LONG)
        audio = new Audio('bell-long.mp3')

    audio.play(); 
    let vol = 1;
    let fadeout = setInterval(()=>{
          if (vol > 0) {
            vol -= 0.05;
            audio.volume = vol;
          }
          else {
            clearInterval(fadeout);
          }
    }, 300); // ms
}


// keep 'cur_time', resume at that time for later start 
// pause 누르고 start 누르는 경우 - init time으로 시작하지 않도록
function pause(clockIdx = SHORT){
    if(!didStart[clockIdx]) return; 

    reset(clockIdx, true);
}


// Adding keyboard Keydown
document.addEventListener('keydown', (evt)=>{
    // 'Space' toggle
    // Start all timer, if none are started
    // Pause all timer, if any are started
    if(evt.code == "Space"){
        // console.log(evt);

        const anyStarted = didStart.some((e)=>e); // check for 'any' started timer

        // Pause all
        if(anyStarted){
            console.log(`Keydown ${evt.code} : Pause all`);
            didStart.map((startFlag, idx)=>{
                if(startFlag) pause(idx);
            })
        }
        // Start all
        else{
            console.log(`Keydown ${evt.code} : Start all`);

            // Prevent starting background clock
            for(idx = 0; idx < TIMER_CNT; idx++){
                if(!didStart[idx]) countDown(idx);
            }
        }
    }
    // 'R' reset
    else if(evt.code == "KeyR"){
        onBreak = [false, false];
        reset(0); reset(1);
    }
});