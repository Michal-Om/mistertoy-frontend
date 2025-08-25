
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service-local.js'

const STORAGE_KEY = 'toyDB'

const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
    'Stuffed',
    'Plastic',
    'Building',
]

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter,
    getToyLabels,
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            let toysToShow = toys

            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toysToShow = toysToShow.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.maxPrice) {
                toysToShow = toysToShow.filter(toy => toy.price <= filterBy.maxPrice)
            }


            if (filterBy.stock && filterBy.stock !== 'all') {
                toysToShow = toysToShow.filter(toy =>
                    filterBy.stock === 'in-stock' ? toy.inStock : !toy.inStock
                )
            }
            console.log('filterBy.labels:', filterBy.labels);
            console.log('toys:', toys);

            if (filterBy.labels?.length) { //optional chining: check length only if filterBy.labels exists. if it's undefined or null falsy but no error
                toysToShow = toysToShow.filter(toy =>
                    filterBy.labels.every(label => toy.labels.includes(label))
                )
            }
            console.log('toys:', toys);
            return toysToShow
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

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: true,
        imgUrl: '',
    }
}

function getRandomToy() {
    return {
        name: 'Toy-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(50, 1000),
        inStock: true,
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', stock: 'all', labels: [] }
}

function getToyLabels() {
    return Promise.resolve(labels)
}

//  test data:
// export const toys = _createToys()
// if (!localStorage.getItem(STORAGE_KEY)) {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(toys))
// }

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toys))
}


