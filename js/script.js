document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById(`poll-form`)
    const modal = document.getElementById(`poll-modal`)
    const closeMOdalButton = modal.querySelector(`.close`);
    const backdrop = document.createElement('DIV')
    backdrop.classList.add('modal-backdrop','fade','show')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if(modal) {
            modal.classList.add(`show`)
            modal.style.display = 'block'
            document.body.classList.add(`modal-open`)
            document.body.appendChild(backdrop)
        }
    });
    closeMOdalButton.addEventListener('click', ()=> {
        modal.classList.remove('show')
        modal.removeAttribute('style')
        document.body.classList.remove(`modal-open`)
        document.body.removeChild(backdrop)
    })

    const anchors = document.querySelectorAll('a[href*="#"]')

    for (let anchor of anchors) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        
        const blockID = anchor.getAttribute('href').substr(1)
        
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
    }
})