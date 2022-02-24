import axios from 'axios';
import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './login.css';

export default function Login() {
   const userRef = useRef();
   const passwordRef = useRef();
   const { dispatch, isFetching, user } = useContext(Context);

   const handleSubmit = async e => {
      e.preventDefault();
      dispatch({ type: 'LOGIN_START' });

      try {
         const res = await axios.post('/auth/login', {
            username: userRef.current.value,
            password: passwordRef.current.value,
         });

         dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      } catch (err) {
         dispatch({ type: 'LOGIN_FAILURE' });
      }
   };

   console.log(user);
   console.log(isFetching);

   return (
      <div className="login">
         <span className="loginTitle">Login</span>

         <form className="loginForm" onSubmit={handleSubmit}>
            <label>User name</label>
            <input
               className="loginInput"
               type="text"
               placeholder="Enter your User name..."
               ref={userRef}
            />

            <label>Password</label>
            <input
               className="loginInput"
               type="password"
               placeholder="Enter your password..."
               ref={passwordRef}
            />

            <button className="loginButton" type="submit">
               Login
            </button>
         </form>

         <button className="loginRegisterButton">
            <Link className="link" to="/register">
               Register
            </Link>
         </button>
      </div>
   );
}
