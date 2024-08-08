import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Navbar from '../Navbar/Navbar';
import styles from "./styles.module.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleForgotPassword = () => {
    // link for reset password 
    window.location.href = '/forgot-password';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3001/api/auth"; // Corrected URL string
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("email", data.email);
      localStorage.setItem("token", res.token); // Updated to match response structure
      localStorage.setItem("isAdmin", res.isAdmin);

      const userUrl = `http://localhost:3001/api/user/email/${data.email}`;
      const { data: user } = await axios.get(userUrl, {
        headers: {
          'Authorization': `Bearer ${res.token}` // Include token in request headers
        }
      });

      if (user.userType === "student") {
        navigate("/homePageStudent");
      } else if (user.userType === "worker") {
        navigate("/homePageWorker");
      } else {
        navigate("/login");
      }

    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      } else {
        setError("Server error");
      }
    }
  };

  return (
    <div>
      <Navbar /> {/* Ensure the Navbar component is included */}
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1 style={{ color: '#a7cab1' }}>Login To Your Account</h1>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
                data-testid="email"
              />
              <div className={styles.password_container}>
                <input
                  type={passwordVisible ? "text" : "password"} // Toggle input type
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                  className={styles.input}
                />
                <span
                  className={styles.eye_icon}
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
                >
                  {passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />} {/* Toggle icon */}
                </span>
              </div>
              <button type="button" onClick={handleForgotPassword} className="forgot-password-btn">
                Forgot Password?
              </button>
              {error && <div className={styles.error_msg}>{error}</div>}
              <button type="submit" className={styles.green_btn} data-testid="login-button">
                Sign In
              </button>
            </form>
          </div>
          <div className={styles.right}>
            <h1>New Here?</h1>
            <Link to="/signup">
              <button type="button" className={styles.white_btn}>
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
