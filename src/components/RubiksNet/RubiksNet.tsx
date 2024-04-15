import React from 'react'; // Import React
import './RubiksNet.scss'
import { DisplayCube, applyScramble, Cube, solvedCube } from 'react-rubiks-cube-utils'; // Remove unused imports

export default function RubiksNet({ myScramble = "" }) {
	let myCube: Cube; // Declare myCube variable
	myCube = applyScramble({ type: '3x3', scramble: myScramble });

	return (
		<main>
			<DisplayCube cube={myCube} size={15} />
		</main>
	);
}