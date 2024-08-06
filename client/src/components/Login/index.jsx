import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
  
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleForgotPassword = () => {
    // Link for reset password 
    window.location.href = '/forgot-password';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/auth"; // Corrected URL string
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("email", data.email);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAdmin", res.data.isAdmin);

      const userUrl = `http://localhost:3000/api/user/email/${data.email}`;
      const { data: user } = await axios.get(userUrl);
      
      if (res.data.isAdmin) {
        navigate("/homepageadmin");
      } else if (user.userType === "student") {
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
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />

            <button type="button" onClick={handleForgotPassword} className={styles.forgot_password_btn}>
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
  );
};

export default Login;
