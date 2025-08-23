

console.log('process.env.NODE_ENV:', process.env.NODE_ENV)

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

// demo data:
let users = [
    { _id: 'u101', username: 'bobo', password: 'bobo', fullname: 'Bobo Popo' }
]
export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getEmptyCredentials
}

function login({ username, password }) {
    const user = users.find(user => user.username === username && user.password === password)
    if (!user) return Promise.reject('Invalid login')
    return Promise.resolve(_setLoggedinUser(user))
}

function signup({ username, password, fullname }) {
    if (users.find(user => user.username === username)) return Promise.reject('Username taken')
    const newUser = { _id: Date.now().toString(), username, password, fullname }
    users.push(newUser)
    return Promise.resolve(_setLoggedinUser(newUser))
}


function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}


function getById(userId) {
    const user = users.find(user => user._id === userId)
    return Promise.resolve(user)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}


// Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})



