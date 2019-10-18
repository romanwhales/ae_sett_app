import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table as Table2,Alert,CardGroup,Button} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";
import Widget04 from '../../../../Utils/Widgets04';
import {createLoadingSelector} from '../../../../actions/utils';

import {fetchVisaIssuerTransactions,downloadVisaIssuerCsv} from '../../../../actions/filesets';
// import {fetchFileSetsDefinitionBatchesTransactionsPaginated,fetchFileSetBatchDetail,fetchFileSetsDefinitionBatchesDetail} from '../../actions/filesets';

import {FormattedMessage,} from 'react-intl';
import {
  Grid,
  Table,
  TableHeaderRow,
  ColumnChooser,
  TableColumnVisibility,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui';

// import AddFileSet from './addFileSet';
// import UpdateFileSet from './updateFileSet';

class VisaIssuerTransactions extends Component {
    constructor(props){
        super(props);
        this.state ={
            modal:false,
            showUpdateModal:false,
            fileSetCreatedAlert:true,
            filesetUpdatedAlert:true,
            fileSetDeletedAlert:true,
            deleteModal:false,
            activePage:1,
        }
    }
    id=''
    fileDefinitionId = ''
  componentWillMount(){
      this.props.fetchVisaIssuerTransactions(this.props.match.params.date,0);
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

handlePageChange = (pageNumber) => {
  let pageNumberParam = pageNumber - 1;
  this.props.fetchVisaIssuerTransactions(this.props.match.params.date,pageNumberParam);
  this.setState({activePage: pageNumber});

  
}

downloadIssuerTransactions = (date) => {
    this.props.downloadVisaIssuerCsv(date);
    
}

onSubmit = (values) => {
  this.props.fetchFileSetsDefinitionBatchesTransactionsPaginated(this.props.match.params.filesetId,this.props.match.params.batchesId,this.props.match.params.definitionId,0,values.affiliate.value);
  

}
  render() {
    if(this.props.fileSets.visaIssuerTransactions){
      if(this.props.fileSets.visaIssuerTransactions.data.content.length > 0){
          delete this.props.fileSets.visaIssuerTransactions.data.content[0].inctf01;
          delete this.props.fileSets.visaIssuerTransactions.data.content[0].id;
          var columnHeaders = this.props.fileSets.visaIssuerTransactions.data.content[0];
          var newRows = [];
          for(var name in columnHeaders){
              var newObj = {};
              newObj.name = name;
              newObj.title = name;
              newRows.push(newObj);
          }
          var payloadArray = [];
          this.props.fileSets.visaIssuerTransactions.data.content.forEach(function(item){
              if(item.interAffIssuer){
                  delete item.interAffIssuer;
              }
              delete item.id
              payloadArray.push(item);
              
          })
        //   console.log('PayloadArray is ',payloadArray);
      }
    }
    const { defaultHiddenColumnNames } = this.state;
    
    console.log('Props is ',this.props);
    return (
      <div className="animated fadeIn">
        
        <Row>
          <Col>
          {this.props.fileSets.visaIssuerTransactions?<CardGroup className="mb-4">
            <Widget04 icon="icon-people" color="info" header={this.props.fileSets.visaIssuerTransactions.data.totalElements.toLocaleString()} value="25">Transactions</Widget04>
            <Widget04 icon="icon-user-follow" color="success" header="0" value="25">Successful Transactions</Widget04>
            <Widget04 icon="icon-basket-loaded" color="warning" header="0" value="25">Credits</Widget04>
            <Widget04 icon="icon-pie-chart" color="primary" header="0" value="5">Debits</Widget04>
            <Widget04 icon="icon-speedometer" color="danger" header="0" value="25">Amount</Widget04>
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
        
             {/* {this.props.fileSets.fileSetUpdated?<Alert color="success" isOpen={this.state.fileSetUpdatedAlert} toggle={this.onDismissFileSetUpdatedSuccessAlert}>
                    <FormattedMessage id="Success: FileSet updated Successfully!" defaultMessage="Success: FileSet updated Successfully!"/>
                    </Alert>:null}  */}
            <Card>
              <CardHeader>
                
              <strong> {this.props.fileSets.visaIssuerTransactions ? <React.Fragment> 
                Visa Issuer {this.props.match.params.date}
                </React.Fragment> : ""}<FormattedMessage id=" Transactions" defaultMessage=" Transactions"/> </strong> 
                {this.props.fileSets.visaIssuerTransactions?[
                  this.props.fileSets.visaIssuerTransactions.data.content.length > 0 ? 
                  // <a href="" onClick={e => this.downloadTransactions(this.props.match.params.date)} href="javascript:;" download={""+1+".csv"}><i class="fa fa-download" aria-hidden="true" ></i></a>
                  <Button className={'float-right mb-0 btn-sm'} color="success" onClick={e => this.downloadIssuerTransactions(this.props.match.params.date)}><i className="fa fa-download"></i>&nbsp; <FormattedMessage id="Download CSV" defaultMessage="Download CSV" /></Button>
                  :''
                ]:[
                  ''
                ]
                }
              </CardHeader>
              <CardBody>
              {   this.props.fileSets.visaIssuerTransactions
                                    ? [
                                        this.props.fileSets.visaIssuerTransactions.data.content.length > 0 ?  this.props.fileSets.visaIssuerTransactions? 
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
                {this.props.fileSets.visaIssuerTransactions?<nav>
                    <Pagination2
                        activePage={this.state.activePage}
                        itemsCountPerPage={20}
                        totalItemsCount={this.props.fileSets.visaIssuerTransactions?this.props.fileSets.visaIssuerTransactions.data.totalElements:null}
                        pageRangeDisplayed={5} 
                        onChange={this.handlePageChange}
                    />
                    </nav>:'' }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

// Show loading on GET_VISA_ISSUER_TRANSACTIONS_REQUEST
const loadingSelector = createLoadingSelector(['GET_VISA_ISSUER_TRANSACTIONS_REQUEST']);


const mapStateToProps = (state) => {
  console.log('State is ',state);
  return {
    fileSets:state.fileSets,
    utils:state.utils,
    isFetching:loadingSelector(state)

  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    fetchVisaIssuerTransactions,
    downloadVisaIssuerCsv
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(VisaIssuerTransactions);

