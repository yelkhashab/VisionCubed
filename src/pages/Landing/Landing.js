import './Landing.scss'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Landing() {
    const navigate = useNavigate()
    const clickHandler = () => {
        navigate('/solve')
    }

    return (
        <>
            <header className="nav">
                <ul className='nav__list'>
                    <li className='nav__item'>
                        <NavLink to='/solve' className='nav__link'>Solve</NavLink>
                    </li>
                    <li className='nav__item'> 
                        <NavLink to='/learn' className='nav__link'>Learn</NavLink>
                    </li>
                    <li className='nav__item'> 
                        <NavLink to='/practice' className='nav__link'>Practice</NavLink>
                    </li>
                </ul>
            </header>
            <main className="landing" onClick={clickHandler}>
                <h1 className="landing__title">Vision<sup>3</sup></h1>
                <h3 className="landing__subtitle">Click Anywhere To Continue</h3>
            </main>
        </>
    )
}