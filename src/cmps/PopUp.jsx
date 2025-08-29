import { useState, useEffect } from "react"
export function PopUp({ onClose, isOpen = false, children, cmp }) {

    const [isPopUpOpen, setIsPopUpOpen] = useState(isOpen)

    useEffect(() => {
        setIsPopUpOpen(isOpen)
    }, [isOpen])

    function onClosePopUp() {
        setIsPopUpOpen(false)
        onClose()
    }

    if (!isPopUpOpen) return null

    return (
        <div className="popup-backdrop" onClick={onClosePopUp}>
            <div className="popup-container" onClick={ev => ev.stopPropagation()}>
                <button onClick={onClosePopUp} className="close-btn">X</button>
                <header>
                    {cmp === 'chat' ? <h2>Chat with our team</h2> : <h2>General cmp</h2>}

                </header>
                <main className="popup-main">
                    {children}
                </main>
                <footer>{'\u00A9'} 2025 The Toy Company</footer>
            </div>
        </div>

    )
} 