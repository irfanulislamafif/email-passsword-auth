import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../Firebase/firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    console.log("register clicked", email, password, terms, name, photo);

    // const length6Pattern = /^.{6,}$/;
    // const casePattern = /^(?=.*[A-Z])(?=.*[a-z]).+$/;
    // const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    const strongPasswordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!strongPasswordPattern.test(password)) {
      console.log("password didn't match");
      setError(
        "Password must be at least 6 characters, include uppercase, lowercase, number, and special character!"
      );
      return;
    }
    // reset status : success or error
    setError("");
    setSuccess(false);
    if (!terms) {
      setError("Please accept our terms and conditions");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("after creation of a new user", result.user);
        setSuccess(true);
        event.target.reset();


// update user profile 


        // sent verification email
        sendEmailVerification(result.user).then(() => {
          alert("email verification sent");
        });
      })
      .catch((error) => {
        console.log("error happen", error.message);
        setError(error.message);
      });
  };
  const handleTogglePasswordShow = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register Now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister} action="">
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  name="name"
                  type="text"
                  className="input"
                  placeholder="Your Name"
                />
                {/* user photo url */}
                <label className="label">Photo Url</label>
                <input
                  name="photo"
                  type="text"
                  className="input"
                  placeholder="Photo URL"
                />
                {/* user email */}
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
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
                <div>
                  <label class="label">
                    <input type="checkbox" name="terms" class="checkbox" />
                    Accept Our Term & Conditions
                  </label>
                </div>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
              {
                success && (
                  <p className="text-green-500">Account Created successfully</p>
                )
                // can be shown here toast
              }
              {error && <p className="text-red-500 font-semibold">{error}</p>}
            </form>
            <p>
              Already have an account? Please{" "}
              <Link className="text-blue-400 underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
