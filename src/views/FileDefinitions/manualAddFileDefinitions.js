import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col,Row,Alert} from 'reactstrap';


import {createFileDefinition} from '../../actions/file_definition';
import {fetchOperators} from '../../actions/utils';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddManualFileDefinitionForm from './addManualFileDefinitionForm';
import {FormattedMessage} from 'react-intl';


class ManualAddFileDefinitions extends Component{
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
        this.getSubGroup = this.getSubGroup.bind(this);
        this.onDismissCreateErrorAlert = this.onDismissCreateErrorAlert.bind(this);
        this.onDismisscreatedSuccessAlert = this.onDismisscreatedSuccessAlert.bind(this);
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

    onDismisscreatedSuccessAlert(){
        this.setState({createdSuccessAlertVisible:false});
    }

    onDismissCreateErrorAlert(){
        this.setState({ createErrorAlertVisible: false });
    }

    
    getSubGroup(name){
        let filtered_subgroup = this.props.processorData.data.filter(item=>item.name === name);
        this.setState({subgroups:filtered_subgroup[0].subgroups});
    }


    handleClick(e){
        this.setState({ names: this.state.names.concat(5) })
    }

    // handleUpload = (data,name) => {
    //     this.setState({mappedFields:data[0],fileName:name});
    // };

    onSubmitNewDefinition = (values) => {
        values.fileName = this.state.fileName;
        values.firstRow = this.state.mappedFields;
        this.props.createFileDefinition(values);
        
    }

    onSubmitNewManualDefinition = (values) => {
        values.firstRow =[];
        if(values.firstRowUnmutated){
            values.firstRowUnmutated.forEach((item)=>{
                values.firstRow.push(item.value);
            })
            delete values.firstRowUnmutated;
        }
        this.props.createFileDefinition(values);
    }
    componentDidUpdate(prevProps){
        // console.log('In did Update ',this.props);
        // debugger;
        if(this.props.fileDefinition.fileDefinitionCreated){
            this.props.history.push(`/file-definitions`);
        }    
    }
    render(){
        // console.log('Props here is ',this.props);
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12">
                        {this.props.fileDefinition.fileDefinitionCreated?<Alert color="success" isOpen={this.state.createdSuccessAlertVisible} toggle={this.onDismisscreatedSuccessAlert}>
                            Success: File Definition Created Successfully!
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
                                <FormattedMessage id="Add Manual File Definition" defaultMessage="Add Manual File Definition"/>
                                
                            </CardHeader>
                            <CardBody>
                                {/* <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="file-input">File input</Label>
                                        
                                    </Col>
                                    <Col xs="12" md="9">
                                        <CSVReader
                                            cssClass="react-csv-input"
                                            onFileLoaded={this.handleUpload}
                                            />
                                    </Col>
                                </FormGroup> */}
                                <AddManualFileDefinitionForm {...this.props} state={this.state} onSubmit ={this.onSubmitNewManualDefinition}/>
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
        fileDefintionCreated:state.fileDefinition.fileDefinitionCreated,
        fileDefinitionCreationError:state.fileDefinition,
        fileDefinition:state.fileDefinition,
        
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchOperators,
        createFileDefinition
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ManualAddFileDefinitions);