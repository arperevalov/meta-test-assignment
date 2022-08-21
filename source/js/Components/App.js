import Router from './Router';
import DB from './DB';
import SystemMessages from './SystemMessages';
import md5 from 'md5';

class App {
    constructor() {
        this.router = new Router();
        this.db = new DB();
        this.systemMessages = new SystemMessages();
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.checkRouterLogged();
    }

    // sets user to DB
    setUserToDb(formData) {
        this.db.setUser(formData)
            .then(result => {
                this.cacheUser(formData.login, md5(formData.pass));
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
                this.cacheUser(login, md5(pass));
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
        this.router.checkLogged(this.currentUser)
    }

    // redirects user
    redirect(url) {
        this.router.redirect(url)
    }

    // R E F A C T O R

    // memorize user to so-called-session
    cacheUser(login, pass) {
        this.currentUser = {
            login,
            pass
        };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
    }

    // clears user from so-called-session
    clearUserCache() {
        this.currentUser = null;
        localStorage.removeItem('currentUser')
    }
}

export default App;