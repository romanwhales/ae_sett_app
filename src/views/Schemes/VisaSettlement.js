/* eslint-disable import/first */
import React, { Component } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Alert,Nav,NavItem,NavLink,TabContent,TabPane,Badge} from 'reactstrap';
import Moment from 'react-moment';
import classnames from 'classnames';


import {fetchAllT112s,fetchAllT464s,fetchAllAdvisements,fetchAllT140s,fetchAllT461s,fetchAllInterAffiliateIssuer,fetchAllInterAffiliateAcquirer,fetchVisaIssuer,fetchVisaAcquirer,fetchVisaSummary,fetchAllVss} from '../../actions/filesets'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";

import '../Batches/datepicker.css';


import jsPDF from 'jspdf';
import {FormattedMessage,} from 'react-intl';
require('jspdf-autotable');

import{BASE_URL} from '../../actions/types';


import ReactTable from "react-table";
import 'react-table/react-table.css'



import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';
import '../Transactions/Transactions.css';






// const switchData = [{name:'Interswitch',amount:100023400,adviceAmount:130023400,posted:false},{name:'Unified Payments',amount:301267423,adviceAmount:401267423,posted:false},{name:'Etranzact',amount:122234556,adviceAmount:145234556,posted:false},{name:'Mastercard',amount:32222555,adviceAmount:42222555,posted:false},{name:'Visa',amount:86777445,adviceAmount:44777445,posted:false},{name:'Nibss',amount:32222555,adviceAmount:32552555,posted:false}]

