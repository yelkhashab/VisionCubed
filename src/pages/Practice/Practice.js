import './Practice.scss'
import Header from '../../components/Header/Header'
import Timer from '../../components/Timer/Timer'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Practice() {
    const [scramble, setScramble] = useState('')

    const generateScramble = async () => {
        const response = await axios.get('http://localhost:8080/api/scramble')
        setScramble(response.data['scramble'])
    }

    return (
        <>
            <section className="practice">
                <Header />
                <div className="practice__container">
                    <div className="practice__top">
                        <div className="practice__title">
                            <h1>Practice</h1>
                            <h3>Generate a scramble and time yourself to get faster</h3>
                            <button className="practice__button" onClick={() => generateScramble()}>
                                Scramble
                            </button>
                        </div>
                        {scramble.length > 0 && (
                            <div className="practice__scramble">
                                <h2 className='practice__scramble-heading'>Scramble:</h2>
                                <ul>
                                    {scramble.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="practice__timer">
                        <Timer />
                    </div>
                </div>
            </section>
        </>
    )
}