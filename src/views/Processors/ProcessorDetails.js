import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Button,FormGroup,Label,Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Field,reduxForm} from 'redux-form';
import AddSubGroup from './addSubGroup';
import {getOneProcessor,createSubGroup} from '../../actions/processor';

class ProcessorDetails extends Component {
    constructor(props){
        super(props);
        this.state ={
            showAddSubGroupForm:false,
        }
    }
  componentWillMount(){
      
    this.props.getOneProcessor(this.props.match.params.id)
  }
  
  onSubmit = (values,id,details) => {
    this.props.createSubGroup(values,this.props.match.params.id)
  }
  showAddSubGroupForm = () => {
    this.setState({showAddSubGroupForm:!this.state.showAddSubGroupForm});
  }

  viewSubGroups = () => {
    this.props.history.push(`/processor/${this.props.singleProcessor.id}/subgroups`)
  }

  render() {
    // console.log('Props is ',this.props);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="fa fa-user pr-1"></i>Processor Details</strong>
                <Button style={{ 'float': 'right' }} color="success" onClick={this.showAddSubGroupForm}><i className="fa fa-plus"></i>&nbsp;Add SubGroup</Button>
              </CardHeader>
              <CardBody>
                  {this.props.singleProcessor?<Table responsive striped hover>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td><a href={"#/processor/"+this.props.singleProcessor.id+"/subgroups"}>{this.props.singleProcessor? this.props.singleProcessor.name:null}</a></td>
                            <td><Button color="secondary" type="button" size="sm" onClick={this.viewSubGroups}>View SubGroups </Button></td>
                        </tr>
                    </tbody>
                  </Table>:null}
              </CardBody>
            </Card>
          </Col>
          {this.state.showAddSubGroupForm? <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="fa fa-user pr-1"></i>Add SubGroup</strong>
              </CardHeader>
              <CardBody>
                  <AddSubGroup onSubmit= {this.onSubmit} {...this.props}/>
              </CardBody>
              <Col xl={12}>
                    {this.props.createdSubGroup?<Alert color="success">
                        
                        <FormattedMessage id="Success: Subgroup created Successfully!" defaultMessage="Success: Subgroup created Successfully!"/>
                    </Alert>:null}
                    {this.props.createdSubGroupError?<Alert color="danger">Error! Subgroup couldn't be created!</Alert>:null}
                </Col>
            </Card>
          </Col>:null}
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
 
  console.log('State is ',state);
  return {
    singleProcessor:state.processors.processor,
    createdSubGroup:state.processors.subGroupCreated,
    createdSubGroupError:state.processors.createSubGroupError,
  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    getOneProcessor,
    createSubGroup
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ProcessorDetails);

