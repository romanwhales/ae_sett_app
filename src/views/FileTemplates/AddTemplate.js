import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row,Button,FormGroup,Label,Alert,Input } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import AddProductDetailsForm from './addProductDetails';
import {createFileTemplate} from '../../actions/file_templates';
import CSVReader from "react-csv-reader";

import {FormattedMessage} from 'react-intl';


class AddFileTemplate extends Component{
    constructor(props){
        super(props);
        this.state = {
            matchString:'',
            sampleFile:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({matchString: event.target.value});
    }

    handleUpload = (data,name) => {
        this.setState({sampleFile:name});
    };

    componentWillMount(){
        // this.props.getProcessor();
    }

    handleSubmit(event) {
        this.props.createFileTemplate(this.state);
        this.props.history.push(`/file/templates`);
        event.preventDefault();
      }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col>
                            {this.props.fileTemplateCreated?<Alert color="success">
                                
                                <FormattedMessage id="Success: File Template Added Successfully!" defaultMessage="Success: File Template Added Successfully!"/>
                            </Alert>:null}
                        </Col>
                    </Row>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-credit-card-alt"></i><FormattedMessage id="Add File Template" defaultMessage="Add File Template"/>
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
                            <FormGroup row>
                                <Col md="2">
                                    <Label htmlFor="hf-password"><FormattedMessage id="Match String" defaultMessage="Match String"/></Label>
                                </Col>
                                <Col xs="12" md="8">
                                    <Input type="text" id="matchString" name="matchString" placeholder="Please Enter matchString" value={this.state.matchString} onChange={this.handleChange}/>
                                </Col>
                            </FormGroup>
                            <Button type="submit" size="md" color="success"  ><FormattedMessage id="app.submit" defaultMessage="Submit" /></Button>
                            
                        </CardBody>
                        
                    </Card>
                    
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('Products State is ',state)
    return {
        fileTemplateCreated:state.fileTemplates.templateFileCreated,

    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        createFileTemplate,
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(AddFileTemplate);