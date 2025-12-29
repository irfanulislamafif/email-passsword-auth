import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { Link } from "react-router";
import { auth } from "../Firebase/firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [error, setError] = useState("");
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setError(error.message);
        if (!result.user.emailVerified) {
          alert("Your email is not verified. Please verify your email.");
        }
      })
      .catch((error) => console.log(error.message));
  };
  const handleTogglePasswordShow = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    console.log("forget password clicked", email);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please check your email");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card bg-base-100 w-full m-auto mt-8 max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold">Login now!</h1>
        <form onSubmit={handleLogin}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />
            <label className="label">Password</label>

            <div className="relative ">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input"
                placeholder="Password"
              />
              <button
                onClick={handleTogglePasswordShow}
                className="absolute top-2 right-5 btn btn-xs">
                {showPassword ? <FaEyeSlash /> : <FaEye></FaEye>}
              </button>
            </div>
            <div onClick={handleForgetPassword}>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <p>
          New to Our Website? Please{" "}
          <Link className="text-blue-400 underline" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
`                                               `;

export default Login;
