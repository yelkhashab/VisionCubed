import './Practice.scss'
import Header from '../../components/Header/Header'
import Timer from '../../components/Timer/Timer'

export default function Practice() {
    return (
        <>
        <section className="practice">
            <Header />
            <div className="practice__timer">
                <Timer />
            </div>
        </section>
        </>
    )
}