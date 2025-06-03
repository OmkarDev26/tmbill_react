import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Dashboard from "./Dashboard/Dashboard";
import PasswordLink from "./ForgotPassword/PasswordLink";
import ResetPassword from "./ForgotPassword/ResetPassword";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset" element={<PasswordLink />} />
        <Route path="/set_pass" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
