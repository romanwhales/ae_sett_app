import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader,Alert} from 'reactstrap';
import {fetchFileTemplates,deleteFileTemplate} from '../../actions/file_templates';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {FormattedMessage} from 'react-intl';


class TemplateList extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            deleteModal:false,
            fileTemplateDeletedAlertVisible:true,
            createSuccessAlertVisible:true,
            
        }
        this.onDismissfileTemplateDeletedAlert = this.onDismissfileTemplateDeletedAlert.bind(this);
        this.onDismissCreateSuccessAlert = this.onDismissCreateSuccessAlert.bind(this);

    }
    id=''
    componentWillMount(){
        this.props.fetchFileTemplates();
    }

    onDismissfileTemplateDeletedAlert(){
        this.setState({ fileTemplateDeletedAlertVisible:false });
    }

    onDismissCreateSuccessAlert(){
        this.setState({ createSuccessAlertVisible:false });
    }

    onSubmit = (values) =>{
        this.props.createProcessor(values);
       this.closeModal();
    }

    addFileTemplate = () => {
        this.props.history.push('/file/templates/addTemplate');
    }

    updateTemplate = (id) => {
        this.props.history.push(`/file/templates/${id}/update`);
        
    }

    closeUpdateModal = () => {
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
    }

    onSubmitUpdate = (values) => {
        this.props.updateProcessor(values);
        this.closeUpdateModal();
    }
    deleteTemplate = (id) => {
        this.setState({deleteModal:true});
        this.id = id; 
    }
    toggleConfirm = () =>{
        this.setState({ deleteModal: !this.state.deleteModal });
    }
    confirm = ()=> {
        this.props.deleteFileTemplate(this.id);
        this.setState({deleteModal:false});
    }
    
    render(){
        console.log('Props here is ',this.props);
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col style={{ 'textAlign': 'right' }}>
                    <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.addFileTemplate}><i className="fa fa-plus"></i>&nbsp;<FormattedMessage id="Add File Template" defaultMessage="Add File Template"/></Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.fileTemplateCreated?<Alert color="success" isOpen={this.state.createSuccessAlertVisible} toggle={this.onDismissCreateSuccessAlert}>
                            
                            <FormattedMessage id="Success: File Template Created Successfully!" defaultMessage="Success: File Template Created Successfully!"/>
                        </Alert>:null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {this.props.fileTemplateDeleted ? <Alert color="success" isOpen={this.state.fileTemplateDeletedAlertVisible} toggle={this.onDismissfileTemplateDeletedAlert}>
                        <FormattedMessage id="Success: File Template Deleted Successfully!" defaultMessage="Success: File Template Deleted Successfully!"/>
                        
                    </Alert>:null}
                        <Card>
                        <CardHeader>
                            <i className="fa fa-file"></i> <FormattedMessage id="File Templates" defaultMessage="File Templates"/>
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                    
                                    <th><FormattedMessage id="Match String" defaultMessage="Match String"/></th>
                                    <th><FormattedMessage id="Sample File" defaultMessage="Sample File"/></th>
                                    <th><FormattedMessage id="app.actions" defaultMessage="Actions"/></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.fileTemplateList? this.props.fileTemplateList.data.map((item,index) => (
                                    <tr key={index+1}>
                                    
                                  
                                    <td ><a href="">{item.matchString}</a></td>
                                    <td>
                                        {item.sampleFile}
                                    </td>
                                    <td> 
                                        <i className="fa fa-edit fa-lg text-center" style={{color:'blue',cursor:'pointer'}} onClick={(e)=>this.updateTemplate(item.id)}></i> {'  '}&nbsp;
                                        <i className="fa fa-trash fa-lg text-center" style={{color:'red',marginRight:'10px',cursor:'pointer'}} onClick={(e) => this.deleteTemplate(item.id)}> </i>  
                                    </td>
                                    </tr>
                                )):<tr><td>Here</td></tr>}
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
                            <FormattedMessage id="Are you sure you want to delete this template?" defaultMessage="Are you sure you want to delete this template?" />
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
       fileTemplateList:state.fileTemplates.fileTemplateLists,
       fileTemplateDeleted:state.fileTemplates.fileTemplateDeleted,
       fileTemplateCreated:state.fileTemplates.templateFileCreated,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchFileTemplates,
        deleteFileTemplate
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(TemplateList);