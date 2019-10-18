import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col,Row, Table,} from 'reactstrap';
import {fetchChannelLogs,fetchChannelLogsPaginated} from '../../../actions/utils';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import Moment from 'react-moment';
import Pagination2 from "react-js-pagination";
import {FormattedMessage,FormattedDate,} from 'react-intl';

class ChannelLogs extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            activePage:1,
        }
        this.handlePageChange= this.handlePageChange.bind(this);
    }


    
    componentWillMount(){
        this.props.fetchChannelLogs();
    }

    handlePageChange = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchChannelLogsPaginated(pageNumberParam);
        this.setState({activePage: pageNumber});
        
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
                            <i className="fa fa-file"></i> <FormattedMessage id="Channel Logs" defaultMessage="Channel Logs"/>
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                    <th>
                                        <FormattedMessage id="Date" defaultMessage="Date"/>
                                    </th>
                                    <th>
                                        <FormattedMessage id="File Name" defaultMessage="File Name"/>
                                    </th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {  this.props.channelLogs
                                    ? [
                                        this.props.channelLogs.content.length > 0 ?  this.props.channelLogs.content.map((item,index) => (
                                            <tr key={index+1}>
                                                 <td> 
                                                    
                                                    {/* <Moment>{item.completedOn * 1000}</Moment> */}
                                                    <FormattedDate value={new Date(item.completedOn*1000)} year='numeric' month='long' day='numeric' weekday='long'/>  
                                                    </td>
                                                <td >{item.fileName}</td>
                                               
                                            </tr>
                                        )):<tr><td colSpan="4"><p className="text-center text-danger">There are no channel logs at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                            </tbody>
                            </Table>
                        
                            {this.props.channelLogs?<nav>
                            <Pagination2
                                activePage={this.state.activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.channelLogs.totalElements?this.props.channelLogs.totalElements:null}
                                pageRangeDisplayed={20} 
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
       channelLogs:state.utils.channelLogs,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchChannelLogs,
        fetchChannelLogsPaginated
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ChannelLogs);