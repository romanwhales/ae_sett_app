import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Alert,CardGroup} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Widget04 from './Widgets04';


import {fetchFileSetsBatchesPaginated,fetchFileSet,fetchFileSetBatchSummary,fetchFileSetBatchDetail,downloadFileSetBatchesSummaryCsv} from '../../actions/filesets';
import {getLoggedInUser} from '../../actions/utils';

import {FormattedMessage,} from 'react-intl';

// import AddFileSet from './addFileSet';
// import UpdateFileSet from './updateFileSet';

class FileSetBatchSummary extends Component {
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
            activePage:1
        }
    }
    id=''
    fileDefinitionId = ''
  componentDidMount(){
    //   this.props.fetchFileSetsBatchesPaginated(this.props.match.params.id,0)
    //   this.props.fetchFileSet(this.props.match.params.id)
    this.props.fetchFileSetBatchDetail(this.props.match.params.filesetId,this.props.match.params.batchesId);
      this.props.fetchFileSetBatchSummary(this.props.match.params.filesetId,this.props.match.params.batchesId,3);
      this.props.getLoggedInUser();
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




  render() {
    console.log('Props is ',this.props);
    return (
      <div className="animated fadeIn">
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
        <Row>
          <Col>
          <CardGroup className="mb-4">
            <Widget04 icon="icon-people" color="info" header="8,900" value="25">Transactions</Widget04>
            <Widget04 icon="icon-user-follow" color="success" header="385" value="25">New Clients</Widget04>
            <Widget04 icon="icon-basket-loaded" color="warning" header="1238" value="25">Products sold</Widget04>
            <Widget04 icon="icon-pie-chart" color="primary" header="28%" value="25">Returning Visitors</Widget04>
            <Widget04 icon="icon-speedometer" color="danger" header="5:34:11" value="25">Avg. Time</Widget04>
          </CardGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
           {this.props.fileSets.fileSetFileDefinitionDeleted?<Alert color="success" isOpen={this.state.fileSetDeletedAlert} toggle={this.onDismissFileSetDeletedSuccessAlert}>
                    
                    <FormattedMessage id="Success: FileSet Deleted Succesfully!" defaultMessage="Success: FileSet Deleted Succesfully!"/>
                    </Alert>:null}
             {this.props.fileSets.fileSetBatchSummaryError?<Alert color="danger" isOpen={this.state.fileSetBatchSummaryErrorAlert} toggle={this.onDismissFileSetBatchSummaryErrorAlert}>
                    {this.props.fileSets.fileSetBatchSummaryError.data.message}
                    </Alert>:null} 
            <Card>
              <CardHeader>
              <strong> {this.props.fileSets.fileSetBatchDetail? <React.Fragment> 
                {this.props.fileSets.fileSetBatchDetail.channelFileName}  &nbsp;
                  {this.props.fileSets.fileSetBatchDetail.batchDate }</React.Fragment>: "'s FileSet Daily Batch"}<FormattedMessage id="FileSet Batch" defaultMessage="'s Fileset Batch Summary"/></strong>
                  <div className="card-header-actions">
                  <a href="" onClick={e=>this.downloadFileSetBatchesSummaryCsv(this.props.match.params.filesetId,this.props.match.params.batchesId,this.props.fileSets.fileSetBatchDetail.channelFileName)} href="javascript:;" download={""+1+".csv"}><i class="fa fa-download" aria-hidden="true" ></i></a>
                  
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
                    
                    {this.props.fileSets.fileSetBatchSummary
                        ? [
                            this.props.fileSets.fileSetBatchSummary.length > 0 ?   this.props.fileSets.fileSetBatchSummary.map((item,index) => (
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
         {/* <AddFileSet {...this.state} {...this.toggle} closeModal={this.closeModal} onSubmit = {this.onSubmit} {...this.props}/>
        <UpdateFileSet {...this.state} {...this.toggleUpdate} closeUpdateModal={this.closeUpdateModal} onSubmit = {this.onSubmitUpdate} {...this.props}/> */}
        {/* <Modal isOpen={this.state.deleteModal}  className={this.props.className}>
            <ModalHeader toggle={this.toggleConfirm}><FormattedMessage id="Delete" defaultMessage="Delete" /></ModalHeader>
            <ModalBody>
                <FormattedMessage id="Are you sure you want to delete this file definition?" defaultMessage="Are you sure you want to delete this fileDefinition?"/> 
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={this.confirm}><FormattedMessage id="Delete" defaultMessage="Delete" /></Button>{' '}
                <Button color="secondary" onClick={this.toggleConfirm}><FormattedMessage id="app.cancel" defaultMessage="Cancel" /></Button>
            </ModalFooter>
        </Modal> */}

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
    fetchFileSetsBatchesPaginated,
    fetchFileSet,
    fetchFileSetBatchSummary,
    fetchFileSetBatchDetail,
    getLoggedInUser,
    downloadFileSetBatchesSummaryCsv
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(FileSetBatchSummary);

