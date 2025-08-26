import { useEffect, useState } from "react"

export function ToySort({ sortBy, onSetSort }) {
    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

    useEffect(() => {
        onSetSort(sortByToEdit)
    }, [sortByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type, checked } = target
        if (type === 'number') value = +value
        if (field === 'descending') value = checked ? -1 : 1
        setSortByToEdit((prevSort) => ({ ...prevSort, [field]: value }))
    }


    return (
        <section className="toy-sort">
            <form>
                <select name="type" value={sortByToEdit.type} onChange={handleChange}>
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Date</option>
                </select>

                <label>
                    <input
                        type="checkbox"
                        name="descending"
                        checked={sortByToEdit.descending < 0}
                        onChange={handleChange}
                    />
                    Descending
                </label>
            </form>
        </section>

    )
}


