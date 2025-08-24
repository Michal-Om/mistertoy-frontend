import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {

    return (
        <article className="toy-preview">
            <h4 className="toy-title">{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>{toy.inStock ? 'In Stock' : 'Out of Stock'}</p>
            <div className="toy-actions">
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
                <Link to={`/toy/${toy._id}`}>Details</Link>
            </div>

        </article>
    )
}
