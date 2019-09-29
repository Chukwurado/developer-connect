import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { email, password } = formData;

    const handleChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        console.log("SUCCESS");
    };
    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Sign Into Your Account
            </p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        onChange={handleChange}
                        value={email}
                        type="email"
                        placeholder="Email Address"
                        name="email"
                    />
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange}
                        value={password}
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                    />
                </div>

                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                />
            </form>
            <p className="my-1">
                Dont't have an account?{" "}
                <Link to="/register">Create Account</Link>
            </p>
        </Fragment>
    );
};

export default Login;
