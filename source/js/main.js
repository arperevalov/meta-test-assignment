import App from './Components/App';
import index from '../sass/index.sass';
import Form from './Components/Form';

document.addEventListener('DOMContentLoaded', () => {

    let app = new App();

    if (document.getElementById('reg-form')) {
        let form = document.getElementById('reg-form');
        let formData;

        let formComponent = new Form(form)

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            formComponent.validate()
            .then(r => {
                formData = {
                    login: form.login.value,
                    pass: form.passRepeat.value,
                    tel: form.tel.value,
                    email: form.email.value
                }
                app.setUserToDb(formData);
            })
            .catch(e => {
                console.log(e)
            })
        });
    }

    if (document.getElementById('login-form')) {
        let form = document.getElementById('login-form');

        let formComponent = new Form(form)

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            formComponent.validate()
            .then(r => {
                app.logUser({
                    login: form.login.value, 
                    pass: form.pass.value
                });
            })
            .catch(e => {
                console.log(e)
            })
        });
    }

    if (document.getElementById('logout-form')) {
        let form = document.getElementById('logout-form');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            app.logoutUser();
        });
    }

    if (document.getElementById('update-form')) {
        let form = document.getElementById('update-form');
        app.getUserData().then(res => {
            form.querySelector('input#login').value = res.login;
            form.querySelector('input#email').value = res.email;
            form.querySelector('input#tel').value = res.tel;
        });

        let formComponent = new Form(form)

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            formComponent.validate()
            .then(r => {
                app.updateUserData({
                    email: form.email.value,
                    tel: form.tel.value
                })
            })
            .catch(e => {
                console.log(e)
            })
        })
    }

    if (document.getElementById('new-password-form')) {
        let form = document.getElementById('new-password-form');

        let formComponent = new Form(form)

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            formComponent.validate()
            .then(r => {
                app.updateUserPass({pass: form.newPass2.value});
            })
            .catch(e => {
                console.log(e)
            })
        });
    }

    //  js-pass-toggle init
    if ([...document.querySelectorAll('.js-pass-toggle')].length > 0) {
        const inputs = [...document.querySelectorAll('.js-pass-toggle')]

        inputs.forEach(input => {
            const elementInput = input.querySelector('input')
            const elementBtn = input.querySelector('.js-pass-toggle-btn')
            const elementBtnLine = elementBtn.querySelector('.js-pass-toggle-btn-line')

            elementBtn.addEventListener('click', ()=>{
                elementInput.setAttribute('type', elementInput.getAttribute('type') === 'password' ? 'text' : 'password')
                if (elementBtnLine.classList.contains('show')) {
                    elementBtnLine.classList.remove('show')
                } else {
                    elementBtnLine.classList.add('show')
                }
            })
        })
    }
});