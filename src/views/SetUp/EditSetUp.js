import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label ,Alert} from 'reactstrap';
import CSVReader from "react-csv-reader";
import {FormattedMessage,FormattedDate, FormattedTime} from 'react-intl';
import {fetchProducts,createProduct,getProduct} from '../../actions/products';
import {getProcessor} from '../../actions/processor';
import {fetchFileDefinitions} from '../../actions/file_definition';
import {updateProductDefinition,viewProductDefinitionsDetails} from '../../actions/product_definition';
import {fetchOperators} from '../../actions/utils';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FieldArraysForm from './addProductForm';
import AddProductDetailsForm from './addProductDetails';
// import AddProductDefinitonForm from './addProductDefinition';
import EditProductDefinitonForm from './editProductDefinition';
import {fetchOneAccount} from '../../actions/accounts';

class EditSetUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            mappedFields:[],
            mappingToView:[],
            subgroups:[],
            fileName:'',
            currencyOptions:['Naira','Pounds','Dollars'],
            productDefinitionUpdatedSuccessAlertVisible:true,
            productDefinitionUpdatedErrorAlertVisible:true,

        }
        this.handleClick = this.handleClick.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.getSubGroup = this.getSubGroup.bind(this);
        this.productDefinitionUpdatedSuccessAlert = this.productDefinitionUpdatedSuccessAlert.bind(this);
        this.productDefinitionUpdatedErrorAlert = this.productDefinitionUpdatedErrorAlert.bind(this);
    }

    componentWillMount(){
        
        this.props.getProcessor();
        this.props.fetchOperators();
        // this.props.getProduct(this.props.match.params.id);
        this.props.fetchOneAccount(this.props.match.params.accountid);
        this.props.viewProductDefinitionsDetails(this.props.match.params.id);
        this.props.fetchFileDefinitions();
    }

    productDefinitionUpdatedSuccessAlert(){
        this.setState({ productDefinitionUpdatedSuccessAlertVisible:false})
    }

    productDefinitionUpdatedErrorAlert(){
        this.setState({ productDefinitionUpdatedErrorAlertVisible:false})
    }

    
    getSubGroup(name){
        let filtered_subgroup = this.props.processorData.data.filter(item=>item.name === name);
        this.setState({subgroups:filtered_subgroup[0].subgroups});
    }


    handleClick(e){
        this.setState({ names: this.state.names.concat(5) })
    }

    handleUpload = (data,name) => {
       
        this.setState({mappedFields:data[0],fileName:name});
    };

    onSubmitDefinition = (values) => {
        values.hasHeader = Boolean(values.hasHeader);
        // values.fileName = this.state.fileName;
        this.props.updateProductDefinition(values,this.props.match.params.id);
    }
    getMapping = (id) => {
        // console.log('id is ',id, this.props);
        if(!id){
            return;
        }
        if(this.props){
            let mappingObject = this.props.fileDefinitionList.data.find(item => item.id == id);
            this.setState({mappingToView:mappingObject.mapping.firstRow});
            
        }
    }
    componentWillUnmount(){
        // this.props.productDefinitionError= null;
        this.props.productDefinition.productDefinitionError = null;
    }
    render(){
        {console.log('Props is ',this.props)}
        return(
            <div className="animated fadeIn">
                 <Row>
                    <Col xs="12" >
                        <Card>
                            <CardHeader>
                                <strong>Account </strong> Details
                            </CardHeader>
                            <CardBody>
                            <FormGroup row style={{'marginBottom':'0px'}}>
                                    <Col md="3">
                                    <Label>Name</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                    <p className="form-control-static">{this.props.account?this.props.account.name:''}</p>
                                    </Col>
                                </FormGroup>
                                <hr style={{'marginTop':'0px'}}/>
                                <FormGroup row style={{'marginBottom':'0px'}}>
                                    <Col md="3">
                                    <Label>Account Number</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                    <p className="form-control-static">{this.props.account?this.props.account.accountNo:''}</p>
                                    </Col>
                                </FormGroup>
                                <hr style={{'marginTop':'0px'}}/>
                                <FormGroup row style={{'marginBottom':'0px'}}>
                                    <Col md="3">
                                    <Label>Currency</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                    <p className="form-control-static">{this.props.account?this.props.account.currency:''}</p>
                                    </Col>
                                </FormGroup>
                                <hr style={{'marginTop':'0px'}}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        {this.props.productDefinitionUpdated?<Alert color="success" isOpen={this.state.productDefinitionUpdatedSuccessAlertVisible} toggle={this.productDefinitionUpdatedSuccessAlert}>
                            
                            <FormattedMessage id="Success: Product Definition Updated Successfully!" defaultMessage="Success: Product Definition Updated Successfully!"/>
                        </Alert>:null}
                    </Col>
                    
                    <Col xs="12">
                        
                        {this.props.productDefinition.productDefinitionError?<Alert color="danger" isOpen={this.state.productDefinitionUpdatedErrorAlertVisible} toggle={this.productDefinitionUpdatedErrorAlert}>
                            Error: {this.props.productDefinition.productDefinitionError.message}!
                        </Alert>:null}
                    </Col>
                </Row>
                 <Row>
                    <Col xs="12">
                        {/* <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="file-input">File input</Label>
                                
                            </Col>
                            <Col xs="12" md="9">
                                
                                <CSVReader
                                    cssClass="react-csv-input"
                                    onFileLoaded={this.handleUpload}
                                    />
                            </Col>
                        </FormGroup> */}
                        {/*  */}
                        <EditProductDefinitonForm state={this.state} onSubmit = {this.onSubmitDefinition} {...this.props} getMapping={this.getMapping}/>
                    </Col>
                </Row> 
                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('state is ',state);
    // console.log('state initial values is ',state.productDefinition.productDefinitionDetails);
    return {
        productsData:state.products,
        productData2:state.products.products,
        processorData:state.processors.processors,
        productCreated:state.processors.createdProduct,
        utilsList:state.utils.operators,
        productDefinitionUpdated:state.productDefinition.productDefinitionUpdated,
        // productDefinitionError:state.productDefinition.productDefinitionError,
        productDefinition:state.productDefinition,
        // initialValues:state.productDefinition.productDefinitionDetails,
        
        account:state.accounts.account,
        fileDefinitionList:state.fileDefinition.fileDefinitionList,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchProducts,
        getProcessor,
        createProduct,
        updateProductDefinition,
        fetchOperators,
        getProduct,
        viewProductDefinitionsDetails,
        fetchOneAccount,
        fetchFileDefinitions
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(EditSetUp);