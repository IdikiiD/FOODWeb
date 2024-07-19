function slider(){
    let slideIndex = 1;
    let offset = 0;
    const
        slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider__inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    function slidesTotal(slides, total, current, slideIndex) {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`
            current.textContent = `0${slideIndex}`
        } else {
            total.textContent = slides.length
            current.textContent = slideIndex;
        }
    }

    function slideNext(slideIndex, slides) {
        if (slideIndex === slides.length) {
            return 1;
        } else {
            return slideIndex + 1;
        }
    }

    function slideBack(slideIndex, slides) {
        if (slideIndex === 1) {
            return slides.length;
        } else {
            return slideIndex - 1;
        }
    }

    function dotVision(slideIndex, dots) {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function newSlidesField(slidesField, offset) {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    function newOffsetNext(offset, width, slides) {
        if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
            return 0;
        } else {
            return offset + +width.slice(0, width.length - 2);
        }
    }

    function newOffsetPrev(offset, width, slides) {
        if (offset === 0) {
            return offset + +width.slice(0, width.length - 2) * (slides.length - 1)
        } else {
            return offset - +width.slice(0, width.length - 2);
        }
    }


    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';


    slides.forEach(item => {
        item.style.width = width;
    })

    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
        dots = [];


    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `
        if (i === 0) {
            dot.style.opacity = '1';
        }
        indicators.append(dot)
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        offset = newOffsetNext(offset, width, slides);
        newSlidesField(slidesField, offset);
        slideIndex = slideNext(slideIndex, slides);
        slidesTotal(slides, total, current, slideIndex);
        dotVision(slideIndex, dots)
    })

    prev.addEventListener('click', () => {
        offset = newOffsetPrev(offset, width, slides)
        newSlidesField(slidesField, offset);
        slideIndex = slideBack(slideIndex, slides);
        slidesTotal(slides, total, current, slideIndex)
        dotVision(slideIndex, dots)
    })
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = parseInt(slideTo);
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            newSlidesField(slidesField, offset);
            dotVision(slideIndex, dots);
            slidesTotal(slides, total, current, slideIndex);
        });
    });
    setInterval(() => {
        offset = newOffsetNext(offset, width, slides);
        newSlidesField(slidesField, offset);
        slideIndex = slideNext(slideIndex, slides);
        slidesTotal(slides, total, current, slideIndex);
        dotVision(slideIndex, dots);
    }, 3000);
}
export default slider;
