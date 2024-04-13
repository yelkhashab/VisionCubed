import './Header.scss';
import { NavLink } from 'react-router-dom';

export default function Header() {

    document.addEventListener('DOMContentLoaded', function() {
        document.querySelector('.header__logo').addEventListener('mouseover', function() {
            var colors = ['red', 'blue', 'green', 'orange', 'gold' ];
            var randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.style.setProperty('--text-shadow-color', randomColor);
          });
    });

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
                            <NavLink to="/learn" className="header__link">Learn</NavLink>
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
