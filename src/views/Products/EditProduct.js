import React, { Component } from 'react';
import { Col, Row,Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {bindActionCreators} from 'redux';
import EditProductDetailsForm  from './editProductDetails';
import {fetchProducts,createProduct,getProduct,updateProduct} from '../../actions/products';
import {getProcessor} from '../../actions/processor';


class EditProduct extends Component{
    constructor(props){
        super(props);
        this.state = {
            subgroups:[],
            currencyOptions:['Naira','Pounds','Dollars'],
        }
    }

    componentWillMount(){
        this.props.getProduct(this.props.match.params.id);
        this.props.getProcessor();
    }

    
    getSubGroup = (name ) => {
        if(this.props){
            console.log('Props needed is ',this.props);
            let filtered_subgroup = this.props.processorData.data.filter(item=>item.name === name);
            this.setState({subgroups:filtered_subgroup[0].subgroups});
        }
        
    }
    onSubmit = (values) =>{
        let subgroupid = values.subgroup;
        values.active = true;
        delete values.subgroup;
        delete values.processor;
        this.props.updateProduct(values,subgroupid,this.props.match.params.id);
        this.props.history.push(`/products`);
        
    }
    render(){
        return(
            <div>
                <Row>
                    <Col>
                        {this.props.productUpdated?<Alert color="success">
                            <FormattedMessage id="Success: Product Updated Successfully!" defaultMessage="Success: Product Updated Successfully!"/>
                        </Alert>:null}
                    </Col>
                </Row>
               
                <EditProductDetailsForm {...this.props} {...this.state} getSubGroup={this.getSubGroup} onSubmit = {this.onSubmit}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        processorData:state.processors.processors,
        productCreated:state.processors.createdProduct,
        productUpdated:state.products.productUpdated,
        initialValues:state.products.product
    }
}
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchProducts,
        getProcessor,
        createProduct,
        getProduct,
        updateProduct
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(EditProduct);