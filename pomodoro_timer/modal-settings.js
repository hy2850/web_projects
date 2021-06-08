function applySettings(time_update){
    init_time = Math.floor(time_update*MINIUTE);
    console.log(`Updated time : ${init_time}`);
    update_time(init_time);

    // -- Add extra setting options --
}

function saveSettings(){
    let formData = new FormData(document.querySelector('.settings form'));
    let time_update = formData.get("time_min");

    // -- Add extra setting options --

    alert("New settings saved");
    applySettings(time_update);
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