function applySettings(time_update){
    let t = 0;
    for(const elem of time_update){
        if (elem.type == 'min')
            t += parseInt(elem.val, 10) * MINIUTE;
        else if (elem.type == 'sec')
            t += parseInt(elem.val, 10);
    }
    init_time = t;
    console.log(`Updated time : ${init_time}`);
    update_time(init_time);

    // -- Add extra setting options --
}

function isTimeValid(id, valstr){
    let t = parseInt(valstr, 10);
    if (id == 'min' && (t < 0 || t >= 100)){
        alert("Miniute must be between 0 and 99");
        return false;
    }
    else if (id == 'sec' && (t < 0 || t > 60)){
        alert("Second must be between 0 and 60");
        return false;
    }
    return true;
}

function saveSettings(){
    let formData = document.querySelectorAll('.settings-input-time input');
    let time_info = [];
    
    // Validity check
    for(const inp of formData){
        if(!isTimeValid(inp.id, inp.value))
            return;
    }

    formData.forEach(inp => {
        time_info.push({
            type: inp.id,
            val: inp.value
        });
    })

    // -- Add extra setting options --

    alert("New settings saved");
    applySettings(time_info);
}

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay');


// Add open/close modal event listener to all designated open/close buttons
// In case there are multiple buttons to open/close the modal
openModalButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        console.log(button.dataset);
        const modal = document.querySelector(button.dataset.modalTarget) // #modal
        openModal(modal)
    })
})
closeModalButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        const modal = button.closest('.modal')  // find closest parent with class 'modal'
        closeModal(modal)
    })
})

overlay.addEventListener('click', ()=>{
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    })
})

// Simply modify class of the target element to implement open/close
function openModal(modal){
    if(modal == null) return;
    modal.classList.add('active')
    overlay.classList.add('active')
}
function closeModal(modal){
    if(modal == null) return;
    modal.classList.remove('active')
    overlay.classList.remove('active')
}