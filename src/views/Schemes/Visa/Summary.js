import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Button,FormGroup,Label,Alert,Modal,ModalHeader,ModalBody,ModalFooter,CardGroup,Badge} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";
// import Widget04 from './Widgets04';

import {fetchVisaPostingSummary,downloadVisaPostingSummary} from '../../../actions/filesets';

import {FormattedMessage,FormattedHTMLMessage} from 'react-intl';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

// import AddFileSet from './addFileSet';
// import UpdateFileSet from './updateFileSet';

class VisaSummary extends Component {
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
    
    this.props.fetchVisaPostingSummary(this.props.match.params.date);
    
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

downloadVisaPostingSummary = (date) => {
  this.props.downloadVisaPostingSummary(date);
}


  render() {
    console.log('Props is ',this.props);
    return (
      <div className="animated fadeIn">
        {this.props.fileSets.visaPostingSummaryError?<Alert color="danger" isOpen={this.state.fileSetUpdatedAlert} toggle={this.onDismissFileSetUpdatedSuccessAlert}>
            {this.props.fileSets.visaPostingSummaryError.data.message}
        </Alert>:null} 
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
              {/* <strong> {this.props.fileSets.fileSetBatchDetail? <React.Fragment> 
                {this.props.fileSets.fileSetBatchDetail.channelFileName}  &nbsp;
                  {this.props.fileSets.fileSetBatchDetail.batchDate }</React.Fragment>: "'s FileSet Daily Batch"}<FormattedMessage id="FileSet Batch" defaultMessage="'s Fileset Batch Summary"/></strong>
                  <div className="card-header-actions">
                  <a href="" onClick={e=>this.downloadFileSetBatchesSummaryCsv(this.props.match.params.filesetId,this.props.match.params.batchesId,this.props.fileSets.fileSetBatchDetail.channelFileName)} href="javascript:;" download={""+1+".csv"}><i class="fa fa-download" aria-hidden="true" ></i></a>
                  
                </div> */}
                <strong>
                Visa Posting {this.props.match.params.date} Summary</strong>
                <div className="card-header-actions">
                
                {this.props.fileSets.visaPostingSummary ?[
                  this.props.fileSets.visaPostingSummary.data.length > 0 ? 
                  // <a href="" onClick={e => this.downloadTransactions(this.props.match.params.date)} href="javascript:;" download={""+1+".csv"}><i class="fa fa-download" aria-hidden="true" ></i></a>
                  <Button className={'float-right mb-0 btn-sm'} color="success" onClick={e => this.downloadVisaPostingSummary(this.props.match.params.date)}><i className="fa fa-download"></i>&nbsp; <FormattedMessage id="Download CSV" defaultMessage="Download CSV" /></Button>
                  :''
                ]:[
                  ''
                ]
                }
                </div>
              </CardHeader>

              <CardBody>
                <Table hover bordered striped responsive size="sm">
                    <thead>
                        <tr>
                        <th>
                            <FormattedMessage id="Unit" defaultMessage="Unit"/>
                        </th>
                        <th>
                          <FormattedMessage id="Account" defaultMessage="Account"/>
                        </th>
                        <th>
                          <FormattedMessage id="DRCR" defaultMessage="DRCR"/> 
                        </th>
                        <th>
                          <FormattedMessage id="Settlement Amount" defaultMessage="Settlement Amount"/> 
                        </th>
                        <th>
                          <FormattedMessage id="Narration" defaultMessage="Narration"/>
                           
                        </th>
                        <th>
                          <FormattedMessage id="Txn Date" defaultMessage="Txn Date"/> 
                        </th>
                        <th>
                          <FormattedMessage id="Txn Code" defaultMessage="Txn Code"/> 
                        </th>
                        <th>
                          <FormattedMessage id="Branch Code" defaultMessage="Branch Code"/> 
                        </th>
                        <th>
                          <FormattedMessage id="CCY" defaultMessage="CCY"/> 
                        </th>
                        <th>
                          <FormattedMessage id="XRATE" defaultMessage="XRATE"/> 
                        </th>
                        <th>
                          <FormattedMessage id="MID" defaultMessage="MID"/> 
                        </th>
                        <th>
                          <FormattedMessage id="LCY AMOUNT" defaultMessage="LCY AMOUNT"/> 
                        </th>
                       
                        
                        
                        </tr>
                    </thead>
                    <tbody>
                    
                    {this.props.fileSets.visaPostingSummary
                        ? [
                            this.props.fileSets.visaPostingSummary.data.length > 0 ?   this.props.fileSets.visaPostingSummary.data.map((item,index) => (
                                    <React.Fragment>
                                    <tr >
                                        <td colSpan="12" style={{textAlign:'center'}}>{item.product}</td>
                                    </tr>

                                    {item.records.map(record => (
                                        <React.Fragment>
                                            <tr>
                                                <td>{record.unit}</td>
                                                <td>{record.account}</td>
                                                <td>{record.crDr}</td>
                                                <td>{record.settlementAmount >= 0?record.settlementAmount.toLocaleString():'N/A'}</td>
                                                <td>{record.narration}</td>
                                                <td>{record.txnDate}</td>
                                                <td>{record.txnCode}</td>
                                                <td>{record.branch}</td>
                                                <td>{record.ccy}</td>
                                                <td>{record.xrate}</td>
                                                <td>{record.mid}</td>
                                                <td>{record.lcyAmount >=0 ? Number(record.lcyAmount).toLocaleString():'N/A'}</td>
                                                
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                    </React.Fragment>

                            )):<tr key="1"><td colSpan="12"><p className="text-center text-danger"><FormattedMessage id="There are no fileset batches summary at the moment." defaultMessage="There are no fileset batches summary at the moment."/></p></td></tr>
                        ]
                        : [
                            ''
                        ]
                    }
                    </tbody>
                    
                    
                    
                </Table>
                {this.props.fileSets.visaPostingSummaryLoading? 
                      <Loader
                            type="ThreeDots"
                            color="#337AB7"
                            height={100}
                            width={100}
                            style={{'textAlign':'center'}}

                        />:''}
                {/* {this.props.fileSets.fileSetBatchesPaginated?<nav>
                    <Pagination2
                        activePage={this.state.activePage}
                        itemsCountPerPage={20}
                        totalItemsCount={this.props.fileSets.fileSetBatchesPaginated?this.props.fileSets.fileSetBatchesPaginated.meta.totalElements:null}
                        pageRangeDisplayed={5} 
                        onChange={this.handlePageChange}
                    />
                    </nav>:'' } */}
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
    fetchVisaPostingSummary,
    downloadVisaPostingSummary
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(VisaSummary);

