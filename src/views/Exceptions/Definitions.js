import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Button,Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// import AddSubGroup from './addSubGroup';
// import AddSubGroupComponent from './addSubGroupModal';
// import UpdateSubGroupComponent from './updateSubGroupModal';
import {getSubGroups,createSubGroup,getOneProcessor,getOneSubGroup,updateSubgroup} from '../../actions/processor';
import{fetchDailyProcessorChannelExceptionSummary,fetchAllExceptionDefinitions} from '../../actions/exceptions';
import {FormattedMessage,} from 'react-intl';
import * as qs from 'query-string';


class ProcessorExceptionDefinition extends Component {
    constructor(props){
        super(props);
        this.state ={
            showSubGroupModal:false,
            showUpdateModal:false,
        }
    }
  componentWillMount(){
    let searchdate = qs.parse(this.props.location.search).date;
    this.props.getSubGroups(this.props.match.params.id);
    this.props.getOneProcessor(this.props.match.params.id);
    // this.props.fetchProcessorExceptionDefinition(this.props.match.params.id);
    this.props.fetchDailyProcessorChannelExceptionSummary(this.props.match.params.id,searchdate);
    this.props.fetchAllExceptionDefinitions();
  }
  
  onSubmit = (values,id,details) => {
    //   console.log('id is ',this.props.match.params.id);
    //   debugger;
     this.props.createSubGroup(values,this.props.match.params.id);
     this.closeModal();
  }

  onSubmitUpdate = (values) => {
    this.props.updateSubgroup(values);
    this.closeUpdateModal();
  }

  setUpExceptionDefinition = () => {
      this.props.history.push(`/exceptions/definitions/addException`);
  }
  toggle = () => {
    this.setState({showSubGroupModal:!this.state.showSubGroupModal})
  }
  closeModal = () => {
    this.setState({showSubGroupModal:!this.state.showSubGroupModal});
  }
  componentWillUnmount(){   
    // this.props.subGroupCreated.subGroupCreated = null;
    // this.props.subGroupCreated.createSubGroupError = null;
    // this.props.subGroupCreated.updatedSubGroup = null;
    this.props.exceptionDefinition.exceptionDefinitionCreated = null;
    
  }

  updateSubGroup = (id) =>{
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
    this.props.getOneSubGroup(id);
  }

  updateExceptionDefinition = (id) => {     
    this.props.history.push(`/exceptions/${id}/definitions/edit`);
  }

  closeUpdateModal = () => {
    
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
  }
  toggleUpdate = () => {
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
  }


  render() {
    console.log('Props is ',this.props);
    return (
      <div className="animated fadeIn">
        <Row>
            <Col xs="12">
                {this.props.exceptionDefinition.exceptionDefinitionCreated?<Alert color="success" isOpen={this.state.createdSuccessAlertVisible} toggle={this.onDismisscreatedSuccessAlert}>
                    
                    <FormattedMessage id="Success: Exception Definition Created Successfully!" defaultMessage="Success: Exception Definition Created Successfully!"/>
                </Alert>:null}
            </Col>
        </Row>
       
        
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
            <Col style={{ 'textAlign': 'right' }}>
            <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.setUpExceptionDefinition}><i className="fa fa-plus"></i>&nbsp;<FormattedMessage id="Add Exception Definition" defaultMessage="Add Exception Definition"/></Button>
            </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>
                  {/* <i className="fa fa-user pr-1"></i>  */}
                <FormattedMessage id="Exception Definitions" defaultMessage="Exception Definitions"/></strong>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                    <thead>
                        <tr>
                        <th>
                          <FormattedMessage id="FileName" defaultMessage="FileName"/>
                        </th>
                        <th>
                          <FormattedMessage id="Channel FileName" defaultMessage="ChannelFileName"/>
                        </th>
                        <th>
                          <FormattedMessage id="Has Header" defaultMessage="Has Header"/>
                        </th>
                        <th>
                          <FormattedMessage id="Date Format" defaultMessage="Date Format"/>
                        </th>
                        <th>
                          <FormattedMessage id="app.actions" defaultMessage="Actios"/>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.allExceptionDefinitions
                        ? [
                          this.props.allExceptionDefinitions.content.length > 0 ?   this.props.allExceptionDefinitions.content.map((item,index) => (
                            <tr key={index+1}>
                              <td >{item.fileName}</td>
                              <td>{item.channelFileName}</td>
                              <td>{item.hasHeader?'True':'False'}</td>
                              <td>{item.dateFormat}</td>
                              <td><i className="fa fa-pencil-square-o" aria-hidden="true" title="Edit Exception Definition" style={{'cursor':'pointer'}}  onClick={(e)=>this.updateExceptionDefinition(item.id)}></i></td>
                            </tr>
                            )):<tr><td colSpan="5"><p className="text-center text-danger">There are no exception definitions</p></td></tr>
                        ]
                        : [
                            ''
                        ]
                    }
                    </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <AddSubGroupComponent {...this.state} {...this.toggle} closeModal={this.closeModal} onSubmit = {this.onSubmit}/>
        <UpdateSubGroupComponent {...this.state} {...this.toggleUpdate} closeUpdateModal={this.closeUpdateModal} onSubmit = {this.onSubmitUpdate} {...this.props}/> */}

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
    exceptionDefinition:state.exceptionDefinition,
    exceptionDefinitionList:state.exceptionDefinition.exceptionDefinitionList,
    allExceptionDefinitions:state.exceptionDefinition.allExceptionDefinitions,
  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    getSubGroups,
    createSubGroup,
    getOneProcessor,
    getOneSubGroup,
    updateSubgroup,
    fetchDailyProcessorChannelExceptionSummary,
    fetchAllExceptionDefinitions
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ProcessorExceptionDefinition);

