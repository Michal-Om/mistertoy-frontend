
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptytoy,
    getRandomtoy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            const regExp = new RegExp(filterBy.txt, 'i')
            return toys.filter(toy =>
                regExp.test(toy.name) &&
                toy.price <= filterBy.maxPrice
            )
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptytoy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: true,
        imgUrl: '',
    }
}

function getRandomtoy() {
    return {
        name: 'Toy-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}

//  test data:
// storageService.post(STORAGE_KEY, {name: 'Talking Doll', price: 123, labels: ['Doll','Battery Powered','Baby'], createdAt: Date.now(), inStock: true})



