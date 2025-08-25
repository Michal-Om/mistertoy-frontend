import { UserMsg } from './UserMsg.jsx'
import { useSelector } from 'react-redux'

export function AppFooter() {

    const toysLength = useSelector(storeState => storeState.toyModule.toys.length)

    return (
        <footer className='app-footer'>
            <p className='footer-toy-counter'>
                Currently {toysLength} toys in the shop
            </p>
            <h3>Browse, play, and enjoy our toys collection!</h3>

            <UserMsg />
        </footer>
    )
}
