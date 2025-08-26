import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToySort } from '../cmps/ToySort.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service-local.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy, setFilterBy, setSortBy } from '../store/actions/toy.actions.js'


export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    const [toyLabels, setToyLabels] = useState()

    useEffect(() => {
        loadToys()
            .then(() => toyService.getToyLabels())
            .then(labels => setToyLabels(labels))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy, sortBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSort(sortBy) {
        setSortBy(sortBy)
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }


        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    return (
        <div>
            <main>
                <Link to="/toy/edit">Add Toy</Link>
                <button className='add-btn' onClick={onAddToy}>Add Random Toy</button>
                <section className="toy-filter-sort container">
                    <ToyFilter
                        filterBy={filterBy}
                        onSetFilter={onSetFilter}
                        toyLabels={toyLabels}
                    />
                    <ToySort sortBy={sortBy} onSetSort={onSetSort} />
                </section>
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                    />
                    : <div>Loading...</div>
                }


            </main>
        </div>
    )
}

