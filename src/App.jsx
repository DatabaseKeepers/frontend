import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home/Home";
import ImageUpload from "./components/ImageUpload";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import SigninForm from "./components/SigninForm";
import Signup from "./components/Signup";
import SecondOpinion from "./components/SecondOpinion";
import ViewPatients from "./components/ViewPatients";
import { FirebaseAuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <FirebaseAuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route>
            <Route index Component={Home} />
            <Route path="dashboard" Component={Dashboard} />
            <Route path="profile" Component={Profile} />
            <Route path="signin" Component={SigninForm} />
            <Route path="signup" Component={Signup} />
            <Route path="secondopinion" Component={SecondOpinion} />
            <Route path="patients" Component={ViewPatients}/>
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
    </FirebaseAuthProvider>
  );
}

export default App;
