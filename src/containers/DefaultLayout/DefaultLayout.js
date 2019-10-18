import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';



// sidebar nav config
import navigation from '../../navigation/_nav';
import AdminNavigation from '../../navigation/_adminNav';
import MakerSpanishNavigation from '../../navigation/_spanishMakerNav';
import CheckerSpanishNavigation from '../../navigation/_spanishCheckerNav';
import MakerFrenchNavigation from '../../navigation/_frenchMakerNav';
import CheckerFrenchNavigation from '../../navigation/_frenchCheckerNav';
import MakerPortugeseNavigation from '../../navigation/_portugeseMakerNav';
import CheckerPortugeseNavigation from '../../navigation/_portugeseCheckerNav';


// routes config
import routes from '../../routes';
import checkerRoutes from '../../checker-routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';

// const language = navigator.language.split(/[-_]/)[0];

// console.log('See language ',language);
class DefaultLayout extends Component {
  render() {
    // console.log('props is ',this.props);
    
    // console.log('Local Storage is ',window.localStorage.decodedToken);
    const decodedAuthorityArray = JSON.parse(window.localStorage.decodedToken);
    debugger;
    let routesImported;
    let sidebar;
    debugger;
    if(decodedAuthorityArray.authorities[0] === 'ROLE_CHECKER' && localStorage.se8lementLang === 'en'){
      sidebar = <AppSidebarNav navConfig={AdminNavigation} {...this.props} />
      this.routesImported= checkerRoutes;
      
    }else if(decodedAuthorityArray.authorities[0] === 'ROLE_USER' && localStorage.se8lementLang === 'en'){
      sidebar = <AppSidebarNav navConfig={AdminNavigation} {...this.props} />
      this.routesImported= routes;
    }
    else if(decodedAuthorityArray.authorities[0] === 'ROLE_ADMIN' && localStorage.se8lementLang === 'en'){
      sidebar = <AppSidebarNav navConfig={AdminNavigation} {...this.props} />
      this.routesImported= routes;
    }else if (decodedAuthorityArray.authorities[0] === 'ROLE_MAKER' && localStorage.se8lementLang === 'en'){
      sidebar = <AppSidebarNav navConfig={navigation} {...this.props} />
      this.routesImported = routes;
    }else if (decodedAuthorityArray.authorities[0] === 'ROLE_MAKER' && localStorage.se8lementLang === 'es'){
      sidebar = <AppSidebarNav navConfig={MakerSpanishNavigation} {...this.props} />
      this.routesImported = routes;
    }else if (decodedAuthorityArray.authorities[0] === 'ROLE_CHECKER' && localStorage.se8lementLang === 'es'){
      sidebar = <AppSidebarNav navConfig={CheckerSpanishNavigation} {...this.props} />
      this.routesImported= checkerRoutes;
    }
    else if (decodedAuthorityArray.authorities[0] === 'ROLE_MAKER' && localStorage.se8lementLang === 'fr'){
      sidebar = <AppSidebarNav navConfig={MakerFrenchNavigation} {...this.props} />
      this.routesImported = routes;
    }else if (decodedAuthorityArray.authorities[0] === 'ROLE_CHECKER' && localStorage.se8lementLang === 'fr'){
      sidebar = <AppSidebarNav navConfig={CheckerFrenchNavigation} {...this.props} />
      this.routesImported= checkerRoutes;
    }
    else if (decodedAuthorityArray.authorities[0] === 'ROLE_MAKER' && localStorage.se8lementLang == 'pt'){
      sidebar = <AppSidebarNav navConfig={MakerPortugeseNavigation} {...this.props} />
      this.routesImported = routes;
    }else if (decodedAuthorityArray.authorities[0] === 'ROLE_CHECKER' && localStorage.se8lementLang == 'pt'){
      sidebar = <AppSidebarNav navConfig={CheckerPortugeseNavigation} {...this.props} />
      this.routesImported = checkerRoutes;
    }
    else{
      
      return  <Redirect from="/" to="/login" />

    }
    
    // else{
    //   var sidebar = <AppSidebarNav navConfig={navigation} {...this.props} />
    //   this.routesImported = routes
      
    // }
    
    return (
      
      <div className="app">
        {console.log(this.routesImported)}
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            {/* <AppSidebarNav navConfig={navigation} {...this.props} /> */}
            {sidebar}
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Switch>
                {this.routesImported.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  console.log('State is ',state);
  return {
      tokenDetails:state.utils,
  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
      
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(DefaultLayout);

// export default DefaultLayout;
