

function triggerModalOpen(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = "hidden";
    console.log(modalTimerId)
    if(modalTimerId) {
        clearInterval(modalTimerId);
    }

}

function triggerModalClose(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector,modalTimerId){
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    let timer = 0; // Переменная timer объявлена здесь



    modalTrigger.forEach(btn => {
        btn.addEventListener('click',() => triggerModalOpen(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === "") {
            triggerModalClose(modalSelector, modalTimerId);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            triggerModalClose(modalSelector, modalTimerId);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            triggerModalOpen(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    console.log(timer)
}
export default modal;
export {triggerModalClose};
export {triggerModalOpen};