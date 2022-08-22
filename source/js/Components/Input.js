class Input {

    TYPES = {
        login: 'login',
        tel: 'tel',
        email: 'email',
        text: 'text',
        password: 'password',
        passwordRepeat: 'password-repeat',
    }

    constructor(element) {
        this.element = element;
        this.errorBlock = null;
        this.icon = null;
        this.type = this.element.getAttribute('data-custom-type');
        this.required = this.element.getAttribute('required') === null ? false : true;
        this.addMask();
    }

    generateSuccess() {
        if (!this.element.parentNode.classList.contains('input--success')) {
            this.element.parentNode.classList.add('input--success');
        }
    }

    generateError(text) {
        if (!this.errorBlock) {
            this.errorBlock = document.createElement('div');
            this.errorBlock.classList.add('input__error');
            this.element.parentNode.appendChild(this.errorBlock);
            this.element.parentNode.classList.add('input--error')

            this.errorBlock.textContent = text;
        } else {
            this.errorBlock.textContent = text;
        }
    }

    resetInput() {
        if (this.element.parentNode.classList.contains('input--success')) {
            this.element.parentNode.classList.remove('input--success');
        }
        if (this.errorBlock) {
            if (this.element.parentNode.classList.contains('input--error')) {
                this.element.parentNode.classList.remove('input--error')
            }
            this.element.parentNode.removeChild(this.errorBlock)
            this.errorBlock = null;
        }
    }

    setIcon () {
        if (!this.icon) {
            if (this.type !== this.TYPES.password && this.type !== this.TYPES.passwordRepeat) {
                this.icon = document.createElement('div');
                this.icon.classList.add('input__validation-icon');
                this.element.parentNode.appendChild(this.icon)
            }
        }
    }

    validateSelf(){
        return new Promise ((res, rej) => {
            this.setIcon();
            this.resetInput();

            if (this.required && this.element.value.length === 0 ) {
                let error = 'Поле является обязательным'
                this.generateError(error)
                return rej(error)
            }

            switch (this.type) {
                case this.TYPES.login:
                    if (this.element.value.length < 6) {
                        let error = 'Логин должен быть не менее 6 символов'
                        this.generateError(error)
                        return rej(error)
                    }
    
                    if (this.checkLetters(this.element.value)) {
                        let error = 'Логин должен состоять только из латинских символов, допускается использование цифр'
                        this.generateError(error)
                        return rej(error)
                    }
                    break;
                case this.TYPES.email:
                    if (!this.element.validity.valid) {
                        let error = 'Введите корректный адрес эл.почты'
                        this.generateError(error)
                        return rej(error)
                    }
                    break;

                case this.TYPES.tel:
                    const regex = /^\+(\d) \(\d{3}\) \d{3} \d{2} \d{2}$/g
                    if (this.element.value.length > 0 && !regex.test(this.element.value)) {
                        let error = 'Введите корректный номер телефона'
                        this.generateError(error)
                        return rej(error)
                    }
                    break;

                case this.TYPES.password:
                    if (this.element.value.length < 6) {
                        let error = 'Пароль должен быть не менее 6 символов'
                        this.generateError(error)
                        return rej(error)
                    }
                    break;

                case this.TYPES.passwordRepeat:
                    let firstInput = document.querySelector(`input[data-custom-type=${this.TYPES.password}]`);
                    debugger
                    if (firstInput.value !== this.element.value) {
                        let error = 'Пароли не совпадают'
                        this.generateError(error)
                        return rej(error)
                    }
                    break;
                default:
                    return res(true)
                    break;
            }

            if (this.element.value.length > 0) {
                this.generateSuccess()
            }
            return res(true)
        })
    }

    checkLetters(word){
        let allowedLetters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let wordArray = word.toString().toLowerCase().split('');
        let hasErrors = false;
        
        wordArray.forEach(letter => {
            if (!allowedLetters.includes(letter)) {
                hasErrors = true;
            }
        })

        return hasErrors;
    }

    addMask() {
        if (this.type === this.TYPES.tel) {
            this.element.addEventListener('input', () => {
                this.element.value = this.formatTel(this.element.value)
            })
        }
    }

    formatTel (value) {
        if (!value) return value
        const telNumber = value.replace(/[^\d]/g, '');
        const length = telNumber.length;

        if (length < 2) {
            return telNumber;
        }

        if (length < 5) {
            return `+7 ${telNumber.slice(1, 4)}`
        }

        if (length < 8) {
            return `+7 (${telNumber.slice(1, 4)}) ${telNumber.slice(4, 7)}`
        }
        
        if (length < 10) {
            return `+7 (${telNumber.slice(1, 4)}) ${telNumber.slice(4, 7)} ${telNumber.slice(7, 9)}`
        }
        
        if (length < 13) {
            return `+7 (${telNumber.slice(1, 4)}) ${telNumber.slice(4, 7)} ${telNumber.slice(7, 9)} ${telNumber.slice(9, 11)}`
        }
    }
};

export default Input;