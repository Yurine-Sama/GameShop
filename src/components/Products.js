import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { BsFillCartFill, BsHandThumbsUpFill } from "react-icons/bs";

export const Products = () => {
  return (
    <div>
      <Row>
        <Col xs={6} md={4}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Link href="#">
                <BsFillCartFill />
              </Card.Link>
              <Card.Link href="#">
                <BsHandThumbsUpFill />
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Products;
