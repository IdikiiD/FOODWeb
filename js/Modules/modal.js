function modal(){
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
}
export default modal;