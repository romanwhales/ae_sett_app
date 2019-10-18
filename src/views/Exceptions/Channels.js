import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Button,FormGroup,Label,Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Field,reduxForm} from 'redux-form';
// import AddSubGroup from './addSubGroup';
// import AddSubGroupComponent from './addSubGroupModal';
// import UpdateSubGroupComponent from './updateSubGroupModal';
import {getSubGroups,createSubGroup,getOneProcessor,getOneSubGroup,updateSubgroup} from '../../actions/processor';
import{fetchDailyProcessorChannelExceptionSummary} from '../../actions/exceptions';
import {FormattedMessage,FormattedHTMLMessage} from 'react-intl';
import * as qs from 'query-string';
import moment from 'moment';

class ProcessorChannelExceptionSummary extends Component {
    constructor(props){
        super(props);
        this.state ={
            showSubGroupModal:false,
            showUpdateModal:false,
            searchdate:'',
        }
    }
    
  componentWillMount(){
    let searchdate = qs.parse(this.props.location.search).date;
    this.setState({searchdate:searchdate});
    this.props.fetchDailyProcessorChannelExceptionSummary(this.props.match.params.id,searchdate);
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
      this.props.history.push(`/exceptions/${this.props.match.params.id}/definitions/addException`);
  }
  toggle = () => {
    this.setState({showSubGroupModal:!this.state.showSubGroupModal})
  }
  closeModal = () => {
    this.setState({showSubGroupModal:!this.state.showSubGroupModal});
  }
  componentWillUnmount(){   
    this.props.subGroupCreated.subGroupCreated = null;
    this.props.subGroupCreated.createSubGroupError = null;
    this.props.subGroupCreated.updatedSubGroup = null;
    
  }

  updateSubGroup = (id) =>{
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
    this.props.getOneSubGroup(id);
  }

  viewRows = (id) => {

    this.props.history.push(`/exceptions/${this.props.match.params.id}/channels/rows?date=${this.state.searchdate}`);
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


  render() {
    // console.log('Props is ',this.props);
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
            {this.props.subGroupCreated.updatedSubGroup?<Alert color="success">
                    
                    <FormattedMessage id="Success! SubGroup updated Successfully" defaultMessage="Success! SubGroup updated Successfully"/>
                    </Alert>:null}
            {this.props.subGroupCreated.createSubGroupError?<Alert color="danger">
                    Error! {this.props.subGroupCreated.createSubGroupError.data.message}
                    </Alert>:null}
            
            <Card>
              <CardHeader>
                <strong><i className="fa fa-user pr-1"></i>{this.props.exceptionDefinitionChannels?this.props.exceptionDefinitionChannels.data[0].processor:''}'s Exception Definition</strong>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                    <thead>
                        <tr>
                        <th>
                            #
                        </th>
                        <th>
                          ChannelName
                        </th>
                        <th>
                          Amount
                        </th>
                        <th>
                          Rows
                        </th>
                        <th>
                            Actions
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.exceptionDefinitionChannels
                        ? [
                          this.props.exceptionDefinitionChannels.data.length > 0 ?   this.props.exceptionDefinitionChannels.data.map((item,index) => (
                            <tr key={index+1}>
                              <td>{index+1}</td>
                              <td >{item.channelName}</td>
                              <td>{item.amount.toLocaleString()}</td>
                              <td>{item.count}</td>
                              <td><i className="fa fa-eye" aria-hidden="true" title="View Channel Rows" style={{'cursor':'pointer'}} onClick={(e)=>this.viewRows(item.entityId)}> </i></td>
                            </tr>
                            )):<tr><td colSpan="5"><p className="text-center text-danger">There are no exception definitions created for the selected processor.</p></td></tr>
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
    exceptionDefinition:state.exceptionDefinition.exceptionDefinitionList,
    exceptionDefinitionChannels:state.exceptionDefinition.exceptionChannelList,
  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    getSubGroups,
    createSubGroup,
    getOneProcessor,
    getOneSubGroup,
    updateSubgroup,
    fetchDailyProcessorChannelExceptionSummary
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ProcessorChannelExceptionSummary);

