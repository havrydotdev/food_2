function modals() {
    function closeModal() {
        modal.style.display = "none";
        this.document.body.style.overflow = '';
    }

    function openModal() {
        modal.style.display = "block";
        this.document.body.style.overflow = 'hidden';
    }

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal();
        });
    });



    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    this.document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.style.display == "block") {
            closeModal();
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    this.window.addEventListener('scroll', showModalByScroll); 
}

module.exports = modals;