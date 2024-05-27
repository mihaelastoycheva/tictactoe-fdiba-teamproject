import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

export function Symbol() {
    const navigate = useNavigate();
    const { state } = useLocation();
    
    const [symbolFirst, setSymbolFirst] = useState('');
    const [symbolSec, setSymbolSec] = useState('');

    const usernameFirst = state.usernameFirst;
    const usernameSec = state.usernameSec;

    const onFirstButtonClick = () => {
        console.log("X clicked");
        setSymbolFirst('X')
        setSymbolSec('O')
        
    }
    const onSecondButtonClick = () => {
        setSymbolFirst('O')
        setSymbolSec('X')
        console.log("O clicked");
    }
    const onContinueButtonClick = () => {
        navigate('/game', {state: {usernameFirst, usernameSec, symbolFirst, symbolSec}});
    }

    return (
        <div>
            <div>
                <div className={'titleContainer'}>
                    <div>Tic-Tac-Toe</div>
                </div>
                <label className='success-text'>Login successfully</label><br></br>
                <label className='button-container-symbol'>Player 1: {usernameFirst}</label>
                <label className='button-container-symbol'>Player 2: {usernameSec}</label>
                <br></br>

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