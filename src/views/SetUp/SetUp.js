import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label ,Alert} from 'reactstrap';
import CSVReader from "react-csv-reader";
import {fetchProducts,createProduct} from '../../actions/products';
import {getProcessor} from '../../actions/processor';
import {createProductDefinitions} from '../../actions/product_definition';
import {fetchOperators} from '../../actions/utils';
import {fetchFileDefinitions,fetchOneFileDefinition} from '../../actions/file_definition';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FieldArraysForm from './addProductForm';
import AddProductDetailsForm from './addProductDetails';
import AddProductDefinitonForm from './addProductDefinition';
import {getProduct} from '../../actions/products';
import {fetchOneAccount} from '../../actions/accounts';
import {FormattedMessage,FormattedDate, FormattedTime} from 'react-intl';

class SetUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            name:'Olawale',
            mappedFields:[],
            subgroups:[],
            fileName:'',
            mappingToView:[],
            currencyOptions:['Naira','Pounds','Dollars'],

        }
        this.handleClick = this.handleClick.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.getSubGroup = this.getSubGroup.bind(this);
    }

    componentWillMount(){
        this.props.fetchOneAccount(this.props.match.params.id);
        this.props.getProcessor();
        this.props.fetchOperators();
        this.props.getProduct(this.props.match.params.id);
        this.props.fetchFileDefinitions();
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

    onSubmit = (values) =>{
        let subgroupid = values.subgroup;
        values.active = true;
        delete values.subgroup;
        delete values.processor;
        this.props.createProduct(values,subgroupid);
    }

    onSubmitDefinition = (values) => {
        values.hasHeader = Boolean(values.hasHeader);
        // values.fileName = this.state.fileName;
        this.props.createProductDefinitions(values,this.props.match.params.id);
        
    }
    
    getMapping = (id) => {
        // console.log('id is ',id, this.props);

        if(this.props){
            this.props.fetchOneFileDefinition(id);
            // debugger;
            // let mappingObject = this.props.fileDefinitionList.data.find(item => item.id == id);
            
            // this.setState({mappingToView:mappingObject.mapping.firstRow});
            
        }
    }
    onSubmitNewDefinition = (values) => {
        console.log('File Headers are ',this.state.mappedFields);
        debugger;
        return;
    }


    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        // if (this.props.userID !== prevProps.userID) {
        //   this.fetchData(this.props.userID);
        // }
        if(this.props.productDefintionCreated !== prevProps.productDefintionCreated){
            this.props.history.push(`/accounts/${this.props.match.params.id}/definitions`);
        }
    
    }

    componentWillUnmount(){   
        this.props.productDefinitionCreationError.productDefinitionCreationError = null;
    }
    render(){
        console.log('Props here is ',this.props);
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
                                    <p className="form-control-static">{this.props.account?this.props.account.name:''}</p>
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
                                    <Label><FormattedMessage id="Currency" defaultMessage="Currency"/></Label>
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
                {/* <Row>
                    <Col xs="12">
                        {this.props.productDefintionCreated?<Alert color="success">
                            Success: Product Definition Added Successfully!
                        </Alert>:null}
                    </Col>
                </Row> */}
                <Row>
                    <Col xs="12">
                        {this.props.productDefinitionCreationError.productDefinitionCreationError?<Alert color="danger" >
                            Error: {this.props.productDefinitionCreationError.productDefinitionCreationError.message}!
                        </Alert>:null}
                    </Col>
                </Row>
                 <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <FormattedMessage id="Account Definitions" defaultMessage="Account Definitions"/>
                                
                            </CardHeader>
                            <CardBody>
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
                                <AddProductDefinitonForm state={this.state} onSubmit = {this.onSubmitDefinition} {...this.props} getMapping={this.getMapping}/>
                                
                            </CardBody>
                        </Card>
                    </Col>
                </Row> 
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('state is ',state)
    return {
        productsData:state.products,
        productData2:state.products.products,
        processorData:state.processors.processors,
        productCreated:state.processors.createdProduct,
        utilsList:state.utils.operators,
        productDefintionCreated:state.productDefinition.productDefinitonCreated,
        account:state.accounts.account,
        fileDefinitionList:state.fileDefinition.fileDefinitionList,
        fileDefinition:state.fileDefinition,
        productDefinitionCreationError:state.productDefinition,

    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchProducts,
        getProcessor,
        createProduct,
        createProductDefinitions,
        fetchOperators,
        getProduct,
        fetchOneAccount,
        fetchFileDefinitions,
        fetchOneFileDefinition
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SetUp);