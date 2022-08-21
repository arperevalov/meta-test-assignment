import Router from './Router';
import DB from './DB';
import SystemMessages from './SystemMessages';

class App {
    constructor() {
        this.router = new Router();
        this.db = new DB();
        this.systemMessages = new SystemMessages();
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.checkRouterLogged();
    }

    getCurrentUserFromDb() {
        return this.db.getCurrentUser();
    }

    // sets user to DB
    setUserToDb(formData) {
        this.db.setUser(formData)
            .then(result => {
                this.checkRouterLogged();
                this.redirect(this.router.routes.home)
                return result
            })
            .catch(e => {
                this.systemMessages.setMessage(e)
            })
    }

    // logs user to app and redirect to homepage
    logUser(formData) {
        this.db.logUser(formData)
            .then(result => {
                this.checkRouterLogged();
                this.redirect(this.router.routes.home);
                return result
            })
            .catch(e => {
                this.systemMessages.setMessage(e)
            })
    }

    // logs out user
    logoutUser() {
        this.db.logoutUser();
        this.router.checkLogged();
    }

    updateUserData(formData) {
        this.db.updateUserData(formData)
        .then(result => {
            this.systemMessages.setMessage('Пользователь успешно обновлен!')
            return result
        })
        .catch(e => {
            this.systemMessages.setMessage(e)
        })
    }

    // updatesUserPass
    updateUserPass(formData) {
        this.db.updateUserPass(formData)
        .then(result => {
            // this.cacheUser(login, md5(pass));
            this.systemMessages.setMessage('Пароль успешно обновлен!')
            return result
        })
        .catch(e => {
            this.systemMessages.setMessage(e)
        })
    }

    // gets user data from DB
    async getUserData() {
        let userData = await this.db.getUserData()
        if (userData !== undefined) {
            return userData
        }
    }

    // checks if has currentUser to restore session
    checkRouterLogged() {
        this.router.checkLogged(this.getCurrentUserFromDb())
    }

    // redirect
    redirect(url) {
        this.router.redirect(url)
    }
}

export default App;