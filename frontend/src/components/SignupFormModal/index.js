import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignUpForm.css';

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();


    useEffect(() => {
        const errors = {};
        if(!email.length) errors["email"] = "Fields must not be empty";
        if(!firstName.length) errors["firstName"]= "Fields must not be empty";
        if (!lastName.length) errors["lastName"] = "Fields must not be empty";
        if(username.length < 4) errors["username"] = "Username must be at least 4 characters long";
        if(password.length < 6) errors["password"] = "Password must be at least 6 characters long";
        if(password !== confirmPassword) errors["password"] = "Passwords do not match";
        setErrors(errors);
    }, [email, firstName, lastName, username, password, confirmPassword]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors({});
            dispatch(sessionActions.thunkSignup({ email, username, firstName, lastName, password }))
                .then(async (response) => {
                    console.log(response);

                    if (response.statusCode === 403) {
                        setErrors(response.errors);
                        return;
                    }
                    if (response.statusCode === 400) {
                        setErrors(response.errors);
                        return;
                    }
                    
                    closeModal()
                    
                    return;
                });
            return;
        }
        
        return alert('Password fields must match');
    };

    return (
        <div className='signup-form-parent'>
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                {errors["email"] &&
                <p className="errors">{errors["email"]}</p>}
                {errors["username"] &&
                    <p className="errors">{errors["username"]}</p>}
                {errors["firstName"] &&
                    <p className="errors">{errors["firstName"]}</p>}
                {errors["lastName"] &&
                    <p className="errors">{errors["lastName"]}</p>}
                {errors["password"] &&
                    <p className="errors">{errors["password"]}</p>}

                    <input
                        type="text"
                        value={firstName}
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        value={lastName}
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                <button type="submit"
                        disabled={Object.keys(errors).length}
                        className={Object.keys(errors).length ? "disabled-sign-up" : "enabled-sign-up"}

                >Sign Up
                </button>
                
            </form>
        </div>
            




    
    );
}

export default SignupFormModal;