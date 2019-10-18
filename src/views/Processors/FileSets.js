import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col,  Row, Table} from 'reactstrap';
import {getProcessorFileset,getOneProcessor} from '../../actions/processor';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {FormattedMessage} from 'react-intl';

// import {
//     Grid,
//     Table,
//     TableHeaderRow,
//     ColumnChooser,
//     TableColumnVisibility,
//     Toolbar,
//   } from '@devexpress/dx-react-grid-material-ui';




class ProcessorFileSet extends Component{
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
        this.onDismissCreateSuccessAlert = this.onDismissCreateSuccessAlert.bind(this);
        this.onDismissUpdateSuccessAlert = this.onDismissUpdateSuccessAlert.bind(this);
        this.onDismissUpdateProcessorErrorAlert = this.onDismissUpdateProcessorErrorAlert.bind(this);
        this.onDismisscreateProcessorErrorAlert = this.onDismisscreateProcessorErrorAlert.bind(this);
        

    }
    local=''
    componentWillMount=()=>{
        this.props.getProcessorFileset(this.props.match.params.id,0);
        this.props.getOneProcessor(this.props.match.params.id);
        // this.local = JSON.parse(localStorage.decodedToken).authorities[0];
        // /
    }

    // componentDidCatch(error,info){
    //     console.log('Error is ',info);
    //     // Display fallback UI
    //     this.setState({ hasError: true });
    // }
    clearNotifications=()=>{
        // this.props.processorData.updatedProcessor = null;
        // this.props.processorData.processorCreated = null;
        // this.props.processorData.updateProcessorError = null;
        // this.props.processorData.createProcessorError = null;
      }
    componentWillUnmount(){
        this.clearNotifications();   
    }

    onDismissCreateSuccessAlert() {
        this.setState({ createSuccessAlertVisible: false });
      }

      onDismissUpdateSuccessAlert() {
          
        this.setState({ updateSuccessAlertVisible: false });
       
      }

      onDismissUpdateProcessorErrorAlert(){
        this.setState({ updateProcessorErrorAlertVisible: false });
      }

      onDismisscreateProcessorErrorAlert(){

      }
    onSubmit = (values) =>{
        this.props.createProcessor(values);
       this.closeModal();
    }

    updateProcessor = (id) => {
        this.clearNotifications();
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
        this.clearNotifications();
    }
    closeModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }
    deleteProcessor = (id) => {
        this.props.deleteProcessor(id);
    }
    
    render(){
        console.log('Props here is ',this.props ,'and local is ',this.local);
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col>
                    {/* {this.props.processorData.processorCreated?<Alert color="success" isOpen={this.state.createSuccessAlertVisible} toggle={this.onDismissCreateSuccessAlert}>
                        
                        <FormattedMessage id="Success: Processor Added Successfully!" defaultMessage="Success: Processor Added Successfully!"/>
                    </Alert>:null}
                    {this.props.processorData.updatedProcessor?<Alert color="success" isOpen={this.state.updateSuccessAlertVisible} toggle={this.onDismissUpdateSuccessAlert}>
                        
                        <FormattedMessage id="Success: Processor Updated Successfully!" defaultMessage="Success: Processor Updated Successfully!"/>
                    </Alert>:null}
                    {this.props.processorData.updateProcessorError?<Alert color="danger" isOpen={this.state.updateProcessorErrorAlertVisible} toggle={this.onDismissUpdateProcessorErrorAlert}>
                        {this.props.processorData.updateProcessorError.response.data.message}
                    </Alert>:null}
                    {this.props.processorData.createProcessorError?<Alert color="danger" isOpen={this.state.createProcessorErrorAlertVisible} toggle={this.onDismisscreateProcessorErrorAlert}>
                        {this.props.processorData.createProcessorError.response.data.message}
                    </Alert>:null} */}
                    
                        <Card>
                        <CardHeader>
                           
                            {/* <i class="fa fa-cog fa-spin"></i> */}
                            {this.props.processors.processor? this.props.processors.processor.name:'N/A'}'s <FormattedMessage id="FileSet" defaultMessage="FileSet"/>
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" >
                            <thead>
                                <tr>
                                <th>
                                    #
                                </th>
                                <th><FormattedMessage id="app.name" defaultMessage="Name"/></th>
                                <th><FormattedMessage id="Description" defaultMessage="Description"/></th>
                                
                                </tr>
                            </thead>
                            <tbody>

                                {  this.props.processors.processorFileSet
                                    ? [
                                        this.props.processors.processorFileSet.content.length > 0 ? this.props.processors.processorFileSet.content? this.props.processors.processorFileSet.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{index+1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.description}</td>
                                                {/* <td> 
                                                    <i className="fa fa-edit fa-lg text-center" style={{color:'blue'}} onClick={(e)=>this.updateProcessor(item.id)}></i> &nbsp; &nbsp;
                                                    <a href={"#/processors/"+item.id+"/filesets"}>View FileSets</a>
                                                </td> */}
                                            </tr>
                                        )):<tr><td colSpan="3"><p className="text-center text-danger"><FormattedMessage id="There are no fileset created at the moment." defaultMessage="There are no fileset created at the moment."/></p></td></tr>:<tr><td colSpan="4"><p className="text-center text-danger"><FormattedMessage id="There are no fileset created at the moment." defaultMessage="There are no fileset created at the moment."/></p></td></tr>
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
    console.log('State is ',state)
    return {
        processors:state.processors
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        getProcessorFileset,
        getOneProcessor
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ProcessorFileSet);