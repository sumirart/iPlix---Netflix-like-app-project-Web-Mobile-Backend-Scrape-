import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FormControl } from "react-bootstrap";
import styled, { css } from 'styled-components';

// FIELD VALIDATION
const required = value => value ? undefined : 'Required!';
const minLength = min => value =>
value && value.length < min ? `Must be ${min} character or more` : undefined;
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address!' : undefined;

// FIELD FORM
const renderField = ({ input, label, type, meta: { touched, error } }) => (
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

const RegisterForm = (props) => {
    const { handleSubmit, submitting } = props
    return (
        <form onSubmit={handleSubmit} style={{ marginTop: 50, marginBottom: 50 }}>
            <Field name="username" type="text"
                component={renderField} label="Username"
                validate={[required, minLength(3)]}
            />
            <Field name="email" type="email"
                component={renderField} label="Email"
                validate={[email, required]}
            />
            <Field name="name" type="text"
                component={renderField} label="Name"
                validate={required}
            />
            <Field name="password" type="password"
                component={renderField} label="Password"
                validate={[required, minLength(6)]}
            />
            <div style={{ marginTop: 10 }}>
                <Button type="submit" disabled={submitting} color="primary" >Register</Button>
            </div>
            <p style={{ marginTop: 5, textAlign: "center" }}>Have an account? <a className="hoverLink" href="/login" style={{ fontWeight: "bold" }}>Sign in</a>.</p>
        </form>
    )
}

export default reduxForm({
    form: 'RegisterForm' // a unique identifier for this form
})(RegisterForm)