import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [isloading, setLoading] =useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const createAccountHandler = async ()=>{
    setLoading(true);

    try{
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Replace with your actual request
      setLoading(false)
    }catch(eroor){
      setLoading(false)
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
          />
        </div>
        <div className={classes.actions}>
          
          <button
            type='button'
            onClick={createAccountHandler}
            disabled={isloading} // Disable the button while loading
            >
            {isloading ? 'Sending request....' : isLogin ? 'Login' : 'Create Account'}
          </button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
          {isLogin ? 'Create new account' : 'Login with existing account'}
          
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
