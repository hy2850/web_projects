function openSettings(){
    let url = "settings.html";
    let option = "resizeable=no, scrollbars=no, status=no, width=500, height=500";
    let newWin = window.open(url, 'option', option);
    console.log(newWin)
}

function applySettings(time_update){
    init_time = Math.floor(time_update*MINIUTE);
    console.log(`Updated time : ${init_time}`);
    update_time(init_time);
}