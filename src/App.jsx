import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home/Home";
import SigninForm from "./components/SigninForm";
import Signup from "./components/Signup";
import { FirebaseAuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <FirebaseAuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index Component={Home} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/signin" Component={SigninForm} />
          <Route path="/signup" Component={Signup} />
        </Routes>
      </BrowserRouter>
    </FirebaseAuthProvider>
  );
}

export default App;