class VisaSettlement extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            activePage:1,
            activeTab:'1',
            activePageT112:1,
            activePageT464:1,
            activePageT140:1,
            activePageT461:1,
            date: new Date(),
            startDate: moment(),
            endDate:moment(),
            accNameOrNo:'',
            focusedInput: null,
            accountReportErrorAlertVisible:true,
            switchData:[{name:'Interswitch',amount:100023400,adviceAmount:130023400,posted:false},{name:'Unified Payments',amount:301267423,adviceAmount:401267423,posted:false},{name:'Etranzact',amount:122234556,adviceAmount:145234556,posted:false},{name:'Mastercard',amount:32222555,adviceAmount:42222555,posted:false},{name:'Visa',amount:86777445,adviceAmount:44777445,posted:false},{name:'Nibss',amount:32222555,adviceAmount:32552555,posted:false}]
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitDate = this.submitDate.bind(this);
    }

    componentDidMount(){
    //    this.props.fetchBatchesSummary('2018-04-12');
        
        
        this.props.fetchAllAdvisements(0);
        this.props.fetchVisaSummary(0);
        this.props.fetchVisaIssuer(0);
        this.props.fetchVisaAcquirer(0);
        this.props.fetchAllVss();
    }
    handlePageChange = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchBatchesTransactions(this.props.match.params.id,pageNumberParam);
        this.setState({activePage: pageNumber});
        // this.props.fetchOffices(pageNumber);
        // this.setState({activePage: pageNumber});
    }

    handlePageChangeT112 = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchAllT112s(pageNumberParam)
        this.setState({activePageT112: pageNumber});
        // this.props.fetchOffices(pageNumber);
        // this.setState({activePage: pageNumber});
    }

    handlePageChangeT140 = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchAllT112s(pageNumberParam)
        this.setState({activePageT112: pageNumber});
        // this.props.fetchOffices(pageNumber);
        // this.setState({activePage: pageNumber});
    }


    showPostingFile =(fileId) =>{
        this.props.history.push(`/mastercard/settlement/t464/${fileId}/summary`);
    }


    showPostingFileT112 = fileId => {
        this.props.history.push(`/mastercard/settlement/t112/${fileId}/summary`);
    }


    viewIssuerTransactions = date => {
        this.props.history.push(`/visa/settlement/issuer/${date}/transactions`);
    }

    showPostingFileAcquirer = (date) => {
        this.props.history.push(`/visa/settlement/acquirers/${date}/summary`);
    }

    showPostingIssuerFileSummary = (date) => {
        
        this.props.history.push(`/visa/settlement/issuers/${date}/summary`);
    }

    handleChange(date) {
        this.setState({
          startDate: date
        });
        // console.log(new Date(this.state.startDate).toISOString());
      }

      submitDate(){
            console.log(moment(this.state.startDate).format());
            var date = moment(this.state.startDate).toDate();
            
            console.log(date.toISOString());
            this.props.fetchDailyProcessorsSummary(date.toISOString());

        // console.log('Date Sent to server is ',new Date(this.state.startDate).toISOString());
        //   this.props.fetchBatchesSummary(moment(this.state.startDate).format());
      }

      postTransactions(index){
          return false;
      }

      downloadPDF(){
        var doc = new jsPDF();
        var columns = ["#", "Switch", "Amount","Advice Amount"];
        var rows = [
            [1,"Interswitch",100023400,130023400],
            [2,'Unified Payments',301267423,401267423],
            [3,'Etranzact',122234556,145234556],
            [4,'Visa',86777445,44777445],
            [5,'Nibss',32222555,32552555]           
        ];
        // doc.fromHTML(window.document.getElementById('divToPDF'), 10, 10,{'width': 180});
        doc.autoTable(columns, rows);
        doc.save('switch-advice.pdf');
      }
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab,
          });
        }
      }
      /* handle the submit form */
      onSubmit=(values)=>{
          let startDate,endDate;
        if(values.hasOwnProperty('daterange')){
            if(values.daterange.startDate){
              startDate = moment(values.daterange.startDate).format().split("T")[0];
            }else{
                return;
            }
            // delete values.daterange.startDate;
            
        }
        if(values.hasOwnProperty('daterange')){
          if(values.daterange.endDate){
            endDate = moment(values.daterange.endDate).format().split("T")[0];
          }else{
              endDate = startDate
          }
        //   delete values.daterange.endDate;
        //   delete values.daterange;
        }
       

        if(values.affiliate){
            this.setState({startDate:startDate,endDate:endDate,accNameOrNo:values.affiliate.value}); 
        }else{
            this.setState({startDate:startDate,endDate:endDate});
        }
        this.props.fetchFileSetStatus(1,values.affiliate.value,startDate,endDate);
    }
      onFocusChange=(focusedInput) =>{
        this.setState({ focusedInput });
      }
      onDismissAccountReportErrorAlert = () => {
        this.setState({accountReportErrorAlertVisible:false});
      }

      downloadAccountPDF =(date,enddate,accountNumber)=>{
        this.props.downloadPdf(date,enddate,accountNumber);
      }

      downloadAccountCSV=(date,enddate) => {
        this.props.downloadCsv(date,enddate);
      }
      showPostingFileSummary = (date) => {
        
        this.props.history.push(`/visa/settlement/${date}/posting`);
      }
      showVssFiles = (date) => {
        // /visa/settlement/:date/vssFiles
        this.props.history.push(`/visa/settlement/vssFiles/${date}`);
      }

      checkValidation(validation){
        
          if(validation == "NO_SUMMARY"){
            return <Badge pill color="warning">No Summary</Badge>
          }else if (validation == 'SUMMARY_MISMATCH'){
              return <Badge pill color="danger">Summary Mismatch</Badge>
          }else if (validation == 'SUCCESS'){
              return <Badge pill color="success">Matched</Badge>
          }
          
      }

      checkPosting(date){
          if (date){
              return <Badge pill color="success">Posted</Badge>
          }else{
              return <Badge pill color="danger">Not Posted</Badge>
          }
        
      }
    
    
    render(){
        console.log('Props here is ',this.props);
        let currentAffiliate = localStorage.getItem('selectedAfilliate');
        
        return(
            <div className="animated fadeIn">
                
                {/* <Row>
                    <Col>
                    <AccountSearchForm {...this.props} {...this.state} onSubmit = {this.onSubmit} onFocusChange={this.onFocusChange}/>
                    </Col>
                    
                </Row> */}
                {/* <Row>
                    <Col>
                    
                        {this.props.accountReportError?<Alert color="danger" isOpen={this.state.accountReportErrorAlertVisible} toggle={this.onDismissAccountReportErrorAlert}>
                            Error!: {this.props.accountReportError.message}
                        </Alert>:null}
                    </Col>
                </Row>
                <Row>
                  <Col>
                        <Card>
                        <CardHeader>
                            <i className="fa fa-credit-card-alt"></i><FormattedMessage id="MasterCard Settlement Daily Records" defaultMessage="Mastercard Settlement Daily Records"/>
                        </CardHeader>
                        <CardBody>
                            
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table" id="divToPDF">
                            <thead className="thead-light">
                                <tr>
                                    <th><FormattedMessage id="Date" defaultMessage="Date"/> </th>
                                    <th><FormattedMessage id="Acquirer" defaultMessage="Acquirer"/></th>
                                    <th><FormattedMessage id="Issuer" defaultMessage="Issuer"/></th>      
                                </tr>
                            </thead>

                            <tbody>

                            {  this.props.utils.schemeStandings
                                    ? [
                                        this.props.utils.schemeStandings.data.length > 0 ?  this.props.utils.schemeStandings ?  this.props.utils.schemeStandings.data.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{item['issuer-fee']}</td>
                                                <td>{item['bulk-issuer-fee']}</td>
                                          
                                            </tr>
                                        )):<tr><td colSpan="3"><p className="text-center text-danger">There are no records for visa at the moment.</p></td></tr>:<tr><td colSpan="3"><p className="text-center text-danger">There are no records for visa at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }                                 
                            </tbody>
                            </Table>
                        
                            {this.props.batchTransactionData?<nav>
                            <Pagination2
                                activePage={this.state.activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.batchTransactionData?this.props.batchTransactionData.data.totalElements:null}
                                pageRangeDisplayed={5} 
                                onChange={this.handlePageChange}
                            />
                            </nav>:'' }
                        </CardBody>
                        </Card>
                    </Col>
                  </Row> */}
                  <Row>
                  <Col>
                        <Card>
                        <CardHeader>
                            <i className="fa fa-cc-visa" style={{color:'#269AB7'}}></i><FormattedMessage id="Summary" defaultMessage="Summary"/>
                        </CardHeader>
                        <CardBody>
                            {/* {
                                this.props.accountReport ? <ReactTable data={this.props.accountReport} columns={columns}/>
                            :null} */}
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table" id="divToPDF">
                            <thead className="thead-light">
                                <tr>
                                    <th><FormattedMessage id="Batch Date" defaultMessage="Batch Date"/> </th>
                                    <th><FormattedMessage id="Validated" defaultMessage="Validated"/></th>  
                                    <th><FormattedMessage id="Posted" defaultMessage="Posted"/></th>
                                    <th><FormattedMessage id="Action" defaultMessage="Action"/></th>
                                        
                                </tr>
                            </thead>

                            <tbody>
                            {  this.props.fileSets.visaSummary
                                    ? [
                                      this.props.fileSets.visaSummary.data.content.length > 0 ?  this.props.fileSets.visaSummary ?  this.props.fileSets.visaSummary.data.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>
                                                <Moment format="ll">{item.batchDate}</Moment>
                                                </td>
                                                <td>{item.posting ? [
                                                    item.posting[currentAffiliate]?this.checkValidation(item.posting[currentAffiliate].validation):'N/A'
                                                ]:''}
                                                </td>
                                                <td>{item.posting ? [
                                                    item.posting[currentAffiliate]?this.checkPosting(item.posting[currentAffiliate].postedDate):'N/A'
                                                ]:''}
                                                </td>
                                            <td>{item.issuer && item.acquirer && item.summary ?
                                            
                                            <a href={"#/visa/settlement/vssFiles/"+item.batchDate}>All Affiliate Net Position</a> :<Badge color="danger" className=""><FormattedMessage id="Missing File(s)" defaultMessage="Missing File(s)"/></Badge>} {item.issuer && item.acquirer && item.summary ?<i className="fa fa-file text-center" fa-lg  title="View Summary" style={{color:'#262A2E',marginLeft:'10px',cursor:'pointer'}} onClick={(e) => this.showPostingFileSummary(item.batchDate)}> </i>:''}</td>
                                                
                                            </tr>
                                        )):<tr><td colSpan="3"><p className="text-center text-danger">There are no advisement records at the moment.</p></td></tr>:<tr><td colSpan="3"><p className="text-center text-danger">There are no advisement records at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }                                 
                            </tbody>
                            </Table>
                        
                            {this.props.fileSets.visaSummary?<nav>
                            <Pagination2
                                activePage={this.state.activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.fileSets.visaSummary.data?this.props.fileSets.visaSummary.data.totalElements:null}
                                pageRangeDisplayed={5} 
                                onChange={this.handlePageChange}
                            />
                            </nav>:'' }
                        </CardBody>
                        </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" md="12" className="mb-4">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                                >
                                <i className="fa fa-cc-visa" style={{ color: '#269AB7' }}></i><FormattedMessage id=" Issuer" defaultMessage=" Issuer"/> 
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                                >
                                <i className="fa fa-cc-visa" style={{ color: '#269AB7' }}></i><FormattedMessage id=" Acquirer" defaultMessage=" Acquirer"/> 
                                </NavLink>
                            </NavItem>
                            
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table" id="divToPDF">
                            <thead className="thead-light">
                                <tr>
                                    <th><FormattedMessage id="Date" defaultMessage="Date"/> </th>
                                    {/* <th><FormattedMessage id="Acquirer" defaultMessage="File ID"/></th> */}
                                    <th><FormattedMessage id="File Name" defaultMessage="File Name"/></th>
                                    <th><FormattedMessage id="Action" defaultMessage="Action"/></th>
                                </tr>
                            </thead>

                            <tbody>
                            

                            {  this.props.fileSets.visaIssuer
                                    ? [
                                        this.props.fileSets.visaIssuer.data.content.length > 0 ?  this.props.fileSets.visaIssuer ?  this.props.fileSets.visaIssuer.data.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td><Moment format="ll">{item['batchDate']}</Moment></td>
                                                {/* <td>{item['fileId']}</td> */}
                                                <td><a href={"#/visa/settlement/issuer/"+item.batchDate+"/transactions"}>{item['filename']?item['filename']:'N/A'}</a></td>
                                                <td><i className="fa fa-file text-center" fa-lg  title="View Issuer Summary" style={{color:'#262A2E',marginLeft:'10px',cursor:'pointer'}} onClick={(e) => this.showPostingIssuerFileSummary(item.batchDate)}> </i> </td>
                                                
                                          
                                            </tr>
                                        )):<tr><td colSpan="3"><p className="text-center text-danger">There are no records for visa Issuer at the moment.</p></td></tr>:<tr><td colSpan="4"><p className="text-center text-danger">There are no records for visa Issuer at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }                                 
                            </tbody>
                            </Table>
                        
                            {this.props.fileSets.visaIssuer?<nav>
                            <Pagination2
                                activePage={this.state.activePageT140}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.fileSets.visaIssuer?this.props.fileSets.visaIssuer.data.totalElements:null}
                                pageRangeDisplayed={5} 
                                onChange={this.handlePageChangeT140}
                            />
                            </nav>:'' }
                            </TabPane>
                            <TabPane tabId="2">
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table" id="divToPDF">
                            <thead className="thead-light">
                                <tr>
                                    <th><FormattedMessage id="Date" defaultMessage="Date"/> </th>
                                    {/* <th><FormattedMessage id="File ID" defaultMessage="File ID"/></th> */}
                                    <th><FormattedMessage id="File Name" defaultMessage="File Name"/></th>
                                    <th><FormattedMessage id="Action" defaultMessage="Action"/></th>       
                                </tr>
                            </thead>

                            <tbody>

                            {  this.props.fileSets.visaAcquirer
                                    ? [
                                      this.props.fileSets.visaAcquirer.data.content.length > 0 ?  this.props.fileSets.visaAcquirer.data ?  this.props.fileSets.visaAcquirer.data.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{item['batchDate']?<Moment format="ll">{item['batchDate']}</Moment>:'N/A' }</td>
                                                
                                                {/* <td>{item['fileId']}</td> */}
                                                <td><a href={"#/visa/settlement/acquirer/"+item.batchDate+"/transactions"}>{item['filename']}</a></td>
                                                <td>
                                                    <i className="fa fa-file" fa-lg  title="View Posting Summary" style={{color:'#262A2E',marginLeft:'10px',cursor:'pointer'}} onClick={(e) => this.showPostingFileAcquirer(item.batchDate)}> </i> 
                                                </td>
                                          
                                            </tr>
                                        )):<tr><td colSpan="4"><p className="text-center text-danger">There are no visa acquirer at the moment.</p></td></tr>:<tr><td colSpan="4"><p className="text-center text-danger">There are no visa acquirer at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }                                 
                            </tbody>
                            </Table>
                        
                            {this.props.fileSets.visaAcquirer?<nav>
                            <Pagination2
                                activePage={this.state.activePageT112}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.fileSets.visaAcquirer.data?this.props.fileSets.visaAcquirer.data.totalElements:null}
                                pageRangeDisplayed={5} 
                                onChange={this.handlePageChangeT112}
                            />
                            </nav>:'' }
                            </TabPane>
                        </TabContent>
                    </Col>
                  </Row>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        fileSets:state.fileSets,
        utils:state.utils
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchAllAdvisements,
        fetchVisaSummary,
        fetchVisaAcquirer,
        fetchVisaIssuer,
        fetchAllVss
        

    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(VisaSettlement);