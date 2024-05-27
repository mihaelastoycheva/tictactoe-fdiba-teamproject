import React from 'react'
import Axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Container, Row, Col } from 'react-bootstrap';

export function Home() {
    const { state } = useLocation();

    const [usernameFirst, setUsernameFirst] = useState('')
    const [passwordFirst, setPasswordFirst] = useState('')

    const [usernameSec, setUsernameSec] = useState('')
    const [passwordSec, setPasswordSec] = useState('')

    const [signInErrorMsg, setSignInErrorMsg] = useState('')

    const navigate = useNavigate();

    const signInRequest = async () => {
        try {
            const res = await Axios.post('http://localhost:5001/signin', { usernameFirst, passwordFirst, usernameSec, passwordSec });
            return res.data.errorCodes;
        } catch (err) {
            console.log(err);
            return ['E3'];
        }
    }

    const onSignInButtonClick = async() => {
        const errorCodes = await signInRequest();
        console.log(errorCodes)

        if(errorCodes.length === 0){
            setSignInErrorMsg('Ok :)');
            navigate('/symbol', {state: {usernameFirst, usernameSec}});
            return
        }

        if(errorCodes.length > 0){
            setSignInErrorMsg('Error occured :(')
            return
        }
    }

    const onRegisterButtonClick = () => {
        navigate('/register');
    }

    return (
        <Container>
            <Row>
                <Col lg={8}>
                    <div>
                        <div className={'titleContainer'}>
                            <div>Welcome to Tic-Tac-Toe!</div>
                        </div>
                        <label className='errorLabel'>{signInErrorMsg}</label>
                        <br></br>
                        <div className='verticale-container'>Player 1</div>
                        <br></br>

                        <div className='inputContainer'>
                            <input
                                value={usernameFirst}
                                placeholder="Enter your username here"
                                onChange={(e) => setUsernameFirst(e.target.value)}
                                className={'inputBox'}
                            />
                        </div>

                        <br></br>

                        <div className={'inputContainer'}>
                            <input
                                value={passwordFirst}
                                placeholder="Enter your password here"
                                onChange={(ev) => setPasswordFirst(ev.target.value)}
                                className={'inputBox'}
                                type="password"
                            />
                        </div>

                        <br></br><br></br>

                        <div className='verticale-container'>Player 2</div><br></br>
                        <div className='inputContainer'>
                            <input
                                value={usernameSec}
                                placeholder="Enter your username here"
                                onChange={(e) => setUsernameSec(e.target.value)}
                                className={'inputBox'}
                            />
                        </div>

                        <br></br>

                        <div className={'inputContainer'}>
                            <input
                                value={passwordSec}
                                placeholder="Enter your password here"
                                onChange={(ev) => setPasswordSec(ev.target.value)}
                                className={'inputBox'}
                                type="password"
                            />
                        </div>

                        <br></br>
                        <div className={'buttonContainer'}>
                            <input
                                className={'signInButton'}
                                type="button"
                                onClick={onSignInButtonClick}
                                value={'Sign in'}
                            />
                        </div>
                        <br></br>

                        <div className={'buttonContainer'}>
                            <input
                                className={'register-button'}
                                type="button"
                                onClick={onRegisterButtonClick}
                                value={'Register'}
                            />
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
    )
}
