import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col,  Row, Button,Alert,Table} from 'reactstrap';
// import {getProcessor,createProcessor,deleteProcessor,getOneProcessor,updateProcessor} from '../../actions/processor';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FormattedMessage} from 'react-intl';
import {fetchAllVss115Files,} from '../../../../../actions/filesets';
import Pagination2 from "react-js-pagination";


class AllVss115 extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            createSuccessAlertVisible:true,
            updateSuccessAlertVisible:true,
            updateProcessorErrorAlertVisible:true,
            createProcessorErrorAlertVisible:true,
            hasError:false,
        }
    }
    local=''
    componentWillMount=()=>{
        this.props.fetchAllVss115Files(0);
        
    }

    // componentDidCatch(error,info){
    //     console.log('Error is ',info);
    //     // Display fallback UI
    //     this.setState({ hasError: true });
    // }
    clearNotifications=()=>{
        
      }
    componentWillUnmount(){
        this.clearNotifications();   
    }    
    render(){
        console.log('Props here is ',this.props );
        
        return(
            <div className="animated fadeIn">
                {/* <Row>
                    <Col style={{ 'textAlign': 'right' }}>
                    <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.toggle}><i className="fa fa-plus"></i>&nbsp; <FormattedMessage id="Add Processor" defaultMessage="Add Processor"/></Button>
                    </Col>
                </Row> */}
                <Row>
                    <Col>
                        <Card>
                        <CardHeader>
                           
                            {/* <i class="fa fa-cog fa-spin"></i> */}
                            <FormattedMessage id="VSS 115" defaultMessage="VSS 115"/>
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" >
                            <thead>
                                <tr>
                                <th>
                                    #
                                </th>
                                <th><FormattedMessage id="Date" defaultMessage="Date"/></th>
                                <th><FormattedMessage id="Channel Name" defaultMessage="Channel Name"/></th>
                                
                                </tr>
                            </thead>
                            <tbody>

                                {  this.props.fileSets.allVss115
                                    ? [
                                        this.props.fileSets.allVss115.data.content.length > 0 ? this.props.fileSets.allVss115.data? this.props.fileSets.allVss115.data.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{index+1}</td>
                                                
                                                <td><a href={"#/visa/settlement/vss115/"+item.batchDate+"/details"}>{item.batchDate}</a></td>
                                                <td> 
                                                    {item.channelName}
                                                    
                                                </td>
                                                
                                                
                                            </tr>
                                        )):<tr><td colSpan="3"><p className="text-center text-danger">There are no vss 155 files  at the moment.</p></td></tr>:<tr><td colSpan="4"><p className="text-center text-danger">There are no vss 155 files at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                            

                            </tbody>
                            </Table>                     
                                {this.props.fileSets.allVss115?<nav>
                                <Pagination2
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={20}
                                    totalItemsCount={this.props.fileSets.allVss115?this.props.fileSets.allVss115.data.totalElements:null}
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
    return {
        fileSets:state.fileSets,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchAllVss115Files
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(AllVss115);