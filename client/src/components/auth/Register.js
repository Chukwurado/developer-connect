import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

import axios from "axios";

const Register = props => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });
    const { name, email, password, password2 } = formData;

    const handleChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            props.setAlert("Passwords do not match", "danger");
        } else {
            props.register({ name, email, password });
        }
    };
    if (props.isAuthenticated) {
        return <Redirect to="/dashboard"></Redirect>;
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Create Your Account
            </p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        onChange={handleChange}
                        value={name}
                        type="text"
                        placeholder="Name"
                        name="name"
                    />
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange}
                        value={email}
                        type="email"
                        placeholder="Email Address"
                        name="email"
                    />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image,
                        use a Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange}
                        value={password}
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange}
                        value={password2}
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Register"
                />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert, register }
)(Register);
