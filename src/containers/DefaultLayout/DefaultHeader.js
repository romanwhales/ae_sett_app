import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getLoggedInUser} from '../../actions/utils'


import {  AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

import activedge_logo from '../../assets/img/brand/settlement_logo.png';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  account='';
  affiliates = '';
  constructor(props){
    super(props)
    this.state = {
      selectedAffilliate:null,
      affiliates:null
    }
  }
  componentWillMount(){
    
    let localStorageSaved = JSON.stringify(localStorage.getItem('affiliates'));
    let selectedAffiliate;
    if(!localStorage.getItem('selectedAfilliate')){
      this.props.getLoggedInUser();
    }
    if(localStorage.decodedToken){
      this.account = JSON.parse(localStorage.getItem('decodedToken')).sub;
      // console.log('Account is ',JSON.parse(this.account).sub);
    }
    if(localStorageSaved.length){
      if(localStorage.getItem('selectedAfilliate')){
        selectedAffiliate = localStorage.getItem('selectedAfilliate');
        console.log(selectedAffiliate);
        if(selectedAffiliate.startsWith('"')){
          selectedAffiliate = JSON.parse(selectedAffiliate);
        }
        // console.log(localStorage.getItem('selectedAfilliate'))
        // debugger;
      }
      this.setState({
        selectedAffilliate:selectedAffiliate,
        affiliates:JSON.parse(localStorage.getItem('affiliates'))
      })
      
      
    }    
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    
    if (this.props.utils.userDetail !== prevProps.utils.userDetail) {
      // console.log(localStorage.getItem('selectedAfilliate'));
      // console.log('Affiliates are ',localStorage.getItem('affiliates'));
      this.setState({
        selectedAffilliate:JSON.parse(localStorage.getItem('selectedAfilliate')),
        affiliates:JSON.parse(localStorage.getItem('affiliates'))
      })
      
    }
  }
  logOut = ()=>{
    localStorage.clear();
    // document.location.href = "#/new-url";
    window.history.pushState({}, document.title, "/" + "#/login");
    window.location.reload();
  }

  selectAffiliate =(affiliate) => {
    
    this.setState({
      selectedAffilliate:affiliate.code
    });
    localStorage.setItem('selectedAfilliate',affiliate.code);
    window.location.reload();
    
  }
  settings = () => {
    window.history.push(`/settings`);
  }
  render() {
    
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    console.log(this.state);
    {debugger}
    

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          
          full={{ src: activedge_logo,width: 89, height: 25, alt: 'ActivEdge Logo' }} // 70 width original
          minimized={{ src: activedge_logo, width: 30, height: 30, alt: 'ActivEdge Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            {/* Introspec: Settlement Module */}
            
          </NavItem>
          {/* <NavItem className="px-3">
            <NavLink href="#/users">Users</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Settings</NavLink>
          </NavItem> */}
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">0</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-list"></i></NavLink>
          </NavItem>
          {/* <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
          <AppHeaderDropdown direction="down" caret>
            <DropdownToggle nav >

              {this.state.selectedAffilliate?<NavLink href="#"> <i className={"flag-icon flag-icon-"+this.state.selectedAffilliate.toLowerCase()} title="al" id="al"></i> <strong>{this.state.selectedAffilliate}</strong> <i class="fa fa-caret-down" aria-hidden="true"></i></NavLink>:null}
              <NavLink><i className="icon-caret-bottom" ></i></NavLink>
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
            
              {this.state.affiliates?this.state.affiliates.map(item => <DropdownItem onClick={() => this.selectAffiliate(item)}>{item.name}</DropdownItem>):null}
            </DropdownMenu>
          </AppHeaderDropdown>
          {/* Picture Changed, Badge modified and Some Modules not made use of are commented out*/}
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user-o"></i> {this.account}</DropdownItem>
              {/* <DropdownItem><i className="fa fa-university"></i> Settlement<Badge color="success">&nbsp;&nbsp;</Badge></DropdownItem> */}
              {/* <DropdownItem><i className="fa fa-credit-card"></i>ATM Portal<Badge color="danger">&nbsp;&nbsp;</Badge></DropdownItem> */}
              {/* <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem> */}
              {/* <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem> */}
              {/* <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem> */}
              {/* <DropdownItem href="#/settings"><i className="fa fa-wrench"></i> Settings</DropdownItem> */}
              {/* <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem> */}
              {/* <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem> */}
              {/* <DropdownItem divider /> */}
              {/* <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}
              <DropdownItem href="#/settings"><i className="fa fa-cog"></i> Settings</DropdownItem>
              <DropdownItem onClick={e=>this.logOut()}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

// export default DefaultHeader;


const mapStateToProps = (state) => {
  console.log('State is ',state);
  return {
      utils:state.utils,
  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    getLoggedInUser
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(DefaultHeader);
