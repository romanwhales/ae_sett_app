import React, { Component } from 'react';
import { Col, Row,Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddProductDetailsForm from './addProductDetails';
import {fetchProducts,createProduct} from '../../actions/products';
import {getProcessor,getSubGroups} from '../../actions/processor';
import {fetchAffiliates} from '../../actions/affiliates'




class AddProducts extends Component{
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
        this.props.fetchAffiliates();
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
            this.props.history.push('/products');
        }
        
      }

    
    getSubGroup = (id) => {
        debugger;
        if(this.props && id){
            console.log('Props needed is ',this.props);
            this.props.getSubGroups(id);
            // let filtered_subgroup = this.props.processorData.data.filter(item=>item.name === name);
            // debugger;
            // this.setState({subgroups:filtered_subgroup[0].subgroups});
        }
        
    }
    onSubmit = (values) =>{
        if(this.props.match.params.id){
            this.props.createProduct(values,this.props.match.params.id);
            this.props.history.push('/products');
    
        }else{
            let subgroupid = values.subgroup;
            values.active = true;
            delete values.subgroup;
            delete values.processor;
            this.props.createProduct(values,subgroupid);
            console.log(this.props.productCreated);
            
        }
        
    }
    componentWillUnmount(){
        this.props.products.productCreatedError = null;
    }
    render(){
        return(
            
                
            <Row>
                <Col xs="12">
                    {this.props.products.productCreatedError?<Alert color="danger" isOpen={this.state.createProductErrorAlertVisible} toggle={this.onDismissCreateProductErrorAlert}>
                        Error!: {this.props.products.productCreatedError.message}
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
        affiliates:state.affiliates,
        processorSubGroupsData:state.processors.subGroups,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchProducts,
        getProcessor,
        createProduct,
        getSubGroups,
        fetchAffiliates
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(AddProducts);