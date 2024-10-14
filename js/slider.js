document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector(`.jobs__title`)
    const slider = document.querySelector(`[JS_Slider]`)
    const blockDots = document.querySelector(`.jobs__dots`)
    const mobSlider = document.querySelector(`[JS_MobileSlider]`)
    const mobDotsBlock = document.querySelector(`.about__dots`)
    let dots = null
    if(blockDots) {
        dots = blockDots.children
    }
    let items = slider.children
    if(slider.children.length > 3) {
        slider.classList.add('slider')
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
            if(window.innerWidth >= 768) {
                let offsetH = window.innerWidth >= 1200? 160 : 40;
                console.log(offsetH);
                if(items[0]) {
                    let position = items[0].getBoundingClientRect();
                    slider.style.height = `${position.height * 1.25}px`;
                    if(blockDots) {
                        slider.parentElement.style.height = (position.height * 1.25 + title.offsetHeight + blockDots.offsetHeight + offsetH) + 'px'
                    }
                }
            } else {
                console.log('delete styles')
                slider.removeAttribute('style')
                slider.parentElement.removeAttribute('style')
            }
        }
    
        if(window.innerWidth >= 768) {
            window.onload = updateParentHeight
        }
        window.addEventListener('resize', () => {
            console.log('resize!!')
            updateParentHeight()
        })
        items[2].classList.add(`active`)
    
        if(null !== dots && dots.length > 3) {
            dots[2].classList.add(`active`)
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
    }

    /* Мобильный слайдер */
    if( null !== mobSlider && mobSlider.children.length) {
        let offset = (mobSlider.scrollWidth - mobSlider.offsetWidth*(mobSlider.children.length)) / (mobSlider.children.length - 1)
        let itemWidth = mobSlider.offsetWidth + offset

        mobSlider.addEventListener('touchstart', (e) => {
            let touchObj = e.changedTouches[0]
            startX = touchObj.pageX
            e.preventDefault()
        }, false)

        mobSlider.addEventListener('touchend', (e) => {
            let touchObj = e.changedTouches[0]
            let activeIndex = parseInt(mobDotsBlock.querySelector('.active')?.dataset.num)
            let mod = Math.abs(startX - touchObj.pageX)
            if(mod > 80) {
                if(startX > touchObj.pageX) {
                    if(activeIndex >= 1) {
                        mobDotsBlock.children[activeIndex - 1].click()
                    }
                } else {
                    if(activeIndex < mobDotsBlock.children.length - 1) {
                        mobDotsBlock.children[activeIndex + 1].click()
                    }
                }
            }
            e.preventDefault()
        }, false)

        if(null !== mobDotsBlock && mobDotsBlock.children) {
            mobDotsBlock.children[0].classList.add('active')
            for (let mDot of mobDotsBlock.children) {
                mDot.addEventListener('click', () => {
                    if(!mDot.classList.contains('active')) {
                        let currIndex = mDot.dataset.num
                        Object.values(mobDotsBlock.children)
                            .filter(item => item.classList.contains('active'))
                            .map(item => item.classList.remove('active'))
                        mDot.classList.add('active');
                        mobSlider.style.left = -(currIndex * itemWidth) + 'px'
                    }
                })
            } 
        }
    }
})