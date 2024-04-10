import './Practice.scss'
import Header from '../../components/Header/Header'
import Timer from '../../components/Timer/Timer'

export default function Practice() {
    return (
        <>
            <Header />
            <div className="practice">
                <Timer />
            </div>
        </>
    )
}