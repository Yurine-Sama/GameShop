import React from "react";
import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //set this into backend
  async function registerUser(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      alert("Register Success");
      window.location.href = "/Login";
    } else {
      alert("This email or password are already use!!");
    }
    console.log(data);
  }

  return (
    <>
      <h1>Sign Up</h1>
      <Container>
        <Row className="justify-content-md-center">
          <Form onSubmit={registerUser}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter Username"
                />
              </Form.Group>
            </Col>
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
                <Button type="submit" value="Register" className="mb-2">
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

export default Register;
