import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Button,FormGroup,Label,Alert,Badge,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Field,reduxForm} from 'redux-form';
// import AddSubGroup from './addSubGroup';
// import AddSubGroupComponent from './addSubGroupModal';
// import UpdateSubGroupComponent from './updateSubGroupModal';
import {getSubGroups,createSubGroup,getOneProcessor,getOneSubGroup,updateSubgroup} from '../../actions/processor';
import{fetchChannelRows,postCustomerException,fetchExceptionDefinition,postCustomerExceptions} from '../../actions/exceptions';
import AddCustomerComponent from './addCustomerDetailsForm';
import {FormattedMessage,FormattedNumber} from 'react-intl';
import * as qs from 'query-string';

import Pagination2 from "react-js-pagination";
import Moment from 'react-moment';
import moment from 'moment';

class ChannelRows extends Component {
    constructor(props){
        super(props);
        
        this.state ={
            showModal:false,
            showUpdateModal:false,
            activePage:1,
            confirmModal:false,
            focused:false,
            exceptionPostStatus:true,
            date: moment(),
            checkedListAll: [],
            ItemsChecked: false
        }
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    }
    id:''
  componentWillMount(){
    // let searchdate = qs.parse(this.props.location.search).date;
    this.props.fetchExceptionDefinition(this.props.match.params.id);
    this.props.fetchChannelRows(this.props.match.params.id,null);
  }
  
  onSubmit = (values,id,details) => {
    // this.props.exceptionDefinitionRows.data.content.filter(item=>item.id == this.id)[0].postedOn = true;
    let fetchedException = this.props.exceptionDefinitionRows.data.content.filter(item=>item.id == this.id)[0];
    fetchedException.postedOn = true;
    fetchedException.customerAccountNo = values.accountNo;
    this.props.postCustomerException(values,this.id);
    this.closeModal();
    // let filteredOutBatch =this.props.batchesSummary.data.filter(item => item.productId == id)[0].postedOn = true;
    // console.log('di here',this.id);
    //     this.id;
    //   debugger;
     
  }

  confirm =() => {
    let customerDetails = this.props.exceptionDefinitionRows.data.content.filter(item=>item.id == this.id)[0];
    customerDetails.postedOn = true;
    let values ={};
    values.accountNo = customerDetails.customerAccountNo;
    this.props.postCustomerException(values,this.id);
    this.setState({confirmModal:false});
  }

  onSubmitUpdate = (values) => {
    this.props.updateSubgroup(values);
    this.closeUpdateModal();
  }

  setUpExceptionDefinition = () => {
      this.props.history.push(`/exceptions/${this.props.match.params.id}/definitions/addException`);
  }
  toggle = (id) => {
    const fetchedCustomer = this.props.exceptionDefinitionRows.data.content.filter(item=>item.id == id)[0];
    console.log('Fetched Customer',fetchedCustomer);
    this.id = id;
    if(fetchedCustomer.customerAccountNo){
        this.setState({confirmModal:true});
    }
    else{
        this.setState({showModal:!this.state.showModal});
    }

    
  }

  toggleConfirm = () => {
      this.setState({confirmModal:!this.state.confirmModal});
  }
  closeModal = () => {
    this.setState({ showModal: !this.state.showModal });
    this.id = null;
}
  componentWillUnmount(){  
    this.props.exceptionDefinition.exceptionPosted = null; 

  }

  updateSubGroup = (id) =>{
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
    this.props.getOneSubGroup(id);
  }

  updateExceptionDefinition = (id) => {     
    this.props.history.push(`/exceptions/${this.props.match.params.id}/definitions/edit`);
  }

  closeUpdateModal = () => {
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
  }

  toggleUpdate = () => {
   
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
  }

  handlePageChange =(pageNumber)=>{
    let activePageNumber = pageNumber;
    --pageNumber;
    this.props.fetchChannelRows(this.props.match.params.id,pageNumber);
    this.setState({activePage: activePageNumber });
  }

  onDismissExceptionPostCheckerAlert = () => {
    this.setState({exceptionPostStatus:false});
  }

