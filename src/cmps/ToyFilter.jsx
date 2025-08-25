import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { toyService } from '../services/toy.service-local.js'

export function ToyFilter({ filterBy, onSetFilter, toyLabels }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debounceOnSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    console.log('filterByToEdit:', filterByToEdit)
    useEffect(() => {
        debounceOnSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'select-multiple') {
            value = [...target.selectedOptions].map(option => option.value)// we use spread to convert selectedOptions into a real array
        } else {
            value = type === 'number' ? +value : value
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    const { txt, maxPrice, stock, labels } = filterByToEdit
    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form className="toy-filter-form">
                <label htmlFor="txt">Name:</label>
                <input type="text"
                    id="txt"
                    name="txt"
                    placeholder="By name"
                    value={txt}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={maxPrice || ''}
                    onChange={handleChange}
                />

                <label htmlFor="stock">Show:</label>
                <select name="stock" id="stock" value={stock} onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="in-stock">In Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                </select>

                {toyLabels &&
                    <select
                        multiple
                        name="labels"
                        className="labels-select"
                        value={labels || []}
                        onChange={handleChange}
                    >
                        <option disabled value="">Labels</option>
                        <>
                            {toyLabels.map(label => (
                                <option key={label} value={label}>
                                    {label}
                                </option>
                            ))

                            }
                        </>
                    </select>
                }
            </form>
            <button
                type="button" className="clear-btn"
                onClick={() => setFilterByToEdit(toyService.getDefaultFilter())}>
                Clear Filters
            </button>
        </section>
    )
}
