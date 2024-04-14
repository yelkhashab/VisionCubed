import './Solve.scss'
import Header from '../../components/Header/Header'
import CaptureFace from '../../components/CaptureFace/CaptureFace'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import RoofpigCube from '../../components/RoofpigCube/RoofpigCube.js'

import RubiksCube from '../../components/RubiksCube/RubiksCube.tsx'

export default function Solve() {
    const [isCapture, setIsCapture] = useState(false)
    const [isSolve, setIsSolve] = useState(false)
    const [cubeState, setCubeState] = useState([])
    const [solution, setSolution] = useState([])
    const [inverseSolution, setInverseSolution] = useState("")
    const [myScramble, setMyScramble] = useState("")
    const [net, setNet] = useState([])
    const [stepIndex, setStepIndex] = useState(0);

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
                    setInverseSolution(response.data['inverse'].split(' '));
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
        console.log(inverseSolution);
    }, [solution])

    useEffect(() => {
        if (inverseSolution.length > 0) {
            const step = inverseSolution.length - stepIndex;
            setMyScramble(inverseSolution.slice(0, step).join(' '));
        }
    }, [stepIndex, inverseSolution]);

    useEffect(() => {
        if (isCapture) {
            setIsSolve(false);
            setSolution([]);
            setInverseSolution([]);
            setNet([]);
            setStepIndex(0);
            setMyScramble("");
        }
    }, [isCapture])

    const handleNext = () => {
        if (stepIndex < solution.length) {
            setStepIndex(stepIndex + 1);
        }
    };

    const handlePrev = () => {
        if (stepIndex > 0) {
            setStepIndex(stepIndex - 1);
        }
    };

    return (
        <>
            <Header />
            <div className="solve">
                <div className="solve__left">
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
                                    <li key={index} className={index === stepIndex ? 'current' : ''}>{step}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="solve__right">
                    <RoofpigCube state="scan" />
                    <RubiksCube myScramble={myScramble} />
                    <div className="solve__media">
                        <button onClick={handlePrev} disabled={stepIndex === 0}>Previous</button>
                        <button onClick={handleNext} disabled={stepIndex === solution.length}>Next</button>
                    </div>
                </div>
            </div>
            <Helmet>
                <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
                <script src="roofpig_and_three.min.js"></script>
            </Helmet>
        </>
    )
}