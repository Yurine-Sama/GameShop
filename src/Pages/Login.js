import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import Axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //set this into backend
  async function loginUser(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    Axios.defaults.withCredentials = true;
    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login Successful");
      window.location.href = "/";
    } else {
      alert("Pls check your email and password");
    }

    console.log(data);
  }

  return (
    <>
      <h1>Login</h1>
      <Container>
        <Row className="justify-content-md-center">
          <Form onSubmit={loginUser}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
            </Col>
            <Col md={{ span: 6, offset: 3 }}>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
            </Col>
            <Row>
              <Col md={{ span: 3, offset: 3 }}>
                <Button type="submit" value="Login" className="mb-2">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Container>
    </>
  );
};

export default Login;
