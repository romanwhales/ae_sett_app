import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Button,FormGroup,Label,Alert,Modal,ModalHeader,ModalBody,ModalFooter,CardGroup,Badge} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";
// import Widget04 from './Widgets04';


import {fetchAllVss} from '../../../../actions/filesets';
import {FormattedMessage,FormattedHTMLMessage} from 'react-intl';

// import AddFileSet from './addFileSet';
// import UpdateFileSet from './updateFileSet';

class VSSFiles extends Component {
    constructor(props){
        super(props);
        this.state ={
            modal:false,
            showUpdateModal:false,
            fileSetCreatedAlert:true,
            filesetUpdatedAlert:true,
            fileSetDeletedAlert:true,
            deleteModal:false,
            fileSetBatchSummaryErrorAlert:true,
            fileSetT112ErrorAlert:true,
            activePage:1
        }
    }
    id=''
    fileDefinitionId = ''
  componentDidMount(){
    this.props.fetchAllVss();
    // this.props.fetchVisaPostingSummary(this.props.match.params.date);
    
  }
  
  onSubmit = (values) => {
    
    this.props.fetchFileSetBatchSummary(this.props.match.params.filesetId,this.props.match.params.batchesId,values.affiliate.value);

  }

  onSubmitUpdate = (values) => {
    this.props.updateFileSet(this.id,values);
    this.closeUpdateModal();
  }

  setUpProduct = (id) => {
      this.props.history.push(`/processors/${id}/subgroups/addProduct`);
  }
  
  toggle = () => {
    this.props.history.push(`/filesets/${this.props.match.params.id}/definitions/add`)
  }
  closeModal = () => {
    this.setState({ modal:false});
  }
  componentWillUnmount(){  
    this.clearNotifications(); 
    // this.props.subGroupCreated.subGroupCreated = null;
    // this.props.subGroupCreated.createSubGroupError = null;
    // this.props.subGroupCreated.updatedSubGroup = null;
    
  }

  updateSubGroup = (id) =>{
    this.clearNotifications();
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
    this.id = id;
    this.props.fetchFileSet(id);
  }

  closeUpdateModal = () => {
    
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
  }

  toggleUpdate = () => {
   
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
  }

  clearNotifications=()=>{
    this.props.fileSets.fileSetCreated= null;
    this.props.fileSets.visaPostingSummaryError = null;
    // this.props.subGroupCreated.createSubGroupError = null;
    // this.props.subGroupCreated.subGroupCreated = null;

  }

  onDismissFileSetCreatedSuccessAlert = () =>{
      this.setState({
        fileSetCreatedAlert:false
      })
  }

  onDismissFileSetUpdatedSuccessAlert = () => {
      this.setState({
          fileSetUpdatedAlert: false
      })
  }

  deleteFileDefinition = (id) => {
    this.clearNotifications()
    this.setState({deleteModal:true});
    this.fileDefinitionId = id;
  }

  toggleConfirm = () =>{
    this.setState({ deleteModal: !this.state.deleteModal });
}
confirm = ()=> {
  this.props.deleteFileSetDefinition(this.props.match.params.id,this.fileDefinitionId);
  this.setState({deleteModal:false});
}

onDismissFileSetDeletedSuccessAlert = () => {
  this.setState({
    fileSetDeletedAlert:false
  })
}

onDismissFileSetBatchSummaryErrorAlert = () =>{
  this.setState({
    fileSetBatchSummaryErrorAlert:false
  })
}

downloadFileSetBatchesSummaryCsv = (fileSetId,batchesId,name)=>{
  this.props.downloadFileSetBatchesSummaryCsv(fileSetId,batchesId,name);
}

downloadPostingFile = (date) => {
    this.props.downloadVisaAcquirerCsv(date);
}

onDismissFileSetT112ErrorAlert = () => {
    this.setState({
        fileSetT112ErrorAlert:false
    })
}


  render() {
    console.log('Props is ',this.props);
    return (
      <div className="animated fadeIn">
        {this.props.fileSets.visaPostingSummaryError?<Alert color="danger" isOpen={this.state.fileSetUpdatedAlert} toggle={this.onDismissFileSetUpdatedSuccessAlert}>
            {this.props.fileSets.visaPostingSummaryError.data.message}
        </Alert>:null} 
        <Row>
                  <Col>
                        <Card>
                        <CardHeader>
                            <i className="fa fa-cc-visa" style={{color:'#269AB7'}}></i><FormattedMessage id="Visa Files" defaultMessage="Visa Files"/>
                        </CardHeader>
                        <CardBody>
                            {/* {
                                this.props.accountReport ? <ReactTable data={this.props.accountReport} columns={columns}/>
                            :null} */}
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table" id="divToPDF">
                            <thead className="thead-light">
                                <tr>
                                    <th><FormattedMessage id="#" defaultMessage="#"/> </th>
                                    <th><FormattedMessage id="File Name" defaultMessage="File Name"/></th>     
                                </tr>
                            </thead>

                            <tbody>
                            {  this.props.fileSets.allVss
                                    ? [
                                      this.props.fileSets.allVss.data.length > 0 ?  this.props.fileSets.allVss ?  this.props.fileSets.allVss.data.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{index+1}</td>
                                                
                                                <td><a href={"#/visa/settlement/"+this.props.match.params.date+"/"+item+"/details"}>{item}</a></td>
                                                
                                            </tr>
                                        )):<tr><td colSpan="2"><p className="text-center text-danger">There are no vss files at the moment.</p></td></tr>:<tr><td colSpan="2"><p className="text-center text-danger">There are no vss files at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }                                 
                            </tbody>
                            </Table>
                        </CardBody>
                        </Card>
                    </Col>
                  </Row>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('State is ',state);
  return {
    fileSets:state.fileSets,
    utils:state.utils

  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    fetchAllVss
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(VSSFiles);

