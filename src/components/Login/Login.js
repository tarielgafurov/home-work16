import React, { useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const USER = 'USER_INPUT'
const INPUT = 'INPUT_BLUR'

const emailReducer = (prevState , actions) => {
  if(actions.type === USER){
    return {
      value : actions.emailValue,
      isValid : actions.emailValue.includes('@')
    }
  }
  if(actions.type === INPUT){
    return {
      value : prevState.value,
      isValid : prevState.value.includes('@')
    }
  }
  return{
    value : '',
    isValid : false
  }
} 

const PASSWORD = 'USER_PASSWORD'
const BLUR = 'INPUT_BLUR'

const passwordReducer = (prevState , actions) => {
  if(actions.type === PASSWORD){
    return {
      value : actions.passwordValue , 
      isValid : actions.passwordValue.includes('@'),
    }
  }
  if(actions.type === BLUR){
    return {
      value : prevState.value , 
      isValid : prevState.value.trim().length > 6,
    }
  }
  return {
    value : '',
    isValid : false
  }
}

const Login = (props) => {
  const [emailState , dispatchEmail] = useReducer(emailReducer, {
    isValid : undefined,
    value : ''
  })

  const [passwordState , dispatchPassword] = useReducer(passwordReducer , {
    isValid : undefined ,
    value : ''
  })

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout (() => {
      setFormIsValid((emailState.value.includes('@') && passwordState.value.trim().length > 6))
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  } , [emailState.value , passwordState.value])

  

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);

    dispatchEmail({type : USER , emailValue : event.target.value})

    setFormIsValid(
      event.target.value.includes('@') && passwordState.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type : PASSWORD , passwordValue : event.target.value})

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.includes('@')
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({type : INPUT})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type : BLUR})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin();
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
