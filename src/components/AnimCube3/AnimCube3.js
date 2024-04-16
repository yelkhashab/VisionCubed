import './AnimCube3.scss'
import React, { useEffect, useRef } from 'react';

const AnimCube3 = ({ params, onButtonsLoaded, onStepClick, onBackClick }) => {
    const containerRef = useRef(null);
    const idRef = useRef('cube-' + Math.random().toString(36).substr(2, 9));
    const scriptRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const script = document.createElement('script');
        script.innerHTML = `
      var acjs_button = [];
      var acjs_put_var = [];
      var acjs_paint = [];
      AnimCube3("id=${idRef.current}&${params}");
    `;
        container.appendChild(script);
        scriptRef.current = script;

    }, [params]);

    useEffect(() => {
        if (window.acjs_button && window.acjs_button[idRef.current]) {
            onButtonsLoaded(window.acjs_button[idRef.current]);
        }
    }, [onButtonsLoaded]);

    const handleButtonClick = (buttonIndex) => {
        if (buttonIndex === 1) {
            onBackClick(); // Call the onBackClick callback when the "Back" button is clicked
        } else if (buttonIndex === 5) {
            onStepClick(); // Call the onStepClick callback when the "Step" button is clicked
        }

        if (window.acjs_put_var && window.acjs_put_var[idRef.current] && window.acjs_button && window.acjs_button[idRef.current] && window.acjs_paint && window.acjs_paint[idRef.current]) {
            window.acjs_put_var[idRef.current]('buttonPressed', buttonIndex, 'n');
            window.acjs_button[idRef.current]();

            setTimeout(() => {
                window.acjs_put_var[idRef.current]('pushed', 0, 'n');
                window.acjs_put_var[idRef.current]('drawButtons', 1, 'n');
                window.acjs_paint[idRef.current]();
            }, 0);
        }
    };

    return (
        <div className='AnimCube3'>
            <div ref={containerRef} id={idRef.current} className='AnimCube3__canvas' style={{ width: '400px', height: '400px' }} />
            <div className='AnimCube3__buttons'>
                <button onClick={() => handleButtonClick(1)}>Previous</button>
                <button onClick={() => handleButtonClick(5)}>Next</button>
            </div>
        </div>
    );
};

export default AnimCube3;