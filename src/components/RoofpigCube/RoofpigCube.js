import './RoofpigCube.scss'
import { Helmet } from "react-helmet";
import React, { useEffect } from "react";
import useExternalScripts from '../../hooks/useExternalScripts';
// import { CompositeMove } from '../../scripts/roofpig_and_three.min';

export default function RoofpigCube() {
    // let moves = {};
    // const roofpigs = [];

    // useExternalScripts("../../../public/roofpig_and_three.min.js");

    // useEffect(() => {
    //     const pigs = document.querySelectorAll('.roofpig');
    //     for (let i = 0; i < pigs.length; i++) {
    //         const roofpig_div = pigs[i];
    //         roofpigs.push(new CompositeMove((roofpig_div)));
    //     }
    //     window.roofpigs = roofpigs;
    //     window.CompositeMove = CompositeMove;
    // }, []);

    // useEffect(() => {
    //     const handleNotationButtonClick = (event) => {
    //         const $this = event.target;
    //         const roofpigId = $this.parentElement.parentElement.querySelector('.roofpig').dataset.cubeId - 1;

    //         // Use data-move if available
    //         const move = $this.dataset.move ? $this.dataset.move : $this.innerText;

    //         // Record moves for reset button
    //         if (!moves[roofpigId]) {
    //             moves[roofpigId] = [];
    //         }

    //         moves[roofpigId].push(move);

    //         CompositeMove.move(move, roofpigs[roofpigId].world3d, 400);
    //     };

    //     const handleResetButtonClick = (event) => {
    //         const roofpigId = event.target.parentElement.querySelector('.roofpig').dataset.cubeId - 1;

    //         // First check if any moves have been performed on the cube
    //         if (moves[roofpigId] && moves[roofpigId].length > 0) {
    //             // Reverse each recorded move to reset back to default state
    //             moves[roofpigId].reverse().forEach(function (move) {
    //                 const cubeMove = new CompositeMove(move, roofpigs[roofpigId].world3d, 400).undo();
    //                 roofpigs[roofpigId].add_changer('pieces', cubeMove);
    //             });

    //             // Reset recorded moves
    //             moves[roofpigId] = [];
    //         }
    //     };

    //     const moveButtons = document.querySelectorAll('.roofpig-cube__moves a');
    //     moveButtons.forEach(button => button.addEventListener('click', handleNotationButtonClick));

    //     const resetButton = document.querySelector('.roofpig-cube__moves button');
    //     resetButton.addEventListener('click', handleResetButtonClick);

    //     return () => {
    //         moveButtons.forEach(button => button.removeEventListener('click', handleNotationButtonClick));
    //         resetButton.removeEventListener('click', handleResetButtonClick);
    //     };
    // }, []);

    return (
        <>
            <section className='roofpig-cube'>
                <section className='roofpig-cube__moves'>
                    <div className="roofpig" data-config="alg=R|colors=U:w D:y R:r L:o F:g B:b|hover=none"></div>

                    <div>
                        <a>U</a>
                        <a>D</a>
                        <a>L</a>
                        <a>R</a>
                        <a>F</a>
                        <a>B</a>
                    </div>
                    <div>
                        <a>U'</a>
                        <a>D'</a>
                        <a>L'</a>
                        <a>R'</a>
                        <a>F'</a>
                        <a>B'</a>
                    </div>
                    <div>
                        <a>U2</a>
                        <a>D2</a>
                        <a>L2</a>
                        <a>R2</a>
                        <a>F2</a>
                        <a>B2</a>
                    </div>

                    <button className="button">Reset</button>
                </section>
                <Helmet>
                    <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
                    <script src="roofpig_and_three.min.js"></script>
                </Helmet>
            </section>
        </>
    )
}