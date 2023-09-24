import { useRef, useState } from 'react';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef('');
  const passwordInputRef = useRef('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      // Handle login
    } else {
      setLoading(true);

      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuHwlQ6ztLeFqUJm6zv-XHogMy4BsqBBM', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if (res.ok) {
            // Sign-up successful, you can handle it as needed
          } else {
            return res.json().then((data) => {
              console.log(data.error.message); // Log the error message
            });
          }
        })
        .catch((error) => {
          console.error('Error:', error); // Log any other errors
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button
            type='submit'
            disabled={isLoading}
          >
            {isLogin ? 'Login' : 'Create Account'}
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
