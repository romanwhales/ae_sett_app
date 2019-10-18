import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col,  Row, Table, } from 'reactstrap';
import {fetchLogs,fetchLogsPaginated} from '../../actions/utils';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import Moment from 'react-moment';
import Pagination2 from "react-js-pagination";
import {FormattedMessage,FormattedDate,} from 'react-intl';

class AdminLogs extends Component{
    constructor(props){
        
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            activePage:1,
        }
        this.handlePageChange= this.handlePageChange.bind(this);
        // this.handlePageChange = this.handlePageChange.bind(this);
    }
    handlePageChange = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchLogsPaginated(pageNumberParam);
        this.setState({activePage: pageNumber});
        
    }
    
    componentWillMount(){
        this.props.fetchLogs();
    }

    onSubmit = (values) =>{
        this.props.createProcessor(values);
       this.closeModal();
    }

    updateProcessor = (id) => {
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
        this.props.getOneProcessor(id);
    }

    closeUpdateModal = () => {
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
    }

    onSubmitUpdate = (values) => {
        this.props.updateProcessor(values);
        this.closeUpdateModal();
    }
    toggle = () => {
        this.setState({ showModal: !this.state.showModal });
    }
    closeModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }
    deleteProcessor = (id) => {
        this.props.deleteProcessor(id);
    }
    
    render(){
        console.log('Props here is ',this.props);
        return(
            <div className="animated fadeIn">
            
                <Row>
                    <Col>
                    {/* {this.props.processorData.processorCreated?<Alert color="success">
                        Success: Processor Added Successfully!
                    </Alert>:null} */}
                        <Card>
                        <CardHeader>
                            <i className="fa fa-file"></i> <FormattedMessage id="File Logs" defaultMessage="File Logs"/>
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                <th><FormattedMessage id="Date" defaultMessage="Date"/></th>
                                <th><FormattedMessage id="File Name" defaultMessage="File Name"/></th>
                                <th style={{"whiteSpace":"nowrap"}}><FormattedMessage id="Processed Status" defaultMessage="Processed Status"/></th>
                                <th><FormattedMessage id="Error Message" defaultMessage="Error Message"/></th>
                                </tr>
                            </thead>
                            <tbody>
                                {  this.props.fileLogs
                                    ? [
                                        this.props.fileLogs.data.content.length > 0 ?  this.props.fileLogs.data.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>
                                                    {/* <Moment>{item.processedOn * 1000}</Moment> */}
                                                    <FormattedDate value={new Date(item.processedOn*1000)} year='numeric' month='long' day='numeric' weekday='long'/>
                                                </td>
                                                <td >{item.fileName}</td>
                                                
                                                <td> 
                                                    {item.failed ?<span className="text-danger">Failed</span>:<span className="text-success">Success</span>}
                                                </td>
                                                <td>
                                                {
                                                    item.message ? <span>{item.message}</span>:<span>N/A</span>   
                                                }
                                                </td>
                                            </tr>
                                        )):<tr><td colSpan="6"><p className="text-center text-danger">There are no file logs at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                            </tbody>
                            </Table>
                        
                            {this.props.fileLogs?<nav>
                            <Pagination2
                                activePage={this.state.activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.fileLogs?this.props.fileLogs.data.totalElements:null}
                                pageRangeDisplayed={5} 
                                onChange={this.handlePageChange}
                            />
                            </nav>:'' }
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
       fileLogs:state.utils.logs,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchLogs,
        fetchLogsPaginated
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(AdminLogs);