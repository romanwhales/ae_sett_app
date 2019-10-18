import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label ,Alert,DropdownItem,
  DropdownMenu,
  DropdownToggle,ButtonDropdown,
  ButtonGroup,ListGroup,ListGroupItem,TabContent,TabPane} from 'reactstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUsers,addAffiliatesToUsers,addAffilaiteToUser,removeAffilaiteFromUser,fetchUserAffiliates} from '../../actions/utils';
import Select from 'react-select';

import {fetchAffiliatesPaginated,fetchAffiliates} from '../../actions/affiliates';
import {hasRole} from '../../Utils/Auth';
// import UserManagementForm from './userManagementForm';


import Pagination2 from "react-js-pagination";

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption:null,
      emailNull:null,
      showModal:false,
      terminalStatus:false,
      terminalError:false,
      terminalDeletedStatus:false,
      deletemodal:false,
      fileModal:false,
      terminalId:'',
      levelCreatedAlert:true,
      terminalDeletedAlert:true,
      terminalDeletedErrorAlert:true,
      terminalUpdatedErrorAlert:true,
      terminalCreatedAlert:true,
      showUpdateModal:false,
      terminalCreatedErrorAlert:true,
      terminalUpdatedAlert:true,
      escalationCreatedErrorAlert:true,
      affiliateAddedToUser:true,
      ageMode:[{option:'DAYS',value:'DAY'},{option:'HOURS',value:'HOUR'}],
      age:[{option:1},{option:2},{option:3},{option:4},{option:5},{option:6},{option:7},{option:8},{option:9},{option:10}],
      checkedListAll: [],
      activePage:1,
      ItemsChecked: false,
      postArray:[],
      terminalAddedToTemplateAlert:true,
      affiliatesAddedToUsers:true,
      affiliateAddedToUserError:true,
      addAffiliatesToUsersErrorAlert:true,
      activeTab:1,
      activeTab3:1,
      affiliatesErrorAlert:true,
      selectedEmail:''
      
    }
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }
  selectValue=''
  id=''

  toggle2=(tab,email) =>{
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        selectedEmail:email
      });
    }
  }

  toggle3=(tab,email) =>{
    this.props.fetchUserAffiliates(email);
    if (this.state.activeTab3 !== tab) {
      this.setState({
        activeTab3: tab,
        selectedEmail:email
      });
    }
  }


  closeModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }
  /**
   * Launch Individual Terminal Form
   */
  toggle = () => {
    this.setState({ showModal: !this.state.showModal });
  }
  /**
   * Launch Batch Upload Modal
   */

  showFileModal = () => {
    this.setState({fileModal:!this.state.fileModal});
  }
  /**
   * Close File Modal
   */

  closeFileModal = () =>{
    this.setState({fileModal:!this.state.fileModal});
  }

  toggleConfirm = () =>{
    this.setState({ deletemodal: !this.state.deletemodal });
  }
  deleteTerminal = (value) => {
    this.setState({deletemodal:true})
    this.id = value;
  }
  confirm =()=> {
    this.props.deleteTerminal(this.id);
    this.setState({deletemodal:false});

  }
  componentDidMount(){
      this.props.fetchUsers();
      this.props.fetchAffiliates();
      this.props.fetchAffiliatesPaginated(0);
    //   this.props.fetchSresPaginated(0)
      
  }
  componentDidUpdate(prevProps,prevState){
   
    if(this.props.atms !== prevProps.atms){
     
      if(this.props.atms.terminalCreated){
        this.setState({terminalStatus:true})
      }
      if(this.props.atms.terminalCreatedError){
        this.setState({terminalError:true});
      }
      if(this.props.atms.deletedTerminal){
        this.setState({terminalDeletedStatus:true});
      }
      
      // if(this.props.auth.)
    }
    
  }
  onSubmit = (values) =>{
    values.channel ={}
    values.channel.id = 1;
    this.props.createTerminal(values);
    this.toggle();
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  toggle = () => {
    this.clearNotifications();
    this.setState({ showModal: !this.state.showModal });
  }
  getValue = (value) =>{
     
  }

  handlePageChange =(pageNumber)=>{
    // debugger;
  }

  toggleDropDown = (id) => {
    // f
    if(id == this.state.terminalId){
      this.setState({terminalId:null});
    }else{
      this.setState({terminalId:id});
    }
    
  }

  deleteTerminal = (idTosend) => {
    this.clearNotifications();
    this.setState({deletemodal:true});
    this.id = idTosend;
  }

  onDismissCreatedLevelSuccessAlert =() => {
    this.setState({levelCreatedAlert:false});
  }

  onDismissCreatedLevelErrorAlert = () => {
    this.setState({levelCreatedErrorAlert:false});
  }

  onDismissUpdatedEscalationSuccessAlert =() => {
    this.setState({escalationUpdatedAlert:false});
  }

  levelDeletedErrorAlert = () => {
    this.setState({levelDeletedErrorAlert:false});
  }

  onDismissUpdatedTerminalSuccessAlert = () => {
      this.setState({
        terminalUpdatedAlert:false
      })
  }

  onDismissCreatedEscalationErrorAlert = () => {
    this.setState({escalationCreatedErrorAlert:false});
  }

  onDismissDeletedTerminalErrorAlert = () => {
      this.setState({
        terminalDeletedErrorAlert: false
      })
  }

  

  onDismissUpdatedEscalationErrorAlert = () => {
    this.setState({escalationUpdatedErrorAlert:false});
  }

  

  onDismissDeletedTerminalSuccessAlert = () => {
      this.setState({terminalDeletedAlert:false});
  }

  onDismissUpdatedTerminalErrorAlert =() => {
      this.setState({
        terminalUpdatedErrorAlert:false
      })
  }

  updateTerminal=(id)=>{
    this.clearNotifications();
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
    this.props.fetchTerminal(id);
  }

  closeUpdateModal=()=>{

    this.setState({ showUpdateModal: !this.state.showUpdateModal});
  }

  onSubmitUpdate=(values)=>{
    values.channel ={}
    values.channel.id = 1;
    this.props.updateTerminal(values);
    this.setState({ showUpdateModal:false});
  }

  onDismissCreatedTerminalSuccessAlert = () => {
    this.setState({
      terminalCreatedAlert: false
    })
  }

  // clearNotifications =() => {
  //   this.props.sres.sreAddedToAffiliate = null;
  // }

  componentWillUnmount(){
    this.clearNotifications();
  }

  handleCheckboxClick(e) {
    //e.preventDefault()
  //  this.clearNotifications();
    const { value, checked } = e.target;
    // Value to post
    let values = {}
    
    if (checked ) {
     
      
      this.setState(prevState => ({
        checkedListAll: [...prevState.checkedListAll, value],
        
      }));
      // console.log(this.state.checkedListAll);
      if(!this.state.selectedEmail){
        values.login = this.props.utils.users.payload[0].email;
      }else{
        values.login = this.state.selectedEmail
      }
      
      values.affiliateCode = value;
      this.props.addAffilaiteToUser(values);
    } else {
      this.setState(prevState => ({
        checkedListAll: prevState.checkedListAll.filter(item => item != value)
      }));
      
      values.affiliateCode = value;
      if(!this.state.selectedEmail){
        values.login = this.props.utils.users.payload[0].email;
      }else{
        values.login = this.state.selectedEmail
      }
      this.props.removeAffilaiteFromUser(values);
    }
    // console.log(this.state.checkedListAll);

    // debugger;
  }

  selectItem(e) {
    const { checked } = e.target;
    const { content } = this.props.affiliates.affiliateList;
    
    const collection = [];
    const postArray =[];
    // this.props;
    
    if (checked) {
      for (const row of content) {
        // for (const item of cat.items) {
          debugger;
          collection.push(row.id);
            postArray.push({id:row.id})
        // }
      }
    }
    this.setState({
      checkedListAll: collection,
      ItemsChecked: checked,
      postArray
    });
  }

  addTerminals(){
      if(!this.state.selectedOption){
        this.setState({
            emailNull:'Please select a User before trying to submit'
        })
        return;
      }
      if (this.state.checkedListAll){
        let selectedids = []
        this.state.checkedListAll.forEach(item => {
          selectedids.push({id:item})
        })
        // this.state.checkedListAll.forEach(item => {selectedids.push({id:item}}));
        this.state.selectedOption = null;
        this.props.addAffiliatesToUsers(selectedids,this.state.selectedOption.label);
      }
    
  }

  onDismissAffiliatesAddedToUsersSuccessAlert = () => {
      this.setState({
        affiliatesAddedToUsers: false
      })
  }

  onDismissTerminalAddedToTemplateSuccessAlert = () => {
      this.setState({
        terminalAddedToTemplateAlert:false
      })
  }

  onDismissAddAffiliatesToUsersErrorAlert = () => {
      this.setState({
        addAffiliatesToUsersErrorAlert:false
      })
  }

  onDismissAffiliateAddedToUserErrorAlert = () => {
    this.setState({
      affiliateAddedToUserError:false
    })
  }

  onDismissAffiliatesErrorAlert = () => {
    this.setState({
      affiliatesErrorAlert:false
    })
  }

  onDismissAffiliateAddedToUserSuccessAlert = () => {
    this.setState({
      affiliateAddedToUser:false
    })
  }

  clearNotifications =()=>{
    this.setState({
      affiliatesAddedToUsers:false,
      affiliateAddedToUser:false,
      addAffiliatesToUsersErrorAlert:false,
      affiliateAddedToUserError:false,
      affiliatesErrorAlert:false

    })
  }
  

  
  render() {
    const { selectedOption } = this.state;
    console.log('Props2',this.props)
    let loggedInUser = JSON.parse(localStorage.getItem('decodedToken'));
    console.log(loggedInUser)
    const {checkedListAll, ItemsChecked} = this.state;
    var  newUsersList =[];

    if(this.props.utils.users){
        newUsersList = this.props.utils.users.payload.map(item=>({
             label:item.email,
            value:item.id
         }));
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>         
           {this.props.utils.addAffiliatesToUsers?<Alert color="success" isOpen={this.state.affiliatesAddedToUsers} toggle={this.onDismissAffiliatesAddedToUsersSuccessAlert}>
                  Affiliated Added To Users Succesfully!
                </Alert>:null}
          {this.props.utils.affiliateAddedToUser?<Alert color="success" isOpen={this.state.affiliateAddedToUser} toggle={this.onDismissAffiliateAddedToUserSuccessAlert}>
            Affiliated Added To Users Succesfully!
          </Alert>:null}
            {this.props.utils.addAffiliatesToUsersError?<Alert color="danger" isOpen={this.state.addAffiliatesToUsersErrorAlert} toggle={this.onDismissAddAffiliatesToUsersErrorAlert}>
            {this.props.utils.addAffiliatesToUsersError.response.data.message}
          </Alert>:null}

          {this.props.utils.affiliateAddedToUserError?<Alert color="danger" isOpen={this.state.affiliateAddedToUserError} toggle={this.onDismissAffiliateAddedToUserErrorAlert}>
            {this.props.utils.affiliateAddedToUserError.response.data.message}
          </Alert>:null}

          {this.props.affiliates.affiliateListError?<Alert color="danger" isOpen={this.state.affiliatesErrorAlert} toggle={this.onDismissAffiliatesErrorAlert}>
            {this.props.affiliates.affiliateListError.response.data.message}
          </Alert>:null}

           {/*{this.props.utils.terminalCreated?<Alert color="success" isOpen={this.state.terminalCreatedAlert} toggle={this.onDismissCreatedTerminalSuccessAlert}>
                  Terminal Created Successfully!
            </Alert>:null}
                
            
          {this.props.terminals.terminalDeleted?<Alert color="success" isOpen={this.state.terminalDeletedAlert} toggle={this.onDismissDeletedTerminalSuccessAlert}>
            Terminal Deleted Successfully!
          </Alert>:null}
          {this.props.terminals.terminalDeletedError?<Alert color="danger" isOpen={this.state.terminalDeletedErrorAlert} toggle={this.onDismissDeletedTerminalErrorAlert}>
            {this.props.terminals.terminalDeletedError.response.data.message}
          </Alert>:null}
           {this.props.terminals.updatedTerminal?<Alert color="success" isOpen={this.state.terminalUpdatedAlert} toggle={this.onDismissUpdatedTerminalSuccessAlert}>
            Terminal Updated Successfully!
          </Alert>:null}
          {this.props.terminals.updatedTerminalError?<Alert color="danger" isOpen={this.state.terminalUpdatedErrorAlert} toggle={this.onDismissUpdatedTerminalErrorAlert}>
            {this.props.terminals.updatedTerminalError.response.data.message}
          </Alert>:null} */}
            {/* <Card>
              <CardHeader>
                <i className="icon-arrow-up"></i> Users
              </CardHeader>
              <CardBody> */}
                {/* <UserManagementForm {...this.props}/> */}
                {/* <FormGroup row>
                    <Col md="2">
                        <Label>Please Select a User</Label>
                    </Col>
                    <Col xs="12" md="10">
                            <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={newUsersList}
                            placeholder ="Select a User"
                        />
                        
                    </Col>
                </FormGroup> */}
                
                {/* <label>
                  <input
                    type="checkbox"
                    checked={ItemsChecked}
                    onClick={this.selectItem.bind(this)}
                  /> Select All
                </label>
                <span  className="left-css" style={{'float':'right','marginBottom':'20px'}}>{checkedListAll.length} items Selected <Button disabled={checkedListAll.length <= 0 } onClick={(e)=>this.addTerminals()} className="btn btn-success">Add</Button></span> */}
                {/* <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                        <th></th>
                      <th>Code</th>
                      <th>Name</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.affiliates.affiliateList
                        ? [
                            this.props.affiliates.affiliateList.content.length > 0 ? this.props.affiliates.affiliateList.content.map((item,index) => (
                                <tr key={index+1}>  
                                  <td>
                                    <input type="checkbox" value={item.id} checked={this.state.checkedListAll.includes(item.id)} onChange={this.handleCheckboxClick}/>
                                  </td>
                                  <td>{item.code}</td>
                                  <td>{item.name}</td>
                                  
                                </tr>
                            )):<tr key={1}><td colSpan="7"><p className="text-center text-danger">There are no sres at the moment.</p></td></tr>
                        ]
                        : [
                        <tr key={1}><td colSpan="7"><p className="text-center text-danger">There are no sres at the moment.</p></td></tr>
                        ]
                    }
                  </tbody>
                </Table> */}
               
                {/* {this.props.affiliates.affiliateList?<nav>
                <Pagination2
                    activePage={this.state.activePage}
                    itemsCountPerPage={20}
                    totalItemsCount={this.props.affiliates.affiliateList?this.props.affiliates.affiliateList.meta.totalElements:null}
                    pageRangeDisplayed={5} 
                    onChange={this.handlePageChange}
                />
                </nav>:'' } */}
              {/* </CardBody>
            </Card> */}
          </Col>
        </Row>
        <Row>
          <Col>
          
            {hasRole(loggedInUser,['ROLE_ADMIN']) ? <Card>
              <CardHeader>
                <i className="fa fa-users"></i><strong>User Management</strong>
                {/* <div className="card-header-actions">
                  <Badge>NEW</Badge>
                </div> */}
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="4">
                    <ListGroup id="list-tab" role="tablist">
                      {
                        this.props.utils.users?this.props.utils.users.payload.map((item,index) => (
                          <ListGroupItem onClick={() => this.toggle2(item.staff.id,item.staff.email)} action active={this.state.activeTab === item.staff.id} >{item.staff.email}</ListGroupItem>
                        )):null
                      }
                      {/* <ListGroupItem onClick={() => this.toggle2(0)} action active={this.state.activeTab === 0} >Home</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle2(1)} action active={this.state.activeTab === 1} >Profile</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle2(2)} action active={this.state.activeTab === 2} >Messages</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle2(3)} action active={this.state.activeTab === 3} >Settings</ListGroupItem>*/}
                    </ListGroup> 
                  </Col>
                  <Col xs="8">
                    <TabContent >
                      <TabPane >
                      {this.props.affiliates.affiliateListUnPaginated
                        ? [
                            this.props.affiliates.affiliateListUnPaginated.length > 0 ? this.props.affiliates.affiliateListUnPaginated.map((item,index) => (
                                <tr key={index+1}>  
                                  <td>
                                    <label><input type="checkbox" value={item.code} checked={this.state.checkedListAll.includes(item.code)} onChange={this.handleCheckboxClick}/> &nbsp;{item.code} {item.name}</label>
                                  </td>
                                  
                                  
                                </tr>
                            )):<tr key={1}><td colSpan="7"><p className="text-center text-danger">There are no affiliates at the moment.</p></td></tr>
                        ]
                        : [
                        <tr key={1}><td colSpan="7"><p className="text-center text-danger">There are no affiliates at the moment.</p></td></tr>
                        ]
                    }
                      </TabPane>
                     
                    </TabContent>
                  </Col>
                </Row>
              </CardBody>
            </Card>:null}

            <Card>
              <CardHeader>
                <i className="fa fa-users"></i><strong>View User Affiliates</strong>
                {/* <div className="card-header-actions">
                  <Badge>NEW</Badge>
                </div> */}
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="4">
                    <ListGroup id="list-tab" role="tablist">
                      {
                        this.props.utils.users?this.props.utils.users.payload.map((item,index) => (
                          <ListGroupItem onClick={() => this.toggle3(item.staff.id,item.staff.email)} action active={this.state.activeTab3 === item.staff.id} >{item.staff.email}</ListGroupItem>
                        )):null
                      }
                      {/* <ListGroupItem onClick={() => this.toggle2(0)} action active={this.state.activeTab === 0} >Home</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle2(1)} action active={this.state.activeTab === 1} >Profile</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle2(2)} action active={this.state.activeTab === 2} >Messages</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle2(3)} action active={this.state.activeTab === 3} >Settings</ListGroupItem>*/}
                    </ListGroup> 
                  </Col>
                  <Col xs="8">
                    <TabContent >
                      <TabPane >
                      {this.props.utils.userAffiliates
                        ? [
                          this.props.utils.userAffiliates.data.length > 0 ? this.props.utils.userAffiliates.data.map((item,index) => (
                                <tr key={index+1}>  
                                  <td>
                                    <label>{item.name}</label>
                                  </td>
                                  {/* <td>&nbsp; {item.code} &nbsp;</td>
                                  <td>&nbsp; {item.name} &nbsp;</td> */}
                                  
                                </tr>
                            )):<tr key={1}><td colSpan="7"><p className="text-center text-danger">There are no affiliates at the moment / You haven't selected a user</p></td></tr>
                        ]
                        : [
                        <tr key={1}><td colSpan="7"><p className="text-center text-danger">There are no affiliates attached to the user at the moment.</p></td></tr>
                        ]
                    }
                      </TabPane>
                     
                    </TabContent>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('State is ',state)
  return {
    sres: state.sres,
    utils: state.utils,
    affiliates: state.affiliates,
  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    fetchUsers,
    fetchAffiliatesPaginated,
    addAffiliatesToUsers,
    addAffilaiteToUser,
    removeAffilaiteFromUser,
    fetchUserAffiliates,
    fetchAffiliates,
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UserManagement);