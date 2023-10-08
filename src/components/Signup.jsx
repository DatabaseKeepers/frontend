import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpWithEmailAndPasswordLocally } from "../api.js";

function Signup() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    "bday-year": "",
    "bday-month": "",
    "bday-day": "",
    first_name: "",
    last_name: "",
    title: "",
    role: "PATIENT",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const email = input.email.toLowerCase().trim();
    const password = input.password;
    const dob = `${input["bday-year"]}-${input["bday-month"]}-${input[
      "bday-day"
    ]
      .toString()
      .padStart(2, 0)}`;
    const first_name = input.first_name;
    const last_name = input.last_name;
    const title = input.title;
    const role = input.role;
    console.log(input);

    signUpWithEmailAndPasswordLocally(
      email,
      password,
      dob,
      first_name,
      last_name,
      title,
      role
    )
      .then((data) => {
        if (data.errors) {
          setError(data.errors[0].msg);
        } else {
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <form autoComplete="off" className="form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="form-row">
          <input
            name="first_name"
            type="text"
            onChange={handleChange}
            value={input.first_name}
            required
            autoComplete="true"
            placeholder="First Name"
          />
          <input
            name="last_name"
            type="text"
            onChange={handleChange}
            value={input.last_name}
            required
            autoComplete="true"
            placeholder="Last Name"
          />
        </div>
        <div className="form-row">
          <select
            className="form-select"
            name="title"
            onChange={handleChange}
            value={input["title"]}
          >
            <option default hidden value="">
              Title
            </option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Ms.">Ms.</option>
            <option value="Dr.">Dr.</option>
          </select>
          <select
            className="form-select"
            name="title"
            onChange={handleChange}
            value={input["role"]}
          >
            <option value="PATIENT">Patient</option>
            <option value="PHYSICIAN">Physician</option>
            <option value="RADIOLOGIST">Radiologist</option>
          </select>
        </div>
        <div className="form-row">
          <div className="form-label">
            <label>
              <span>Date of Birth</span>
              <select
                autoComplete="bday-month"
                className="form-select"
                name="bday-month"
                required
                onChange={handleChange}
                value={input["bday-month"]}
              >
                <option default disabled hidden value="">
                  Month
                </option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <input
                autoComplete="bday-day"
                name="bday-day"
                onChange={handleChange}
                placeholder="Day"
                type="number"
              />
              <input
                autoComplete="bday-year"
                name="bday-year"
                onChange={handleChange}
                placeholder="Year"
                type="string"
              />
            </label>
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">
            <label htmlFor="email">
              <span>Email</span>
            </label>
          </div>
          <input
            id="email"
            name="email"
            type="text"
            onChange={handleChange}
            value={input.email}
            required
            autoComplete="true"
          />
        </div>
        <div className="form-row">
          <div className="form-label">
            <label htmlFor="password">
              <span>Password</span>
            </label>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={input.password}
            required
            autoComplete="true"
          />
        </div>
        <div className="form-row">
          <div className="btn">
            {error ? <p style={{ color: "red" }}>{error}</p> : null}
            <button title="Signup" aria-label="Signup" type="submit">
              Sign Up
            </button>
          </div>
        </div>
      </form>
      <div className="option">
        <p>
          Have an account? <a onClick={() => navigate("/signin")}>Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
