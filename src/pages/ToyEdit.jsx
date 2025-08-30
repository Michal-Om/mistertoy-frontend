import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service-local.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { Link, useNavigate, useParams } from "react-router-dom"


export function ToyEdit() {

    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [labels, setLabels] = useState([])

    const { toyId } = useParams()

    useEffect(() => {
        loadToy()
        loadToyLabels()
    }, [])

    // useEffect(() => {
    //     if (toyId) loadToy()
    // }, [toyId])


    function loadToy() {
        if (!toyId) return
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
                showErrorMsg('Toy not found!')
            })
    }

    function loadToyLabels() { //later move to store
        toyService.getToyLabels()
            .then(setLabels)
            .catch(err => {
                console.log('Problem editing toy:', err)
                navigate('/toy')
                showErrorMsg('Toy not found!')

            })
    }

    function handleChange({ target }) {
        const { value, type, name, checked } = target
        let fieldValue = value
        if (type === 'checkbox') {
            fieldValue = checked
        } else if (type === 'number') {
            fieldValue = +value
        } else if (type === 'select-multiple') {
            fieldValue = [...target.selectedOptions].map(option => option.value)
        }
        setToyToEdit((prevToy) => ({ ...prevToy, [name]: fieldValue }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        const toyToSave = { ...toyToEdit, price: toyToEdit.price || 250 }
        saveToy(toyToSave)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Had issues in toy details')
            })
    }

    return (
        <>
            <section className="toy-edit">
                <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

                <form onSubmit={onSaveToy} >
                    <div className="form-group">
                        <label htmlFor="name">Name : </label>
                        <input type="text"
                            name="name"
                            id="name"
                            placeholder="Enter a toy name..."
                            value={toyToEdit.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price : </label>
                        <input type="number"
                            name="price"
                            id="price"
                            placeholder="Enter price"
                            value={toyToEdit.price || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="labels">Labels:</label>
                        <select
                            id="labels"
                            name="labels"
                            multiple
                            value={toyToEdit.labels}
                            onChange={handleChange}
                        >
                            {labels.map(label => (
                                <option key={label} value={label}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                    {toyToEdit._id && (
                        <div className="form-group stock">
                            <label>
                                <input
                                    type="checkbox"
                                    name="inStock"
                                    checked={toyToEdit.inStock}
                                    onChange={handleChange}
                                />
                                In Stock
                            </label>
                        </div>
                    )}
                    <div className="toy-edit-btns">
                        <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                        <Link to="/toy">Cancel</Link>
                    </div>
                </form>
            </section>
        </>
    )
}

