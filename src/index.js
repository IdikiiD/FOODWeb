

window.addEventListener('DOMContentLoaded', function () {
    // Tabs
    let tabs = document.querySelectorAll('.tabheader__item'), tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function (event) {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer
    const endDate = "2024-05-20";

    function getRemaining(endTime) {
        const t = Date.parse(endDate) - Date.now();
        let days, hours, minutes, seconds;
        if (t <= 0) {
            days = hours = minutes = seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), hours = Math.floor((t / (1000 * 60 * 60)) % 24), minutes = Math.floor((t / 1000 / 60) % 60), seconds = Math.floor((t / 1000) % 60);
        }
        return {
            total: t, days: days, hours: hours, minutes: minutes, seconds: seconds
        };
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector), days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'), minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'), timeInterval = setInterval(updateTime, 1000);

        updateTime();

        function updateTime() {
            const t = getRemaining(endTime);

            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', endDate);

    // Modal
    const modalTrigger = document.querySelectorAll('[data-modal]'), modal = document.querySelector('.modal');

    let timer = 0; // Переменная timer объявлена здесь

    function triggerModalOpen() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = "hidden";
        clearInterval(modalTimeout);
        timer++; // Увеличиваем значение переменной timer
        if (timer === 1) {
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    const modalTimeout = setTimeout(function () {
        triggerModalOpen();
    }, 5000);

    function triggerModalClose() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = "";
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', triggerModalOpen);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === "") {
            triggerModalClose();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            triggerModalClose();
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            triggerModalOpen();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    console.log(timer)


// Class


    class MenuTab {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 17.80;
            this.changeToMDL();
        }

        changeToMDL() {
            this.price = this.price / this.transfer
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
        <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price.toFixed(2)}</span> $/день</div>
                </div>
            </div>
        `;
            this.parent.append(element);
        }


    }

    const getResourse = async (url, data) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status${res.status}`);
        }

        return await res.json();
    };

    getResourse('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuTab(img, altimg, title, descr, price, '.menu .container').render();
            })
        });


//FORM

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/spinner.svg', success: 'Спасибо! Скоро мы с вами свяжемся!', failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    })

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST", headers: {
                'Content-Type': "application/json"
            }, body: data
        });

        return await res.json();
    };

    function bindPostData(item) {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            item.append(statusMessage);
            item.insertAdjacentElement("afterend", statusMessage)
            const formData = new FormData(item);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success)
                    item.reset();
                    statusMessage.remove()

                })
                .catch(() => {
                    showThanksModal(message.failure)
                })
                .finally(() => {
                    item.reset();
                })
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        triggerModalOpen();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML = `
        <div class="modal__content">
           <div class="modal__close" data-close>&times;</div>
           <div class="modal__title">${message}</div>
        </div>
        `;


        document.querySelector('.modal').append(thanksModal)
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            triggerModalClose();
        }, 4000);
    }

    fetch('http://localhost:3000/menu\n')
        .then(data => data.json())
        .then(res => console.log(res));


    //x

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

    //Calculator

    const result = document.querySelector('.calculating__result span');
    let sex, weight, height, age, ratio;
    //SEX
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    //Ratio
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass)
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass)
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass)
            }
        })
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active')
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')


    function calcTotal() {
        if (!sex || !weight || !height || !age || !ratio) {
            result.textContent = "0";
            return;
        }

        if (sex === "female") {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInfo(selector, activeClass) {
        const elements = document.querySelectorAll(selector)
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                elements.forEach(elem => {
                    elem.classList.remove(activeClass)
                    elem.style.backgroundColor = 'none';
                })

                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'))

                }
                console.log(ratio, sex);


                e.target.classList.add(activeClass);
                calcTotal();
            })

        })
    }


    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamInfo(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red'
            } else {
                input.style.border = 'none'
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        })

    }


    getDynamInfo('#height');
    getDynamInfo('#age');
    getDynamInfo('#weight');

    class User {
        constructor(name, age) {
            this.name = name;
            this._age = age;
        }

        #surname = 'Dikii'


    say = () => {
        console.log(`User name: ${this.name} ${this.surname}, age ${this.age}`)
    }

    get age()
    {
        return this._age
    }
    set age(age){
            if(typeof age ==="number" && age > 0 && age < 100){
                this._age = age
            }else{
                console.log('Undefined this')
            }

    }
    get surname(){
            return this.#surname
    }

    set surname(surname){
            this.#surname = surname
    }
    }

    const ivan = new User('Ivan', 20);

    console.log(ivan.surname)
    ivan.surname = 'DIKII'
    ivan.say()
    console.log(ivan.surname)

});


