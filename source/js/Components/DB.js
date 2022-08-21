import md5 from "md5";

class DB {
    constructor() {
        this.db = this.getCookie('users');
        this.currentUser = this.getCookie('currentUser');
        this.init()
    }

    getCookie(value) {
        let cookies = document.cookie.split('; ');
        let index = cookies.findIndex((a) => {
            return a.split('=')[0] === value;
        });

        if (index < 0) {
            return null
        }
        return JSON.parse(cookies[index].split('=')[1])
    }

    // set DB if not set
    init() {
        if (this.db === null || this.db === undefined) {
            document.cookie = `users=[]`
        }
    }

    // set updates to DB
    updateDb() {
        document.cookie = `users=${JSON.stringify(this.db)}`;
        return true
    }

    updateCurrentUser() {
        document.cookie = `currentUser=${JSON.stringify(this.currentUser)}`;
        return true
    }

    getCurrentUser() {
        return this.currentUser;
    }

    // search for user ID at DB
    getUserID(login) {
        return this.db.findIndex((a) => {
            return a.login === login;
        });
    }

    // set user to Database
    setUser(formData) {
        return new Promise((res, rej) => {
            if (this.getUserID(formData.login) >= 0) {
                rej(`Пользователь с логином ${formData.login} уже существует`)
            } else {
                this.db = [
                    ...this.db,
                    {
                        id: this.db.length,
                        ...formData,
                        pass: md5(formData.pass)
                    },
                ];
                this.currentUser = {
                    login: formData.login,
                    pass: md5(formData.pass)
                }
                debugger
                this.updateCurrentUser();
                this.updateDb()
                res(true)
            }
        })
    }

    // check passwords and log user to app
    logUser(formData) {
        return new Promise((res, rej) => {
            if (this.getUserID(formData.login) < 0) {
                rej(`Пользователя с логином ${formData.login} не существует`)
            } else {
                if (this.db[this.getUserID(formData.login)].pass === md5(formData.pass)) {
                    this.currentUser = {
                        login: formData.login,
                        pass: md5(formData.pass)
                    }
                    this.updateCurrentUser();
                    res(true)
                } else {
                    rej('Введен неправильный пароль')
                }
            }
        })
    }

    logoutUser() {
        this.currentUser = null;
        this.updateCurrentUser();
    }

    // update tel, email user values from form
    updateUserData(formData) {
        return new Promise((res,rej) => {
            let index = this.getUserID(this.currentUser.login);
            if (index < 0) {
                rej(`Произошла ошибка. Не получается обновить пользователя`)
            }

            let user = {
                ...this.db[index],
                ...formData
            }
            this.db.splice(index, 1, user)
            this.updateDb()
            res(true)
        }) 
    }

    updateUserPass(formData) {
        return new Promise((res, rej) => {
            let index = this.getUserID(this.currentUser.login)
            if (index < 0) {
                rej(`Произошла ошибка. Не получается обновить пользователя`)
            }

            let user = {
                ...this.db[index],
                pass: md5(formData.pass)
            }
            this.db.splice(index, 1, user)
            this.currentUser = {
                login: user.login,
                pass: user.pass
            }
            this.updateCurrentUser()
            this.updateDb()
            res(true)
        })
    }

    // get data of user from DB
    getUserData() {
        const index = this.getUserID(this.currentUser.login)
        if (index < 0) {
            return `Пользователя с логином ${this.currentUser.login} не существует`
        } else {
            if (this.db[index].login === this.currentUser.login && this.db[index].pass === this.currentUser.pass) {
                return {
                    login: this.db[index].login,
                    email: this.db[index].email,
                    tel: this.db[index].tel
                }
            }
        }
    }
}

export default DB