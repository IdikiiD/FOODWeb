import {triggerModalOpen, triggerModalClose} from "./modal";


function forms (){
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
}
export default forms;