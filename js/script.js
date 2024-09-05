document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(`[JS_Slider]`)
    let blockDots = document.querySelector(`.jobs__dots`)
    let dots = blockDots.children
    let items = slider.children
    let title = document.querySelector(`.jobs__title`)
  

    const updateParentHeight = () => {
        if(items[0]) {
            let position = items[0].getBoundingClientRect();
            slider.style.height = `${position.height * 1.25}px`;
            slider.parentElement.style.height = (position.height * 1.25 + title.offsetHeight + blockDots.offsetHeight + 160) + 'px'
        }
    }
    window.onload = updateParentHeight
    window.addEventListener('resize', updateParentHeight)
    //let mid = parseInt(items.length/2)
    items[2].classList.add(`active`)
    dots[2].classList.add(`active`)
    if(null !== dots && dots.length > 0) {
        for (let itemDot of dots) {
            itemDot.addEventListener('click', () => {
                if(!itemDot.classList.contains('active')) {
                    for (let item of dots) {
                        if(item.classList.contains('active')) {
                            item.classList.remove('active')
                        }
                    }
                    itemDot.classList.add('active');
                    let index = itemDot.dataset.num
                    if(null !== index && items[index]) {
                        //items[index].classList.add(`is-hidden`)
                    }
                }
            })
        }
    }
})