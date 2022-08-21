class Router {
    constructor(app) {
        this.routes = {
            home: '/index.html',
            login: '/login.html',
            reg: '/reg.html',
        }
        this.currentRoute = window.location.pathname;
        this.root = '/';
        this.app = app;
    }

    // redirect user
    redirect(url) {
        // replace related on host
        // window.location.replace(`${url}`)

        // replace for files and relative links
        window.location.replace(`${window.location.pathname.replace(/(\/)(\w+)?\.?(\w+)?$/g, url)}`)
    }

    // method to check matches of path
    // created because of pathname differences between ordinary html files and server hosting
    getPath() {
        return window.location.pathname.match(/(\/)(\w+)?\.?(\w+)?$/g)[0]
    }

    // checks if user logged or not
    checkLogged(loggedState) {
        if (!loggedState) {
            if (this.getPath() !== this.routes.login && this.getPath() !== this.routes.reg) {
                this.redirect(this.routes.login);
            }
        } else {
            if (this.getPath() === this.routes.login || this.getPath() === this.routes.reg) {
                this.redirect(this.routes.home);
            }
        }
    }
}

export default Router