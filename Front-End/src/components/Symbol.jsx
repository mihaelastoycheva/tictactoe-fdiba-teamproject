import React from 'react'
import { useNavigate } from 'react-router-dom';

export function Symbol() {
    const navigate = useNavigate();

    const onFirstButtonClick = () => {
        console.log("X clicked");
    }
    const onSecondButtonClick = () => {
        console.log("O clicked");
    }
    const onContinueButtonClick = () => {
        navigate('/game');
    }

    return (
        <div>
            <div>
                <div className={'titleContainer'}>
                    <div>Tic-Tac-Toe</div>
                </div>

                <div className='button-container-symbol'>
                    <label>Choose Player 1's symbol:</label>
                    <div>
                        <input
                            className={'button-symbol'}
                            type="button"
                            onClick={onFirstButtonClick}
                            value={'X'}
                        />
                    </div>

                    <label>or</label>
                    <div>
                        <input
                            className={'button-symbol'}
                            type="button"
                            onClick={onSecondButtonClick}
                            value={'O'}
                        />
                    </div>
                </div>
            </div>
            <div>
                <br></br>
                <div className={'buttonContainer'}>
                    <input
                        className={'signInButton'}
                        type="button"
                        onClick={onContinueButtonClick}
                        value={'Continue'}
                    />
                </div>
            </div>
        </div>
    )
}