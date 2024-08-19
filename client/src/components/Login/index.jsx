import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
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
        const url = "http://localhost:3001/api/auth";
        const { data: res } = await axios.post(url, data);

        const { token, isAdmin } = res.data;

        localStorage.setItem("email", data.email);
        localStorage.setItem("token", token);
        localStorage.setItem("isAdmin", isAdmin);

        // Store user's first name in localStorage
        const userUrl = `http://localhost:3001/api/user/email/${data.email}`;
        const { data: user } = await axios.get(userUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        localStorage.setItem("user", JSON.stringify({ firstName: user.firstName }));

        // Navigate based on user type
        if (isAdmin) {
            navigate("/homePageAdmin");
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
    <div>
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1 style={{ color: '#46564a' }}>Login To Your Account</h1>
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
        </div>
      </div>
    </div>
  );
};

export default Login;
