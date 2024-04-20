import './AnimCube3Learn.scss';
import React, { useState, useEffect } from 'react';
import AnimCube3 from '../AnimCube3/AnimCube3';

export default function AnimCube3Learn() {
	const [move, setMove] = useState('');
	const [prevMoves, setPrevMoves] = useState([]);
	const [buttons, setButtons] = useState([]);
	const [params, setParams] = useState(`bgcolor=ffffff&snap=1&buttonbar=0&repeat=0&edit=0&facelets=wwwwwwwwwyyyyyyyyynnnnnnnnn333333333000000000111111111&colors=ff8040ff000000ff000000ff999999aaaa44bb7744994444447744004477`);

	const handleMoveClick = (move) => {
		setMove(move);
		setPrevMoves((prevMoves) => [...prevMoves, move]);
	};

	const handleReset = () => {
		setPrevMoves([]);
		setMove('');
	};

	const handleStepClick = () => {
		const lastMove = prevMoves && prevMoves.length > 0 ? prevMoves[prevMoves.length - 1] : null;
		if (lastMove) {
			handleMoveClick(lastMove);
		}
	};

	const handleBackClick = () => {
		setPrevMoves((prevMoves) => prevMoves.slice(0, -1));
	};

	const handleButtonsLoaded = (loadedButtons) => {
		setButtons(loadedButtons);
	};

	useEffect(() => {
		const initmoves = prevMoves.slice(0, -1).join(' ');
		setParams(`bgcolor=ffffff&snap=1&buttonbar=0&repeat=0&edit=0&scale=2&initmove=${initmoves}&move=${move}&movetext=0&sign=1&counter=0&facelets=wwwwwwwwwyyyyyyyyynnnnnnnnn333333333000000000111111111&colors=ff8040ff000000ff000000ff999999aaaa44bb7744994444447744004477`);
	}, [prevMoves, move]);

	return (
		<section className='AC3Learn'>
			<AnimCube3
				params={params}
				onButtonsLoaded={handleButtonsLoaded}
				onStepClick={handleStepClick}
				onBackClick={handleBackClick}
			/>
			<div className='AC3Learn__moves'>
				<div className='AC3Learn__container'>
					{['U', 'D', 'L', 'R', 'F', 'B'].map((face) => (
						<div key={face}>
							<button className='AC3Learn__move' onClick={() => handleMoveClick(face)}>{face}</button>
						</div>
					))}
				</div>
				<div className='AC3Learn__container'>
					{['U', 'D', 'L', 'R', 'F', 'B'].map((face) => (
						<div key={face}>
							<button className='AC3Learn__move' onClick={() => handleMoveClick(`${face}'`)}>{face}'</button>
						</div>
					))}
				</div>
				<div className='AC3Learn__container'>
					{['U', 'D', 'L', 'R', 'F', 'B'].map((face) => (
						<div key={face}>
							<button className='AC3Learn__move' onClick={() => handleMoveClick(`${face}2`)}>{face}2</button>
						</div>
					))}
				</div>
				<button className='AC3Learn__reset' onClick={handleReset}>Reset</button>
			</div>
		</section>
	);
}