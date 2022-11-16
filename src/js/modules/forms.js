function forms() {
    const forms = document.querySelectorAll(`form`);

    const message = {
        loading: 'img/file/spinner.svg',
        success: 'Ваш заказ принят! Наш оператор свяжется с Вами в скором времени',
        failure: 'Упс, что-то пошло не так!'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                margin-top: 15px;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            const obj = {};
            formData.forEach(function (value, key) {
                obj[key] = value;
            });

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
            <button class="btn btn_dark btn_min" id="close_modal">Окей!</button>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 30000);

        const btnCls = document.getElementById('close_modal');

        function closeThanks() {
            thanksModal.classList.add('show');
            thanksModal.classList.remove('hide');
            closeModal();
        }

        btnCls.addEventListener('click', () => {
            closeThanks();
        });
    }

    this.fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}

module.exports = forms;