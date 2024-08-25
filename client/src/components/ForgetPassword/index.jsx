import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await axios.post("http://localhost:3001/api/auth/forgetpassword", { email });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response.data.message || "An error occurred while sending the verification code.");
    }
  };

  return (
    <div className={styles.forgot_password_container}>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <h1>Forgot Password</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.green_btn}>
          Send Verification Code
        </button>
        {message && <div className={styles.success_msg}>{message}</div>}
        {error && <div className={styles.error_msg}>{error}</div>}
      </form>
    </div>
  );
};

export default ForgetPassword;