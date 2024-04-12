import './Solve.scss'
import Header from '../../components/Header/Header'
import CaptureFace from '../../components/CaptureFace/CaptureFace'
import { useEffect, useState } from 'react'

export default function Solve() {
    const [isCapture, setIsCapture] = useState(false)
    const [isSolve, setIsSolve] = useState(false)
    const [cubeState, setCubeState] = useState([])

    const handleCubeStateChange = (newCubeState) => {
        setCubeState(newCubeState);
    }

    return (
        <>
            <Header />
            <div className="solve">
                <div className="solve__title">
                </div>
                <div className="solve__capture">
                    <CaptureFace onCubeStateUpdate={handleCubeStateChange}/>
                </div>
            </div>
        </>
    )
}