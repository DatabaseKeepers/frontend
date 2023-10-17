import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home/Home";
import ImageUpload from "./components/ImageUpload";
import NavBar from "./components/NavBar";
import SigninForm from "./components/SigninForm";
import Signup from "./components/Signup";
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
            <Route path="signin" Component={SigninForm} />
            <Route path="signup" Component={Signup} />
            <Route path="upload" element={<ImageUpload />} />
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
