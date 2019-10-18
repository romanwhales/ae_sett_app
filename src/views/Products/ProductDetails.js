import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FormattedMessage} from 'react-intl';



import {getProduct} from '../../actions/products';
class ProductDetails extends Component {
    constructor(props){
        super(props);
        this.state ={
            
        }
    }
  componentWillMount(){
    this.props.getProduct(this.props.match.params.id);
  }
  
  onSubmit = (values,id,details) => {
    this.props.createSubGroup(values,this.props.match.params.id)
  }
  showAddSubGroupForm = () => {
    this.setState({showAddSubGroupForm:!this.state.showAddSubGroupForm});
  }

  viewSubGroups = () => {
    this.props.history.push(`/processor/${this.props.singleProcessor.id}/subgroups`)
  }

  render() {
    console.log('Props is ',this.props);
    return (
      <div className="animated fadeIn">
        <Row>
            <Col>
            
                <Card>
                <CardHeader>
                    <i className="fa fa-credit-card-alt"></i> {this.props.productData.product?this.props.productData.product.name:null}'s <FormattedMessage id="app.account" defaultMessage="Accounts"/>
                </CardHeader>
                <CardBody>
                    <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table">
                    <thead className="thead-light">
                        <tr>
                            <th>
                                <FormattedMessage id="app.name" defaultMessage="Name"/>
                            </th>
                            <th>
                                <FormattedMessage id="app.accountNumber" defaultMessage="Account Number"/>
                                
                            </th>
                            <th>
                                <FormattedMessage id="app.currency" defaultMessage="Currency"/>
                            </th>
                            <th>
                                <FormattedMessage id="app.accountType" defaultMessage="Account Type"/>
                            </th>
                            <th>
                              <FormattedMessage id="Allow Manual" defaultMessage="Allow Manual"/>
                            </th>
                            <th>
                              <FormattedMessage id="Double Entry Account Number" defaultMessage="Double Entry Account Number"/>
                            </th>
                            <th>
                              <FormattedMessage id="Amount Direction" defaultMessage="Amount Direction"/>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.productData.product
                            ? [
                                this.props.productData.product.accounts.length > 0 ?  this.props.productData.product.accounts.map((item,index) => (
                                    <tr key={index+1}>
                                       
                                        <td>{item.name}</td>
                                        <td>{item.accountNo}</td>
                                        <td>{item.currency}</td>
                                        <td>{item.accountType?item.accountType:'N/A'}</td>
                                        <td>{item.allowManual?'True':'False'}</td>
                                        <td>{item.doubleEntryAccountNo?item.doubleEntryAccountNo:'N/A'}</td>
                                        <td>{item.treatAs?item.treatAs:'N/A'}</td>
                                       
                                    </tr>
                                )):<tr><td colSpan="7"><p className="text-center text-danger">There are no accounts  at the moment.</p></td></tr>
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {
 
  console.log('State is ',state);
  return {
    productData:state.products
  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    getProduct
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetails);

