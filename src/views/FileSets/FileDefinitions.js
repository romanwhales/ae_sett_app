import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Button,Alert,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";


import {fetchFileSetDefinitions,deleteFileSetDefinition,fetchFileSet} from '../../actions/filesets';

import {FormattedMessage} from 'react-intl';
// import AddFileSet from './addFileSet';
// import UpdateFileSet from './updateFileSet';

class FileSetsDefinitions extends Component {
    constructor(props){
        super(props);
        this.state ={
            modal:false,
            showUpdateModal:false,
            fileSetCreatedAlert:true,
            filesetUpdatedAlert:true,
            fileSetDeletedAlert:true,
            deleteModal:false,
            activePage:1
        }
    }
    id=''
    fileDefinitionId = ''
  componentWillMount(){
      this.props.fetchFileSetDefinitions(this.props.match.params.id);
      this.props.fetchFileSet(this.props.match.params.id);
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
    this.props.history.push(`/filesets/${this.props.match.params.id}/definitions/add`)
  }
  closeModal = () => {
    this.setState({ modal:false});
  }
  componentWillUnmount(){   
    // this.props.subGroupCreated.subGroupCreated = null;
    // this.props.subGroupCreated.createSubGroupError = null;
    // this.props.subGroupCreated.updatedSubGroup = null;
    
  }

  updateSubGroup = (id) =>{
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

  deleteFileDefinition = (id) => {
    this.clearNotifications()
    this.setState({deleteModal:true});
    this.fileDefinitionId = id;
  }

  toggleConfirm = () =>{
    this.setState({ deleteModal: !this.state.deleteModal });
}
confirm = ()=> {
  this.props.deleteFileSetDefinition(this.props.match.params.id,this.fileDefinitionId);
  this.setState({deleteModal:false});
}

onDismissFileSetDeletedSuccessAlert = () => {
  this.setState({
    fileSetDeletedAlert:false
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
           {this.props.fileSets.fileSetFileDefinitionDeleted?<Alert color="success" isOpen={this.state.fileSetDeletedAlert} toggle={this.onDismissFileSetDeletedSuccessAlert}>
                    
                    <FormattedMessage id="Success: FileSet Deleted Succesfully!" defaultMessage="Success: FileSet Deleted Succesfully!"/>
                    </Alert>:null}
        
             {/* {this.props.fileSets.fileSetUpdated?<Alert color="success" isOpen={this.state.fileSetUpdatedAlert} toggle={this.onDismissFileSetUpdatedSuccessAlert}>
                    <FormattedMessage id="Success: FileSet updated Successfully!" defaultMessage="Success: FileSet updated Successfully!"/>
                    </Alert>:null}  */}
            <Card>
              <CardHeader>
                <strong> {this.props.fileSets.fileSet? this.props.fileSets.fileSet.name:'FileSet Definitions'}<FormattedMessage id="'s FileSet Definitiions" defaultMessage="'s Fileset Definitions"/></strong>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                    <thead>
                        <tr>
                        <th>
                            #
                        </th>
                        <th>
                          <FormattedMessage id="app.name" defaultMessage="FileSet Name"/>
                        </th>
                        {/* <th>
                            Processor Name
                        </th> */}
                        <th>
                         <FormattedMessage id="app.actions" defaultMessage="Actions"/>
                        </th>
                        
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.fileSets.fileSetDefinitions
                        ? [
                          this.props.fileSets.fileSetDefinitions.content.length > 0 ?   this.props.fileSets.fileSetDefinitions.content.map((item,index) => (
                            <tr key={index+1}>
                              <td>{index+1}</td>
                              <td >{item.channelFileName}</td>
                              {/* <td>{item.processor.name}</td> */}
                              <td>
                               <i className="fa fa-trash fa-lg text-center" style={{color:'red'}} onClick={(e) => this.deleteFileDefinition(item.id)}></i></td>
                            </tr>
                            )):<tr key="1"><td colSpan="4"><p className="text-center text-danger">There are no fileset definitions at the moment.</p></td></tr>
                        ]
                        : [
                            ''
                        ]
                    }
                    </tbody>
                </Table>
                {this.props.fileSets.fileSetDefinitions?<nav>
                  <Pagination2
                      activePage={this.state.activePage}
                      itemsCountPerPage={20}
                      totalItemsCount={this.props.fileSets.fileSetDefinitions?this.props.fileSets.fileSetDefinitions.meta.totalElements:null}
                      pageRangeDisplayed={5} 
                      onChange={this.handlePageChange}
                  />
                  </nav>:'' }
              </CardBody>
            </Card>
          </Col>
        </Row>
        
         {/* <AddFileSet {...this.state} {...this.toggle} closeModal={this.closeModal} onSubmit = {this.onSubmit} {...this.props}/>
        <UpdateFileSet {...this.state} {...this.toggleUpdate} closeUpdateModal={this.closeUpdateModal} onSubmit = {this.onSubmitUpdate} {...this.props}/> */}
        <Modal isOpen={this.state.deleteModal}  className={this.props.className}>
            <ModalHeader toggle={this.toggleConfirm}><FormattedMessage id="Delete" defaultMessage="Delete" /></ModalHeader>
            <ModalBody>
                <FormattedMessage id="Are you sure you want to delete this file definition?" defaultMessage="Are you sure you want to delete this fileDefinition?"/> 
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={this.confirm}><FormattedMessage id="Delete" defaultMessage="Delete" /></Button>{' '}
                <Button color="secondary" onClick={this.toggleConfirm}><FormattedMessage id="app.cancel" defaultMessage="Cancel" /></Button>
            </ModalFooter>
        </Modal>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('State is ',state);
  return {
    fileSets:state.fileSets,

  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    fetchFileSetDefinitions,
    deleteFileSetDefinition,
    fetchFileSet
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(FileSetsDefinitions);

