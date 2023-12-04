import React from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import RadioArchiveLogo from "../assets/RadioArchiveLogo.png";
import { API_URL } from "../constants";
import { useAuth } from "../contexts/AuthContext";


function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
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
      role: "",
      hospital: "",
    },
  });
  const navigate = useNavigate();
  const { signin, signup } = useAuth();

  const [hospitals, setHospitals] = React.useState([]);
  const watchRole = watch("role");

  React.useEffect(() => {
    const getHospitals = async () => {
      const response = await fetch(`${API_URL}/api/hospital/hospitals`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setHospitals(data.hospitals);
    };
    getHospitals();
  }, []);

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
    const hospital = data.hospital;

    signup(email, password, dob, first_name, last_name, title, role, hospital)
      .then((data) => {
        if (data.errors) {
          setError("root.serverError", { message: data.errors[0].msg });
        } else {
          signin(email, password)
            .then((data) => {
              if (data.errors) {
                setError("root.serverError", {
                  message: "The email or password is incorrect",
                });
              } else {
                if (role === "PATIENT") // Patient sign up message fix
                {
                  alert("Share your account email with your physician to get started.");
                }
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
        }
      })
      .catch((err) => console.log(err));
  };

  const errorText = {
    color: "red",
    margin: "5px 0.75rem 0px 0.75rem",
  };

  return (
    <div style={{ backgroundColor: "#5314ba", height: "100vh" }}>
      <Container
        style={{ height: "100vh", maxWidth: "800px" }}
        className="bg-white overflow-auto px-5"
      >
        <Row className="justify-content-center py-3 pt-sm-0">
          <Col className="p-0" xs="auto" sm="auto" md="auto" lg="auto">
            <Image src={RadioArchiveLogo} alt="logo" fluid />
          </Col>
          <Col
            className="p-0 align-self-center"
            xs="auto"
            sm="auto"
            md="auto"
            lg="auto"
          >
            <h2>
              <span className="titleSpans" id="radiology">
                Radiology
              </span>
              <span className="titleSpans" id="archive">
                Archive
              </span>
            </h2>
          </Col>
        </Row>

        <Row className="">
          <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-4">
              <Col xs={5} sm={4}>
                <Form.Group>
                  <Form.Label htmlFor="role">Role <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Select
                    className="form-select"
                    id="role"
                    name="role"
                    {...register("role", { required: true })}
                  >
                    <option default hidden value="">
                      Choose a role
                    </option>
                    <option value="PATIENT">Patient</option>
                    <option value="PHYSICIAN">Physician</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              {watchRole === "PHYSICIAN" && (
                <Col>
                  <Form.Group>
                    <Form.Label htmlFor="hospital">Hospital <span style={{ color: "red" }}>*</span></Form.Label>
                    <Form.Select
                      className="form-select"
                      id="hospital"
                      name="hospital"
                      {...register("hospital", {
                        required: "Hospital is required for physicians",
                        validate: watchRole === "PHYSICIAN",
                      })}
                    >
                      <option default hidden value="">
                        Select hospital
                      </option>
                      {hospitals &&
                        hospitals.map((hospital) => {
                          return (
                            <option key={hospital.uid} value={hospital.uid}>
                              {hospital.name}
                            </option>
                          );
                        })}
                    </Form.Select>
                  </Form.Group>
                </Col>
              )}
            </Row>

            <Row className="align-items-end mb-4">
              <Col xs={3} sm={2}>
                <Form.Group>
                  <Form.Label htmlFor="Title">Title <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Select
                    className=""
                    id="Title"
                    name="title"
                    {...register("title")}
                  >
                    <option default hidden value=""></option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                  </Form.Select>
                  {(errors.first_name || errors.last_name) && <p style={errorText}> &nbsp; </p>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group >
                  <Form.Label htmlFor="first_name"></Form.Label>
                  <Form.Control
                    as="input"
                    id="first_name"
                    name="first_name"
                    type="text"
                    {...register("first_name", {
                      required: "First name is required",
                    })}
                    autoComplete="true"
                    placeholder="First Name"
                    aria-label="First Name"
                  />
                  {errors.first_name && (
                    <p style={errorText}>{errors.first_name.message}</p>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    as="input"
                    id="last_name"
                    name="last_name"
                    type="text"
                    {...register("last_name", {
                      required: "Last name is required",
                    })}
                    autoComplete="true"
                    placeholder="Last Name"
                    aria-label="Last Name"
                  />
                  {errors.last_name && (
                    <p style={errorText}>{errors.last_name.message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="align-items-end mb-4">
              <Col>
                <Form.Group>
                  <Form.Label htmlFor="dob">Date of Birth <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Select
                    autoComplete="bday-month"
                    className="form-select"
                    id="dob"
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
                  </Form.Select>
                  {errors["bday-month"] && (
                    <p style={errorText}>{errors["bday-month"].message}</p>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    autoComplete="bday-day"
                    name="bday-day"
                    placeholder="Day"
                    type="number"
                    {...register("bday-day", {
                      required: "Day is required",
                    })}
                  />
                  {errors["bday-day"] && (
                    <p style={errorText}>{errors["bday-day"].message}</p>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
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
                  {errors["bday-year"] && (
                    <p style={errorText}>{errors["bday-year"].message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col>
                <Form.Group>
                  <Form.Label htmlFor="email">Email <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    as="input"
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
                  />
                  {errors.email && (
                    <p style={errorText}>{errors.email.message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-4">
              <Form.Group>
                <Form.Label htmlFor="password">
                  <span>Password </span><span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  as="input"
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
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p style={errorText}>{errors.password.message}</p>
                )}
              </Form.Group>
            </Row>
            <Row>
              {errors.root ? (
                <p style={errorText}>{errors.root.serverError.message}</p>
              ) : null}
              <ButtonGroup>
                <Button
                  aria-label="Signup"
                  className="my-5 rounded"
                  title="Signup"
                  type="submit"
                >
                  Sign Up
                </Button>
              </ButtonGroup>
            </Row>
            <Container className="d-flex flex-wrap justify-content-center">
              <span>Returning user?&nbsp;</span>
              <Link style={{ color: "#5314ba" }} to="/signin">
                Sign In
              </Link>
            </Container>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;
