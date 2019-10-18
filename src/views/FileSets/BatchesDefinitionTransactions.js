import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Alert,CardGroup} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";
import Widget04 from './Widgets04';


import {fetchFileSetsDefinitionBatchesTransactionsPaginated,fetchFileSetBatchDetail,fetchFileSetsDefinitionBatchesDetail} from '../../actions/filesets';
import {getLoggedInUser} from '../../actions/utils';
import {FormattedMessage,} from 'react-intl';
import {
  Grid,
  Table,
  TableHeaderRow,
  ColumnChooser,
  TableColumnVisibility,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
// import SearchBatchesFormComponent from './searchBatchesSumary';
// import AddFileSet from './addFileSet';
// import UpdateFileSet from './updateFileSet';

class FileSetDefinitionBatchesTransactions extends Component {
    constructor(props){
        super(props);
        this.state ={
            modal:false,
            showUpdateModal:false,
            fileSetCreatedAlert:true,
            filesetUpdatedAlert:true,
            fileSetDeletedAlert:true,
            fileSetDefintionBatchesTransactionsPaginatedError:true,
            deleteModal:false,
            activePage:1,
            defaultHiddenColumnNames: ['sex', 'car'],
        }
    }
    id=''
    fileDefinitionId = ''
  componentWillMount(){
      this.props.fetchFileSetsDefinitionBatchesTransactionsPaginated(this.props.match.params.filesetId,this.props.match.params.batchesId,this.props.match.params.definitionId,0,null);
      this.props.fetchFileSetBatchDetail(this.props.match.params.filesetId,this.props.match.params.batchesId);
      this.props.fetchFileSetsDefinitionBatchesDetail(this.props.match.params.filesetId,this.props.match.params.batchesId,this.props.match.params.definitionId)
      this.props.getLoggedInUser()
      
  }
  
  onSubmit = (values) => {
    this.props.createFileSet(values);
    this.setState({
        modal:false
    })
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

onDismissFileSetDefintionBatchesTransactionsPaginatedErrorAlert = () => {
  this.setState({
    fileSetDefintionBatchesTransactionsPaginatedError:false
  })
}

handlePageChange = (pageNumber) => {
  let pageNumberParam = pageNumber - 1;
  
  this.props.fetchFileSetsDefinitionBatchesTransactionsPaginated(this.props.match.params.filesetId,this.props.match.params.batchesId,this.props.match.params.definitionId,pageNumberParam);
  this.setState({activePage: pageNumber});

  
}

onSubmit = (values) => {
  this.props.fetchFileSetsDefinitionBatchesTransactionsPaginated(this.props.match.params.filesetId,this.props.match.params.batchesId,this.props.match.params.definitionId,0,values.affiliate.value);
  

}




  render() {
    
    if(this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginated !== undefined){
      debugger;
      if(this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginated.content.length){
        
        console.log(this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginated.content[0].payload);
      var columnHeaders = this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginated.content[0].payload
      var newRows = [];
      for(var name in columnHeaders){
        var newObj = {}
        newObj.name = name
        newObj.title = name
        
        newRows.push(newObj)
      }
      var payloadArray = []
      this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginated.content.forEach(item=> payloadArray.push(item.payload));
      // console.log('PayloadArray is ',payloadArray);
      }
      
    }
    const { defaultHiddenColumnNames } = this.state;
    
    console.log('Props is ',this.props);
    return (
      <div className="animated fadeIn">
        {/* <Row>
            <Col style={{ 'textAlign': 'right' }}>
            <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.toggle}>
            <i className="fa fa-plus"></i>&nbsp;<FormattedMessage id="Add FileSet" defaultMessage="Add FileSet"/></Button>
            </Col>
        </Row> */}
        <Row>
          <Col>
          {this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginated?<CardGroup className="mb-4">
            <Widget04 icon="icon-people" color="info" header={this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginated.meta.totalElements.toLocaleString()} value="25">Transactions</Widget04>
            <Widget04 icon="icon-user-follow" color="success" header="385" value="25">New Clients</Widget04>
            <Widget04 icon="icon-basket-loaded" color="warning" header="1238" value="25">Products sold</Widget04>
            <Widget04 icon="icon-pie-chart" color="primary" header="28%" value="25">Returning Visitors</Widget04>
            <Widget04 icon="icon-speedometer" color="danger" header="5:34:11" value="25">Avg. Time</Widget04>
          </CardGroup>:null}
        
          </Col>
        </Row>
        <Row>
        
            {/* <Col xs="12">
                <SearchBatchesFormComponent {...this.props} onSubmit = {this.onSubmit} {...this.state} change={this.change}/>
            </Col> */}

          
          <Col lg={12}>
           {this.props.fileSets.fileSetFileDefinitionDeleted?<Alert color="success" isOpen={this.state.fileSetDeletedAlert} toggle={this.onDismissFileSetDeletedSuccessAlert}>
                    
                    <FormattedMessage id="Success: FileSet Deleted Succesfully!" defaultMessage="Success: FileSet Deleted Succesfully!"/>
                    </Alert>:null}
        
             {this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginatedError?<Alert color="danger" isOpen={this.state.fileSetDefintionBatchesTransactionsPaginatedError} toggle={this.onDismissFileSetDefintionBatchesTransactionsPaginatedErrorAlert}>
             {this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginatedError.data.message}
                    </Alert>:null} 
            <Card>
              <CardHeader>
                
                <strong> {this.props.fileSets.fileSetBatchDefinitionDetail? <React.Fragment> {this.props.fileSets.fileSetBatchDefinitionDetail.fileSetBatch.channelFileName} {this.props.fileSets.fileSetBatchDefinitionDetail.fileSetBatch.batchDate} 
                {this.props.fileSets.fileSetBatchDefinitionDetail.definition.channelFileName}
                </React.Fragment>: "'s FileSet Daily Batch"}<FormattedMessage id=" Transactions" defaultMessage=" Transactions"/></strong>
              </CardHeader>
              <CardBody>
                {/* <Table2 hover bordered striped responsive size="sm">
                    <thead>
                        <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Channel FileName
                        </th>
                        <th>
                          STATUS
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginated
                        ? [
                            this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginated.content.length > 0 ?   this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginated.content.map((item,index) => (
                            <tr key={index+1}>
                              <td>{index+1}</td>
                              <td>{item.definition.channelFileName}</td>
                              <td >{item.exist? <Badge className="mr-1" color="success">Present</Badge>:<Badge className="mr-1" color="danger">Absent</Badge>}</td>
                            </tr>
                            )):<tr key="1"><td colSpan="4"><p className="text-center text-danger">There are no transactions for the definition batch selected at the moment.</p></td></tr>
                        ]
                        : [
                            ''
                        ]
                    }
                    </tbody>
                </Table2> */}
                {   this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginated
                                    ? [
                                      this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginated.content.length > 0 ?  this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginated? 
                                      <Grid
                                      rows={payloadArray}
                                      columns={newRows}
                                      >
                                      <Table />
                                      <TableHeaderRow />
                                      <TableColumnVisibility
                                          defaultHiddenColumnNames={defaultHiddenColumnNames}
                                      />
                                      <Toolbar />
                                      <ColumnChooser />
                                      </Grid>
                                      
                                        :<p className="text-center text-danger"><FormattedMessage id="There are no batch transactions at the moment." defaultMessage="There are no batch transactions at the moment."/></p>:<p className="text-center text-danger"><FormattedMessage id="There are no batch transactions at the moment." defaultMessage="There are no batch transactions at the moment."/></p>
                                    ]
                                    : [
                                        ''
                                    ]
                                }

                {/* {  this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginated?
                  <Grid
                  rows={payloadArray}
                  columns={newRows}
                  >
                  <Table />
                  <TableHeaderRow />
                  <TableColumnVisibility
                      defaultHiddenColumnNames={defaultHiddenColumnNames}
                  />
                  <Toolbar />
                  <ColumnChooser />
                  </Grid>
              
              :null} */}
                {this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginated?<nav>
                    <Pagination2
                        activePage={this.state.activePage}
                        itemsCountPerPage={20}
                        totalItemsCount={this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginated?this.props.fileSets.fileSetDefinitionBatchesTranactionsPaginated.meta.totalElements:null}
                        pageRangeDisplayed={5} 
                        onChange={this.handlePageChange}
                    />
                    </nav>:'' }
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
    fetchFileSetsDefinitionBatchesTransactionsPaginated,
    fetchFileSetBatchDetail,
    fetchFileSetsDefinitionBatchesDetail,
    getLoggedInUser
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(FileSetDefinitionBatchesTransactions);

