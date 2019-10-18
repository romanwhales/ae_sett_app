import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col,  Row, Button,Alert,Table as Table2} from 'reactstrap';
import {getProcessor,createProcessor,deleteProcessor,getOneProcessor,updateProcessor} from '../../actions/processor';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddProcessorComponent from './addProcessor';
import UpdateProcessorComponent from './updateProcessor';



import {FormattedMessage,} from 'react-intl';

import {
    Grid,
    Table,
    TableHeaderRow,
    ColumnChooser,
    TableColumnVisibility,
    Toolbar,
  } from '@devexpress/dx-react-grid-material-ui';




class Processor extends Component{
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
            defaultHiddenColumnNames: ['sex', 'car'],
        }
        this.onDismissCreateSuccessAlert = this.onDismissCreateSuccessAlert.bind(this);
        this.onDismissUpdateSuccessAlert = this.onDismissUpdateSuccessAlert.bind(this);
        this.onDismissUpdateProcessorErrorAlert = this.onDismissUpdateProcessorErrorAlert.bind(this);
        this.onDismisscreateProcessorErrorAlert = this.onDismisscreateProcessorErrorAlert.bind(this);
        

    }
    local=''
    componentWillMount=()=>{
        this.props.getProcessor();
        this.local = JSON.parse(localStorage.decodedToken).authorities[0];
        // /
    }

    // componentDidCatch(error,info){
    //     console.log('Error is ',info);
    //     // Display fallback UI
    //     this.setState({ hasError: true });
    // }
    clearNotifications=()=>{
        this.props.processorData.updatedProcessor = null;
        this.props.processorData.processorCreated = null;
        this.props.processorData.updateProcessorError = null;
        this.props.processorData.createProcessorError = null;
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
        const { defaultHiddenColumnNames } = this.state;
        
        if(this.props.processorData.processors){
            var columnTobeExtracted = this.props.processorData.processors[0]
            console.log('Here is the column to work with ',columnTobeExtracted);
            var newRows2 = [];
            for(var name in columnTobeExtracted){
                var newObj = {}
                newObj.name = name;
                newObj.title = name
                
                newRows2.push(newObj)
            }
            console.log(newRows2);
            

        }
        // if (this.state.hasError) {
        //     // You can render any custom fallback UI
        //     return <h1>Something went wrong.</h1>;
        //   }
        return(
            <div className="animated fadeIn">
                {/* <Row>
                    <Col style={{ 'textAlign': 'right' }}>
                    <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.toggle}><i className="fa fa-plus"></i>&nbsp; <FormattedMessage id="Add Processor" defaultMessage="Add Processor"/></Button>
                    </Col>
                </Row> */}
                <Row>
                    <Col>
                    {this.props.processorData.processorCreated?<Alert color="success" isOpen={this.state.createSuccessAlertVisible} toggle={this.onDismissCreateSuccessAlert}>
                        
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
                    </Alert>:null}
                    
                        <Card>
                        <CardHeader>
                           
                            {/* <i class="fa fa-cog fa-spin"></i> */}
                            <FormattedMessage id="app.processor" defaultMessage="Processors"/>
                        </CardHeader>
                        <CardBody>
                            <Table2 hover bordered striped responsive size="sm" >
                            <thead>
                                <tr>
                                <th>
                                    #
                                </th>
                                <th><FormattedMessage id="app.name" defaultMessage="Name"/></th>
                                <th><FormattedMessage id="app.actions" defaultMessage="Actions"/></th>
                                </tr>
                            </thead>
                            <tbody>

                                {  this.props.processorData.processors
                                    ? [
                                        this.props.processorData.processors.length > 0 ? this.props.processorData.processors? this.props.processorData.processors.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{index+1}</td>
                                                <td><a href={"#/processors/"+item.id+"/subgroups"}>{item.name}</a></td>
                                                <td> 
                                                    <i className="fa fa-edit fa-lg text-center" style={{color:'blue'}} onClick={(e)=>this.updateProcessor(item.id)}></i> &nbsp; &nbsp;
                                                    {/* <a href={"#/processors/"+item.id+"/filesets"}>View FileSets</a> */}
                                                </td>
                                            </tr>
                                        )):<tr><td colSpan="3"><p className="text-center text-danger">There are no batches at the moment.</p></td></tr>:<tr><td colSpan="4"><p className="text-center text-danger">There are no processors at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                            

                            </tbody>
                            </Table2>                     
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
                    <AddProcessorComponent {...this.state} {...this.toggle} onSubmit = {this.onSubmit} closeModal={this.closeModal} />
                    <UpdateProcessorComponent {...this.state} {...this.updateToggle} closeUpdateModal ={this.closeUpdateModal} onSubmit={this.onSubmitUpdate} {...this.props}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        processorData:state.processors,
        initialValues:state.processors.processor,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        getProcessor,
        createProcessor,
        deleteProcessor,
        getOneProcessor,
        updateProcessor
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Processor);