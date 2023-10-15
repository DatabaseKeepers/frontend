import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RadioArchiveLogo from "../assets/RadioArchiveLogo.png";
import { useAuth } from "../contexts/AuthContext";
import "./Form.css";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      "bday-year": "",
      "bday-month": "",
      "bday-day": "",
      first_name: "",
      last_name: "",
      title: "",
      role: "PATIENT",
    },
  });
  const navigate = useNavigate();
  const { signup } = useAuth();

  const onSubmit = (data) => {
    const email = data.email.toLowerCase().trim();
    const password = data.password;
    const dob = `${data["bday-year"]}-${data["bday-month"]}-${data["bday-day"]
      .toString()
      .padStart(2, 0)}`;
    const first_name = data.first_name;
    const last_name = data.last_name;
    const title = data.title;
    const role = data.role;

    signup(email, password, dob, first_name, last_name, title, role)
      .then((data) => {
        if (data.errors) {
          setError("root.serverError", { message: data.errors[0].msg });
        } else {
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  const errorText = {
    color: "red",
  };

  return (
    <div className="signinWrapper">
      <div className="signinContainer">
        <div>
          <form
            autoComplete="off"
            className="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1>
              <img src={RadioArchiveLogo} />
              <span className="titleSpans" id="radiology">
                Radiology
              </span>
              <span className="titleSpans" id="archive">
                Archive
              </span>
            </h1>

            <div className="form-row">
              <span>Role</span>
              <select className="form-select" name="role" {...register("role")}>
                <option default hidden value="">
                  Choose a role
                </option>
                <option value="PATIENT">Patient</option>
                <option value="PHYSICIAN">Physician</option>
                <option value="RADIOLOGIST">Radiologist</option>
              </select>
              <span>Title</span>
              <select
                className="form-select"
                name="title"
                {...register("title")}
              >
                <option default hidden value="">
                  Title
                </option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Dr.">Dr.</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-label">
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
                    placeholder="Enter your email" // Set the placeholder text here
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Email address must be valid",
                      },
                    })}
                    autoComplete="true"
                    aria-invalid={errors.email ? "true" : "false"}
                    style={{ width: "100%", maxWidth: "500px" }} // Adjust the width as needed
                  />
                  {errors.email && (
                    <p style={errorText}>{errors.email.message}</p>
                  )}
                </div>
                <span>Your Name</span>
                <div className="form-row">
                  <input
                    name="first_name"
                    type="text"
                    {...register("first_name", {
                      required: "First name is required",
                    })}
                    autoComplete="true"
                    placeholder="First Name"
                  />
                  <input
                    name="last_name"
                    type="text"
                    {...register("last_name", {
                      required: "Last name is required",
                    })}
                    autoComplete="true"
                    placeholder="Last Name"
                  />
                  {errors.first_name && (
                    <p style={errorText}>{errors.first_name.message}</p>
                  )}
                  {errors.last_name && (
                    <p style={errorText}>{errors.last_name.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-label">
                <label>
                  <span>DOB</span>
                  <select
                    autoComplete="bday-month"
                    className="form-select"
                    name="bday-month"
                    {...register("bday-month", {
                      required: "Month is required",
                    })}
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
                  <div className="flex">
                    <input
                      autoComplete="bday-day"
                      name="bday-day"
                      placeholder="Day"
                      type="number"
                      {...register("bday-day", { required: "Day is required" })}
                    />
                    <input
                      autoComplete="bday-year"
                      name="bday-year"
                      {...register("bday-year", {
                        required: "Year is required",
                        minLength: 4,
                        maxLength: 4,
                      })}
                      placeholder="Year"
                      type="string"
                    />
                  </div>
                  {errors["bday-month"] && (
                    <p style={errorText}>{errors["bday-month"].message}</p>
                  )}
                  {errors["bday-day"] && (
                    <p style={errorText}>{errors["bday-day"].message}</p>
                  )}
                  {errors["bday-year"] && (
                    <p style={errorText}>{errors["bday-year"].message}</p>
                  )}
                </label>
              </div>
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
                placeholder="Create your password" // Set the placeholder text here
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                aria-invalid={errors.password ? "true" : "false"}
                style={{ width: "100%", maxWidth: "500px" }} // Adjust the width as needed
              />
              {errors.password && (
                <p style={errorText}>{errors.password.message}</p>
              )}
            </div>
            <div className="form-row">
              <div className="btn">
                {errors.root ? (
                  <p style={errorText}>{errors.root.serverError.message}</p>
                ) : null}
                <button
                  title="Signup"
                  aria-label="Signup"
                  type="submit"
                  style={{
                    width: "400px", // Increase the width as needed
                    height: "35px", // Increase the height as needed
                    backgroundColor: "#0D6EFD",
                    borderRadius: "3px",
                    border: "none",
                    color: "white",
                    marginBottom: "75px",
                    marginTop: "25px",
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
          <div className="option">
            <a onClick={() => navigate("/signin")}>Returning User?</a>
            <a onClick={() => navigate("/signin")}>
              <button>Sign In</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
