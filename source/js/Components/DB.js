import md5 from "md5";

class DB {
    constructor() {
        if (!!window.chrome) {
            this.db = JSON.parse(localStorage.getItem('users'));
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        } else {
            this.db = this.getCookie('users');
            this.currentUser = this.getCookie('currentUser');
        }

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
            this.db = [];
            
            if (!!window.chrome) {
                localStorage.setItem('users', JSON.stringify(this.db));
            } else {
                document.cookie = `users=${JSON.stringify(this.db)}`;
            }
        }
    }

    // set updates to DB
    updateDb() {
        if (!!window.chrome) {
            localStorage.setItem('users', JSON.stringify(this.db));
        } else {
            document.cookie = `users=${JSON.stringify(this.db)}`;
        }
        return true
    }

    updateCurrentUser() {
        if (!!window.chrome) {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        } else {
            document.cookie = `currentUser=${JSON.stringify(this.currentUser)}`;
        }
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
    async setUser(formData) {
        try {
            if (this.getUserID(formData.login) >= 0) {
                throw `Пользователь с логином ${formData.login} уже существует`
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
                this.updateCurrentUser();
                this.updateDb()
                return true
            }
        } catch (e) {
            throw e
        }
    }

    // check passwords and log user to app
    async logUser(formData) {
        try {
            if (this.getUserID(formData.login) < 0) {
                throw `Пользователя с логином ${formData.login} не существует`
            } else {
                if (this.db[this.getUserID(formData.login)].pass === md5(formData.pass)) {
                    this.currentUser = {
                        login: formData.login,
                        pass: md5(formData.pass)
                    }
                    this.updateCurrentUser();
                    return true
                } else {
                    throw 'Введен неправильный пароль'
                }
            }
        } catch (e) {
            throw e
        }
    }

    logoutUser() {
        this.currentUser = null;
        this.updateCurrentUser();
    }

    // update tel, email user values from form
    async updateUserData(formData) {
        try {
            let index = this.getUserID(this.currentUser.login);

            if (index < 0) {
                throw `Произошла ошибка. Не получается обновить пользователя`
            }

            let user = {
                ...this.db[index],
                ...formData
            }
            this.db.splice(index, 1, user)
            this.updateDb()

            return true
        } catch (e) {
            throw e
        }
    }

    async updateUserPass(formData) {
        try {
            let index = this.getUserID(this.currentUser.login)
            if (index < 0) {
                throw `Произошла ошибка. Не получается обновить пользователя`
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
            
            return true
        } catch (e) {
            throw e
        }
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