import './Solve.scss'
import Header from '../../components/Header/Header'
import CaptureFace from '../../components/CaptureFace/CaptureFace'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Solve() {
    const [isCapture, setIsCapture] = useState(false)
    const [isSolve, setIsSolve] = useState(false)
    const [cubeState, setCubeState] = useState([])
    const [solution, setSolution] = useState([])

    const handleCubeStateChange = (newCubeState) => {
        setCubeState(newCubeState);
    }

    useEffect(() => {
        if (Object.keys(cubeState).length === 6) {
            const getSolution = async () => {
                const response = await axios.post('http://localhost:8080/api/solve', cubeState)
                setSolution(response.data);
            }
            getSolution();
        }
    }, [cubeState])

    useEffect(() => {
        console.log(solution);
        
    }, [solution])

    return (
        <>
            <Header />
            <div className="solve">
                <div className="solve__title">
                </div>
                <div className="solve__capture">
                    <CaptureFace onCubeStateUpdate={handleCubeStateChange} />
                </div>
            </div>
        </>
    )
}