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
        this.copy = null;
        this.type = this.element.getAttribute('data-custom-type');
        this.required = this.element.getAttribute('required') === null ? false : true;
        // this.addListener();
        // this.createMaskCopy();
    }

    // createMaskCopy() {
    //     this.copy = this.element.cloneNode();
    //     this.copy.id = this.element.id + 'Copy';
    //     this.copy.setAttribute('type', 'text');
    //     this.element.parentNode.appendChild(this.copy);
    // }

    // addListener() {
    //     this.element.addEventListener('input', () => {
    //         this.copy.value = this.element.value
    //         this.copy.value = this.copy.value.replace(/\D/g, '')
    //         if (this.copy.value.length === 2) {
    //             this.element.value = this.copy.value + ' '
    //         } 
    //         if (this.copy.value.length === 4) {
    //             this.element.value = '+7' + ' (' + this.copy.value.slice(1, 4) + ') '
    //         }
    //         if (this.copy.value.length === 7) {
    //             this.element.value = '+7' + ' (' + this.copy.value.slice(1, 4) + ') ' + this.copy.value.slice(4, 7 )+ ' '
    //         }
    //         if (this.copy.value.length === 9) {
    //             this.element.value = '+7' + ' (' + this.copy.value.slice(1, 4) + ') ' + this.copy.value.slice(4, 7 )+ ' ' + this.copy.value.slice(7, 9 )+ ' '
    //         }
    //     })

    // }

    generateError(text) {
        this.errorBlock = document.createElement('div');
        this.errorBlock.classList.add('input__error');

        this.element.parentNode.appendChild(this.errorBlock);

        this.errorBlock.textContent = text;
    }

    validateSelf(){
        return new Promise ((res, rej) => {
            if (this.required && this.element.value.length <= 0) {

                rej('Поле является обязательным')
            }

            switch (this.type) {
                case this.TYPES.login:
                    if (this.element.value.length < 6) {
                        rej('Логин должен быть больше 6 символов')
                    }
    
                    if (this.checkLetters(this.element.value)) {
                        rej('Логин должен состоять только из латинских символов, допускается использование цифр')
                    }

                    res(true)
                    break;
                default:
                    res(true)
                    break;
            }
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
};

export default Input;