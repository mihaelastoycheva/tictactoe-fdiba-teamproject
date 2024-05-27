import { useState } from 'react';
import { useEffect } from "react";
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Square } from './Square';
import { Dashboard } from './Dashboard';
import { Container, Row, Col } from 'react-bootstrap';

export function Board() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const symbolFirst = state.symbolFirst;
    const usernameFirst = state.usernameFirst;
    const usernameSec = state.usernameSec;
    const symbolSec = state.symbolSec;

    const [xIsNext, setXIsNext] = useState(symbolFirst);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [data, setData] = useState(null);
    const [winnerData, setWinnerData] = useState(null);

    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        const nextSquares = squares.slice();

        if (xIsNext === 'X') {
            nextSquares[i] = 'X';
            setXIsNext('O');
        } else {
            nextSquares[i] = 'O';
            setXIsNext('X');
        }

        setSquares(nextSquares);
    }


    const winner = calculateWinner(squares);
    let status;
    let winnerCode;
    if (!squares.includes(null)) {
        status = 'Draw!';
    } else {
        if (winner) {
            let winnerUsername;
            if (winner === symbolFirst) {
                winnerUsername = state.usernameFirst;
                winnerCode = 1;
            } else {
                winnerUsername = state.usernameSec;
                winnerCode = 2;
            }
            status = 'Winner: ' + winner + " " + winnerUsername;

            if (!winnerData) {
                setWinnerData({ usernameFirst, usernameSec, winnerCode })
            }

        } else {
            status = 'Next player: ' + xIsNext;
        }
    }

    useEffect(() => {
        if (winnerData) {
            Axios.post('http://localhost:5001/game', winnerData)
                .then(res => {
                    console.log("Saved data", res.data)
                    setData(res.data)
                }).catch(err => console.log(err))
        }
    }, [winnerData]);


    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(symbolFirst);
        navigate('/game', {state: {usernameFirst, usernameSec, symbolFirst, symbolSec}});
    };

    const onExitButtonClick = () => {
        navigate('/');
    };

    return (
        <Container>
            <Row>
                <Col lg={8}>
                    <div>
                        <div className={'titleContainer'}>
                            <div>Tic-Tac-Toe</div>
                        </div>

                        <div className='button-container-symbol'> {state.usernameFirst}'s symbol: {state.symbolFirst}</div>
                        <div className='button-container-symbol'> {state.usernameSec}'s symbol: {state.symbolSec}</div>


                        <br></br>
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
                        <br></br>
                        <div>
                            <input
                                className={'signInButton'}
                                type="button"
                                onClick={resetGame}
                                value={'Restart game'}
                            ></input>
                        </div>

                        <div>
                            <input
                                className={'signInButton'}
                                type="button"
                                onClick={onExitButtonClick}
                                value={'Exit'}
                            ></input>
                        </div>
                    </div>
                </Col>
                <Col lg={4}>
                    <div>
                        <Dashboard />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
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