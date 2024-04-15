import './Header.scss';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

export default function Header() {

    useEffect(() => {
        const colors = ['red', 'blue', 'green', 'orange', 'lightgrey', 'gold'];
        let currentIndex = 0;

        const logoElement = document.querySelector('.header__logo');
        const changeColor = () => {
            const currentColor = colors[currentIndex];
            logoElement.style.setProperty('--text-shadow-color', currentColor);
            currentIndex = (currentIndex + 1) % colors.length;
        };

        logoElement.addEventListener('mouseover', changeColor);

        return () => {
            logoElement.removeEventListener('mouseover', changeColor);
        };
    }, []);

    return (
        <>
            <section className="header">
                <div className="header__logo">
                    <NavLink to="/" className="header__logo">V<sup>3</sup></NavLink>
                </div>
                <div className="header__nav">
                    <ul className="header__list">
                        <li className="header__item">
                            <NavLink to="/solve" className="header__link">Solve</NavLink>
                        </li>
                        <li className="header__item">
                            <NavLink to="/practice" className="header__link">Practice</NavLink>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
}
