import React from 'react'
import Axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function Register() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState('')

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [passwordRetype, setPasswordRetype] = useState('')
    const [passwordRetypeError, setPasswordRetypeError] = useState('')

    const [registerErrorCodes, setRegisterErrorCodes] = useState([])
    const [registerErrorMsg, setRegisterErrorMsg] = useState('')

    const registerRequest = async () => {
        try {
            const res = await Axios.post('http://localhost:5001/register', { username, email, password });
            setRegisterErrorCodes(res.data.errorCodes);
            return res.data.errorCodes;
        } catch (err) {
            console.log(err);
            return ['E3']; // You might want to handle the error differently, depending on your needs.
        }
    }

    const onRegisterButtonClick = async () => {
        setUsernameError('')
        setEmailError('')
        setPasswordError('')
        setPasswordRetypeError('')
        setRegisterErrorMsg('')

        // Check if the user has entered both fields correctly
        if ('' === username) {
            setUsernameError('Please enter a username')
            return
        }

        //if username already in DB ...

        if ('' === email) {
            setEmailError('Please enter your email')
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email')
            return
        }

        if ('' === password) {
            setPasswordError('Please enter a password')
            return
        }

        if (password.length < 7) {
            setPasswordError('The password must be 8 characters or longer')
            return
        }

        if('' === passwordRetype){
            setPasswordRetypeError('Please re-enter the password')
            return
        }

        if(password != passwordRetype){
            setPasswordRetypeError('The password does not match')
            return
        }

        const errorCodes = await registerRequest();

        if(errorCodes.length === 0){
            setRegisterErrorMsg('Ok :)');
            navigate('/');
            return
        }

        if(errorCodes.length > 0){
            console.log(errorCodes)
            setRegisterErrorMsg('Error occured :(')
            return
        }
    }

    const onBackButtonClick = () => {
        navigate('/');
    }

    return (
        <div>
            <div className={'titleContainer'}>
                <div>Register</div>
            </div>
            <br></br><br></br><br></br>

            <div className='inputContainer'>
                <input
                    value={username}
                    placeholder="Enter your username here"
                    onChange={(e) => setUsername(e.target.value)}
                    className={'inputBox'}
                /><label className="errorLabel">{usernameError}</label>
            </div>
            <br></br>

            <div className='inputContainer'>
                <input
                    value={email}
                    placeholder="Enter your email here"
                    onChange={(e) => setEmail(e.target.value)}
                    className={'inputBox'}
                /><label className="errorLabel">{emailError}</label>
            </div>
            <br></br>

            <div className={'inputContainer'}>
                <input
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(e) => setPassword(e.target.value)}
                    className={'inputBox'}
                    type="password"
                /><label className="errorLabel">{passwordError}</label>
            </div>
            <br></br>

            <div className={'inputContainer'}>
                <input
                    value={passwordRetype}
                    placeholder="Re-enter your password here"
                    onChange={(e) => setPasswordRetype(e.target.value)}
                    className={'inputBox'}
                    type="password"
                /><label className="errorLabel">{passwordRetypeError}</label>
            </div>
            <br></br><br></br>
            <label className='errorLabel'>{registerErrorMsg}</label>
            <br></br><br></br>

            <div className={'buttonContainer'}>
                <input
                    className={'signInButton'}
                    type="button"
                    onClick={onRegisterButtonClick}
                    value={'Register'}
                />
            </div>

            <div className={'buttonContainer'}>
                <input
                    className={'register-button'}
                    type="button"
                    onClick={onBackButtonClick}
                    value={'Go back'}
                />
            </div>
        </div>
    )
}