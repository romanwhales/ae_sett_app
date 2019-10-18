import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Button,Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchSubGroupAccounts} from '../../../actions/subgroups';
import {getOneProcessor} from '../../../actions/processor';
import UpdateProduct from './updateProductForm';
import {getProduct,updateProduct} from '../../../actions/products';
import {FormattedMessage,FormattedHTMLMessage} from 'react-intl';

class ProcessorSubGroupsProducts extends Component {
    constructor(props){
        super(props);
        this.state ={
            showSubGroupModal:false,
            showUpdateModal:false,
        }
    }
    componentWillMount(){
        //   console.log('Props here is ',this.props);
        this.props.getOneProcessor(this.props.match.params.id);
        this.props.fetchSubGroupAccounts(this.props.match.params.subgroupid);
    }
  
  onSubmit = (values,id,details) => {
    //   console.log('id is ',this.props.match.params.id);
    //   debugger;
     this.props.createSubGroup(values,this.props.match.params.id);
     this.closeModal();
  }
  setUpProduct = (id) => {
      this.props.history.push(`/processors/${id}/subgroups/addProduct`);
  }
  updateProduct = (id) => {
    this.clearNotifications()
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
    this.props.getProduct(id);
}
  toggle = () => {
    this.setState({showSubGroupModal:!this.state.showSubGroupModal})
  }
  closeModal = () => {
    this.setState({showSubGroupModal:!this.state.showSubGroupModal});
  }

  addProduct=()=>{
    this.props.history.push(`/processors/${this.props.match.params.id}/subgroups/${this.props.match.params.subgroupid}/products/addProduct`);
  }

  closeUpdateModal = () => {
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
}

  onSubmitUpdate = (values) => {
    let productId = values.id;
    let subgroupId = this.props.match.params.subgroupid;
    delete values.accounts;
    delete values.id;
    this.props.updateProduct(values,subgroupId,productId);
    this.closeUpdateModal();
}
componentWillUnmount(){
  this.props.subGroups.productUpdated = null;
}

clearNotifications =()=>{
  this.props.subGroups.productUpdated = null;
}


  render() {
    // console.log('this props is', this.props);
    if (this.state.hasError) {
      debugger;
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
        
      }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            
              <Row>
                    <Col style={{ 'textAlign': 'right' }}>
                    <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.addProduct}><i className="fa fa-plus"></i>&nbsp;<FormattedMessage id="Add Product" defaultMessage="Add Product"/></Button>
                    </Col>
                </Row>
                {this.props.subGroups.productUpdated?<Alert color="success">
                    
                    <FormattedMessage id="Success! Product Updated Successfully" defaultMessage="Success! Product Updated Successfully"/>
                    </Alert>:null}
            <Card>
              <CardHeader>
                <strong> <FormattedMessage id="app.product" defaultMessage="Products"/></strong>
              </CardHeader>
              
              <CardBody>
              
                <Table hover bordered striped responsive size="sm">
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                              <FormattedMessage id="app.name" defaultMessage="Name"/>
                            </th>
                            <th>
                              <FormattedMessage id="app.actions" defaultMessage="Actions"/>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.subGroupsData
                        ? [
                            this.props.subGroupsData.data.length > 0 ? this.props.subGroupsData.data.map((item,index) => (
                            <tr key={index+1}>
                                <td>{index+1}</td>
                                <td ><a href={"#/processors/"+this.props.match.params.id+"/subgroups/"+this.props.match.params.subgroupid+"/products/"+item.id+"/accounts"}>{item.name}</a></td>
                                <td><i className="fa fa-edit fa-lg text-center" style={{color:'blue'}} onClick={(e)=>this.updateProduct(item.id)}></i>&nbsp;&nbsp;
                                {/* <Button color="secondary" type="button" size="sm" onClick={e => this.setUpProduct(item.id)}><FormattedMessage id="Set Up Account" defaultMessage="Set Up Account"/></Button> */}
                                </td>
                            </tr>
                            )):<tr><td colSpan="3"><p className="text-center text-danger">There are no products for the selected subgroup.</p></td></tr>
                        ]
                        : [
                            ''
                        ]
                    }
                    </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <UpdateProduct {...this.state} {...this.updateToggle} closeUpdateModal ={this.closeUpdateModal} onSubmit={this.onSubmitUpdate} {...this.props} getSubGroup={this.getSubGroup}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    console.log('State is ',state);
  return {
    processorData:state.processors.processor,
    subGroupsData:state.subGroups.subGroupAccounts,
    initialValues:state.products.product,
    subGroups:state.subGroups,
  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    fetchSubGroupAccounts,
    getOneProcessor,
    getProduct,
    updateProduct
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ProcessorSubGroupsProducts);

