import './Timer.scss'
import { useState, useEffect } from "react";

export default function Timer() {
    // state to store time
    const [time, setTime] = useState(0);

    // state to check timer running or not
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);

    // Hours calculation
    const hours = Math.floor(time / 360000);

    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);

    // Milliseconds calculation
    const milliseconds = time % 100;

    // Method to start and stop timer
    const startAndStop = () => {
        setIsRunning(!isRunning);
    };

    // Method to reset timer back to 0
    const reset = () => {
        setTime(0);
    };
    return (
        <section className="timer">
            <div className="timer__container">
                <p className="timer__time">
                    {hours.toString()}:
                    {minutes.toString().padStart(2, "0")}:
                    {seconds.toString().padStart(2, "0")}:
                    {milliseconds.toString().padStart(2, "0")}
                </p>
            </div>
            <div className="timer__buttons">
                <button className="timer__button" onClick={startAndStop}>
                    {isRunning ? "Stop" : "Start"}
                </button>
                <button className="timer__button" onClick={reset}>
                    Reset
                </button>
            </div>
        </section>
    );
}