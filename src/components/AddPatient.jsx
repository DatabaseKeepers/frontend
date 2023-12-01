import React from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants.js";
import Banner from "./Banner";
import WebFooter from "./WebFooter";
import { useAuth } from "../contexts/AuthContext";

function AddPatient() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      "bday-year": "",
      "bday-month": "",
      "bday-day": "",
      first_name: "",
      last_name: "",
    },
  });

  const navigate = useNavigate();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    const email = data.email.toLowerCase().trim();
    const dob = `${data["bday-year"]}-${data["bday-month"]}-${data["bday-day"]
      .toString()
      .padStart(2, 0)}`;
    const first_name = data.first_name;
    const last_name = data.last_name;

    await fetch(`${API_URL}/api/auth/add-patient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
      body: JSON.stringify({
        email,
        dob,
        first_name,
        last_name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setError("root.serverError", { message: data.errors[0].msg });
        } else {
          navigate("/patients");
        }
      })
      .catch((err) => console.log(err));
  };

  const errorText = {
    color: "red",
  };
  const divStyle = {
    marginLeft: "80px",
    marginTop: "50px",
    marginBottom: "50px",
  };
  const headerStyle = {
    color: "#0D6EFD",
  };
  const descriptionStyle = {
    fontSize: "20px",
  };

  return (
    <>
      <Banner text="Patient Center" />
      <div style={divStyle}>
        <h2 style={headerStyle}>Add Your New Patient</h2>
        <p style={descriptionStyle}>
          Please enter the necessary information for your patient below.
        </p>
      </div>
      <Container
        style={{ height: "100vh", maxWidth: "1250px" }}
        className="bg-white overflow-auto px-5"
      >
        <Row className="">
          <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label htmlFor="first_name">Patient's Name</Form.Label>
                  <Form.Control
                    as="input"
                    id="first_name"
                    name="first_name"
                    type="text"
                    {...register(
                      "first_name" /*, { required: "First name is required", }*/
                    )}
                    autoComplete="true"
                    placeholder="First Name"
                    aria-label="First Name"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="align-items-end mb-4">
              <Col>
                <Form.Group>
                  <Form.Control
                    as="input"
                    id="last_name"
                    name="last_name"
                    type="text"
                    {...register(
                      "last_name" /*, { required: "Last name is required", }*/
                    )}
                    autoComplete="true"
                    placeholder="Last Name"
                    aria-label="Last Name"
                  />
                  {errors.first_name && (
                    <p style={errorText}>{errors.first_name.message}</p>
                  )}
                  {errors.last_name && (
                    <p style={errorText}>{errors.last_name.message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="align-items-end mb-4">
              <Col>
                <Form.Group>
                  <Form.Label htmlFor="dob">Patient's Date of Birth</Form.Label>
                  <Form.Select
                    autoComplete="bday-month"
                    className="form-select"
                    id="dob"
                    name="bday-month"
                    {...register(
                      "bday-month" /*, { required: "Month is required", }*/
                    )}
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
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    autoComplete="bday-day"
                    name="bday-day"
                    placeholder="Day"
                    type="number"
                    {...register(
                      "bday-day" /*,{ required: "Day is required", }*/
                    )}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    autoComplete="bday-year"
                    name="bday-year"
                    {...register(
                      "bday-year" /*, { required: "Year is required", minLength: 4, maxLength: 4, }*/
                    )}
                    placeholder="Year"
                    type="string"
                  />
                </Form.Group>
              </Col>
              {errors["bday-month"] && (
                <p style={errorText}>{errors["bday-month"].message}</p>
              )}
              {errors["bday-day"] && (
                <p style={errorText}>{errors["bday-day"].message}</p>
              )}
              {errors["bday-year"] && (
                <p style={errorText}>{errors["bday-year"].message}</p>
              )}
            </Row>

            <Row className="mb-4">
              <Col>
                <Form.Group>
                  <Form.Label htmlFor="email">Patient's Email</Form.Label>
                  <Form.Control
                    as="input"
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email" // Set the placeholder text here
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

            <Row className="text-danger text-center">
              {errors.root ? <p>{errors.root.serverError.message}</p> : null}
            </Row>

            <Row>
              <ButtonGroup>
                <Button
                  aria-label="Add New Patient"
                  className="my-5 rounded"
                  title="Add New Patient"
                  type="submit"
                >
                  Add New Patient
                </Button>
              </ButtonGroup>
            </Row>
            <Row>
              <Col>
                <Button
                  onClick = {() => navigate("/dashboard")}
                  className = "my-5 rounded w-100"
                >
                  Back to Dashboard
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
        
      </Container>
      <WebFooter />
    </>
  );
}

export default AddPatient;
