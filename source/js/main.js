import App from './Components/App';
import index from '../sass/index.sass'

document.addEventListener('DOMContentLoaded', () => {

    let app = new App();

    if (document.getElementById('reg-form')) {
        let form = document.getElementById('reg-form');
        let formData;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            formData = {
                login: form.login.value,
                pass: form.pass.value,
                tel: form.tel.value,
                email: form.email.value
            }
            app.setUserToDb(formData);
        });
    }

    if (document.getElementById('login-form')) {
        let form = document.getElementById('login-form');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            app.logUser(form.login.value, form.pass.value);
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

    }

    //  js-pass-toggle init
    if ([...document.querySelectorAll('.js-pass-toggle')].length > 0) {
        const inputs = [...document.querySelectorAll('.js-pass-toggle')]

        inputs.forEach(input => {
            const elementInput = input.querySelector('input')
            const elementBtn = input.querySelector('.js-pass-toggle-btn')

            elementBtn.addEventListener('click', ()=>{
                elementInput.setAttribute('type', elementInput.getAttribute('type') === 'password' ? 'text' : 'password')
            })
        })
    }
});