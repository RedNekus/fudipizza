document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(`[JS_Slider]`)
    let blockDots = document.querySelector(`.jobs__dots`)
    let dots = blockDots.children
    let items = slider.children
    let title = document.querySelector(`.jobs__title`)
    let activeIndex = 2

    const next = () => {
        if (slider.querySelector(".left-hide")) {
            let leftElem = slider.querySelectorAll(".left-hide")[0];
            leftElem.classList.remove('left-hide')
            leftElem.classList.add('right-hide')
            leftElem.remove();
            slider.appendChild(leftElem);
        }

        if (slider.querySelector(".left")) {
            slider.querySelector(".left").classList.add("left-hide");
            slider.querySelector(".left").classList.remove('left')
        }

        slider.querySelector(".active").classList.add("left");
        slider.querySelector(".active").classList.remove("active--big");
        slider.querySelector(".active").classList.remove("active");
      
        slider.querySelector(".right").classList.add("active");
        slider.querySelector(".right").classList.remove("right");

        slider.querySelectorAll(".right-hide")[0].classList.add("right");
        slider.querySelectorAll(".right-hide")[0].classList.remove("right-hide");
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

        if (slider.querySelector(".right")) {
            slider.querySelector(".right").classList.add("right-hide");
            slider.querySelector(".right").classList.remove('right')
        }

        slider.querySelector(".active").classList.add("right");
        slider.querySelector(".active").classList.remove("active--big");
        slider.querySelector(".active").classList.remove("active");

        slider.querySelector(".left").classList.add("active");
        slider.querySelector(".left").classList.remove("left");

        let leftElems = slider.querySelectorAll(".left-hide");
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
                    let currIndex = itemDot.dataset.num
                    if(null !== currIndex && items[currIndex]) {
                        let offsetIndex = currIndex - activeIndex
                        let offsetIndexAbs = Math.abs(offsetIndex)
                        let fn = () => {}
                        if(offsetIndex > 0) {
                            fn = next;
                        } else {
                            fn = prew;
                        }
                        for(i=0; i < offsetIndexAbs; i++) {
                            setTimeout(fn, 1000*i)
                        }
                        activeIndex = currIndex;
                        setTimeout(() => items[2].classList.add('active--big'), offsetIndexAbs * 1000)
                    }
                }
            })
        }
    }
})