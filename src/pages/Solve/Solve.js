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
    const [net, setNet] = useState([])

    const handleCubeStateChange = (newCubeState) => {
        setCubeState(newCubeState);
    }

    useEffect(() => {
        if (Object.keys(cubeState).length === 6) {
            const getSolution = async () => {
                try {
                    const response = await axios.post('http://localhost:8080/api/solve', cubeState)
                    console.log(response.data);
                    setSolution(response.data['solution'].split(' '));
                    setNet(response.data['net']);
                    setIsCapture(false);
                    setIsSolve(true);
                } catch (error) {
                    console.log(error);
                    setIsCapture(false);
                }
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
                    <h1>Solve</h1>
                    <h2>Scan your cube and get the solution</h2>
                </div>
                <div className="solve__button-container">
                    <button className="solve__button" onClick={() => setIsCapture(!isCapture)}>
                        {isCapture ? 'Stop' : 'Start'}
                    </button>
                </div>
                {isCapture && (
                    <div className="solve__capture">
                        <h3>Please align your cube with the grid</h3>
                        <CaptureFace onCubeStateUpdate={handleCubeStateChange} />
                    </div>
                )}
                {isSolve && (
                    <div className="solve__solution">
                        <h2 className='solve__solution-heading'>Solution:</h2>
                        <ul>
                            {solution.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}