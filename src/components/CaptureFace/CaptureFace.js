import './CaptureFace.scss'
import { useState, useEffect, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import axios from 'axios';
import gridBlack from '../../assets/grids/grid_black.png';

export default function CaptureFace() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [faceState, setFaceState] = useState({});
  const [faceImages, setFaceImages] = useState({});
  const [cubeState, setCubeState] = useState({});

  const face_order = ['F', 'R', 'B', 'L', 'U', 'D']
  const color_order = ['R', 'B', 'O', 'G', 'W', 'Y']

  const clearState = useCallback(() => {
    setFaceState({});
    setFaceImages({});
    setCubeState({});
    setImgSrc(null);
  }, [setFaceState, setFaceImages, setCubeState, setImgSrc]);

  
  // useEffect(() => {
  //   const getFaceState = async () => {
  //     if (!imgSrc) return;
  //     const face = {
  //       image: imgSrc
  //     }
  //     // console.log("Face: ", face);
  //     try {
  //       const response = await axios.post('http://localhost:8080/api/scan', face)
  //       const [faceID, faceArray] = Object.entries(response.data)[0];
  //       setFaceState(response.data);
  //       if (!(faceID in cubeState) && !faceArray.includes("unknown")) {
  //         setCubeState(prevCubeState => ({ ...prevCubeState, [faceID]: faceArray }));
  //       } else {
  //         console.log("face already exists");
  //         console.log("Cube: ", cubeState);
  //       }
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   getFaceState();
  // }, [imgSrc])

  useEffect(() => {
    if (!imgSrc) return;
    const nextFaceIndex = Object.keys(faceImages).length;
    const nextFaceID = face_order[nextFaceIndex];
    setFaceImages(prevFaceImages => ({ ...prevFaceImages, [nextFaceID]: imgSrc }));
  }, [imgSrc])

  useEffect(() => {
    const getCubeState = async () => {
      if (Object.keys(faceImages).length === 6) {
        try {
          const response = await axios.post('http://localhost:8080/api/scan', faceImages)
          setCubeState(response.data);
        } catch (error) {
          console.error(error)
        }
      }
    }
    getCubeState();
  }, [faceImages])

  useEffect(() => {
    console.log("Face: ", faceState);
  }, [faceState]);

  useEffect(() => {
    console.log("Face Images: ", faceImages);
  }, [faceImages]);

  useEffect(() => {
    console.log("Cube: ", cubeState);
  }, [cubeState]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({width: 240, height: 180});
    const trimmedSrc = imageSrc.replace("data:image/jpeg;base64,", "");
    setImgSrc(trimmedSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <>
      <section className="capture">
        <div className="capture__grid">
          <img className="capture__grid-black" src={gridBlack} alt="grid" />
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            height={360}
            width={480}
          />
        </div>
        <button onClick={capture}>Capture photo</button>
        <button onClick={clearState}>Clear</button>
      </section>
    </>
  );
};