import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import booff_logo from "../Assets/booff_logo.png";
import Confirmation from "../confirmation";

function Login_conf() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (event) => {
    try {
      event.preventDefault();
      const login = await fetch(
        `http://localhost:${process.env.REACT_APP_PORT || 5000}/account/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      await login.json().then((response) => {
        if (response.status == 200) {
          sessionStorage.setItem("accessToken", response.accessToken);
          if (response.confirmationToken) { // Check if confirmation token is present in the response
            sessionStorage.setItem("confirmationToken", response.confirmationToken); // Store the confirmation token
          }
          navigate(`/confirm/${sessionStorage.getItem("confirmationToken")}`); // Redirect to confirmation page after successful login
        } else {
          alert("Login Failed");
        }
      });
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  return (
    <div>
      <img className="booff-logga" src={booff_logo} alt=""/>
      <div className="container">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              />
          </div>
        </div>
          <div className="submit-container">
              <button type="submit" className="submit" onClick={handleSignin}>
                Login
              </button>
        </div>
      </div>
    </div>
  );
};

export default Login_conf;
