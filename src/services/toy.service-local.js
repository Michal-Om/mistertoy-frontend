
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service-local.js'

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
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.maxPrice) {
                toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
            }


            if (filterBy.stock && filterBy.stock !== 'all') {
                toys = toys.filter(toy =>
                    filterBy.stock === 'in-stock' ? toy.inStock : !toy.inStock
                )
            }
            return toys
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
export const toys = _createToys()
if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toys))
}

function _createToys() {
    return [
        {
            _id: 't101',
            name: 'Talking Doll',
            price: 123,
            labels: ['Doll', 'Battery Powered', 'Baby'],
            createdAt: Date.now(),
            inStock: true
        },
        {
            _id: 't102',
            name: 'Teddy Bear',
            price: 200,
            labels: ['Stuffed'],
            createdAt: Date.now(),
            inStock: true
        },
        {
            _id: 't103',
            name: 'LEGO Set',
            price: 450,
            labels: ['Building', 'Plastic'],
            createdAt: Date.now(),
            inStock: false
        }
    ]
}


