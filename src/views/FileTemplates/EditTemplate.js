import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row,FormGroup,Label,Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import AddProductDetailsForm from './addProductDetails';
import {updateFileTemplate} from '../../actions/file_templates';
import CSVReader from "react-csv-reader";
import EditTemplateForm from './EditTemplateForm';
import {FormattedMessage,} from 'react-intl';



class EditFileTemplate extends Component{
    constructor(props){
        super(props);
        this.state = {
            sampleFile:''
        }
       
    }

    handleUpload = (data,name) => {
        this.setState({sampleFile:name});
    };

    componentWillMount(){
        // this.props.getProcessor();
    }


    onSubmit=(values) =>{
        values.sampleFile = this.state.sampleFile;
        this.props.updateFileTemplate(values,this.props.match.params.id);

    }

    render(){
        return(
            <div>
                <Row>
                    <Col>
                        {this.props. fileTemplateUpdated?<Alert color="success">
                            
                            <FormattedMessage id="Success: File Template Updated Successfully!" defaultMessage="Success: File Template Updated Successfully!"/>
                        </Alert>:null}
                    </Col>
                </Row>
                <Card>
                    <CardHeader>
                        <i className="fa fa-credit-card-alt"></i> <FormattedMessage id="Edit File Template" defaultMessage="Edit File Template"/>
                    </CardHeader>
                    <CardBody>
                    <FormGroup row>
                        <Col md="2">
                            <Label htmlFor="file-input"><FormattedMessage id="File input" defaultMessage="File input"/></Label>
                            
                        </Col>
                        <Col xs="12" md="8">
                            <CSVReader
                                cssClass="react-csv-input"
                                onFileLoaded={this.handleUpload}
                                />
                        </Col>
                    </FormGroup>
                    <EditTemplateForm onSubmit = {this.onSubmit}/>
                    </CardBody>
                </Card>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('Products State is ',state)
    return {
        fileTemplateUpdated:state.fileTemplates.fileTemplateUpdated

    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        updateFileTemplate
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(EditFileTemplate);