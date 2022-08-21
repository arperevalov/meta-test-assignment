class DB {
    constructor() {
        this.db = JSON.parse(localStorage.getItem('users'));
        this.init()
    }

    // set DB if not set
    init() {
        if (this.db === null) {
            localStorage.setItem("users", JSON.stringify([]));
        }
    }

    // set updates to DB
    updateDb() {
        localStorage.setItem("users", JSON.stringify(this.db));
        return true
    }

    // set user to Database
    setUser(formData) {
        return new Promise((res, rej) => {

            let index = this.db.findIndex((a) => {
                return a.login === formData.login;
            });

            if (index >= 0) {
                rej(`user ${formData.login} exists!`)
            } else {
                this.db = [
                    ...this.db,
                    {
                        id: this.db.length,
                        ...formData
                    },
                ];

                res(this.updateDb())
            }
        })
    }

    // check passwords and log user to app
    logUser(login, pass) {
        return new Promise((res, rej) => {
            let index = this.db.findIndex((a) => {
                return a.login === login;
            });

            if (index < 0) {
                rej(`user ${login} doesn't exist!`)
            } else {
                if (this.db[index].pass === pass) {
                    res(true)
                } else {
                    rej('password is incorrect!')
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
            return `user ${login} doesn't exist!`
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