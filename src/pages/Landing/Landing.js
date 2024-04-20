import './Landing.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Landing() {
    const navigate = useNavigate()
    const clickHandler = () => {
        navigate('/solve')
    }

    useEffect(() => {
        const move = () => {
            curX += (tgX - curX) / 20;
            curY += (tgY - curY) / 20;
            interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            requestAnimationFrame(move);
        };

        const handleMouseMove = (event) => {
            tgX = event.clientX;
            tgY = event.clientY;
        };

        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;
        const interBubble = document.querySelector('.interactive');

        document.addEventListener('mousemove', handleMouseMove);
        move();

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

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
            <div className="gradient-bg">
                <svg xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>
                <div className="gradients-container">
                    <div className="g1"></div>
                    <div className="g2"></div>
                    <div className="g3"></div>
                    <div className="g4"></div>
                    <div className="g5"></div>
                    <div className="interactive"></div>
                </div>
            </div>
        </>
    )
}