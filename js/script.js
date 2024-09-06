document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(`[JS_Slider]`)
    let blockDots = document.querySelector(`.jobs__dots`)
    let dots = blockDots.children
    let items = slider.children
    let title = document.querySelector(`.jobs__title`)

    const next = () => {
        if (document.querySelector(".left-hide")) {
            let leftElem =  document.querySelectorAll(".left-hide")[0];
            leftElem.classList.remove('left-hide')
            leftElem.classList.add('right-hide')
            leftElem.remove();
            slider.appendChild(leftElem);
        }

        if (document.querySelector(".left")) {
            document.querySelector(".left").classList.add("left-hide");
            document.querySelector(".left").classList.remove('left')
        }

        document.querySelector(".active").classList.add("left");
        document.querySelector(".active").classList.remove("active");
      
        document.querySelector(".right").classList.add("active");
        document.querySelector(".right").classList.remove("right");

        document.querySelectorAll(".right-hide")[0].classList.add("right");
        document.querySelectorAll(".right-hide")[0].classList.remove("right-hide");
    }

    const prew = () => {
        if (document.querySelector(".right-hide")) {
            let rightElems =  document.querySelectorAll(".right-hide");
            let rightElem = rightElems[rightElems.length - 1]
            rightElem.classList.remove('right-hide')
            rightElem.classList.add('left-hide')
            rightElem.remove();
            slider.insertBefore(rightElem, slider.firstChild);
        }

        if (document.querySelector(".right")) {
            document.querySelector(".right").classList.add("right-hide");
            document.querySelector(".right").classList.remove('right')
        }

        document.querySelector(".active").classList.add("right");
        document.querySelector(".active").classList.remove("active");
        document.querySelector(".active").classList.remove("active--big");
      
        document.querySelector(".left").classList.add("active");
        document.querySelector(".left").classList.remove("left");

        let leftElems = document.querySelectorAll(".left-hide");
        leftElems[leftElems.length- 1].classList.add("left");
        leftElems[leftElems.length- 1].classList.remove("left-hide");
    }
  
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
                    //next();
                    prew();
                    setTimeout(prew, 1000);
                    setTimeout(() => items[2].classList.add('active--big'), 2000)
                }
            })
        }
    }
})