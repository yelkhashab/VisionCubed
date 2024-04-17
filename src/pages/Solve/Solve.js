import './Solve.scss'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import Header from '../../components/Header/Header'
import CaptureFace from '../../components/CaptureFace/CaptureFace'
import RubiksNet from '../../components/RubiksNet/RubiksNet.tsx'
import AnimCube3 from '../../components/AnimCube3/AnimCube3.js'

export default function Solve() {
    const [isCapture, setIsCapture] = useState(JSON.parse(sessionStorage.getItem('isCapture')) || false);
    const [isSolve, setIsSolve] = useState(JSON.parse(sessionStorage.getItem('isSolve')) || false);
    const [cubeState, setCubeState] = useState(JSON.parse(sessionStorage.getItem('cubeState')) || []);
    const [solution, setSolution] = useState(JSON.parse(sessionStorage.getItem('solution')) || []);
    const [stepIndex, setStepIndex] = useState(JSON.parse(sessionStorage.getItem('stepIndex')) || 0);
    const [faceIndex, setFaceIndex] = useState(JSON.parse(sessionStorage.getItem('faceIndex')) || 0);
    const buttonFuncRef = useRef(null);

    const handleCubeStateChange = (newCubeState) => {
        setCubeState(newCubeState);
    }

    const handleButtonsLoaded = (buttonFunc) => {
        console.log(buttonFunc);
        buttonFuncRef.current = buttonFunc;
    };

    const handleButtonClick = (btnIndex) => {
        if (buttonFuncRef.current) {
            buttonFuncRef.current(btnIndex); // Simulate click on the "step" button (index 5)
        }
    };

    const handleFaceCaptured = (index) => {
        setFaceIndex(index);
        handleButtonClick(5)
        if (faceIndex === 3) {
            handleButtonClick(5)
        }
        console.log(faceIndex);

    };

    useEffect(() => {
        if (Object.keys(cubeState).length === 6) {
            const getSolution = async () => {
                try {
                    const response = await axios.post('http://localhost:8080/api/solve', cubeState)
                    setSolution(response.data['solution'].split(' '));
                    setIsCapture(false);
                    setIsSolve(true);
                } catch (error) {
                    console.error(error);
                    setIsCapture(false);
                }
            }
            getSolution();
        }
    }, [cubeState])

    useEffect(() => {
        if (isCapture) {
            setIsSolve(false);
            setSolution([]);
            setStepIndex(0);
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

    const handleCapturePhoto = () => {
        handleNext();
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
                            <h3>Please align your cube with the grid and scan the faces corrsponding to the center grid color</h3>
                            <CaptureFace onCubeStateUpdate={handleCubeStateChange} onFaceCaptured={handleFaceCaptured} onCapturePhoto={handleCapturePhoto}/>
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
                    {!isSolve && (
                        <div style={{ width: "400px", height: "400px" }}>
                            <AnimCube3
                                params="bgcolor=ffffff&snap=1&buttonbar=0&repeat=0&edit=0&position=0&hint=5&hintborder=1&move=Y Y Y Y X X2&movetext=0&sign=1&counter=0&facelets=****w********y********3********2********1********0****&colors=ff8040ff000000ff000000ff999999aaaa44bb7744994444447744004477"
                                onButtonsLoaded={handleButtonsLoaded}
                                onStepClick={handleNext}
                                onBackClick={handlePrev}
                            />
                        </div>
                    )}
                    {isSolve && (
                        <>
                            <div style={{ width: "400px", height: "400px" }}>
                                <AnimCube3
                                    params={`bgcolor=ffffff&snap=1&buttonbar=0&repeat=0&edit=0&scale=2&hint=5&hintborder=1&initrevmove=#&move=${solution.join(' ')}&movetext=0&sign=1&counter=0&facelets=wwwwwwwwwyyyyyyyyynnnnnnnnn333333333000000000111111111&colors=ff8040ff000000ff000000ff999999aaaa44bb7744994444447744004477`}
                                    onButtonsLoaded={handleButtonsLoaded}
                                    onStepClick={handleNext}
                                    onBackClick={handlePrev}
                                />
                            </div>
                            {/* <RubiksNet myScramble={myScramble} /> */}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}