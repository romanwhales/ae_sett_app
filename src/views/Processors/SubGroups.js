import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Button,Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import AddSubGroupComponent from './addSubGroupModal';
import UpdateSubGroupComponent from './updateSubGroupModal';
import {getSubGroups,createSubGroup,getOneProcessor,getOneSubGroup,updateSubgroup} from '../../actions/processor';
import {FormattedMessage} from 'react-intl';
class Subgroup extends Component {
    constructor(props){
        super(props);
        this.state ={
            showSubGroupModal:false,
            showUpdateModal:false,
        }
    }
  componentWillMount(){
      
    this.props.getSubGroups(this.props.match.params.id);
    this.props.getOneProcessor(this.props.match.params.id);
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

  setUpProduct = (id) => {
      this.props.history.push(`/processors/${id}/subgroups/addProduct`);
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
    this.clearNotifications();
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
    this.props.getOneSubGroup(id);
  }

  closeUpdateModal = () => {
    
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
  }

  toggleUpdate = () => {
   
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
  }

  clearNotifications=()=>{
    this.props.subGroupCreated.updatedSubGroup = null;
    this.props.subGroupCreated.createSubGroupError = null;
    this.props.subGroupCreated.subGroupCreated = null;

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
            <Col style={{ 'textAlign': 'right' }}>
            <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.toggle}>
            <i className="fa fa-plus"></i>&nbsp;<FormattedMessage id="Add Subgroup" defaultMessage="Add Subgroup"/></Button>
            </Col>
        </Row>
        <Row>
          <Col lg={12}>
            {this.props.subGroupCreated.updatedSubGroup?<Alert color="success">
                    
                    <FormattedMessage id="Success! SubGroup updated Successfully" defaultMessage="Success! SubGroup updated Successfully"/>
                    </Alert>:null}
            {this.props.subGroupCreated.createSubGroupError?<Alert color="danger">
                    Error! {this.props.subGroupCreated.createSubGroupError.data.message}
                    </Alert>:null}
            {this.props.subGroupCreated.subGroupCreated?<Alert color="success">
                    
                    <FormattedMessage id="Success! Subgroup Created Succesfully!" defaultMessage="Success! Subgroup Created Succesfully!"/>
                    </Alert>:null}
            <Card>
              <CardHeader>
                <strong>{this.props.processorData?this.props.processorData.name:''}'s <FormattedMessage id="app.subgroup" defaultMessage="Subgroups"/></strong>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                    <thead>
                        <tr>
                        <th>
                            #
                        </th>
                        <th>
                          <FormattedMessage id="app.name" defaultMessage="Name"/>
                        </th>
                        <th>
                         <FormattedMessage id="app.actions" defaultMessage="Actions"/>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.subGroups
                        ? [
                          this.props.subGroups.length > 0 ?   this.props.subGroups.map((item,index) => (
                            <tr key={index+1}>
                              <td>{index+1}</td>
                              <td ><a href={"#/processors/"+this.props.match.params.id+"/subgroups/"+item.id+"/products"}>{item.name}</a></td>
                              <td><Button color="secondary" type="button" size="sm" onClick={e => this.setUpProduct(item.id)}> <FormattedMessage id="Set Up Product" defaultMessage="Set Up Product"/></Button>&nbsp;&nbsp;
                              <i className="fa fa-edit fa-lg text-center" style={{color:'blue'}} onClick={(e)=>this.updateSubGroup(item.id)}></i></td>
                            </tr>
                            )):<tr><td colSpan="3"><p className="text-center text-danger">There are no subgroups created for the selected processor.</p></td></tr>
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
        <AddSubGroupComponent {...this.state} {...this.toggle} closeModal={this.closeModal} onSubmit = {this.onSubmit}/>
        <UpdateSubGroupComponent {...this.state} {...this.toggleUpdate} closeUpdateModal={this.closeUpdateModal} onSubmit = {this.onSubmitUpdate} {...this.props}/>

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
  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    getSubGroups,
    createSubGroup,
    getOneProcessor,
    getOneSubGroup,
    updateSubgroup
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Subgroup);

