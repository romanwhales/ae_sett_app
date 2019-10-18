import React, { Component } from 'react';
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom';
import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css';
import * as JWT from 'jwt-decode';
import * as qs from 'query-string';

import CryptoJS from "crypto-js";
// import {decodeToken,getLoggedInUser} from '../../../actions/utils';
import {decodeToken,getLoggedInUser} from './actions/utils';

// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login, Page404, Page500, Register } from './views/Pages';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setLocale} from './actions/locale';

import { IntlProvider } from 'react-intl';

import locale_en from 'react-intl/locale-data/en';
import locale_de from 'react-intl/locale-data/de';
import locale_fr from 'react-intl/locale-data/fr';
import locale_pt from 'react-intl/locale-data/pt';
import locale_es from 'react-intl/locale-data/es';

import {addLocaleData} from 'react-intl';

import messages_de from './translations/de.json';
import messages_en from './translations/en.json';
import messages_fr from './translations/fr.json';
import messages_pt from './translations/pt.json';
import messages_es from './translations/es.json';

// import store from './store';

const messages = {
  'de':messages_de,
  'en':messages_en,
  'fr':messages_fr,
  'pt':messages_pt,
  'es':messages_es,
}

addLocaleData([...locale_en,...locale_de,...locale_fr,...locale_pt,...locale_es]);


// import { renderRoutes } from 'react-router-config';

const checkAuth = () =>{
  // console.log('Here first');
  // const token = localStorage.getItem('access_token');
  debugger;
  if(window.location.search){
    debugger;
    let encryptedTokenFromParam = qs.parse(window.location.search);
    debugger;
    let encryptedToken =(encryptedTokenFromParam.var);
    if(encryptedToken){
      // Decrypt
      let bytes = CryptoJS.AES.decrypt(encryptedToken.split(" ").join("+"), 'introspecAppToken');
      let decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

      // console.log(decryptedToken); // 'my token'
      console.log('Decrypted token is ',decryptedToken)
      debugger;

      // save the decrypted token to the session storage
      localStorage.setItem("token", decryptedToken);
      const decoded = JWT(decryptedToken);
      console.log('Decoded Token is ',decoded);
      debugger;
      localStorage.setItem('decodedToken',JSON.stringify(decoded));
      

      /**Move to dashboard */
      // this.props.decodeToken(decryptedToken);
      // this.props.getLoggedInUser();
      // this.props.setLocale(encryptedTokenFromParam.lang);
      let address = window.location.href;
      var lastIndex = address.lastIndexOf("/");
      const language = navigator.language.split(/[-_]/)[0];
      
      localStorage.setItem("se8lementLang",encryptedTokenFromParam.lang);
      window.history.pushState({}, document.title, "/" + "#/dashboard");
      window.location.reload();
      debugger;
      
      
    }else{
      return;
    }
  }
  debugger
  const token = localStorage.getItem('token');
  console.log('Token is ',token);
  if(token === null || !token){
    
    return false
  }else{
    return true;
  }
 
  // return true;
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{pathname: "/login"}}
        />
      )
    }
  />
);



class App extends Component {
  constructor(props){
    super(props);
    this.state={
      hasError:false
    }
  }
  componentDidCatch=(error,info)=>{
      // Display fallback UI
      //Route to the 500 Error Route/Page
      // console.log(this.props);
      this.setState({ hasError: true });
  }
  render() {
    // const language = navigator.language.split(/[-_]/)[0];
    // console.log('Language is ',language);
    const {lang} = this.props;
    console.log("lang from props is ",lang,this.state);
    debugger;
    if (this.state.hasError) {
      debugger;
      window.location.href="#/500";
      // You can render any custom fallback UI
      // <Redirect
      //     to={{pathname: "/500"}}
      //   />
    }
    if(localStorage.se8lementLang){
      this.props.setLocale(localStorage.se8lementLang);
    }
    // else{
    //   this.props.setLocale(lang);
    // }
    return (
      <IntlProvider locale={lang} messages={messages[lang]}>
        <HashRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/register" name="Register Page" component={Register} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <PrivateRoute path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </HashRouter>
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('State is ',state)
  return {
      lang:state.locale.lang
  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    setLocale,
    decodeToken,
    getLoggedInUser
  },dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
