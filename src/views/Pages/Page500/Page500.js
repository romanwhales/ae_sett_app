import React, { Component } from 'react';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from "react-router-dom";

class Page500 extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <span className="clearfix">
                <h1 className="float-left display-3 mr-4 text-danger">500</h1>
                <h4 className="pt-3 text-danger">Error!, Something went wrong, but we’ve sent our magical internet elves to fix it. Please try again later.</h4>
                <p className="text-muted float-left ">The page you are looking for is temporarily unavailable.</p>
              </span>
              <h2 className="text-sucess text-center"> <Link to="/dashboard">Back to Dashboard</Link></h2>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-search"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input size="16" type="text" placeholder="What are you looking for?" />
                <InputGroupAddon addonType="append">
                  <Button color="info">Search</Button>
                </InputGroupAddon>
              </InputGroup>
            </Col>
            
          </Row>
        </Container>
      </div>
    );
  }
}

export default Page500;
