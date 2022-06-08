import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";
import Die from "./components/die/Die";

function App() {
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);
    const [roll, setRoll] = React.useState(0);
    const [bestRoll, setBestRoll] = React.useState(
        localStorage.getItem("bestRoll")
    );

    React.useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every((die) => die.value === firstValue);
        if (allHeld && allSameValue) {
            setTenzies(true);
        }
    }, [dice]);

    React.useEffect(() => {
        if (tenzies) {
            if (bestRoll !== null) {
                localStorage.setItem("bestRoll", Math.min(bestRoll, roll));
                setBestRoll(Math.min(bestRoll, roll));
            } else {
                localStorage.setItem("bestRoll", roll);
                setBestRoll(roll);
            }
        }
    }, [tenzies]);

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        };
    }

    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie());
        }
        return newDice;
    }

    function rollDice() {
        if (!tenzies) {
            setDice((oldDice) =>
                oldDice.map((die) => {
                    return die.isHeld ? die : generateNewDie();
                })
            );
            setRoll((prevRoll) => prevRoll + 1);
        } else {
            setTenzies(false);
            setDice(allNewDice());
            setRoll(0);
        }
    }

    function holdDice(id) {
        setDice((oldDice) =>
            oldDice.map((die) => {
                return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
            })
        );
    }

    const diceElements = dice.map((die) => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
            isWon={tenzies}
        />
    ));

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="stats">
                {bestRoll !== null && (
                    <p className="best-roll-count">Best Roll: {bestRoll}</p>
                )}
                <p className="roll-count">Roll: {roll}</p>
            </div>
            <div className="dice-container">{diceElements}</div>
            <button className="roll-dice" onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    );
}

export default App;