  selectItem(e) {
    const { checked } = e.target;
    const { content } = this.props.exceptionDefinitionRows.data;
    const collection = [];
    // this.props;
    
    if (checked) {
      for (const row of content) {
        // for (const item of cat.items) {
          collection.push(row.id);
        // }
      }
    }
    this.setState({
      checkedListAll: collection,
      ItemsChecked: checked
    });
  }

  handleCheckboxClick(e) {
    //e.preventDefault();

    const { value, checked } = e.target;

    if (checked) {
      this.setState(prevState => ({
        checkedListAll: [...prevState.checkedListAll, value * 1]
      }));
    } else {
      this.setState(prevState => ({
        checkedListAll: prevState.checkedListAll.filter(item => item != value)
      }));
    }
  }

  postAll (){
    let postObject = {};
    postObject.detailIds = this.state.checkedListAll;
    this.props.postCustomerExceptions(postObject);
    
  }

  render() {
    console.log('Props is ',this.props);
    const {checkedListAll, ItemsChecked} = this.state;
    return (
      <div className="animated fadeIn">
         {/* <Row>
            <Col xs="6" sm={{ size: 6 ,offset: 3 }}>
                <Card>
                    <CardHeader>
                        <strong>Processor</strong> Details
                    </CardHeader>
                    <CardBody>
                        <FormGroup row>
                            <Col md="3">
                            <Label>Name</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <p className="form-control-static">{this.props.processorData?this.props.processorData.name:''}</p>
                            </Col>
                        </FormGroup>
                    
                    </CardBody>
                </Card>
            </Col>
        </Row> */}
        <Row>
          <Col lg={12}>
            {/* {this.props.exceptionDefinition.exceptionPosted?<Alert color="success">
                    Success! Exception Resolved Successfully!
                    </Alert>:null} */}
            {this.props.subGroupCreated.createSubGroupError?<Alert color="danger">
                    Error! {this.props.subGroupCreated.createSubGroupError.data.message}
                    </Alert>:null}
            {this.props.exceptionDefinition.exceptionPosted?[
                this.props.exceptionDefinition.exceptionPosted.data.status == 200?<Alert color="success" toggle={this.onDismissCreateSuccessAlert}>
                {this.props.exceptionDefinition.exceptionPosted.data.message}
            </Alert>:null
                ]:['']
            }
            {this.props.exceptionDefinition.exceptionPosted?[
                this.props.exceptionDefinition.exceptionPosted.data.status == 202?<Alert color="warning" isOpen={this.state.exceptionPostStatus} toggle={this.onDismissExceptionPostCheckerAlert}>
                {this.props.exceptionDefinition.exceptionsPosted.data.message}
            </Alert>:null
                ]:['']
            }
            {this.props.exceptionDefinition.exceptionsPosted?[
                this.props.exceptionDefinition.exceptionsPosted.data.status == 202?<Alert color="warning" isOpen={this.state.exceptionPostStatus} toggle={this.onDismissExceptionPostCheckerAlert}>
                {this.props.exceptionDefinition.exceptionsPosted.data.message}
            </Alert>:null
                ]:['']
            }
            {/* <Col xs="12">
                {this.props.postAllStatus ?[
                    this.props.postAllStatus.status == 200?<Alert color="success" isOpen={this.state.postAllStatusAlertVisible} toggle={this.onDismissCreateSuccessAlert}>
                    Batches Posted Successfully
                </Alert>:null
                    ]:['']
                }
            </Col> */}
            
            <Card>
              <CardHeader>
                <strong><i className="fa fa-user pr-1"></i>{this.props.exceptionDefinitionDetails?this.props.exceptionDefinitionDetails.channelFileName:''}'s <FormattedMessage id="Exception Rows" defaultMessage="Exception Rows"/></strong>
              </CardHeader>
              <CardBody>
                <label>
                  <input
                    type="checkbox"
                    checked={ItemsChecked}
                    onClick={this.selectItem.bind(this)}
                  /> <FormattedMessage id="Select All" defaultMessage="Select All"/>
                </label>
                <span  className="left-css" style={{'float':'right','marginBottom':'20px'}}> <FormattedNumber value={checkedListAll.length}/> items Selected <Button disabled={checkedListAll.length <= 0 } onClick={(e)=>this.postAll()} className="btn btn-success"><FormattedMessage id="Post All" defaultMessage="Post All"/></Button></span>
                <Table hover bordered striped responsive size="sm">
                    <thead>
                        <tr>
                          <th>
                            
                          </th>
                          <th>
                            <FormattedMessage id="Pan" defaultMessage="Pan"/>
                          </th>
                          <th>
                            <FormattedMessage id="Amount" defaultMessage="Amount"/>
                          </th>
                          <th>
                           <FormattedMessage id="Batch Date" defaultMessage="Batch Date"/>
                          </th>
                        
                          <th>
                            <FormattedMessage id="Reference Number" defaultMessage="Reference Number"/>
                          </th>
                          <th>
                            <FormattedMessage id="Description" defaultMessage="Description"/>
                              
                          </th>
                          <th>
                            <FormattedMessage id="Account Number" defaultMessage="Account Number"/>
                              
                          </th>
                          <th>
                            <FormattedMessage id="app.actions" defaultMessage="Actions"/>
                              
                          </th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.exceptionDefinitionRows
                        ? [
                          this.props.exceptionDefinitionRows.data.content.length > 0 ?   this.props.exceptionDefinitionRows.data.content.map((item,index) => (
                            <tr key={index+1}>
                                <td>
                                <input type="checkbox" value={item.id} checked={this.state.checkedListAll.includes(item.id)} onChange={this.handleCheckboxClick}/>
                                </td>
                                <td>{item.pan}</td>
                                {/* {item.amount.toLocaleString()} */}
                                <td> <FormattedNumber value={item.amount}/>  </td>
                                <td><Moment>{item.batchDate}</Moment></td>
                                <td>{item.refNo}</td>
                                <td>{item.description}</td>
                                <td>{item.customerAccountNo}</td>
                              <td style={{'textAlign':'center'}}> {item.postedOn
                            ?<Badge className="mr-1" color="success">Posted</Badge>:<i class="fa fa-exclamation-triangle" aria-hidden="true" title="Resolve Exception" style={{'cursor':'pointer','color':'red'}} onClick={(e)=>this.toggle(item.id)}></i>}</td>
                            </tr>
                            )):<tr><td colSpan="8"><p className="text-center text-danger">There are no exception definitions created for the selected processor.</p></td></tr>
                        ]
                        : [
                            ''
                        ]
                    }
                    </tbody>
                </Table>
                {this.props.exceptionDefinitionRows?<nav>
                <Pagination2
                    activePage={this.state.activePage}
                    itemsCountPerPage={20}
                    totalItemsCount={this.props.exceptionDefinitionRows?this.props.exceptionDefinitionRows.data.totalElements:null}
                    pageRangeDisplayed={5} 
                    onChange={this.handlePageChange}
                />
                </nav>:'' }
              </CardBody>
            </Card>
          </Col>
        </Row>
        <AddCustomerComponent {...this.state} {...this.toggle} onSubmit = {this.onSubmit} closeModal={this.closeModal} />
        <Modal isOpen={this.state.confirmModal}  className={this.props.className}>
            <ModalHeader toggle={this.toggleConfirm}>Confirm Post</ModalHeader>
            <ModalBody>
                Are you sure you want to Post This Amount? 
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={this.confirm}>Post</Button>{' '}
                <Button color="secondary" onClick={this.toggleConfirm}>Cancel</Button>
            </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('State is ',state);
  return {
    subGroups:state.processors.subGroups,
    subGroupCreated:state.processors,
    processorData:state.processors.processor,
    initialValues:state.processors.subGroup,
    exceptionDefinitionRows:state.exceptionDefinition.exceptionRows,
    exceptionDefinition:state.exceptionDefinition,
    exceptionDefinitionDetails:state.exceptionDefinition.singleExceptionDefinition,
  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    fetchChannelRows,
    postCustomerException,
    fetchExceptionDefinition,
    postCustomerExceptions
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ChannelRows);

