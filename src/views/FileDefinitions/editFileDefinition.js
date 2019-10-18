import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row,FormGroup,Label,Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateFileDefinition,fetchOneFileDefinition} from '../../actions/file_definition';
import EditFileDefinitionForm from './editFileDefinitionForm';
import CSVReader from "react-csv-reader";
import {FormattedMessage} from 'react-intl';



class EditFileDefinition extends Component{
    constructor(props){
        super(props);
        this.state = {
            subgroups:[],
            currencyOptions:['Naira','Pounds','Dollars'],
            accountType:['Payable','Receivable','Income'],
            editErrorAlertVisible:false,
            filedefinitionupdatedSuccess:true,
            filedefinitionupdatedError:true,
        }
    }
    id=""

    componentWillMount(){
        this.props.fetchOneFileDefinition(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        // if (this.props.userID !== prevProps.userID) {
        //   this.fetchData(this.props.userID);
        // }
        if(this.props.fileDefinition.fileDefinitionUpdated !== prevProps.fileDefinition.fileDefinitionUpdated){
            this.props.history.push(`/file-definitions`);
        }
        
      }

    
    getSubGroup = (name ) => {
        if(this.props){
            // console.log('Props needed is ',this.props);
            let filtered_subgroup = this.props.processorData.data.filter(item=>item.name === name);
            this.setState({subgroups:filtered_subgroup[0].subgroups});
        }
        
    }
    handleUpload = (data,name) => {
        this.setState({mappedFields:data[0],fileName:name});
        console.log(this.state);
    };
    onSubmit= (values) => {
        delete values.id;
        delete values.channelFileName;
        delete values.mapping;
        values.fileName = this.state.fileName;
        values.firstRow = this.state.mappedFields;
        debugger;
        if(!values.fileName && !values.firstRow){
            this.setState({editErrorAlertVisible:true});
            return;
        }else{
            this.props.updateFileDefinition(values,this.props.match.params.id);
        }
        
    }
    render(){
        return(
            <div>
                <Row>
                    <Col>
                        {this.props.fileDefinitionUpdated ? <Alert color="success" isOpen={this.state.filedefinitionupdatedSuccess} toggle={this.onDismisscreatedSuccessAlert}>
                            
                            <FormattedMessage id="Success: File Definition Updated Successfully!" defaultMessage="Success: File Definition Updated Successfully!"/>
                        </Alert>:null}
                    </Col>
                    <Col xs="12">
                        {this.props.fileDefintionUpdatedError ? <Alert color="danger" isOpen={this.state.filedefinitionupdatedError} toggle={this.onDismissUpdatedErrorAlert}>
                            Error: {this.props.fileDefintionUpdatedError.response.data}
                        </Alert>:null}
                    </Col>
                    <Col xs="12">
                        <Alert color="danger" isOpen={this.state.editErrorAlertVisible} toggle={this.onDismisscreatedSuccessAlert}>
                            Error: Please ensure you have uploaded a different file.
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                
                                <FormattedMessage id="Edit File Definition" defaultMessage="Edit File Definition"/>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="file-input"><FormattedMessage id="File input" defaultMessage="File input"/></Label>
                                        
                                    </Col>
                                    <Col xs="12" md="9">
                                        <CSVReader
                                            cssClass="react-csv-input"
                                            onFileLoaded={this.handleUpload}
                                            />
                                    </Col>
                                </FormGroup>
                                <EditFileDefinitionForm {...this.props} state ={this.state} onSubmit= {this.onSubmit}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    // console.log('State is ',state);
    return {
        initialValues:state.fileDefinition.fileDefinition,
        fileDefinitionUpdated:state.fileDefinition.fileDefinitionUpdated,
        fileDefinition:state.fileDefinition,
        fileDefintionUpdatedError:state.fileDefinition.fileDefinitionUpdatedError,
    }
}
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        updateFileDefinition,
        fetchOneFileDefinition
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(EditFileDefinition);