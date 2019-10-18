import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Row,Alert} from 'reactstrap';
import * as qs from 'query-string';
import CryptoJS from "crypto-js";
import {decodeToken,getLoggedInUser} from '../../../actions/utils';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setLocale,updateLocale} from '../../../actions/locale';
import {FormattedMessage} from 'react-intl';

import activedge_logo from '../../../assets/img/brand/settlement_logo.png';



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      loggedIn:true,
      loginErrorAlert:true,
      lang:'',
      value:'en'
    };

    // This binding is necessary to make `this` work in the callback
    this.handleRegister = this.handleRegister.bind(this);
  }
  striped=''
  lang =''

  handleRegister=()=>{
    // localStorage.setItem('token','abc123');
    // console.log(this.striped);
    // localStorage.se8lementLang;
    // debugger;
    console.log(window.location.host);
    debugger;
    window.location.href=`http://localhost:3019/applogin?lang=${this.state.value}&redirectUrl=`+`${window.location.host}/#/dashboard`;
    // console.log(window.location.href);
  }

  onDismissLoginErrorAlert = () => {
    this.setState({
      loginErrorAlert:false
    });
  }

  change(event){
    event.preventDefault();
    this.setState({
      value:event.target.value
    });
    // debugger;

    // this.props.updateLocale({"langKey" :event.target.value});
    this.props.setLocale(event.target.value);
  }

  render() {
    return (
      <React.Fragment >
        <nav class="navbar navbar-expand-lg navbar-light bg-light" data-test="loginComponent">
          <a class="navbar-brand" href="#"><img src={activedge_logo} className="img-reponsive" style={{width:'90px'}}/></a>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              
            </ul>
            <span class="form-inline my-2 my-lg-0">
              <select type="select" className="form-control" name="select" id="language" onChange={this.change.bind(this)} value={this.state.value}>
                <option value="en" >English</option>
                <option value="fr" >Français</option>
                <option value="pt" >Português</option>
                <option value="es" >Español</option>
              </select>
              {/* <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/> */}
              {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
            </span>
          </div>
        </nav>
        <div className="app flex-row align-items-center">
          <Container>
          <Row className="justify-content-center">
              <Col md="8">
                {localStorage.getItem('error401Se8mentMessage') && <Alert color="danger" isOpen={this.state.loginErrorAlert} toggle={this.onDismissLoginErrorAlert}>
                    Error: {localStorage.getItem('error401Se8mentMessage')}
                </Alert>}
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>

                      <Form>
                        <h1><FormattedMessage id="Login" defaultMessage="Login"/></h1>
                        <p className="text-muted"><FormattedMessage id="Sign In to your account" defaultMessage="Sign In to your account"/></p>
                        <Button color="primary" className="mt-3" active onClick={this.handleRegister}><FormattedMessage id="Login" defaultMessage="Login"/></Button>
                        {/* <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="Username" autoComplete="username" />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" placeholder="Password" autoComplete="current-password" />
                        </InputGroup> */}
                        {/* <Row>
                          <Col xs="6">
                            <Button color="primary" className="px-4">Login</Button>
                          </Col>
                          <Col xs="6" className="text-right">
                            <Button color="link" className="px-0">Forgot password?</Button>
                          </Col>
                        </Row> */}
                      </Form>
                    </CardBody>
                  </Card>
                  <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                    <CardBody className="text-center">
                      <div>
                        <h2>Settlement App</h2>
                        <p><FormattedMessage id="The Settlement App processes a number of account files for reconcilliation purposes." defaultMessage="The Settlement App processes a number of account files for reconcilliation purposes."/></p>
                        {/* <Button color="primary" className="mt-3" active onClick={this.handleRegister}><FormattedMessage id="Login" defaultMessage="Login"/></Button> */}
                      </div>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col> 
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state) => {
  // console.log('Login State is ',state)
  return {
    lang:state.locale.lang
  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    decodeToken,
    setLocale,
    updateLocale,
    getLoggedInUser
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);

// export default Login;
