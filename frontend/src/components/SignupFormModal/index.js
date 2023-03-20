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
    const [dynamicErrors, setDynamicErrors] = useState({});
    const { closeModal } = useModal();


    useEffect(() => {
        const errors = {};
        if(!email.length) errors["submit"] = "Fields must not be empty";
        if(!firstName.length) errors["submit"]= "Fields must not be empty";
        if (!lastName.length) errors["submit"] = "Fields must not be empty";
        if(username.length < 4) errors["submit"] = "Username must be at least 4 characters long";
        if(password.length < 6) errors["submit"] = "Password must be at least 6 characters long";
        if(password !== confirmPassword) errors["submit"] = "Passwords do not match";
        setDynamicErrors(errors);
    }, [email, firstName, lastName, username, password, confirmPassword]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(sessionActions.thunkSignup({ email, username, firstName, lastName, password }))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
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
                <div>
                    <input
                        type="text"
                        value={firstName}
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={lastName}
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit"
                        disabled={Object.keys(dynamicErrors).length}
                        className={Object.keys(dynamicErrors).length ? "disabled" : "enabled"}

                >Sign Up
                </button>
                
            </form>
        </div>
            




    
    );
}

export default SignupFormModal;