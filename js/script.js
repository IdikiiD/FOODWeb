window.addEventListener('DOMContentLoaded', function() {
    // Tabs
    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
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
    const endDate = "2034-12-13";

    function getRemaining(endTime) {
        const t = Date.parse(endDate) - Date.now(),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateTime, 1000);

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
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

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
        if (e.target === modal || e.target.getAttribute('data-close') ==="") {
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

    new MenuTab(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        100,
        '.menu .container'
    ).render();

    new MenuTab(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        150,
        '.menu .container'
    ).render();

    new MenuTab(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        80,
        '.menu .container'
    ).render();


//FORM

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    })

    function postData(item) {
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

            const request = new XMLHttpRequest();
            request.open('POST', 'serever.php')

            request.setRequestHeader('Content-Type', "application/json");
            const formData = new FormData(item);

            const obj = {};
            formData.forEach(function (value, key) {
                obj[key] = value
            })

            const json = JSON.stringify(obj)


            request.send(json)

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success)
                    item.reset();
                        statusMessage.remove()
                } else {
                    showThanksModal(message.failure)
                }
            })
        })
    }

    function showThanksModal(message){
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
        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            triggerModalClose();
        },4000);
    }

});


