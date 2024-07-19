function calculator(){
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
}
export default calculator;