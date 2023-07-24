// frontend/src/components/LoginFormPage/index.js
import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useModal } from "../../context/Modal";

import './LoginForm.css';

function LoginFormModal() {
    const dispatch = useDispatch();

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const [hasSubmit, setHasSubmit] = useState(false);

    useEffect(() => {
        const errors = {};
        if(credential.length < 4) errors["credential"] = "Username must be at least 4 characters long";
        if (password.length < 6) errors["password"] = "Password must be at least 6 characters long";
        setErrors(errors);
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
        setHasSubmit(true);
        dispatch(sessionActions.thunkLogin({ credential, password }))
            .then(async (response) => {
                console.log(response)
                if (response.ok) {
                    closeModal();
                    return;
                }
                if (response.status === 401) {
                    const errors = {}
                    errors['invalid'] = "Invalid credentials";
                    setErrors(errors);
                    return;
                }
                else {
                    const errors = {};
                    errors["credential"] = "Username must be at least 4 characters long";
                    errors["password"] = "Password must be at least 6 characters long";
                    setErrors(errors);
                    return;

                }
            });
        return;
    }

    return (
        <div className='login-form-parent'>
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Log In</h2>
                {hasSubmit && errors.invalid &&
                    <p className="errors">{errors.invalid}</p>}
                {hasSubmit && errors.credential &&
                    <p className="errors">{errors.credential}</p>}
                {hasSubmit && errors.password &&
                    <p className="errors">{errors.password}</p>}

                        <input
                            type="text"
                            value={credential}
                            placeholder="Username or Email"
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                
                        <input
                            type="password"
                            value={password}
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                
                        <button type="submit"
                        >
                                Log In
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