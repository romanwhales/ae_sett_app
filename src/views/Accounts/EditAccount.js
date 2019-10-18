import React, { Component } from 'react';
import { Col, Row,Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FormattedMessage} from 'react-intl';
import EditAccountForm from './EditAccountForm';
import {fetchProducts} from '../../actions/products';
import {fetchOneAccount,updateAccount} from '../../actions/accounts';
import {getProcessor} from '../../actions/processor';
import {fetchCurrencies} from '../../actions/utils';


class EditAccount extends Component{
    constructor(props){
        super(props);
        this.state = {
            subgroups:[],
            currencyOptions:['Naira','Pounds','Dollars'],
            accountType:['PAYABLE','RECEIVABLE','INCOME','EXPENSE'],
            amountDirectionOptions:[{name:'Credit',alias:'C'},{name:'Debit',alias:'D'}],
            
        }
    }

    componentWillMount(){
        this.props.fetchOneAccount(this.props.match.params.id);
        this.props.fetchProducts();
        this.props.fetchCurrencies();
    }

    
    getSubGroup = (name ) => {
        debugger;
        if(this.props){
            // console.log('Props needed is ',this.props);
            let filtered_subgroup = this.props.processorData.data.filter(item=>item.name === name);
            this.setState({subgroups:filtered_subgroup[0].subgroups});
        }
        
    }
    onSubmit = (values) =>{
        let productid = values.product_id;
        values.active = true;
        delete values.subgroup;
        delete values.processor;
        delete values.product_id;
        this.props.updateAccount(values,productid,this.props.match.params.id)
        this.props.history.push(`/accounts`);
        
    }
    // componentWillUnmount(){
    //     this.clearNotifications();
    // }
    // clearNotifications = () => {
    //     this.props.accountUpdated = null;
    // }
    render(){
        console.log(this.props);
        return(
            <div>
                <Row>
                    <Col>
                        {this.props.accountUpdated?<Alert color="success">
                            <FormattedMessage id="Success: Account Updated Successfully!" defaultMessage="Success: Account Updated Successfully!"/>
                        </Alert>:null}
                    </Col>
                </Row>
                <EditAccountForm {...this.props} {...this.state} getSubGroup={this.getSubGroup} onSubmit = {this.onSubmit}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('State is ',state);
    return {
        initialValues:state.accounts.account,
        productList:state.products.products,
        currencyList:state.utils.currencies,
        accountUpdated:state.accounts.accountUpdated,
    }
}
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchProducts,
        getProcessor,
        fetchOneAccount,
        fetchCurrencies,
        updateAccount
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(EditAccount);