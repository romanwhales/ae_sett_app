import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Button,FormGroup,Label,Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FormattedMessage,FormattedDate, FormattedTime} from 'react-intl';

import AddAccountForm from './addAccountForm';
import {fetchProducts,createProduct} from '../../actions/products';
import {fetchFileDefinitions} from '../../actions/file_definition';
import {createAccount} from '../../actions/accounts';
import {getProcessor} from '../../actions/processor';
import {fetchCurrencies,fetchOperators} from '../../actions/utils';


class AddAccounts extends Component{
    constructor(props){
        super(props);
        this.state = {
            subgroups:[],
            currencyOptions:['Naira','Pounds','Dollars'],
            accountOptions:['PAYABLE','RECEIVABLE','INCOME','EXPENSE'],
            amountDirectionOptions:[{name:'Credit',alias:'C'},{name:'Debit',alias:'D'}],
            createdAccountError:true,
            createSuccessAlertVisible:true,
            mappingToView:[],
        }
        this.onDismissCreatedAccountErrorAlert= this.onDismissCreatedAccountErrorAlert.bind(this);
        this.onDismissCreateSuccessAlert = this.onDismissCreateSuccessAlert.bind(this);
    }

    componentWillMount(){
        this.props.fetchProducts();
        this.props.fetchCurrencies();
        this.props.fetchFileDefinitions();
        this.props.fetchOperators();
        // console.log('props here is ',this.props);
    }

    onDismissCreatedAccountErrorAlert(){
        this.setState({ createdAccountError: false });
    }

    onDismissCreateSuccessAlert(){
        this.setState({ createSuccessAlertVisible: false });
    }

    
    getSubGroup = (name ) => {
        if(this.props){
            let filtered_subgroup = this.props.processorData.data.filter(item=>item.name === name);
            this.setState({subgroups:filtered_subgroup[0].subgroups});
        }
    }
    getMapping = (id,index) => {
        // console.log('id is ',id, this.props);
        if(this.props){
            let mappingObject = this.props.fileDefinitionList.data.find(item => item.id == id);
            let mappingArray = this.state.mappingToView;
            mappingArray.splice(index,1,mappingObject.mapping.firstRow);
            this.setState({mappingToView:mappingArray});
            console.log('Mapping arry is ',mappingArray);
            // this.setState({mappingToView[index]:mappingObject.mapping.firstRow});
        }
    }
    onSubmit = (values) =>{
        /**if it fails just use the product id from the params */
        if(values.accounts[0].productId){
            const id = values.accounts[0].productId;
            delete values.accounts[0].productId;
            this.props.createAccount(values.accounts,id); 
        }else{
            this.props.createAccount(values.accounts,this.props.match.params.productId); 
        }
        
       
         
    }

    componentDidUpdate(prevProps) {
        if(this.props.accountsCreated.accountCreated !== prevProps.accountsCreated.accountCreated){
            this.props.history.push(`/accounts`);
        }
        
      }

    componentWillUnmount(){   
        this.clearNotifications();
    }
    clearNotifications=() => {
        this.props.accountsCreated.accountCreated= null;
        this.props.accountsCreated.accountCreatedError = null;
    }
    render(){
        console.log('Props is ',this.props);
        return(
            <div>
                <Row>
                    <Col xs="12">
                        {this.props.accountsCreated.accountCreatedError?<Alert color="danger" isOpen={this.state.createdAccountError} toggle={this.onDismissCreatedAccountErrorAlert}>
                            {this.props.accountsCreated.accountCreatedError.response.data.message}
                            </Alert>:null}
                    </Col>
                    <Col xs="12">
                        {this.props.accountsCreated.accountCreated?<Alert color="success" isOpen={this.state.createSuccessAlertVisible} toggle={this.onDismissCreateSuccessAlert}> 
                            <FormattedMessage id="Success: Account Added Successfully!" defaultMessage="Success: Account Added Successfully!"/>
                        </Alert>:null}
                    </Col>
                </Row>
                {/* <AddProductDetailsForm {...this.props} {...this.state} getSubGroup={this.getSubGroup} onSubmit = {this.onSubmit}/> */}
                <AddAccountForm {...this.props} {...this.state} getSubGroup={this.getSubGroup} getMapping={this.getMapping} onSubmit = {this.onSubmit}/>
                
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('State is ',state);
    return {
        processorData:state.processors.processors,
        productCreated:state.processors.createdProduct,
        productList:state.products.products,
        accountsCreatedError:state.accounts.accountCreatedError,
        accountsCreated:state.accounts,
        currencyList:state.utils.currencies,
        fileDefinitionList:state.fileDefinition.fileDefinitionList,
        operatorList:state.utils.operators,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchProducts,
        getProcessor,
        createProduct,
        createAccount,
        fetchCurrencies,
        fetchFileDefinitions,
        fetchOperators
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(AddAccounts);