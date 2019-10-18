import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label ,Alert} from 'reactstrap';
import {fetchFileDefinitions,deleteFileDefinition} from '../../actions/file_definition';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


import {FormattedMessage,FormattedDate, FormattedTime} from 'react-intl';


class FileDefinitions extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            deleteModal:false,
            showMappingModal:false,
            createSuccessAlertVisible:true,
            deletedSuccessAlertVisible:true,
            deletedSuccessAlertVisible:true,
            
            updateSuccessAlertVisible:true,
            mappingToView:'',
        }
        this.onDismissCreateSuccessAlert= this.onDismissCreateSuccessAlert.bind(this);
        
        this.onDismissDeletedSuccessAlert = this.onDismissDeletedSuccessAlert.bind(this);
        this.onDismissUpdateSuccessAlert = this.onDismissUpdateSuccessAlert.bind(this);
    }
    id=''

    onDismissCreateSuccessAlert(){
        this.setState({ createSuccessAlertVisible: false });
    }

    onDismissDeletedSuccessAlert(){
        this.setState({ deletedSuccessAlertVisible: false });
    }

    onDismissUpdateSuccessAlert(){
        this.setState({ updateSuccessAlertVisible: false });
    }
    componentWillMount(){
        this.props.fetchFileDefinitions();
    }

    setUpProductMapping =(id) => {
        this.props.history.push(`/products/setup/${id}`);
    }

    updateFileDefinition = (id) => {
        this.props.history.push(`/file-definitions/${id}/edit`);
        
    }

    closeUpdateModal = () => {
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
    }
    addFileDefinition = () =>{
        this.props.history.push('/file-definitions/add');
    }

    addManualFileDefinition = () => {
        this.props.history.push('/file-definitions/manualAddition');
        
    }
    closeModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }
   
    toggleConfirm = () =>{
        this.setState({ deleteModal: !this.state.deleteModal });
    }

    toggleshowMappingModal = () => {
        this.setState({showMappingModal:!this.state.showMappingModal});
    }
    confirm = ()=> {
        this.props.deleteFileDefinition(this.id);
        this.setState({deleteModal:false});
    }

    deleteFileDefinition =(id) =>{
        this.setState({deleteModal:true});
        this.id = id; 
    }

    showMapping = (id) => {
        this.setState({showMappingModal:true}); 
        let mappingObject = this.props.fileDefinitionList.data.find(item => item.id === id);
        this.setState({mappingToView:mappingObject.mapping.firstRow});
        
        // console.log('State is ',this.state);
    }

    componentWillUnmount(){
        this.props.fileDefinition.fileDefinitionCreatedError = null;
        this.props.fileDefinition.fileDefinitionCreated = null;
        this.props.fileDefinition.fileDefinitionDeleted = null;
    }

    
    render(){
        
        return(
            
            <div className="animated fadeIn">
                <Row>
                    <Col style={{ 'textAlign': 'right' }}>
                    <Button style={{ 'marginBottom': '20px','marginRight':'20px' }} color="primary" onClick={this.addManualFileDefinition} ><i className="fa fa-plus"></i>&nbsp;<FormattedMessage id="Add Manual File Definition" defaultMessage="Add Manual File Definition"/></Button>
                    <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.addFileDefinition}><i className="fa fa-plus"></i>&nbsp;<FormattedMessage id="Add File Definition" defaultMessage="Add File Definition"/></Button>
                    </Col>
                </Row>
                <Row>
                     <Col xs="12">
                        {this.props.fileDefinition.fileDefinitionCreated?<Alert color="success" isOpen={this.state.createdSuccessAlertVisible} toggle={this.onDismisscreatedSuccessAlert}>
                            Success: File Definition Created Successfully!
                        </Alert>:null}
                    </Col>
                </Row>
                <Row>
                     <Col xs="12">
                        {this.props.fileDefinition.fileDefinitionDeleted?<Alert color="danger" isOpen={this.state.deletedSuccessAlertVisible} toggle={this.onDismissDeletedSuccessAlert}>
                            Success: File Definition Deleted Successfully!
                        </Alert>:null}
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                    {this.props.fileDefinition.fileDefinitionCreatedError?<Alert color="danger" isOpen={this.state.createErrorAlertVisible} toggle={this.onDismissCreateErrorAlert}>
                             Error: {this.props.fileDefinition.fileDefinitionCreatedError.message}!
                            </Alert>:null}
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                    
                        <Card>
                        <CardHeader>
                            <i className="fa fa-file"></i> <FormattedMessage id="File Definitions" defaultMessage="File Definitions"/>
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table">
                                <thead className="thead-light">
                                    <tr>
                                        <th><FormattedMessage id="Channel FileName" defaultMessage="Channel FileName"/></th>
                                        {/* <th>
                                            <FormattedMessage id="File Name" defaultMessage="File Name"/>
                                        </th> */}
                                        
                                        <th><FormattedMessage id="Has Header" defaultMessage="Has Header"/></th>
                                        <th><FormattedMessage id="Date Format" defaultMessage="Date Format"/></th>
                                        <th><FormattedMessage id="app.actions" defaultMessage="Actions"/></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {this.props.fileDefinitionList
                                        ? [
                                            this.props.fileDefinitionList.data.length > 0 ?  this.props.fileDefinitionList.data.map((item,index) => (
                                                <tr key={index+1}>
                                                    <td>{item.channelFileName}</td>
                                                    {/* <td>{item.mapping.fileName}</td> */}
                                                    
                                                    <td>{item.hasHeader ? <FormattedMessage id="True" defaultMessage="True"/>:<FormattedMessage id="False" defaultMessage="False"/>}</td>
                                                    <td>{item.dateFormat? item.dateFormat:'N/A'}</td>
                                                    <td>
                                                        <i className="fa fa-edit fa-lg text-center" style={{color:'blue'}} onClick={(e)=>this.updateFileDefinition(item.id)}></i>  
                                                        <i className="fa fa-trash fa-lg text-center" style={{color:'red',marginLeft:'10px',cursor:'pointer'}} onClick={(e) => this.deleteFileDefinition(item.id)}> </i> 
                                                        <i className="fa fa-eye fa-lg text-center" title="View Mapping" style={{color:'blue',marginLeft:'10px',cursor:'pointer'}} onClick={(e) => this.showMapping(item.id)}> </i> 
                                                        
                                                    </td>
                                                </tr>
                                            )):<tr><td colSpan="6"><p className="text-center text-danger">There are no file definitions created at the moment.</p></td></tr>
                                        ]
                                        : [
                                            ''
                                        ]
                                    }
                                </tbody>
                            </Table>
                        
                            {/* {this.props.atms.atmList?<nav>
                            <Pagination2
                                activePage={this.state.activePage}
                                itemsCountPerPage={20}
                                totalItemsCount={this.props.atms.atmList?this.props.atms.atmList.totalElements:null}
                                pageRangeDisplayed={5} 
                                onChange={this.handlePageChange}
                            />
                            </nav>:'' } */}
                        </CardBody>
                        </Card>
                    </Col>
                    </Row>
                    <Modal isOpen={this.state.deleteModal}  className={this.props.className}>
                        <ModalHeader toggle={this.toggleConfirm}><FormattedMessage id="Delete" defaultMessage="Delete" /></ModalHeader>
                        <ModalBody>
                            <FormattedMessage id="Are you sure you want to delete this definition?" defaultMessage="Are you sure you want to delete this definition?" />
                             
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={this.confirm}><FormattedMessage id="Delete" defaultMessage="Delete" /></Button>{' '}
                            <Button color="secondary" onClick={this.toggleConfirm}><FormattedMessage id="app.cancel" defaultMessage="Cancel" /></Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.showMappingModal}  className={this.props.className}>
                        <ModalHeader toggle={this.toggleshowMappingModal}><FormattedMessage id="File Column Names" defaultMessage="File Column Names" /></ModalHeader>
                        <ModalBody>
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table">
                                <thead>
                                    {this.state.mappingToView?this.state.mappingToView.map((index,item)=>(
                                        <tr>
                                            <td>{item}</td>
                                            <td>{index}</td>
                                            
                                        </tr>
                                    )):null}
                                </thead>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            
                            <Button color="secondary" onClick={this.toggleshowMappingModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log('Products State is ',state)
    return {
        fileDefinitionList:state.fileDefinition.fileDefinitionList,
        fileDefinition:state.fileDefinition,
        
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchFileDefinitions,
        deleteFileDefinition
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(FileDefinitions);