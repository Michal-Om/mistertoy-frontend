import { Link } from "react-router-dom";

export function ToyPreview({ toy, onRemoveToy }) {

    return (
        <article className="toy-preview">
            <h4 className="toy-title">{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>{toy.inStock ? 'In Stock' : 'Out of Stock'}</p>
            <div className="toy-preview-actions">
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                <Link to={`/toy/${toy._id}`}>Details</Link>
                <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
            </div>

        </article>
    )
}
