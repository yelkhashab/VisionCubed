import './CaptureFace.scss'
import { useState, useEffect, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import axios from 'axios';
import gridBlack from '../../assets/grids/grid_black.png';
import gridRed from '../../assets/grids/grid_R.png';
import gridOrange from '../../assets/grids/grid_O.png';
import gridYellow from '../../assets/grids/grid_Y.png';
import gridGreen from '../../assets/grids/grid_G.png';
import gridBlue from '../../assets/grids/grid_B.png';
import gridWhite from '../../assets/grids/grid_W.png';

export default function CaptureFace({ onCubeStateUpdate, onFaceCaptured, onCapturePhoto }) {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [faceState, setFaceState] = useState({});
  const [faceImages, setFaceImages] = useState({});
  const [cubeState, setCubeState] = useState({});

  const faceOrder = ['F', 'R', 'B', 'L', 'U', 'D']
  const colorOrder = ['G', 'R', 'B', 'O', 'W', 'Y']

  const clearState = useCallback(() => {
    setFaceState({});
    setFaceImages({});
    setCubeState({});
    setImgSrc(null);
  }, [setFaceState, setFaceImages, setCubeState, setImgSrc]);

  useEffect(() => {
    if (!imgSrc) return;
    const nextFaceIndex = Object.keys(faceImages).length;
    const nextFaceID = faceOrder[nextFaceIndex];
    setFaceImages(prevFaceImages => ({ ...prevFaceImages, [nextFaceID]: imgSrc }));

    if (onFaceCaptured) {
      onFaceCaptured(nextFaceIndex);
    }
  }, [imgSrc])

  useEffect(() => {
    const getCubeState = async () => {
      if (Object.keys(faceImages).length === 6) {
        try {
          const response = await axios.post('http://localhost:8080/api/scan', faceImages)
          setCubeState(response.data);
        } catch (error) {
          console.error(error)
          clearState();
        }
      }
    }
    getCubeState();
  }, [faceImages])

  useEffect(() => {
    if (Object.keys(cubeState).length === 6) {
      onCubeStateUpdate(cubeState);
    }
  }, [cubeState, onCubeStateUpdate]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({ width: 240, height: 180 });
    const trimmedSrc = imageSrc.replace("data:image/jpeg;base64,", "");
    setImgSrc(trimmedSrc);
    onCapturePhoto(); 
  }, [webcamRef, setImgSrc, onCapturePhoto]);

  const currentStep = Object.keys(faceImages).length;
  const gridColor = colorOrder[currentStep];

  const gridImages = {
    R: gridRed,
    O: gridOrange,
    Y: gridYellow,
    G: gridGreen,
    B: gridBlue,
    W: gridWhite,
  };


  return (
    <>
      <section className="capture">
        <div className="capture__grid">
          {/* <img className="capture__grid-black" src={gridBlack} alt="grid" /> */}
          <img className="capture__grid-color" src={gridImages[gridColor]} alt="grid" />
          <Webcam
            className="capture__webcam"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            height={360}
            width={480}
          />
        </div>
        <div className="capture__buttons">
          <button onClick={capture}>Capture photo</button>
          <button onClick={clearState}>Clear</button>
        </div>
      </section>
    </>
  );
};