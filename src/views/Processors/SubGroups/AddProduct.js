import React, { Component } from 'react';
import { Col, Row, Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddProductDetailsForm from './addProductDetails';
import {fetchProducts,createProduct} from '../../../actions/products';
import {getProcessor} from '../../../actions/processor';


class ProcessorSubGroupsAddproduct extends Component{
    constructor(props){
        super(props);
        this.state = {
            subgroups:[],
            currencyOptions:['Naira','Pounds','Dollars'],
            accountOptions:['Payable','Receivable','Income','Expense'],
            createProductErrorAlertVisible:true
        }
    }

    componentWillMount(){
        this.props.getProcessor();
        this.clearNotifications();
    }

    onDismissCreateProductErrorAlert=()=> {
        this.setState({ createProductErrorAlertVisible: false });
      }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        // if (this.props.userID !== prevProps.userID) {
        //   this.fetchData(this.props.userID);
        // }
        if(this.props.productCreated !== prevProps.productCreated){
            this.props.history.push(`/processors/${this.props.match.params.id}/subgroups/${this.props.match.params.subgroupid}/products`);
        }
        
      }

    
    getSubGroup = (name ) => {
        if(this.props){
            console.log('Props needed is ',this.props);
            let filtered_subgroup = this.props.processorData.data.filter(item=>item.name === name);
            this.setState({subgroups:filtered_subgroup[0].subgroups});
        }
        
    }
    onSubmit = (values) =>{
        this.props.createProduct(values,this.props.match.params.subgroupid);
        
    }
    componentWillUnmount(){
        this.props.products.productCreatedError = null;
    }

    clearNotifications = () => {
        this.props.products.productCreatedError = null;
    }
    
    render(){
        console.log(this.props);
        return(
            
                
            <Row>
                <Col xs="12">
                    {this.props.products.productCreatedError?<Alert color="danger" isOpen={this.state.createProductErrorAlertVisible} toggle={this.onDismissCreateProductErrorAlert}>
                        Error!: {this.props.products.productCreatedError.response.data}
                    </Alert>:null}
                </Col>
                <Col xs="12">
                    <AddProductDetailsForm {...this.props} {...this.state} getSubGroup={this.getSubGroup} onSubmit = {this.onSubmit}/>
                </Col>
            </Row>
            
            
        )
    }
}


const mapStateToProps = (state) => {
    console.log('Products State is ',state)
    return {
        processorData:state.processors.processors,
        productCreated:state.processors.createdProduct,
        products:state.products,


    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchProducts,
        getProcessor,
        createProduct
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ProcessorSubGroupsAddproduct);