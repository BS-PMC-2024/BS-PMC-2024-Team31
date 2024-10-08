import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import emailjs from "@emailjs/browser";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "", // New field
    userType: "student", // Default value
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const url = `http://localhost:3001/api/users`;
      const { data: res } = await axios.post(url, data);

      try {
        await emailjs.send(
          "service_061uyjc",
          "template_qejy7ja",
          { to_email: data.email },
          "Ac1RL4TgJZVZgpMSY"
        );
        console.log("Email sent successfully");
      } catch (emailError) {
        console.error("Failed to send email:", emailError.text);
      }

      navigate("/login");
      console.log("User created successfully:", res.message);
    } catch (error) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status <= 500) {
          setError(error.response.data.message);
        } else {
          console.error("An unexpected error occurred:", error.message);
        }
      } else {
        console.error("Network error or no response from the server:", error.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Create Account</h1>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
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
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              value={data.confirmPassword}
              required
              className={styles.input}
            />
            <select
              name="userType"
              onChange={handleChange}
              value={data.userType}
              required
              className={styles.input}
            >
              <option value="student">Student</option>
              <option value="worker">Worker</option>
            </select>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.submit_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
