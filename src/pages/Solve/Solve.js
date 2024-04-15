import './Solve.scss'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import axios from 'axios'

import Header from '../../components/Header/Header'
import CaptureFace from '../../components/CaptureFace/CaptureFace'
import RoofpigCube from '../../components/RoofpigCube/RoofpigCube'
import RubiksNet from '../../components/RubiksNet/RubiksNet.tsx'

export default function Solve() {
    const [isCapture, setIsCapture] = useState(JSON.parse(sessionStorage.getItem('isCapture')) || false);
    const [isSolve, setIsSolve] = useState(JSON.parse(sessionStorage.getItem('isSolve')) || false);
    const [cubeState, setCubeState] = useState(JSON.parse(sessionStorage.getItem('cubeState')) || []);
    const [solution, setSolution] = useState(JSON.parse(sessionStorage.getItem('solution')) || []);
    const [inverseSolution, setInverseSolution] = useState(JSON.parse(sessionStorage.getItem('inverseSolution')) || "");
    const [myScramble, setMyScramble] = useState(JSON.parse(sessionStorage.getItem('myScramble')) || "");
    const [net, setNet] = useState(JSON.parse(sessionStorage.getItem('net')) || []);
    const [stepIndex, setStepIndex] = useState(JSON.parse(sessionStorage.getItem('stepIndex')) || 0);
    const [faceIndex, setFaceIndex] = useState(JSON.parse(sessionStorage.getItem('faceIndex')) || 0);
    const [buttonsArray, setButtonsArray] = useState(JSON.parse(sessionStorage.getItem('buttonsArray')) || []);
    const [key, setKey] = useState(JSON.parse(sessionStorage.getItem('key')) || 0);
    const [roofpigKey, setRoofpigKey] = useState(0);
    const [reload, setReload] = useState(false);


    useEffect(() => {
        sessionStorage.setItem('isCapture', JSON.stringify(isCapture));
        sessionStorage.setItem('isSolve', JSON.stringify(isSolve));
        sessionStorage.setItem('cubeState', JSON.stringify(cubeState));
        sessionStorage.setItem('solution', JSON.stringify(solution));
        sessionStorage.setItem('inverseSolution', JSON.stringify(inverseSolution));
        sessionStorage.setItem('myScramble', JSON.stringify(myScramble));
        sessionStorage.setItem('net', JSON.stringify(net));
        sessionStorage.setItem('stepIndex', JSON.stringify(stepIndex));
        sessionStorage.setItem('faceIndex', JSON.stringify(faceIndex));
        sessionStorage.setItem('buttonsArray', JSON.stringify(buttonsArray));
    }, [isCapture, isSolve, cubeState, solution, inverseSolution, myScramble, net, stepIndex, faceIndex, buttonsArray]);

    useEffect(() => {
        const storedIsCapture = JSON.parse(sessionStorage.getItem('isCapture'));
        const storedIsSolve = JSON.parse(sessionStorage.getItem('isSolve'));

        if (!storedIsCapture && isCapture) {
            setIsSolve(false);
            setSolution([]);
            setReload(false);
            setTimeout(() => {
                window.location.reload();
            }, 100);
        } else if (!storedIsSolve && isSolve) {
            setIsCapture(false);
            setReload(false);
            setTimeout(() => {
                window.location.reload();
            }, 100);
        }
        setReload(true);
    }, [isCapture, isSolve]);

    const handleCubeStateChange = (newCubeState) => {
        setCubeState(newCubeState);
    }

    const handleButtonsLoaded = (buttons) => {
        setButtonsArray(Array.from(buttons));
    };

    const handleFaceCaptured = (index) => {
        setFaceIndex(index);
    };


    useEffect(() => {
        if (Object.keys(cubeState).length === 6) {
            const getSolution = async () => {
                try {
                    const response = await axios.post('http://localhost:8080/api/solve', cubeState)
                    setSolution(response.data['solution'].split(' '));
                    setInverseSolution(response.data['inverse'].split(' '));
                    setNet(response.data['net']);
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

    useEffect(() => {
        if (reload) {
            setTimeout(() => {
                const button = buttonsArray?.find(button => button.id === 'next-2');
                for (let i = 0; i < solution.length; i++) {
                    button?.click();
                }
            }, 200)
            setReload(false);
        }
    }, [isSolve])

    const handleNext = () => {
        const button = buttonsArray?.find(button => button.id === 'next-2');
        if (stepIndex < solution.length) {
            setStepIndex(stepIndex + 1);
            if (button) {
                button.click();
            }
        }
    };

    const handlePrev = () => {
        const button = buttonsArray?.find(button => button.id === 'prev-2');
        if (stepIndex > 0) {
            setStepIndex(stepIndex - 1);

            if (button) {
                button.click();
            }
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
                            <h3>Please align your cube with the grid and scan the faces corrsponding to the center grid color</h3>
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
                    {!isSolve && (
                        <RoofpigCube
                            key={roofpigKey}
                            state="scan"
                            onButtonsLoaded={handleButtonsLoaded}
                            onFaceCaputured={handleFaceCaptured}
                        />
                    )}
                    {isSolve && (
                        <>
                            <RoofpigCube
                                key={roofpigKey}
                                state="solve"
                                moves={solution.join(' ')}
                                inverse={inverseSolution.join(' ')}
                                onButtonsLoaded={handleButtonsLoaded}
                            />
                            <RubiksNet myScramble={myScramble} />
                        </>
                    )}

                    <div className="solve__media">
                        <button onClick={handlePrev} disabled={stepIndex === 0}>Previous</button>
                        <button onClick={handleNext} disabled={stepIndex === solution.length}>Next</button>
                    </div>
                </div>
            </div>
        </>
    )
}