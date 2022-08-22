import Input from "./Input";

class Form {
    constructor(element) {
        this.element = element;
        this.inputs = [...this.element.querySelectorAll('input')].map(input => new Input(input))
    }

    async validate() {
        try {
            const errors = [];
            await this.inputs.forEach(input => {                
                input.validateSelf().catch(e => {
                    errors.push(e)
                    throw e
                })
            })
            if (errors.length < 1) {
                return true
            } else {
                throw 'В форме есть ошибки'
            }
        } catch (e) {
            throw e;
        }
    }
};

export default Form;