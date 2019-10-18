import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col,Row,FormGroup,Label,Alert} from 'reactstrap';
// import CSVReader from "react-csv-reader";
import { CSVReader } from 'react-papaparse';

import {createFileDefinition} from '../../actions/file_definition';
import {fetchOperators} from '../../actions/utils';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddFileDefinitionForm from './addFileDefinitionForm';
import {FormattedMessage} from 'react-intl';


class AddFileDefinitions extends Component{
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
        this.fileInput = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.onComplete = this.onComplete.bind(this);
        
        this.getSubGroup = this.getSubGroup.bind(this);
        this.completed = this.completed.bind(this);
        this.before = this.before.bind(this);
        this.onDismissCreateErrorAlert = this.onDismissCreateErrorAlert.bind(this);
    }

    componentWillMount(){
      
        this.props.fetchOperators();
    }

    componentWillUnmount(){
        this.setState({createdSuccessAlertVisible:false}); 
        this.setState({createErrorAlertVisible:false});
        this.props.fileDefinition.fileDefinitionCreatedError = null;
        this.props.fileDefinition.fileDefinitionCreated = null;
       
    }

    before(){
        debugger;
    }
    completed(){
        debugger;
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

    fileInput = (ndmae) => {
        debugger;
    }

    handleReadCSV = (data,name) => {
        // console.log('Data is ',data);
        
        this.setState({mappedFields:data.data[0],fileName:name});
        
        // debugger;
    }


    onSubmitNewDefinition = (values) => {
        values.fileName = this.state.fileName;
        values.firstRow = this.state.mappedFields;
        this.props.createFileDefinition(values);
        
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        // if (this.props.userID !== prevProps.userID) {
        //   this.fetchData(this.props.userID);
        // }
        if(this.props.fileDefinition.fileDefinitionCreated !== prevProps.fileDefinition.fileDefinitionCreated){
            debugger;
            this.props.history.push(`/file-definitions`);
        }
        
      }
    onComplete = (results,file) => {
        console.log('here');
    }
    render(){
        
        return(
            <div className="animated fadeIn">
                <Row>
                     <Col xs="12">
                        {this.props.fileDefinition.fileDefinitionCreated?<Alert color="success" isOpen={this.state.createdSuccessAlertVisible} toggle={this.onDismisscreatedSuccessAlert}>
                            
                            <FormattedMessage id="Success: File Definition Created Successfully!" defaultMessage="Success: File Definition Created Successfully!"/>
                        </Alert>:null}
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                    {this.props.fileDefinition.fileDefinitionCreatedError?<Alert color="danger" isOpen={this.state.createErrorAlertVisible} toggle={this.onDismissCreateErrorAlert}>
                                
                                Error: 
                                {this.props.fileDefinition.fileDefinitionCreatedError.message}!

                            </Alert>:null}
                    </Col>
                </Row>
                <Row>
                    
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                
                                <FormattedMessage id="Add File Definition" defaultMessage="Add File Definition"/>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="file-input"><FormattedMessage id="File input" defaultMessage="File input"/></Label>
                                        
                                    </Col>
                                    <Col xs="12" md="9">
                                        {/* <CSVReader
                                            cssClass="react-csv-input"
                                            onFileLoaded={this.handleUpload}
                                            parserOptions={{
                                                preview:1
                                            }}
                                            /> */}
                                            <CSVReader
                                                onFileLoaded={this.handleReadCSV}
                                                inputRef={this.fileInput}
                                                complete={this.before}
                                                onError={this.handleOnError}
                                                configOptions={{
                                                    preview:1,
                                                  }}
                                                
                                                
                                                />
                                    </Col>
                                </FormGroup>
                                <AddFileDefinitionForm {...this.props} state={this.state} onSubmit ={this.onSubmitNewDefinition}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>  
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('state is ',state)
    return {
        utilsList:state.utils.operators,
        fileDefinition:state.fileDefinition,
        fileDefintionCreated:state.fileDefinition.fileDefinitionCreated,
        fileDefinitionCreationError:state.fileDefinition.fileDefinitionCreatedError,
        
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchOperators,
        createFileDefinition
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(AddFileDefinitions);