import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Home from "./pages/Home";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Registration from "./features/auth/Registration";
import Expenses from "./features/expenses/Expenses";
// import { Navigate } from "react-router-dom";
import { redirect } from "react-router-dom";
import Dashboard from "./features/expenses/Dashboard";


export default function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [user,setUser]=useState(0)

  const handleLogin = (data) => {
    setLoggedInStatus("LOGGED_IN");
  };

  const handleLogout = () => {
    
    axios.delete("http://localhost:3000/logout", { withCredentials: true })
    .then(response =>{
      setLoggedInStatus("NOT_LOGGED_IN");
    }).catch((error) =>{
      console.log("Logout error",error)
    })
  };

  const handleSuccessfulAuth = (data) => {
    handleLogin(data);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3000/logged_in", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
          setLoggedInStatus("LOGGED_IN");
          setUser(response.data.user.id)
          // console.log(response.data.user.id)
          // debugger
        } else if (!response.data.logged_in && loggedInStatus === "LOGGED_IN") {
          setLoggedInStatus("NOT_LOGGED_IN");
          setUser({})
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
  };

  return (
    <div className="app">
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">My Expenses</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        {loggedInStatus==="LOGGED_IN"?
          <Nav className="me-auto">
            <Nav.Link href="/expenses">Expenses</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <NavDropdown title="My Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <button onClick={()=>handleLogout()} className="btn btn-warning btn-sm">Logout</button>
          </Nav>
          
        :""}
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home loggedInStatus={loggedInStatus} handleLogin={handleLogin} />}
          />
          <Route path="/dashboard" element={<Dashboard loggedInStatus={loggedInStatus} user={user}/>} />
          
          <Route path="/expenses" element={<Expenses loggedInStatus={loggedInStatus} user={user}/>} />
          <Route
            path="/registration"
            element={<Registration handleSuccessfulAuth={handleSuccessfulAuth} loggedInStatus={loggedInStatus} />}
          />
        </Routes>
        {/* {loggedInStatus==="LOGGED_IN"?<Navigate to="/expenses"/>:<Navigate to="/"/>} */}
      </BrowserRouter>
    </div>
  );
}
