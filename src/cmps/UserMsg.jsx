import { useEffect, useRef, useState } from "react"
import { eventBusService } from "../services/event-bus.service.js"

export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            // window.scrollTo({top: 0, behavior: 'smooth'});
            if (timeoutIdRef.current) {
                timeoutIdRef.current = null
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(closeMsg, 3000)
        })
        return unsubscribe
    }, [])


    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return <span></span>

    //test user msg for design:
    // if (!msg) return (
    //     <section className="user-msg success">
    //         <button onClick={() => setMsg(null)}>x</button>
    //         Test message
    //     </section>
    // )

    return (
        <section className={`user-msg ${msg.type}`}>
            <button onClick={closeMsg}>x</button>
            {msg.txt}
        </section>
    )
}
