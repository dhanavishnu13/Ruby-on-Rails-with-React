import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Dashboard from "./features/Dashboard";
import Home from "./pages/Home";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Registration from "./features/auth/Registration";
import Expenses from "./features/expenses/Expenses";
// import { Navigate } from "react-router-dom";
import { redirect } from "react-router-dom";

export default function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [user,setUser]=useState({})
  const handleLogin = (data) => {
    setLoggedInStatus("LOGGED_IN");
  };

  const handleLogout = () => {
    setLoggedInStatus("NOT_LOGGED_IN");
  };

  const handleSuccessfulAuth = (data) => {
    handleLogin(data);
  };

  useEffect(() => {
    // checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3000/logged_in", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
          setLoggedInStatus("LOGGED_IN");
          setUser(response.data.user)
        } else if (!response.data.logged_in && loggedInStatus === "LOGGED_IN") {
          setLoggedInStatus("NOT_LOGGED_IN");
          setUser({})
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
  };
  checkLoginStatus()

  return (
    <div className="app">
      <BrowserRouter>
      
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/expenses">Expenses</Link>
            </li>
            <li>
              <Link to="/registration">Registration</Link>
            </li>
          </ul>
        </nav> */}
        <Routes>
          <Route
            path="/"
            element={<Home loggedInStatus={loggedInStatus} handleLogin={handleLogin} handleLogout={handleLogout} />}
          />
          <Route path="/dashboard" element={<Dashboard loggedInStatus={loggedInStatus} />} />
          <Route path="/expenses" element={<Expenses loggedInStatus={loggedInStatus} />} />
          <Route
            path="/registration"
            element={<Registration handleSuccessfulAuth={handleSuccessfulAuth} loggedInStatus={loggedInStatus} />}
          />
        </Routes>
        {loggedInStatus==="LOGGED_IN"?<Navigate to="/expenses"/>:""}
      </BrowserRouter>
    </div>
  );
}
