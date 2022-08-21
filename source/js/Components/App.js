import Router from './Router';
import DB from './DB';
import SystemMessages from './SystemMessages';

class App {
    constructor() {
        this.router = new Router();
        this.db = new DB();
        this.systemMessages = new SystemMessages();
        this.logged = JSON.parse(localStorage.getItem('logged'));
        this.checkRouterLogged();
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    }

    // sets user to DB
    setUserToDb(formData) {
        this.db.setUser(formData)
            .then(result => {
                this.toggleLogged();
                this.cacheUser(formData.login);
                this.checkRouterLogged();
                this.redirect(this.router.routes.home)
                return result
            })
            .catch(e => {
                this.systemMessages.setMessage(e)
            })
    }

    // logs user to app and redirect to homepage
    logUser(login, pass) {
        this.db.logUser(login, pass)
            .then(result => {
                this.toggleLogged();
                this.cacheUser(login);
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
        this.toggleLogged();
        this.clearUserCache();
        this.router.checkLogged();
    }

    // gets user data
    async getUserData() {
        let userData = await this.db.getUserData(this.currentUser)
        if (userData !== undefined) {
            return userData
        }
    }

    // checks if current user logged
    checkRouterLogged() {
        this.router.checkLogged(this.logged)
    }

    // redirects user
    redirect(url) {
        this.router.redirect(url)
    }

    // R E F A C T O R

    // replace logged check
    // instead give user JSON Token
    toggleLogged() {
        this.logged = !this.logged
        localStorage.setItem('logged', JSON.stringify(this.logged))
    }

    // memorize user to so-called-session
    cacheUser(login) {
        this.currentUser = login;
        localStorage.setItem('currentUser', JSON.stringify(login))
    }

    // clears user from so-called-session
    clearUserCache() {
        this.currentUser = null;
        localStorage.removeItem('currentUser')
    }
}

export default App;