import { useState } from 'react';

import { Square } from './Square';
import { Dashboard } from './Dashboard';
import { TextBox } from './TextBox';

export function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [playerSymbol, setPlayerSymbol] = useState('X');

    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        const nextSquares = squares.slice();

        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }

        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    const winner = calculateWinner(squares);
    let status;
    if (!squares.includes(null)) {
        status = 'Draw!';
    } else {
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (xIsNext ? 'X' : 'O');
        }
    }

    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    };

    const handleSymbolChange = (e) => {
        setPlayerSymbol(e.target.value);
        setXIsNext(e.target.value === 'X' ? true : false);
    };

    return (
        <>
            <div>
                <TextBox key={234} />
            </div>
            <div>
                <label>
                    Choose your symbol: {' '}
                    <select value={playerSymbol} onChange={handleSymbolChange}>
                        <option value="X">X</option>
                        <option value="O">O</option>
                    </select>
                </label>
            </div>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
            <button onClick={resetGame}>Refresh Game</button>
            <div className='table-dashboard'>
                <Dashboard />
            </div>
        </>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
            return squares[a];
        }
    }
}