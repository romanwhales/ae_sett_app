import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label ,Alert} from 'reactstrap';
import {getProcessor,} from '../../actions/processor';
import {fetchExceptionDefinitions} from '../../actions/exceptions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import ExceptionSearchForm from './searchForm';
import PropTypes from 'prop-types';



import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';



import {FormattedMessage,FormattedDate, FormattedTime,FormattedNumber} from 'react-intl';


class Exception extends Component{
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
            startDate: moment(),
            paramsDate:'',
            focused:false,
            date: moment(),
        }
        this.onDismissCreateSuccessAlert = this.onDismissCreateSuccessAlert.bind(this);
        this.onDismissUpdateSuccessAlert = this.onDismissUpdateSuccessAlert.bind(this);
        this.onDismissUpdateProcessorErrorAlert = this.onDismissUpdateProcessorErrorAlert.bind(this);
        this.onDismisscreateProcessorErrorAlert = this.onDismisscreateProcessorErrorAlert.bind(this);

    }
    componentWillMount=()=>{
        this.props.getProcessor();

        let today = moment(new Date()).format();
        this.setState({paramsDate:today});

        if(today.includes("T")){
            let extract = today.split("T");
            let date_extracted = extract[0];
            this.setState({paramsDate:date_extracted});
        }
        this.props.fetchExceptionDefinitions(null,null);
        // this.props.fetchDailyProcessorExceptionSummary(today);
    
    }

    // componentDidCatch(error,info){
    //     console.log('Error is ',info);
    //     // Display fallback UI
    //     this.setState({ hasError: true });
    // }

    componentWillUnmount(){
        
        this.props.processorData.updatedProcessor = null;
        this.props.processorData.processorCreated = null;
        this.props.processorData.updateProcessorError = null;
        this.props.processorData.createProcessorError = null;
        
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

    // submitDate=()=>{
    //     let date1 = moment(this.state.startDate).format();
        
    //     if(date1.includes("T")){
    //         let extract = date1.split("T");
    //         date1 = extract[0];

    //     }
    //     this.setState({paramsDate:date1});
    //     this.props.fetchExceptionDefinitions(date1,null);
    // }

    viewExceptionDefinition = (id) => {
        this.props.history.push(`/exceptions/${id}/definitions`);
    }

    onSubmit = (values) =>{
        values.date = moment(this.state.date).format().split("T")[0];
        const{date,processorId} = values;
        this.props.fetchExceptionDefinitions(date,processorId);
    }
    onFocusChange=(focused) =>{
        this.setState({ focused:!this.state.focused });
        
      }
    onDateChange = (values) =>{
        console.log('Values is ',values);
        this.setState({date:values});
    //   debugger;
    }
    
    render(){
        console.log('Props here is ',this.props);
        // if (this.state.hasError) {
        //     // You can render any custom fallback UI
        //     return <h1>Something went wrong.</h1>;
        //   }
        return(
            <div className="animated fadeIn">
                {/* <div style={{'marginBottom':'20px','display':'flex',justifyContent:'flex-end'}}>
                <SingleDatePicker
                    showDefaultInputIcon={true}
                    date={this.state.startDate} // momentPropTypes.momentObj or null
                    onDateChange={startDate => this.setState({ startDate })} // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                    id="your_unique_id" // PropTypes.string.isRequired,
                    isOutsideRange={() => false}
                    numberOfMonths={1}
                    />
                    <Button size="sm" className="btn " onClick={this.submitDate} color="primary" style={{fontSize:'15px',marginLeft:'10px'}}> <FormattedMessage id="app.submit" defaultMessage="Submit"/></Button>
                </div> */}
                <ExceptionSearchForm {...this.props} {...this.state} onSubmit={this.onSubmit} onDateChange ={this.onDateChange} onFocusChange={this.onFocusChange} focused={this.state.focused}/>
                <Row>
                    <Col>                    
                        <Card>
                        <CardHeader>
                            {/* <i className="fa fa-credit-card-alt"></i> */}
                            <i className="fa fa-cog fa-spin"></i>Exceptions
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm">
                            <thead>
                                <tr>
                                <th><FormattedMessage id="app.name" defaultMessage="Name"/></th>
                                <th><FormattedMessage id="Date" defaultMessage="Date"/></th>
                                <th><FormattedMessage id="Processor" defaultMessage="Processor"/></th>
                                <th><FormattedMessage id="Rows Processed" defaultMessage="Rows Processed"/></th>
                                <th><FormattedMessage id="Amount" defaultMessage="Amount"/></th>
                                {/* <th><FormattedMessage id="app.actions" defaultMessage="Actions"/></th> */}
                                </tr>
                            </thead>
                            <tbody>
                            {this.props.exceptionDefinitionList
                                ? [
                                this.props.exceptionDefinitionList.data.content.length > 0 ?   this.props.exceptionDefinitionList.data.content.map((item,index) => (
                                    <tr key={index+1}>
                                    <td ><a href={"#/exceptions/"+item.id+"/rows"}>{item.fileName}</a></td>
                                    <td>{item.batchDate?<FormattedDate value={item.batchDate} year='numeric' month='long' day='numeric' weekday='long'/>:'N/A'}
                                    {/* {item.batchDate} */}
                                    </td>
                                    <td>{item.processor}</td>
                                    
                                    <td><FormattedNumber value={item.transactionCount}/></td>
                                    <td><FormattedNumber value={item.totalAmount}/></td>
                                    
                                    
                                    {/* <td><i className="fa fa-pencil-square-o" aria-hidden="true" title="Edit Exception Definition" style={{'cursor':'pointer'}}  onClick={(e)=>this.updateExceptionDefinition(item.id)}></i></td> */}
                                    </tr>
                                    )):<tr key={1}><td colSpan="6"><p className="text-center text-danger">There are no exception definitions created yet.</p></td></tr>
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
                    {/* <AddProcessorComponent {...this.state} {...this.toggle} onSubmit = {this.onSubmit} closeModal={this.closeModal} />
                    <UpdateProcessorComponent {...this.state} {...this.updateToggle} closeUpdateModal ={this.closeUpdateModal} onSubmit={this.onSubmitUpdate} {...this.props}/> */}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('State is ',state);
    return {
        processorData:state.processors,
        exceptionDefinition:state.exceptionDefinition,
        exceptionDefinitionList:state.exceptionDefinition.exceptionDefinitionList
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        getProcessor,
        fetchExceptionDefinitions
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Exception);