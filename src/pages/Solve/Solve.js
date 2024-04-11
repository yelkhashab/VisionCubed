import './Solve.scss'
import Header from '../../components/Header/Header'
import CaptureFace from '../../components/CaptureFace/CaptureFace'

export default function Solve() {
    return (
        <>
            <Header />
            <div className="solve">
                <div className="solve__title">
                </div>
                <div className="solve__capture">
                    <CaptureFace />
                </div>
            </div>
        </>
    )
}