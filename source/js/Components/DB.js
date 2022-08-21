import md5 from "md5";

class DB {
    constructor() {
        this.db = JSON.parse(localStorage.getItem('users'));
        this.init()
    }

    // set DB if not set
    init() {
        if (this.db === null) {
            localStorage.setItem('users', JSON.stringify([]));
        }
    }

    // set updates to DB
    updateDb() {
        localStorage.setItem('users', JSON.stringify(this.db));
        return true
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

                res(this.updateDb())
            }
        })
    }

    // check passwords and log user to app
    logUser(login, pass) {
        return new Promise((res, rej) => {
            if (this.getUserID(login) < 0) {
                rej(`Пользователя с логином ${formData.login} не существует`)
            } else {
                if (this.db[this.getUserID(login)].pass === md5(pass)) {
                    res(true)
                } else {
                    rej('Введен неправильный пароль')
                }
            }
        })
    }

    // get data of user from DB
    getUserData(login) {

        let index = this.db.findIndex((a) => {
            return a.login === login;
        });

        if (index < 0) {
            return `Пользователя с логином ${formData.login} не существует`
        } else {

            return {
                login: this.db[index].login,
                email: this.db[index].email,
                tel: this.db[index].tel
            }
        }
    }
}

export default DB