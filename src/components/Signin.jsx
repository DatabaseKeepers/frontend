import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { API_URL } from "../constants.js";
import { Button, Col, Form, Row } from "react-bootstrap";

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
  const { state } = useLocation();
  const navigate = useNavigate();
  const { signin } = useAuth();

  const onSubmit = async (data) => {
    const email = data.email.toLowerCase().trim();
    const password = data.password;

    const permitted = await fetch(API_URL + "/api/auth/portal/" + state.role, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).then((res) => {
      if (res.status === 200) return true;
      else return false;
    });

    if (permitted) {
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
    } else {
      setError("root.serverError", {
        message: "Unable to login through this portal",
      });
    }
  };

  const loginButtonStyle = {
    backgroundColor: "#0D6EFD",
    borderRadius: "3px",
    width: "16rem",
    border: "none",
    color: "white",
    height: "35px",
    marginTop: "1rem",
    marginBottom: "1.25rem",
    alignSelf: "center",
  };

  return (
    <Row>
      <Form
        autoComplete="off"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group>
          <Row className="form-row">
            <Col>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                {...register("email", {
                  required: "Email address is required",
                })}
                as="input"
                id="email"
                name="email"
                placeholder="user@example.com"
                style={{ width: "16rem" }}
                autoComplete="true"
                aria-label="email"
              />
              {errors.email && (
                <p className="text-danger fw-semibold">
                  {errors.email.message}
                </p>
              )}
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row className="form-row">
            <Col>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                {...register("password", { required: "Password is required" })}
                id="password"
                name="password"
                type="password"
                style={{ width: "16rem" }}
                autoComplete="true"
                aria-label="password"
              />
              {errors.password && (
                <p className="text-danger fw-semibold">
                  {errors.password.message}
                </p>
              )}
            </Col>
          </Row>
        </Form.Group>
        <Row className="form-row text-center">
          <Col>
            <Button
              style={loginButtonStyle}
              title="Signin"
              aria-label="Signin"
              type="submit"
            >
              Log In
            </Button>
            {errors.root ? (
              <p className="text-danger fw-semibold">
                {errors.root.serverError.message}
              </p>
            ) : null}
          </Col>
        </Row>
      </Form>
    </Row>
  );
}

export default Signin;
