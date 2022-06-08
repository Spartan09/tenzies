import React from "react";
import "./Die.css";
import { data } from "./DieMapping";

function Die({ value, isHeld, holdDice, isWon }) {
    const styles = {
        backgroundColor: isHeld ? "#59E391" : "#FFF",
        cursor: isWon ? "default" : "pointer",
    };
    const dotElements = data[value].map((position, index) => (
        <div key={index} className={`dot ${position}`} />
    ));

    return (
        <div className="face" style={styles} onClick={!isWon ? holdDice : undefined}>
            {dotElements}
        </div>
    );
}

export default Die;
