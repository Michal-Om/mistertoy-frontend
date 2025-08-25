import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service-local.js"
import { Link, useParams, useNavigate } from "react-router-dom"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy name : {toy.name}</h1>
            <img src={toy.imgUrl} alt={toy.name} />
            <h5>Price: ${toy.price}</h5>
            <p>{toy.inStock ? 'In stock' : 'Out of stock'}</p>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>
            <p>
                <Link to="/toy/nJ5L4">Next toy</Link>
            </p>
            <div className="toy-labels">
                {toy.labels.map(label => (
                    <span key={label} className="toy-label">{label}</span>
                ))}
            </div>
            <p>Added on: {new Date(toy.createdAt).toLocaleDateString()}</p>

        </section>
    )
}