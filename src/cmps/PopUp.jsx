import { useState, useEffect } from "react"
export function PopUp({ onClose, isOpen = false, children, header, footer }) {

    const [isPopUpOpen, setIsPopUpOpen] = useState(isOpen)

    useEffect(() => {
        setIsPopUpOpen(isOpen)
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) return
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen])

    function onClosePopUp() {
        setIsPopUpOpen(false)
        onClose()
    }

    function handleKeyDown(event) {
        if (event.key === 'Escape') {
            console.log('Escape clicked!')
            onClosePopUp()
        }
    }

    if (!isPopUpOpen) return null

    return (
        <div className="popup-backdrop" onClick={onClosePopUp}>
            <div className="popup-container" onClick={ev => ev.stopPropagation()}>
                <button onClick={onClosePopUp} className="close-btn">X</button>
                <header>{header}</header>
                <main className="popup-main">
                    {children}
                </main>
                <footer>{footer}</footer>
            </div>
        </div>

    )
} 