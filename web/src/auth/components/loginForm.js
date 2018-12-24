import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FormControl } from "react-bootstrap";
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const required = value => value ? undefined : 'Required!'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div style={{ marginBottom: 10 }}>
            {touched && ((error && <span style={{ fontWeight: "bold", color: "red" }}>{error}</span>))}
            <FormControl {...input} placeholder={label} type={type} />
    </div>
)

const Button = styled.button`
    color: white;
    cursor: pointer;
    background-color: #e50914;
    line-height: normal;
    margin: 18px 3% 0 0;
    padding: 7px 17px;
    font-weight: 100;
    border: transparent;
    border-radius: 3px;
    font-size: 16px;
    text-decoration: one;
    width: 100%;

    ${props => props.right && css`
        float: right;
    `}
    &:hover {
        background-color: #E53935;
    }
`;

const LoginForm = (props) => {
    const { handleSubmit, submitting } = props
    return (
        <form onSubmit={handleSubmit} style={{ marginTop: 50, marginBottom: 50 }}>
            <Field name="username" type="text"
                component={renderField} label="Username"
                validate={required}
            />
            <Field name="password" type="password"
                component={renderField} label="Password"
                validate={required}
            />
            <div style={{ marginTop: 10 }}>
                <Button type="submit" disabled={submitting} color="primary" >Sign In</Button>
            </div>
            <p style={{ marginTop: 5, textAlign: "center" }}>New to iPlix? <Link className="hoverLink" to="/register" style={{ fontWeight: "bold" }}>Sign up now</Link>.</p>
        </form>
    )
}

export default reduxForm({
    form: 'LoginForm' // a unique identifier for this form
})(LoginForm)