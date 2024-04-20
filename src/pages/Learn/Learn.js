import './Learn.scss'

import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/Header'
import AnimCube3Learn from '../../components/AnimCube3Learn/AnimCube3Learn'

export default function Learn() {
    return (
        <>
            <Header />
            <section className="learn">

                <div className='learn__left'>
                    <div className='learn__heading'>
                        <h1>Learn</h1>
                        <h2>Learn how to use the cube</h2>
                    </div>
                    <div className='learn__content'>
                        <h3>Introduction</h3>
                        <p>
                            Welcome to the exciting world of Rubik's Cube! This guide will help
                            you understand the standard notation used to describe the moves needed
                            to solve the cube. By mastering this notation, you can follow algorithms
                            more easily and become a skilled cuber in no time!
                        </p>
                        <h3>Notation Basics</h3>
                        <p>
                            Rubik's Cube moves are denoted by letters which represent each face of the cube:
                        </p>
                        <div className='learn__list'>
                            <ul className='learn__list-left'>
                                <li>R (Right):</li>
                                <li>L (Left):</li>
                                <li>U (Up):</li>
                                <li>D (Down):</li>
                                <li>F (Front):</li>
                                <li>B (Back):</li>
                            </ul>
                            <ul className='learn__list-right'>
                                <li>The right face of the cube</li>
                                <li>The left face of the cube</li>
                                <li>The top face of the cube</li>
                                <li>The bottom face of the cube</li>
                                <li>The face currently facing you</li>
                                <li>The face opposite to the front</li>
                            </ul>
                        </div>
                        <h3>Modifiers</h3>
                        <p>Each move can have modifiers that alter how the face should be rotated:</p>
                        <div className='learn__list'>
                            <ul className='learn__list-left'>
                                <li>No mod:</li>
                                <li>' or i:</li>
                                <li>2:</li>
                            </ul>
                            <ul className='learn__list-right'>
                                <li>Rotate the face clockwise by 90 degrees</li>
                                <li>Rotate the face counterclockwise by 90 degrees</li>
                                <li>Rotate the face twice (180 degrees)</li>
                            </ul>
                        </div>
                        <p>Note: The direction of rotation is relative to the face being rotated.</p>
                        <h3>Try it Yourself</h3>
                        <p>
                            Use the simulator to practice these moves. Enter a sequence of notations
                            and see how the cube changes with each step. Experiment with different combinations
                            and observe the results. This hands-on practice is the best way to get comfortable
                            with Rubik's Cube notation.
                        </p>

                    </div>
                </div>
                <div className='learn__right'>
                    <AnimCube3Learn />
                </div>
            </section>
        </>
    )
}