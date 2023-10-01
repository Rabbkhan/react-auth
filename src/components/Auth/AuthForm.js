import { useRef, useState } from 'react';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef('');
  const passwordInputRef = useRef('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);
// const [dataflash, setDataflash] = useState(false)
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const resetForm = () => {
    emailInputRef.current.value = '';
    passwordInputRef.current.value = '';
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
setLoading(true);
// setDataflash(true)
let url;

    if (isLogin) {
      // Handle login
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuHwlQ6ztLeFqUJm6zv-XHogMy4BsqBBM'
      
    } else {
      setLoading(true);
url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuHwlQ6ztLeFqUJm6zv-XHogMy4BsqBBM'
}
fetch(url, {
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
     setLoading(false);
     resetForm()

     if (res.ok) {
      return res.json()
       // Sign-up successful, you can handle it as needed
      //  alert('Signup succesfully')
     } else {
       return res.json().then((data) => {
         console.log(data.error.message); // Log the error message
         let errorMessage  = 'Authentication failed';
         throw new Error (errorMessage)
       });
     }
   })
   .then((data)=>{
console.log(data)

   })
   .catch((error) => {
     alert(error.message)
   })
   
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
            type='submit'>
           {!isLoading?(isLogin ? 'Login' : 'Create Account')
           :( <p>Loading...</p>)}
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
