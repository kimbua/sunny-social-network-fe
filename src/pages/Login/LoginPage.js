/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Form, Button, Navbar, Container, Nav } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import { authActions } from "../../redux/actions";

import "./style.css";
// assets
import background from "./loop.mp4";
import thumbnail from "./background-thumb.jpg";
import logo from "./logo2.png";

export default function LoginPage() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [signup, setSignup] = useState({
    role: "user",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleLoginForm = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(authActions.loginRequest(login.email, login.password));
  };

  const handleSignUpForm = (e) => {
    console.log("form run");
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    if (signup.password !== signup.confirmPassword) {
      setSignup({
        role: "user",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      return toast.warning(`Confirm password not match`);
    }
    console.log(signup);
    dispatch(
      authActions.register(
        signup.role,
        signup.name,
        signup.email,
        signup.password
      )
    );
  };

  const responseGoogle = (response) => {
    console.log(response);
    dispatch(authActions.loginGoogleRequest(response.tokenId, "user"));
  };

  if (isAuthenticated) return <Navigate to="/" />;
  return (
    <div className="full-screen dark05">
      <video
        autoPlay
        muted
        loop
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: "-1",
          position: "fixed",
        }}
      >
        <source src={background} type="video/mp4" poster={thumbnail} />
      </video>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Sunny Logo"
            />
            Sunny
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div className="login-container">
        <div className="login-left">
          <Container>
            <Form onSubmit={handleSignUp}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={signup.name}
                  onChange={handleSignUpForm}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={signup.email}
                  onChange={handleSignUpForm}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={signup.password}
                  onChange={handleSignUpForm}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={signup.confirmPassword}
                  onChange={handleSignUpForm}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="landing-button"
              >
                Sign up
              </Button>
            </Form>
          </Container>
        </div>
        <div className="login-form">
          <Container>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={login.email}
                  onChange={handleLoginForm}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={login.password}
                  onChange={handleLoginForm}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="landing-button"
              >
                Sign in
              </Button>{" "}
              or{" "}
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </Form>
          </Container>
        </div>
      </div>
      <Nav className="justify-content-center footer-nav" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">About</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Contact</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}
