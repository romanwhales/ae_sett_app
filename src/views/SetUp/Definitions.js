import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col,  Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup,  Label ,Alert} from 'reactstrap';
import {fetchProductDefinitions,deleteProductDefinition,} from '../../actions/product_definition';
import {getProduct} from '../../actions/products';
import {fetchFileDefinitions} from '../../actions/file_definition';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchOneAccount} from '../../actions/accounts';
import {FormattedMessage,} from 'react-intl';


class ProductDefinitions extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            deleteModal:false,
            productDefinitionCreatedSuccessAlertVisible:true,
            productDefinitionDeletedSuccessAlertVisible:true,
            productDefinitionCreatedErrorAlertVisible:true,
            
        }
        this.productDefinitionCreatedSuccessAlert = this.productDefinitionCreatedSuccessAlert.bind(this);
        this.productDefinitionDeletedSuccessAlert = this.productDefinitionDeletedSuccessAlert.bind(this);
        this.productDefinitionCreatedErrorAlert = this.productDefinitionCreatedErrorAlert.bind(this);
    }
    id:''
    productDefinitionCreatedErrorAlert(){
        this.setState({ productDefinitionCreatedErrorAlertVisible: false });
    }
    productDefinitionCreatedSuccessAlert(){
        this.setState({ productDefinitionCreatedSuccessAlertVisible: false });
    }
    productDefinitionDeletedSuccessAlert(){
        this.setState({ productDefinitionDeletedSuccessAlertVisible: false });
    }
    toggleConfirm = () =>{
        this.setState({ deleteModal: !this.state.deleteModal });
    }
    confirm = ()=> {
        this.props.deleteProductDefinition(this.id);
        this.setState({deleteModal:false});
    }
    deleteProduct = (value) => {
        this.setState({deleteModal:true});
        this.id = value;    
    }

    updateProductDefinition = (id,accountid) => {
        // console.log('Account id is ',id,'and account file id is ',accountid);
        this.props.history.push(`/accounts/${accountid}/definitions/editdefinition/${id}`);
    }
    componentWillMount(){
        this.props.fetchOneAccount(this.props.match.params.id);
        this.props.fetchProductDefinitions(this.props.match.params.id);
    }

    onSubmit = (values) =>{
        this.props.createProcessor(values);
       this.closeModal();
    }

    updateProcessor = (id) => {
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
        this.props.getOneProcessor(id);
    }

    closeUpdateModal = () => {
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
    }

    onSubmitUpdate = (values) => {
        this.props.updateProcessor(values);
        this.closeUpdateModal();
    }
    toggle = () => {
        this.setState({ showModal: !this.state.showModal });
    }
    closeModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }
    deleteProcessor = (id) => {
        this.props.deleteProcessor(id);
    }

    createProductDefinition = () =>{ 
        this.props.history.push(`/accounts/${this.props.match.params.id}/definitions/setup`);
    }
    createManualPosting = () => {
        this.props.history.push(`/accounts/${this.props.match.params.id}/definitions/manualPosting`);
    }
    
    render(){
        // console.log('Props here is ',this.props);
        return(
            <div className="animated fadeIn">
                
                <Row>
                    <Col xs="12" >
                        <Card>
                            <CardHeader>
                                <FormattedMessage id="Account Details" defaultMessage="Account Details"/>
                                
                            </CardHeader>
                            <CardBody>
                            <FormGroup row style={{'marginBottom':'0px'}}>
                                    <Col md="3">
                                    <Label><FormattedMessage id="Name" defaultMessage="Name"/></Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                    <p className="form-control-static">{this.props.account?this.props.account.name.toUpperCase():''}</p>
                                    </Col>
                                </FormGroup>
                                <hr style={{'marginTop':'0px'}}/>
                                <FormGroup row style={{'marginBottom':'0px'}}>
                                    <Col md="3">
                                    <Label><FormattedMessage id="Account Number" defaultMessage="Account Number"/></Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                    <p className="form-control-static">{this.props.account?this.props.account.accountNo:''}</p>
                                    </Col>
                                </FormGroup>
                                <hr style={{'marginTop':'0px'}}/>
                                <FormGroup row style={{'marginBottom':'0px'}}>
                                    <Col md="3">
                                    
                                    <Label><FormattedMessage id="app.currency" defaultMessage="Currency"/></Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                    <p className="form-control-static">{this.props.account?this.props.account.currency.toUpperCase():'n/A'}</p>
                                    </Col>
                                </FormGroup>
                                <hr style={{'marginTop':'0px'}}/>
                                <FormGroup row style={{'marginBottom':'0px'}}>
                                    <Col md="3">
                                    <Label><FormattedMessage id="Account Type" defaultMessage="Account Type"/></Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                    <p className="form-control-static">{this.props.account?this.props.account.accountType.toUpperCase():'n/A'}</p>
                                    </Col>
                                </FormGroup>
                                <hr style={{'marginTop':'0px'}}/>
                                <FormGroup row style={{'marginBottom':'0px'}}>
                                    <Col md="3">
                                    <Label><FormattedMessage id="Allow Manual Posting" defaultMessage="Allow Manual Posting"/></Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                    <p className="form-control-static">{this.props.account?this.props.account.allowManual.toString().toUpperCase():'n/A'}</p>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ 'textAlign': 'right' }}>
                    <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.createProductDefinition}><i className="fa fa-plus"></i>&nbsp;<FormattedMessage id="Add Account Defintion" defaultMessage="Add Account Defintion"/></Button>
                    </Col>
                </Row>
                <Row>
                     <Col xs="12">
                        {this.props.productDefintionCreated?<Alert color="success" isOpen={this.state.productDefinitionCreatedSuccessAlertVisible} toggle={this.productDefinitionCreatedSuccessAlert}>
                            
                            <FormattedMessage id="Success: Account Definition Added Successfully!" defaultMessage="Success: Account Definition Added Successfully!"/>
                        </Alert>:null}
                       
                        {this.props. productDefinitionCreatedError?<Alert color="danger" isOpen={this.state.productDefinitionCreatedErrorAlertVisible} toggle={this.productDefinitionCreatedErrorAlert}>
                            Error: {this.props.productDefinitionCreatedError}!
                        </Alert>:null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {this.props.productList.productDefinitionDeleted ?<Alert color="success" isOpen={this.state.productDefinitionDeletedSuccessAlertVisible} toggle={this.productDefinitionDeletedSuccessAlert}>
                        <FormattedMessage id="Success: Product Definition Deleted Successfully!" defaultMessage="Success: Product Definition Deleted Successfully!"/>
                    </Alert>:null}
                    
                        <Card>
                        <CardHeader>
                            <i className="fa fa-credit-card-alt"></i> <strong>{this.props.account?this.props.account.name:''}'s </strong><FormattedMessage id="Account Definitions" defaultMessage="Account Definitions"/>
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    
                                    <th><FormattedMessage id="Channel Name" defaultMessage="Channel Name"/></th>
                                    <th><FormattedMessage id="Column Index" defaultMessage="Column Index"/></th>
                                    <th><FormattedMessage id="app.actions" defaultMessage="Actions"/></th>
                                </tr>
                            </thead>
                            <tbody>
                                {  this.props.productList.productDefinitions
                                    ? [
                                        this.props.productList.productDefinitions.data.length > 0 ?  this.props.productList.productDefinitions.data.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{index+1}</td>
                                                
                                                <td >{item.channelFileName}</td>
                                                <td> 
                                                    {item.columnIndex}
                                                </td>
                                                <td>
                                                    <i className="fa fa-edit fa-lg text-center" style={{color:'blue','cursor':'pointer'}} onClick={(e)=>this.updateProductDefinition(item.id,this.props.match.params.id)}></i>{ '    '}
                                                    <i className="fa fa-trash fa-lg text-center" style={{color:'red','cursor':'pointer'}} onClick={(e) => this.deleteProduct(item.id)}></i> 
                                                </td>
                                            </tr>
                                        )):<tr><td colSpan="4"><p className="text-center text-danger">There are no definitions at the moment for the product</p></td></tr>
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
                        <ModalHeader toggle={this.toggleConfirm}>Delete</ModalHeader>
                        <ModalBody>
                            Are you sure you want to delete this Product Definition? 
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={this.confirm}>Delete</Button>{' '}
                            <Button color="secondary" onClick={this.toggleConfirm}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('State is ',state)
    return {
        productList:state.productDefinition,
        productData:state.products.product,
        productDefintionCreated:state.productDefinition.productDefinitonCreated,
        productDefinitionCreatedError:state.productDefinition.productDefinitionCreationError,
        account:state.accounts.account,
        fileDefinitionList:state.fileDefinition.fileDefinitionList,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchProductDefinitions,
        deleteProductDefinition,
        getProduct,
        fetchOneAccount,
        fetchFileDefinitions
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ProductDefinitions);