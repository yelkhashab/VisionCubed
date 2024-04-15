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
    const [isCapture, setIsCapture] = useState(JSON.parse(localStorage.getItem('isCapture')) || false);
    const [isSolve, setIsSolve] = useState(JSON.parse(localStorage.getItem('isSolve')) || false);
    const [cubeState, setCubeState] = useState(JSON.parse(localStorage.getItem('cubeState')) || []);
    const [solution, setSolution] = useState(JSON.parse(localStorage.getItem('solution')) || []);
    const [inverseSolution, setInverseSolution] = useState(JSON.parse(localStorage.getItem('inverseSolution')) || "");
    const [myScramble, setMyScramble] = useState(JSON.parse(localStorage.getItem('myScramble')) || "");
    const [net, setNet] = useState(JSON.parse(localStorage.getItem('net')) || []);
    const [stepIndex, setStepIndex] = useState(JSON.parse(localStorage.getItem('stepIndex')) || 0);
    const [faceIndex, setFaceIndex] = useState(JSON.parse(localStorage.getItem('faceIndex')) || 0);
    const [buttonsArray, setButtonsArray] = useState(JSON.parse(localStorage.getItem('buttonsArray')) || []);
    const [key, setKey] = useState(JSON.parse(localStorage.getItem('key')) || 0);
    const [roofpigKey, setRoofpigKey] = useState(0);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        localStorage.setItem('isCapture', JSON.stringify(isCapture));
        localStorage.setItem('isSolve', JSON.stringify(isSolve));
        localStorage.setItem('cubeState', JSON.stringify(cubeState));
        localStorage.setItem('solution', JSON.stringify(solution));
        localStorage.setItem('inverseSolution', JSON.stringify(inverseSolution));
        localStorage.setItem('myScramble', JSON.stringify(myScramble));
        localStorage.setItem('net', JSON.stringify(net));
        localStorage.setItem('stepIndex', JSON.stringify(stepIndex));
        localStorage.setItem('faceIndex', JSON.stringify(faceIndex));
        localStorage.setItem('buttonsArray', JSON.stringify(buttonsArray));
    }, [isCapture, isSolve, cubeState, solution, inverseSolution, myScramble, net, stepIndex, faceIndex, buttonsArray]);

    useEffect(() => {
        const storedIsCapture = JSON.parse(localStorage.getItem('isCapture'));
        const storedIsSolve = JSON.parse(localStorage.getItem('isSolve'));
      
        if (!storedIsCapture && isCapture) {
          setTimeout(() => {
            window.location.reload();
          }, 100);
        } else if (!storedIsSolve && isSolve) {
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }
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

    useEffect(() => {
        const button = buttonsArray?.find(button => button.id === 'next-2');
        if (button) {
            button.click();
            if (faceIndex === 5) {
                button.click();
            }
        }
    }, [faceIndex])

    // useEffect(() => {
    //     // window.location.reload();
    //     if (isSolve){
    //         setTimeout(() => {
    //             setReleoad(!releoad);
    //             refreshPageWithData();
    //         }, 200);
    //     }

    // }, [isSolve])


    const handleNext = () => {
        const button = buttonsArray?.find(button => button.id === 'next-2');
        if (stepIndex < solution.length) {
            setStepIndex(stepIndex + 1);
            if (button) {
                button.click();
            }
        }
        if (isCapture) {

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