import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const { signin } = useAuth();

  const onSubmit = async (data) => {
    const email = data.email.toLowerCase().trim();
    const password = data.password;

    await signin(email, password)
      .then((data) => {
        if (data.errors) {
          setError("root.serverError", {
            message: "The email or password is incorrect",
          });
        } else {
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        if (err.code === "auth/invalid-login-credentials") {
          setError("root.serverError", {
            message: "The email or password is incorrect",
          });
        } else {
          setError("root.serverError", {
            message: "Something went wrong",
          });
        }
        console.error(err);
      });
  };

  const loginButtonStyle = {
    backgroundColor: "#0D6EFD",
    borderRadius: "3px",
    width: "16rem",
    border: "none",
    color: "white",
    height: "35px",
    marginBottom: "75px",
    marginTop: "25px",
    alignSelf: "center",
  };

  const boldSpan = {
    color: "black",
    fontWeight: "600",
  };

  return (
    <div>
      <form
        autoComplete="off"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-row">
          <div className="form-label">
            <label htmlFor="email">
              <span style={boldSpan}>Email</span>
            </label>
          </div>
          <input
            {...register("email", { required: "Email address is required" })}
            id="email"
            name="email"
            type="text"
            style={{ width: "16rem" }}
            autoComplete="true"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="form-row">
          <div className="form-label">
            <label htmlFor="password">
              <span style={boldSpan}>Password</span>
            </label>
          </div>
          <input
            {...register("password", { required: true })}
            id="password"
            name="password"
            type="password"
            required
            style={{ width: "16rem" }}
            autoComplete="true"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="form-row">
          {errors.root ? <p>{errors.root.serverError.message}</p> : null}
          <button
            style={loginButtonStyle}
            title="Signin"
            aria-label="Signin"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
