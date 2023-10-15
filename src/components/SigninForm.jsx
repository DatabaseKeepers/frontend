import { useLocation, useNavigate } from "react-router-dom";
import RadioArchiveLogo from "../assets/RadioArchiveLogo.png";
import Signin from "./Signin";
import "./Form.css";

function SigninForm() {
  const { state } = useLocation();
  const { role } = state;

  function Patientsignin() {
    const navigate = useNavigate();

    const patientSpan = {
      color: "#479f76",
      paddingRight: "5px",
    };

    const physicianSpan = {
      color: "#0D6EFD",
      paddingRight: "5px",
    };

    const radiologistSpan = {
      color: "#DC3545",
      paddingRight: "5px",
    };

    const roleSpan = (role) => {
      switch (role) {
        case "Patient":
          return patientSpan;
        case "Physician":
          return physicianSpan;
        case "Radiologist":
          return radiologistSpan;
        default:
          return patientSpan;
      }
    };

    return (
      <div className="signinWrapper">
        <div className="signinContainer">
          <form className="form">
            <div className="form-row">
              <h1>
                <img src={RadioArchiveLogo} />
                <span className="titleSpans" id="radiology">
                  Radiology
                </span>
                <span className="titleSpans" id="archive">
                  Archive
                </span>
              </h1>
            </div>
          </form>
          <h2 className="userType">
            <span style={roleSpan(role)}>{role}</span>Portal
          </h2>
          <Signin />
          <div className="option">
            <a onClick={() => navigate("/signup")}>New User?</a>
            <a onClick={() => navigate("/signup")}>
              <button>Sign Up</button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <Patientsignin />;
}

export default SigninForm;
