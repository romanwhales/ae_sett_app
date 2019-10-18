import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col,Row,FormGroup,Label,Alert} from 'reactstrap';
import CSVReader from "react-csv-reader";

import {createExceptionDefinition} from '../../actions/exceptions';
import {getProcessor} from '../../actions/processor';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import AddFileDefinitionForm from './addFileDefinitionForm';
import {FormattedMessage} from 'react-intl';
import AddExceptionDefinitionForm from './addExceptionDefinitionForm';


class AddException extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            name:'Olawale',
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
        this.props.getProcessor();
    }

    componentWillUnmount(){
        this.props.exceptionDefinition.exceptionDefinitionCreatedError= null;
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

    onSubmitNewDefinition = (values) => {
        values.fileName = this.state.fileName;
        const{processorId} = values;
        delete values.processorId;
        this.props.createExceptionDefinition(values,processorId);
        
    }
    componentDidUpdate(prevProps) {
        if(this.props.exceptionDefinition.exceptionDefinitionCreated !== prevProps.exceptionDefinition.exceptionDefinitionCreated){
            this.props.history.push(`/exceptions/${this.props.match.params.id}/definitions`);
        }
        
      }
    render(){
        
        return(
            <div className="animated fadeIn">
                
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
                        {this.props.exceptionDefinition.exceptionDefinitionCreatedError?<Alert color="danger" isOpen={this.state.createdSuccessAlertVisible} toggle={this.onDismisscreatedSuccessAlert}>
                            Error: {this.props.exceptionDefinition.exceptionDefinitionCreatedError.response.data.message}
                        </Alert>:null}
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                
                                <FormattedMessage id="Add Exception Definition" defaultMessage="Add Exception Definition"/>
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
                                <AddExceptionDefinitionForm {...this.props} state={this.state} onSubmit ={this.onSubmitNewDefinition}/>
                                {/* <AddFileDefinitionForm {...this.props} state={this.state} onSubmit ={this.onSubmitNewDefinition}/> */}
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
        exceptionDefinitionCreated:state.exceptionDefinition.exceptionDefinitionCreated,
        fileDefintionCreated:state.fileDefinition.fileDefinitionCreated,
        fileDefinitionCreationError:state.fileDefinition.fileDefinitionCreatedError,
        processorsList:state.processors.processors, 
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        createExceptionDefinition,
        getProcessor
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(AddException);