
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
    getDefaultSort,
}

function query(filterBy = {}, sortBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            let toysToShow = toys

            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toysToShow = toysToShow.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.stock && filterBy.stock !== 'all') {
                toysToShow = toysToShow.filter(toy =>
                    filterBy.stock === 'in-stock' ? toy.inStock : !toy.inStock
                )
            }
            // console.log('filterBy.labels:', filterBy.labels);
            // console.log('toys:', toys);

            if (filterBy.labels?.length) { //optional chining: check length only if filterBy.labels exists. if it's undefined or null falsy but no error
                toysToShow = toysToShow.filter(toy =>
                    filterBy.labels.every(label => toy.labels.includes(label))
                )
            }
            // console.log('toys:', toys);

            //Sort
            if (sortBy.type) { //if user selected a sort field
                const dir = +sortBy.descending //convert to number and multiply res to change direction
                toysToShow.sort((a, b) => {
                    if (sortBy.type === 'name') {
                        return a.name.localeCompare(b.name) * dir //compares strings alphabetically.
                    } else if (sortBy.type === 'price' || sortBy.type === 'createdAt') {
                        return (a[sortBy.type] - b[sortBy.type]) * dir
                    }
                })

            }
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
    return { txt: '', stock: 'all', labels: [] }
}

function getDefaultSort() {
    return { type: '', descending: 1 }
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
            },
            {
                _id: 't104',
                name: 'Remote Control Car',
                price: 350,
                labels: ['On wheels', 'Battery Powered', 'Plastic'],
                createdAt: Date.now(),
                inStock: true
            },
            {
                _id: 't105',
                name: 'Rubik’s Cube',
                price: 50,
                labels: ['Puzzle'],
                createdAt: Date.now(),
                inStock: true
            },
            {
                _id: 't106',
                name: 'Action Figure',
                price: 180,
                labels: ['Doll', 'Plastic'],
                createdAt: Date.now(),
                inStock: false
            },
            {
                _id: 't107',
                name: 'Play Kitchen Set',
                price: 400,
                labels: ['Plastic', 'Building'],
                createdAt: Date.now(),
                inStock: true
            },
            {
                _id: 't108',
                name: 'Stuffed Bunny',
                price: 150,
                labels: ['Stuffed', 'Baby'],
                createdAt: Date.now(),
                inStock: true
            },
            {
                _id: 't109',
                name: 'Building Blocks',
                price: 220,
                labels: ['Building', 'Plastic'],
                createdAt: Date.now(),
                inStock: true
            },
            {
                _id: 't110',
                name: 'Box Game',
                price: 80,
                labels: ['Box game'],
                createdAt: Date.now(),
                inStock: true
            },
            {
                _id: 't111',
                name: 'Paint Set',
                price: 60,
                labels: ['Art'],
                createdAt: Date.now(),
                inStock: true
            },
            {
                _id: 't112',
                name: 'Outdoor Ball',
                price: 90,
                labels: ['Outdoor', 'On wheels'],
                createdAt: Date.now(),
                inStock: true
            }
        ]
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toys))
}


