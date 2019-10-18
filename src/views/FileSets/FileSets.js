import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Button,Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";
import {fetchFileSetsPaginated,createFileSet,fetchFileSet,updateFileSet} from '../../actions/filesets';
import {getProcessor} from '../../actions/processor';
import {FormattedMessage} from 'react-intl';
import AddFileSet from './addFileSet';
import UpdateFileSet from './updateFileSet';

class FileSets extends Component {
    constructor(props){
        super(props);
        this.state ={
            modal:false,
            showUpdateModal:false,
            fileSetCreatedAlert:true,
            filesetUpdatedAlert:true,
            activePage:1
        }
    }
    id=''
  componentWillMount(){
      
    this.props.fetchFileSetsPaginated(0);
    this.props.getProcessor();
  }
  
  onSubmit = (values) => {
    this.props.createFileSet(values);
    this.setState({
        modal:false
    })
  }

  onSubmitUpdate = (values) => {
    this.props.updateFileSet(this.id,values);
    this.closeUpdateModal();
  }

  setUpProduct = (id) => {
      this.props.history.push(`/processors/${id}/subgroups/addProduct`);
  }
  
  toggle = () => {
    this.setState({modal:!this.state.modal})
  }
  closeModal = () => {
    this.setState({ modal:false});
  }
  componentWillUnmount(){   
    // this.props.subGroupCreated.subGroupCreated = null;
    // this.props.subGroupCreated.createSubGroupError = null;
    // this.props.subGroupCreated.updatedSubGroup = null;
    
  }

  viewFileDefinitions = (id) =>{
    this.clearNotifications();
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
    this.id = id;
    this.props.fetchFileSet(id);
  }

  closeUpdateModal = () => {
    
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
  }

  toggleUpdate = () => {
   
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
  }

  clearNotifications=()=>{
    this.props.fileSets.fileSetCreated= null;
    // this.props.subGroupCreated.createSubGroupError = null;
    // this.props.subGroupCreated.subGroupCreated = null;

  }

  onDismissFileSetCreatedSuccessAlert = () =>{
      this.setState({
        fileSetCreatedAlert:false
      })
  }

  onDismissFileSetUpdatedSuccessAlert = () => {
      this.setState({
          fileSetUpdatedAlert: false
      })
  }


  render() {
    console.log('Props is ',this.props);
    return (
      <div className="animated fadeIn">
        <Row>
            <Col style={{ 'textAlign': 'right' }}>
            <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.toggle}>
            <i className="fa fa-plus"></i>&nbsp;<FormattedMessage id="Add FileSet" defaultMessage="Add FileSet"/></Button>
            </Col>
        </Row>
        <Row>
          <Col lg={12}>
            {this.props.fileSets.fileSetCreated?<Alert color="success" isOpen={this.state.fileSetCreatedAlert} toggle={this.onDismissFileSetCreatedSuccessAlert}>
                    
                    <FormattedMessage id="Success: FileSet created Succesfully!" defaultMessage="Success: FileSet created Succesfully!"/>
                    </Alert>:null}
            {/* {this.props.subGroupCreated.createSubGroupError?<Alert color="danger">
                    Error! {this.props.subGroupCreated.createSubGroupError.data.message}
                    </Alert>:null}*/}
            {this.props.fileSets.fileSetUpdated?<Alert color="success" isOpen={this.state.fileSetUpdatedAlert} toggle={this.onDismissFileSetUpdatedSuccessAlert}>
                    <FormattedMessage id="Success: FileSet updated Successfully!" defaultMessage="Success: FileSet updated Successfully!"/>
                    </Alert>:null} 
            <Card>
              <CardHeader>
                <strong> <FormattedMessage id="FileSets" defaultMessage="Filesets"/></strong>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                    <thead>
                        <tr>
                        <th>
                            #
                        </th>
                        <th>
                          <FormattedMessage id="FileSet Name" defaultMessage="FileSet Name"/>
                        </th>
                        <th>
                          <FormattedMessage id="Processor Name" defaultMessage="Processor Name"/>
                        </th>
                        <th>
                         <FormattedMessage id="app.actions" defaultMessage="Actions"/>
                        </th>
                        
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.fileSets.fileSetsPaginated
                        ? [
                          this.props.fileSets.fileSetsPaginated.content.length > 0 ?   this.props.fileSets.fileSetsPaginated.content.map((item,index) => (
                            <tr key={index+1}>
                              <td>{index+1}</td>
                              <td >{item.name}</td>
                              <td>{item.processor.name}</td>
                              <td>
                                  {/* <Button color="secondary" type="button" size="sm" onClick={e => this.setUpProduct(item.id)}> <FormattedMessage id="Set Up Product" defaultMessage="Set Up Product"/></Button> */}
                                  
                              <i className="fa fa-edit fa-lg text-center" style={{color:'blue'}} onClick={(e)=>this.viewFileDefinitions(item.id)}></i> <a href={"#/filesets/"+item.id+"/definitions"}><FormattedMessage id="View File Definitions" defaultMessage="View File Definitions"/></a> <a href={"#/filesets/"+item.id+"/batches"}><FormattedMessage id="View Batches" defaultMessage="View Batches"/></a></td>
                            </tr>
                            )):<tr key="1"><td colSpan="4"><p className="text-center text-danger"><FormattedMessage id="There are no filesets created at the moment." defaultMessage="There are no filesets created at the moment."/></p></td></tr>
                        ]
                        : [
                            ''
                        ]
                    }
                    </tbody>
                </Table>
                {this.props.fileSets.fileSetsPaginated?<nav>
                  <Pagination2
                      activePage={this.state.activePage}
                      itemsCountPerPage={20}
                      totalItemsCount={this.props.fileSets.fileSetsPaginated?this.props.fileSets.fileSetsPaginated.meta.totalElements:null}
                      pageRangeDisplayed={5} 
                      onChange={this.handlePageChange}
                  />
                  </nav>:'' }
              </CardBody>
            </Card>
          </Col>
        </Row>
         <AddFileSet {...this.state} {...this.toggle} closeModal={this.closeModal} onSubmit = {this.onSubmit} {...this.props}/>
        <UpdateFileSet {...this.state} {...this.toggleUpdate} closeUpdateModal={this.closeUpdateModal} onSubmit = {this.onSubmitUpdate} {...this.props}/>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('State is ',state);
  return {
    fileSets:state.fileSets,
    processors:state.processors,
    initialValues:state.fileSets.fileSet
  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    fetchFileSetsPaginated,
    getProcessor,
    createFileSet,
    fetchFileSet,
    updateFileSet
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(FileSets);

