import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Button, Alert} from 'reactstrap';
import {fetchManualPostings} from '../../actions/batches';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FormattedMessage,FormattedDate, FormattedNumber} from 'react-intl';


class ManualPostings extends Component{
    constructor(props){
        super(props);
        this.state = {
            

        }
        

    }
    componentWillMount=()=>{
        this.props.fetchManualPostings();
    }
    addManualPosting = () => {
        this.props.history.push(`/manualPostings/add`)
    }
    componentWillUnmount(){
        this.props.manualPostingData.manualAddBatch = null;
    }
    render(){
        console.log('Props here is ',this.props);
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        
                        <Row>
                            <Col style={{ 'textAlign': 'right' }}>
                            <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.addManualPosting}><i className="fa fa-plus"></i>&nbsp;<FormattedMessage id="Add Manual Posting" defaultMessage="Add Manual Posting"/></Button>
                            </Col>
                        </Row>
                        {this.props.manualPostingData.manualAddBatch?[
                            this.props.manualPostingData.manualAddBatch.data.status == 202?<Alert color="warning" isOpen={this.state.manualBatchCreatedStatus} toggle={this.onDismissManualBatchCreatedStatus} key={1}>
                            {this.props.manualPostingData.manualAddBatch.data.message}
                        </Alert>:null
                            ]:['']
                        }
                        <Card>
                        <CardHeader>
                            {/* <i className="fa fa-credit-card-alt"></i> */}
                            <i className="fa fa-pencil-square"></i> <FormattedMessage id="Manual Postings" defaultMessage="Manual Postings"/>
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                <th>
                                    #
                                </th>
                                <th><FormattedMessage id="Created Date" defaultMessage="Created Date"/></th>
                                <th><FormattedMessage id="Account Name" defaultMessage="Account Name"/></th>
                                <th><FormattedMessage id="app.accountNumber" defaultMessage="Account Number"/></th>
                                <th><FormattedMessage id="Amount" defaultMessage="Amount"/></th>
                                <th><FormattedMessage id="Status" defaultMessage="Status"/></th>
                                {/* <th>Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>

                                {  this.props.manualPostingData.manualPostings
                                    ? [
                                        this.props.manualPostingData.manualPostings.data.length > 0 ? this.props.manualPostingData.manualPostings.data ? this.props.manualPostingData.manualPostings.data.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{index+1}</td>
                                                <td >
                                                    {/* <Moment parse="YYYY-MM-DD HH:mm">{item.batchDate}</Moment> */}
                                                    {/* <Moment>{item.createdDate * 1000}</Moment> */}
                                                    <FormattedDate value={new Date(item.createdDate*1000)} year='numeric' month='long' day='numeric' weekday='long'/>
                                                </td>
                                                <td>{item.accountName}</td>
                                                <td>{item.accountNumber}</td>

                                                <td><FormattedNumber value={item.amount}/> </td>
                                                <td><Badge color="warning" className=""><FormattedMessage id="Pending" defaultMessage="Pending"/></Badge></td>
                                            </tr>
                                        )):<tr><td colSpan="6"><p className="text-center text-danger">There are no batches at the moment.</p></td></tr>:<tr key={1}><td colSpan="6"><p className="text-center text-danger">There are no manual postings at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }


                            </tbody>
                            </Table>
                        
                            {/* {this.props.atms.atmList?<nav>
                            <Pagination2
                                activePage={this.state.activePage}
                                itemsCountPerPage={20}
                                totalItemsCount={this.props.atms.atmList?this.props.atms.atmList.totalElements:null}
                                pageRangeDisplayed={5} 
                                onChange={this.handlePageChange}
                            />
                            </nav>:'' } */}
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
       manualPostingData:state.batches,
       manualBatchCreated:state.batches.manualAddBatch,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchManualPostings
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ManualPostings);