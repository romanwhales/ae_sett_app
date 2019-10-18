import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Button,Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchSubGroupAccounts} from '../../../actions/subgroups';
import {getOneProcessor} from '../../../actions/processor';
import {getProductAccounts} from '../../../actions/products';
import {FormattedMessage} from 'react-intl';

class ProcessorSubGroupsProductsAccounts extends Component {
    constructor(props){
        super(props);
        this.state ={
            showSubGroupModal:false
        }
    }
    componentWillMount(){
       
        this.props.getOneProcessor(this.props.match.params.id);
        this.props.getProductAccounts(this.props.match.params.productid);
    }

    addAccount=()=>{
        this.props.history.push(`/processors/${this.props.match.params.id}/subgroups/${this.props.match.params.subgroupid}/products/${this.props.match.params.productid}/accounts/addAccount`);
    }


  render() {
      console.log(this.props);
    return (
      <div className="animated fadeIn">
         <Row>
            <Col style={{ 'textAlign': 'right' }}>
            <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.addAccount}><i className="fa fa-plus"></i>&nbsp;<FormattedMessage id="Add Account" defaultMessage="Add Account"/></Button>
            </Col>
        </Row>
        <Row>
       
          <Col lg={12}>
            {this.props.subGroupCreated?<Alert color="success">
                    
                    <FormattedMessage id="Success! SubGroup created Successfully" defaultMessage="Success! SubGroup created Successfully"/>
                    </Alert>:null}
            <Card>
              <CardHeader>
                <strong><i className="fa fa-user pr-1"></i>{this.props.productsData?this.props.productsData.name:''} <FormattedMessage id="app.account" defaultMessage="Accounts"/></strong>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                    <thead>
                        <tr>
                           
                            <th>
                                <FormattedMessage id="app.name" defaultMessage="Name"/>
                            </th>
                            <th>
                                <FormattedMessage id="app.currency" defaultMessage="Currency"/>
                            </th>
                            <th>
                                <FormattedMessage id="app.accountNumber" defaultMessage="Account Number"/>
                            </th>
                            <th> 
                                <FormattedMessage id="app.accountType" defaultMessage="Account Type"/>
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
                    {this.props.productsData
                        ? [
                            this.props.productsData.accounts.length > 0 ? this.props.productsData.accounts.map((item,index) => (
                            <tr key={index+1}>
                                
                                <td >{item.name}</td>
                                <td>{item.currency}</td>
                                <td>{item.accountNo}</td>
                                <td>{item.accountType}</td>
                                <td>{item.doubleEntryAccountNo}</td>
                                <td>{item.treatAs}</td>
                            </tr>
                            )):<tr><td colSpan="6"><p className="text-center text-danger">There are no accounts for the product  {this.props.productsData.name}.
                            </p></td></tr>
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
    productsData:state.products.productAccounts,
    productsAccounts:state.subGroups.subGroupAccounts,
  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    fetchSubGroupAccounts,
    getOneProcessor,
    getProductAccounts
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ProcessorSubGroupsProductsAccounts);

