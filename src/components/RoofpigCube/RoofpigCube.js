import './RoofpigCube.scss'
import { Helmet } from "react-helmet";
import React, { useEffect, useState, useRef } from "react";

export default function RoofpigCube({ moves, inverse, state, onButtonsLoaded }) {
    const roofpigContainerRef = useRef(null);
    const [cubeConfig, setCubeConfig] = useState("colors=U:w D:y R:r L:o F:g B:b|hover=none")
    const [load, setLoad] = useState(false)

    useEffect(() => {
        if (state === "scan") {
            setCubeConfig("alg=y y y y R> U> x2|colored=*/m|colors=U:w D:y R:o L:r F:b B:g|hover=none")
            setLoad(true)
        } else if (state === "solve") {
            setCubeConfig("setupmoves=" + inverse + "|alg=" + moves + "|colors=U:w D:y R:r L:o F:g B:b|hover=none")
            setLoad(true)
        }
    }, [state])

    useEffect(() => {
        if (load && roofpigContainerRef.current) {
            const div = document.createElement('div');
            div.className = 'roofpig';
            div.setAttribute('data-config', cubeConfig);
            roofpigContainerRef.current.appendChild(div);
    
            // Set display to none for the first child after 100ms
            setTimeout(() => {
                const firstChild = roofpigContainerRef.current.firstChild;
                if (firstChild) {
                    firstChild.style.display = 'none';
                }

                const buttons = roofpigContainerRef.current.querySelectorAll('button');
                buttons.forEach(button => {
                    button.style.display = 'none';
                });

                if (onButtonsLoaded) {
                    onButtonsLoaded(buttons);
                }

                const canvas = roofpigContainerRef.current.querySelectorAll('canvas');
                if (canvas) {
                    canvas.forEach((element) => {
                        const nextDiv = element.nextElementSibling;
                        if (nextDiv) {
                            nextDiv.style.display = 'none';
                            const nextNextDiv = nextDiv.nextElementSibling;
                            if (nextNextDiv) {
                                nextNextDiv.style.display = 'none';
                            }
                        }
                    });
                }
            }, 100);
        }
    }, [cubeConfig]);

    if (!cubeConfig) return (<></>)

    return (
        <>
            <section className='roofpig-cube' ref={roofpigContainerRef}>
                <div className='roofpig' data-config={cubeConfig}></div>
            </section>
        </>
    )
}