import Input from "./Input";

class Form {
    constructor(element) {
        this.element = element;
        this.inputs = [...document.querySelectorAll('input')].map(input => new Input(input))
        this.addListener()
    }
    
    addListener() {
        this.element.addEventListener('submit', (e)=>{
            e.preventDefault();
            if (!this.validate()) {
                console.log('make action')
            }
        })
    }

    validate() {
        let hasErrors;

        this.inputs.forEach(input => {
            input.validateSelf()
            .then( r => {
                debugger
                hasErrors = false
            })
            .catch( e => {
                hasErrors = true
            })
        })

        return hasErrors
    }
};

export default Form;