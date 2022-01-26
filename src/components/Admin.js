import axios from "axios";
import React, { useState } from "react";
import { Row, Col, Form, Container, Button } from "react-bootstrap";

function Admin() {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);

  const addToList = () => {
    axios.post("http://localhost:3001/api/insert", {
      image: imageUrl,
      title: title,
      price: price,
    });
  };
  return (
    <>
      <Container>
        <img
          src="https://www.pockettactics.com/wp-content/uploads/2021/01/genshin-impact-zhongli-3-900x506.jpg"
          alt="ท่านปู่"
          height={50}
        ></img>
        <h1>CURD </h1>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Form>
              {/* <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>ImageUrl</Form.Label>
                <Form.Control
                  actions="/api/insert"
                  method="POST"
                  encType="multipart/form-data"
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                  }}
                  type="text"
                  placeholder="Link Image"
                />
              </Form.Group> */}
            </Form>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  type="text"
                  placeholder="Gta v"
                />
              </Form.Group>
            </Form>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Price</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  type="number"
                  placeholder="500 $"
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image input </Form.Label>
                <Form.Control
                  actions="/api/insert"
                  method="POST"
                  encType="multipart/form-data"
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                  }}
                  type="file"
                />
              </Form.Group>
            </Form>
            <Row>
              <Col xs={6} md={4}>
                <Button onClick={addToList} variant="outline-primary">
                  Submit
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Admin;
