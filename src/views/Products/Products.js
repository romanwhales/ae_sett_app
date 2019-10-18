import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label ,Alert} from 'reactstrap';
import {fetchProducts,deleteProduct,getProduct,updateProduct} from '../../actions/products';
import {getProcessor} from '../../actions/processor';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import AddProcessorComponent from './addProcessor';
// import UpdateProcessorComponent from './updateProcessor';

import {FormattedMessage,FormattedHTMLMessage} from 'react-intl';

import UpdateProduct from './updateProductForm';
class Products extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            subgroups:[],
            processorCreated:false,
            showUpdateModal:false,
            deleteModal:false,
            createSuccessAlertVisible:true,
            deletedSuccessAlertVisible:true,
            updateSuccessAlertVisible:true,
            productListErrorAlertVisible:true
        }
        this.onDismissCreateSuccessAlert= this.onDismissCreateSuccessAlert.bind(this);
        this.onDismissDeletedSuccessAlert = this.onDismissDeletedSuccessAlert.bind(this);
        this.onDismissUpdateSuccessAlert = this.onDismissUpdateSuccessAlert.bind(this);
    }
    id=''
    local=''

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
        this.props.productsData.productUpdated = null;
        this.props.fetchProducts();
        this.props.getProcessor();
        this.local = JSON.parse(localStorage.decodedToken).authorities[0];
        
        
    }

    setUpProductMapping =(id) => {
        this.props.history.push(`/products/setup/${id}`);
    }

    setUpAccount = (id) => {
        // /products/addAccounts/:productId
        this.props.history.push(`/products/addAccounts/${id}`);
    }

    updateProduct = (id) => {
        this.clearNotifications();
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
        this.props.getProduct(id);
        // this.props.getOneProcessor(id);
        // console.log('id is ',id);
        // debugger;
        // this.props.history.push(`/products/${id}/edit`);
    }

    closeUpdateModal = () => {
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
    }
    addProduct = () => {
        this.props.history.push('/products/addProducts');
    }
    closeModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }
   
    toggleConfirm = () =>{
        this.setState({ deleteModal: !this.state.deleteModal });
    }
    confirm = ()=> {
        this.props.deleteProduct(this.id);
        this.setState({deleteModal:false});
    }
    deleteProduct = (value) => {
        this.setState({deleteModal:true});
        this.id = value;    
    }

    onSubmitUpdate = (values) => {
        let productId = values.id;
        let subgroupId = values.subgroup;
        this.props.updateProduct(values,subgroupId,productId);
        this.closeUpdateModal();
    }

    getSubGroup = (name ) => {
        if(this.props){
            // console.log('Props needed is ',this.props);
            let filtered_subgroup = this.props.processorData.data.filter(item=>item.name === name);
            this.setState({subgroups:filtered_subgroup[0].subgroups});
        }
        
    }

    onDismissProductListErrorAlert = () => {
        this.setState({
            productListErrorAlertVisible: false
        })
    }
    componentWillUnmount(){
        this.clearNotifications();
        // this.props.productUpdated = null;
    }
    clearNotifications =() => {
        this.props.productsData.productDeleted = null;
        this.props.productCreated.createdProduct = null;
        this.props.productsData.productUpdated = null;
        this.props.productsData.productsError = null;
    }
    
    render(){
        console.log('Props here is ',this.props);
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col style={{ 'textAlign': 'right' }}>
                    <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.addProduct}><i className="fa fa-plus"></i>&nbsp;<FormattedMessage id="Add Product" defaultMessage="Add Product"/> </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        {this.props.productsData.productDeleted ?<Alert color="success" isOpen={this.state.deletedSuccessAlertVisible} toggle={this.onDismissDeletedSuccessAlert}>
                                
                                <FormattedMessage id="Success: Product Deleted Successfully!" defaultMessage="Success: Product Deleted Successfully!"/>
                            </Alert>:null}
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        {this.props.productCreated.createdProduct?<Alert color="success" isOpen={this.state.createSuccessAlertVisible} toggle={this.onDismissCreateSuccessAlert}>
                            
                            <FormattedMessage id="Success: Product Added Successfully!" defaultMessage="Success: Product Added Successfully!"/>
                        </Alert>:null}
                    </Col>
                    <Col xs="12">
                        {this.props.productsData.productUpdated?<Alert color="success" isOpen={this.state.updateSuccessAlertVisible} toggle={this.onDismissUpdateSuccessAlert}>
                        <FormattedMessage id="Success: Product Updated Successfully!" defaultMessage="Success: Product Updated Successfully!"/>
                            
                        </Alert>:null}
                    </Col>
                    <Col>
                        {this.props.productsData.productsError?<Alert color="danger" isOpen={this.state.productListErrorAlertVisible} toggle={this.onDismissProductListErrorAlert}>
                            Error: {this.props.productsData.productsError.data.message}
                        </Alert>:null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                    
                        <Card>
                        <CardHeader>
                             <FormattedMessage id="app.product" defaultMessage="Products"/> 
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm">
                            <thead >
                                <tr>
                                    
                                    <th>
                                        <FormattedMessage id="app.name" defaultMessage="Name"/>
                                    </th>
                                    <th>
                                        <FormattedMessage id="Schemes" defaultMessage="Schemes"/>
                                    </th>
                                    <th>
                                        <FormattedMessage id="Product Number" defaultMessage="Product Number"/>
                                    </th>
                                    <th>
                                    <FormattedMessage id="app.actions" defaultMessage="Actions"/>
                                    </th> 
                                    {/* <th>Currency</th>
                                    <th>Account Number</th>
                                    <th>Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.productsData.products
                                    ? [
                                        this.props.productsData.products.data.length > 0 ?  this.props.productsData.products.data.map((item,index) => (
                                            <tr key={index+1}>
                                                
                                                <td><a>{item.name}</a></td>
                                                <td>{item.subgroup ? item.subgroup.processor.name: 'N/A' }</td>
                                                <td>{item.productNo?item.productNo:'N/A' }</td>
                                                <td><i className="fa fa-edit fa-lg text-center" style={{color:'blue'}} onClick={(e)=>this.updateProduct(item.id)}></i> &nbsp;&nbsp;<a href={"#/products/"+item.id+"/accounts"}> <FormattedMessage id="View Accounts" defaultMessage="View Accounts"/></a>&nbsp;&nbsp;&nbsp;
                                                <Button color="secondary" type="button" size="sm" onClick={e => this.setUpAccount(item.id)}><FormattedMessage id="Add Account" defaultMessage="Add Account"/></Button>
                                                </td>
                                                
                                                
                                            </tr>
                                        )):<tr><td colSpan="5"><p className="text-center text-danger">There are no products at the moment.</p></td></tr>
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
                            Are you sure you want to delete this product? 
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={this.confirm}>Delete</Button>{' '}
                            <Button color="secondary" onClick={this.toggleConfirm}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <UpdateProduct {...this.state} {...this.updateToggle} closeUpdateModal ={this.closeUpdateModal} onSubmit={this.onSubmitUpdate} {...this.props} getSubGroup={this.getSubGroup}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('Products State is ',state)
    return {
        productsData:state.products,
        productData2:state.products.products,
        productCreated:state.processors,
        // productUpdated:state.products.productUpdated,
        initialValues:state.products.product,
        processorData:state.processors.processors,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchProducts,
        deleteProduct,
        getProduct,
        getProcessor,
        updateProduct
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Products);