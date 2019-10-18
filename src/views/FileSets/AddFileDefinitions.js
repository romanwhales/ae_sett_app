import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Button,FormGroup,Label,Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FormattedMessage,FormattedDate, FormattedTime} from 'react-intl';

// import AddAccountForm from './addAccountForm';
import AddFileDefintionForm from './addFileDefinitionForm';
import {fetchFileDefinitions} from '../../actions/file_definition';
import {addFileDefinitionsToFileSet} from '../../actions/filesets';



class AddFileSetDefinition extends Component{
    constructor(props){
        super(props);
        this.state = {
            subgroups:[],
            currencyOptions:['Naira','Pounds','Dollars'],
            accountOptions:['PAYABLE','RECEIVABLE','INCOME','EXPENSE'],
            amountDirectionOptions:[{name:'Credit',alias:'C'},{name:'Debit',alias:'D'}],
            requiredOptions:[{name:'True',value:true},{name:'False',value:false}],
            createdAccountError:true,
            createSuccessAlertVisible:true,
            mappingToView:[],
            fileDefinitionAddedError:true,
        }
        this.onDismissCreatedAccountErrorAlert= this.onDismissCreatedAccountErrorAlert.bind(this);
        this.onDismissCreateSuccessAlert = this.onDismissCreateSuccessAlert.bind(this);
    }

    componentWillMount(){
        this.props.fetchFileDefinitions()
        // console.log('props here is ',this.props);
    }

    onDismissCreatedAccountErrorAlert(){
        this.setState({ createdAccountError: false });
    }

    onDismissCreateSuccessAlert(){
        this.setState({ createSuccessAlertVisible: false });
    }

    onDismissfileDefinitionAddedErrorAlert = () => {
        this.setState({
            fileDefinitionAddedError: false
        })
    }

    
    getSubGroup = (name ) => {
        if(this.props){
            let filtered_subgroup = this.props.processorData.data.filter(item=>item.name === name);
            this.setState({subgroups:filtered_subgroup[0].subgroups});
        }
    }
    getMapping = (id,index) => {
        // console.log('id is ',id, this.props);
        if(this.props){
            let mappingObject = this.props.fileDefinitionList.data.find(item => item.id == id);
            let mappingArray = this.state.mappingToView;
            mappingArray.splice(index,1,mappingObject.mapping.firstRow);
            this.setState({mappingToView:mappingArray});
            console.log('Mapping arry is ',mappingArray);
            // this.setState({mappingToView[index]:mappingObject.mapping.firstRow});
        }
    }
    onSubmit = (values) =>{
       
        this.props.addFileDefinitionsToFileSet(this.props.match.params.id,values.accounts);    
    }

    componentDidUpdate(prevProps) {
        if(this.props.fileSets.fileDefinitionAddedToFileset !== prevProps.fileSets.fileDefinitionAddedToFileset){
            this.props.history.push(`/filesets/${this.props.match.params.id}/definitions`);
        }
        
      }

    componentWillUnmount(){   
        this.clearNotifications();
    }
    clearNotifications=() => {
        this.props.fileSets.fileDefinitionAddedToFileset= null;
        // this.props.accountsCreated.accountCreatedError = null;
    }
    render(){
        console.log('Props is ',this.props);
        return(
            <div>
                <Row>
                    <Col xs="12">
                        {this.props.fileSets.fileDefinitionAddedToFilesetError?<Alert color="danger" isOpen={this.state.fileDefinitionAddedError} toggle={this.onDismissfileDefinitionAddedErrorAlert}>
                            An Error Occured!
                            </Alert>:null}
                    </Col>
                    <Col xs="12">
                        {this.props.fileSets.fileDefinitionAddedToFileset?<Alert color="success" isOpen={this.state.createSuccessAlertVisible} toggle={this.onDismissCreateSuccessAlert}> 
                            <FormattedMessage id="Success: File Definition Added Succesfully" defaultMessage="Success: File Definition Added Succesfully"/>
                        </Alert>:null}
                    </Col>
                </Row>
                {/* <AddProductDetailsForm {...this.props} {...this.state} getSubGroup={this.getSubGroup} onSubmit = {this.onSubmit}/> */}
                <AddFileDefintionForm {...this.props} {...this.state} getSubGroup={this.getSubGroup} getMapping={this.getMapping} onSubmit = {this.onSubmit}/>
                
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('State is ',state);
    return {
        fileSets:state.fileSets,
        fileDefinitionList:state.fileDefinition.fileDefinitionList,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchFileDefinitions,
        addFileDefinitionsToFileSet
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(AddFileSetDefinition);