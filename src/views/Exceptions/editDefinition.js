import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col,Row,FormGroup,Label,Alert} from 'reactstrap';
import CSVReader from "react-csv-reader";

import {fetchExceptionDefinition,updateExceptionDefinition} from '../../actions/exceptions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FormattedMessage} from 'react-intl';
// import AddFileDefinitionForm from './addFileDefinitionForm';
import EditExceptionDefinitionForm from './editExceptionDefinitionForm';


class EditProcessorExceptionDefinition extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            mappedFields:[],
            subgroups:[],
            fileName:'',
            currencyOptions:['Naira','Pounds','Dollars'],
            createdSuccessAlertVisible:true,
            createErrorAlertVisible:true,

        }
        this.handleClick = this.handleClick.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.getSubGroup = this.getSubGroup.bind(this);
        this.onDismissCreateErrorAlert = this.onDismissCreateErrorAlert.bind(this);
    }

    componentWillMount(){
        this.props.fetchExceptionDefinition(this.props.match.params.id);
    }

    componentWillUnmount(){
        // this.setState({createdSuccessAlertVisible:false}); 
        // this.setState({createErrorAlertVisible:false});
        // this.props.fileDefinition.fileDefinitionCreatedError = null;
        // this.props.fileDefinition.fileDefinitionCreated = null;
       
    }

    onDismisscreatedSuccessAlert(){
        this.setState({createdSuccessAlertVisible:false});
    }

    onDismissCreateErrorAlert(){
        this.setState({ createErrorAlertVisible:false});
    }

    
    getSubGroup(name){
        let filtered_subgroup = this.props.processorData.data.filter(item=>item.name === name);
        this.setState({subgroups:filtered_subgroup[0].subgroups});
    }


    handleClick(e){
        this.setState({ names: this.state.names.concat(5) })
    }

    handleUpload = (data,name) => {
        this.setState({mappedFields:data[0],fileName:name});
    };

    onUpdateNewDefinition = (values) => {
        delete values.channelFileName;
        values.fileName = this.state.fileName;
        // values.firstRow = this.state.mappedFields;
        // debugger;
        // return;
        this.props.updateExceptionDefinition(values,this.props.match.params.id);
        
        
    }
    // componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     // if (this.props.userID !== prevProps.userID) {
    //     //   this.fetchData(this.props.userID);
    //     // }
    //     if(this.props.fileDefinition.fileDefinitionCreated !== prevProps.fileDefinition.fileDefinitionCreated){
    //         debugger;
    //         this.props.history.push(`/file-definitions`);
    //     }
        
    //   }
    render(){
        
        return(
            <div className="animated fadeIn">
                <Row>
                     <Col xs="12">
                        {this.props.exceptionDefinition.exceptionDefinitionCreated?<Alert color="success" isOpen={this.state.createdSuccessAlertVisible} toggle={this.onDismisscreatedSuccessAlert}>
                            
                            <FormattedMessage id="Success: Exception Definition Created Successfully!" defaultMessage="Success: Exception Definition Created Successfully!"/>
                        </Alert>:null}
                    </Col>
                </Row>
                {/* <Row>
                    <Col xs="12">
                    {this.props.fileDefinition.fileDefinitionCreatedError?<Alert color="danger" isOpen={this.state.createErrorAlertVisible} toggle={this.onDismissCreateErrorAlert}>
                                
                                Error: 
                                {this.props.fileDefinition.fileDefinitionCreatedError.message}!

                            </Alert>:null}
                    </Col>
                </Row> */}
                <Row>
                    
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <FormattedMessage id="Edit Exception Definition" defaultMessage="Edit Exception Definition"/>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="file-input"><FormattedMessage 
                    id="File input" defaultMessage="File input"/></Label>
                                        
                                    </Col>
                                    <Col xs="12" md="9">
                                        <CSVReader
                                            cssClass="react-csv-input"
                                            onFileLoaded={this.handleUpload}
                                            />
                                    </Col>
                                </FormGroup>
                                <EditExceptionDefinitionForm {...this.props} state={this.state} {...this.state}onSubmit ={this.onUpdateNewDefinition}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>  
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log('state is ',state)
    return {
        exceptionDefinition:state.exceptionDefinition,
        initialValues:state.exceptionDefinition.singleExceptionDefinition,
        exceptionDefinitionCreated:state.exceptionDefinition.exceptionDefinitionCreated,
        
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchExceptionDefinition,
        updateExceptionDefinition
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(EditProcessorExceptionDefinition);