import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service-local.js"
import { Link, useParams, useNavigate } from "react-router-dom"
import { PopUp } from "../cmps/PopUp.jsx"
import { Chat } from "../cmps/Chat.jsx"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [isChatOpen, setIsChatOpen] = useState(false)

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
        <>
            <section className="toy-details">
                <h1>{toy.name}</h1>
                <img src={toy.imgUrl} alt={toy.name} />
                <h2>Price: ${toy.price}</h2>
                <p className="toy-details-stock">{toy.inStock ? 'In stock' : 'Out of stock'}</p>
                <div className="toy-actions">
                    <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
                    <Link to={`/toy`}>Back</Link>
                </div>

                <div className="toy-labels">
                    {toy.labels.map(label => (
                        <span key={label} className="toy-label">{label}</span>
                    ))}
                </div>
                <p className="toy-added">Added on: {new Date(toy.createdAt).toLocaleDateString()}</p>
            </section>

            <PopUp
                header={<h2>Chat About {toy.name}</h2>}
                footer={<h4>{'\u00A9'} 2025 The Toy Company</h4>}
                onClose={() => setIsChatOpen(false)}
                isOpen={isChatOpen}
            >
                <Chat />
            </PopUp>
            {!isChatOpen && (
                <button className="open-chat-btn" onClick={() => setIsChatOpen(true)}>Chat</button>
            )}

        </>

    )
}