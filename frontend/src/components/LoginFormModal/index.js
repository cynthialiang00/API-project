// frontend/src/components/LoginFormPage/index.js
import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useModal } from "../../context/Modal";

import './LoginForm.css';

function LoginFormModal() {
    const dispatch = useDispatch();

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [dynamicErrors, setDynamicErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
        const errors = {};
        if(credential.length < 4) errors["credential"] = "Username must be at least 4 characters long";
        if (password.length < 6) errors["password"] = "Password must be at least 6 characters long";
        setDynamicErrors(errors);
    }, [credential, password]);


    const setDemoUser = () => {
        return dispatch(sessionActions.thunkLogin({ credential: "Demo-lition", password: "password" }))
            .then(closeModal)
            .catch(async (response) => {
                const data = await response.json();
                if (data && data.errors) setErrors({ invalid: "The provided credentials were invalid" });
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.thunkLogin({ credential, password }))
            .then(closeModal)
            .catch(async (response) => {
                const data = await response.json();
                if (data && data.errors) setErrors({invalid: "The provided credentials were invalid"});
            });
    }

    return (
        <div className='login-form-parent'>
            <form onSubmit={handleSubmit}>
                {errors.invalid &&
                    <p className="errors">{errors.invalid}</p>}

                <label>
                    Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                
                <button type="submit"
                        disabled={Object.keys(dynamicErrors).length}
                >Log In
                </button>
                
            </form>

            <div className='demo-user-link'>
                <NavLink to="/"
                         onClick={setDemoUser}
                >   Demo User
                </NavLink>
            </div>
        </div>
        
    );
}

export default LoginFormModal;