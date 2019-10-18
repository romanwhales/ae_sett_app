import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Button,FormGroup,Label,Alert,Modal,ModalHeader,ModalBody,ModalFooter,CardGroup,Badge} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";
// import Widget04 from './Widgets04';

import {fetchVisaAcquirerSummary,downloadVisaAcquirerCsv,fetchVisaAcquirerSummaryStats} from '../../../../actions/filesets';

import {FormattedMessage,FormattedHTMLMessage} from 'react-intl';

// import AddFileSet from './addFileSet';
// import UpdateFileSet from './updateFileSet';

class VisaAcquirerSummary extends Component {
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
    this.props.fetchVisaAcquirerSummary(this.props.match.params.date);
    this.props.fetchVisaAcquirerSummaryStats(this.props.match.params.date);
    
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
        {this.props.fileSets.visaAcquirerSummaryError?<Alert color="danger" isOpen={this.state.fileSetUpdatedAlert} toggle={this.onDismissFileSetUpdatedSuccessAlert}>
            {this.props.fileSets.visaAcquirerSummaryError.data.message}
        </Alert>:null} 
        {/* <Row >
            <Col >
                <SearchBatchesFormComponent {...this.props} onSubmit = {this.onSubmit} {...this.state} change={this.change}/>
            </Col>
        </Row> */}
        {/* <Row>
            <Col style={{ 'textAlign': 'right' }}>
            <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.toggle}>
            <i className="fa fa-plus"></i>&nbsp;<FormattedMessage id="Add FileSet" defaultMessage="Add FileSet"/></Button>
            </Col>
        </Row> */}
        {/* {this.props.fileSets.visaAcquirerSummary?<Row>
          <Col>
          <CardGroup className="mb-4">
            <Widget05 icon="icon-people" color="info" header={this.props.fileSets.visaIssuerSummaryStats.data.settlementAmount.toLocaleString()} value="25" currencycode={affiliateHTML}>AMOUNT</Widget05>
            <Widget05 icon="icon-user-follow" color="success" header={this.props.fileSets.visaIssuerSummaryStats.data.creditCount.toLocaleString()} value="25">CREDITS</Widget05>
            <Widget05 icon="icon-basket-loaded" color="warning" header={this.props.fileSets.visaIssuerSummaryStats.data.debitCount.toLocaleString()} value="25">DEBITS</Widget05>
            <Widget05 icon="icon-pie-chart" color="primary" header="28%" value="25">LCY AMOUNT</Widget05>
            
          </CardGroup>
          </Col>
        </Row>:''} */}
        <Row>
          <Col lg={12}>
              {this.props.fileSets.t464SumaryError?<Alert color="danger" isOpen={this.state.fileSetT112ErrorAlert} toggle={this.onDismissFileSetT112ErrorAlert}>
                   {this.props.fileSets.t464SumaryError.data.message}
                    </Alert>:null} 
            <Card>
              <CardHeader>
              {/* <strong> {this.props.fileSets.fileSetBatchDetail? <React.Fragment> 
                {this.props.fileSets.fileSetBatchDetail.channelFileName}  &nbsp;
                  {this.props.fileSets.fileSetBatchDetail.batchDate }</React.Fragment>: "'s FileSet Daily Batch"}<FormattedMessage id="FileSet Batch" defaultMessage="'s Fileset Batch Summary"/></strong>
                  <div className="card-header-actions">
                  <a href="" onClick={e=>this.downloadFileSetBatchesSummaryCsv(this.props.match.params.filesetId,this.props.match.params.batchesId,this.props.fileSets.fileSetBatchDetail.channelFileName)} href="javascript:;" download={""+1+".csv"}><i class="fa fa-download" aria-hidden="true" ></i></a>
                  
                </div> */}
                <strong>
                Visa Acquirer {this.props.match.params.date} Summary</strong>
                <div className="card-header-actions">
                {this.props.fileSets.visaAcquirerSummary ?[
                  this.props.fileSets.visaAcquirerSummary.data.length > 0 ? <a href="" onClick={e => this.downloadPostingFile(this.props.match.params.date)} href="javascript:;" download={""+1+".csv"}><i class="fa fa-download" aria-hidden="true" ></i></a>:''
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
                    
                    {this.props.fileSets.visaAcquirerSummary
                        ? [
                            this.props.fileSets.visaAcquirerSummary.data.length > 0 ?   this.props.fileSets.visaAcquirerSummary.data.map((item,index) => (
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
                                                <td>{record.settlementAmount?record.settlementAmount.toLocaleString():'N/A'}</td>
                                                <td>{record.narration}</td>
                                                <td>{record.txnDate}</td>
                                                <td>{record.txnCode}</td>
                                                <td>{record.branch}</td>
                                                <td>{record.ccy}</td>
                                                <td>{record.xrate}</td>
                                                <td>{record.mid}</td>
                                                <td>{record.lcyAmount?record.lcyAmount.toLocaleString():'N/A'}</td>
                                                
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
    fetchVisaAcquirerSummary,
    downloadVisaAcquirerCsv,
    fetchVisaAcquirerSummaryStats
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(VisaAcquirerSummary);
