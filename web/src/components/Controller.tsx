import * as React from "react";
import emu from "../Emu";

const component: React.FC = () => {
    const [running, setRunning ] = React.useState(false);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        emu.loadRom(e.target.value);

    const start = () => {
        emu.run();
        setRunning(emu.running);
    };

    const step = () => {
        emu.step();
    }

    const stop = () => {
        emu.stop();
        setRunning(emu.running);
    };

    let startButton = <button onClick={start}>Start</button>;
    if (running) {
        startButton = <button onClick={stop}>Stop</button>;
    }

    return (
        <div>
            <select onChange={(e) => onChange(e)}>
                <option value="15PUZZLE">15PUZZLE</option>
                <option value="BLINKY">BLINKY</option>
                <option value="BLITZ">BLITZ</option>
                <option value="BRIX">BRIX</option>
                <option value="CONNECT4">CONNECT4</option>
                <option value="GUESS">GUESS</option>
                <option value="HIDDEN">HIDDEN</option>
                <option value="INVADERS">INVADERS</option>
                <option value="KALEID">KALEID</option>
                <option value="MAZE">MAZE</option>
                <option value="MERLIN">MERLIN</option>
                <option value="MISSILE">MISSILE</option>
                <option value="PONG">PONG</option>
                <option value="PONG2">PONG2</option>
                <option value="PUZZLE">PUZZLE</option>
                <option value="SYZYGY">SYZYGY</option>
                <option value="TANK">TANK</option>
                <option value="TETRIS">TETRIS</option>
                <option value="TICTAC">TICTAC</option>
                <option value="UFO">UFO</option>
                <option value="VBRIX">VBRIX</option>
                <option value="VERS">VERS</option>
                <option value="WIPEOFF">WIPEOFF</option>
            </select>
            {startButton}
            <button onClick={step}>Step</button>
        </div>
    );
}

export default component;
