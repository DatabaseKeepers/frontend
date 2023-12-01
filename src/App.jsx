import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddPatient from "./components/AddPatient";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home/Home";
import ImageLibrary from "./components/ImageLibrary";
import ImageUpload from "./components/ImageUpload";
import ImageView from "./components/ImageView";
import Invoices from "./components/Invoices";
import NavBar from "./components/NavBar";
import Notifications from "./components/Notifications";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import SecondOpinion from "./components/SecondOpinion";
import SigninForm from "./components/SigninForm";
import Signup from "./components/Signup";
import ResetPassword from './components/ResetPassword';
import ViewPatients from "./components/ViewPatients";
import { FirebaseAuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import ContactPage from "./components/ContactPage";
import WorkWithUs from "./components/WorkWithUs";

function App() {
  return (
    <FirebaseAuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route>
              <Route index Component={Home} />
              <Route path="dashboard" Component={Dashboard} />
              <Route path="profile" Component={Profile} />
              <Route path="signin" Component={SigninForm} />
              <Route path="signup" Component={Signup} />
              <Route path="reset-password" Component={ResetPassword} />
              <Route path="secondopinion" Component={SecondOpinion} />
              <Route path="patients" Component={ViewPatients} />
              <Route path="notifications" Component={Notifications} />
              <Route path="addpatient" Component={AddPatient} />
              <Route path="imagelibrary" Component={ImageLibrary} />
              <Route path="imageview" Component={ImageView} />
              <Route path="invoices" Component={Invoices} />
              <Route path="contact" Component={ContactPage} />
              <Route path="work" Component={WorkWithUs} />
              <Route
                path="upload"
                element={
                  <PrivateRoute>
                    <ImageUpload />
                  </PrivateRoute>
                }
              />
              <Route
                path="*"
                Component={() => (
                  <h1 style={{ textAlign: "center" }}>
                    There is nothing on this page.
                  </h1>
                )}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </FirebaseAuthProvider>
  );
}

export default App;
