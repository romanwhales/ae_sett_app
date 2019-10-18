/* eslint-disable import/first */
import React, { Component } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Alert,Nav,NavItem,NavLink,TabContent,TabPane} from 'reactstrap';
import Moment from 'react-moment';
import classnames from 'classnames';


import {fetchAllAdvisements,fetchAllInterAffiliateIssuer,fetchAllInterAffiliateAcquirer,fetchInterAffilliateSummary} from '../../actions/filesets'

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

class InterAffiliateSettlement extends Component{
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
        this.props.fetchAllInterAffiliateIssuer(0);
        this.props.fetchAllInterAffiliateAcquirer(0);
        this.props.fetchInterAffilliateSummary(0);
        this.props.fetchAllAdvisements();
        
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

    showIssuerFile = (date) => {
        this.props.history.push(`/interAffiliate/settlement/issuer/${date}/summary`)
    }
    showAcquirerFile = (date) => {
        this.props.history.push(`/interAffiliate/settlement/acquirer/${date}/summary`)
    }
    showPostingFile =(date) =>{
        this.props.history.push(`/interAffiliate/settlement/${date}/summary`);
    }


    showPostingFileT112 = fileId => {
        this.props.history.push(`/mastercard/settlement/t112/${fileId}/summary`);
    }


    viewIssuerTransactions = date => {
        this.props.history.push(`/visa/settlement/issuer/${date}/transactions`);
    }

    showT461Transactions = fileId => {
        
        this.props.history.push(`/mastercard/settlement/t461/${fileId}/transactions`);
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

      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab,
          });
        }
      }
    
    
    render(){
        console.log('Props here is ',this.props);
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
                            <i className="fa fa-globe"></i><FormattedMessage id="Summary" defaultMessage="Summary"/>
                        </CardHeader>
                        <CardBody>
                            {/* {
                                this.props.accountReport ? <ReactTable data={this.props.accountReport} columns={columns}/>
                            :null} */}
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table" id="divToPDF">
                            <thead className="thead-light">
                                <tr>
                                    <th style={{'whiteSpace':'nowrap'}}><FormattedMessage id="Date" defaultMessage="Date"/> </th>
                                    <th style={{'whiteSpace':'nowrap'}}><FormattedMessage id="File Name" defaultMessage="File Name"/></th> 
                                    <th style={{'whiteSpace':'nowrap'}}><FormattedMessage id="Principal Amount Owed By" defaultMessage="Principal Amount Owned By"/></th> 
                                    <th style={{'whiteSpace':'nowrap'}}><FormattedMessage id="Principal Amount Owed By" defaultMessage="Principal Amount Owed To"/></th> 
                                    <th style={{'whiteSpace':'nowrap'}}><FormattedMessage id="Surcharge Fee Owed By" defaultMessage="Surcharge Fee Owed By"/></th> 
                                    <th style={{'whiteSpace':'nowrap'}}><FormattedMessage id="Surcharge Fee Owed To" defaultMessage="Surcharge Fee Owed To"/></th> 
                                    <th style={{'whiteSpace':'nowrap'}}><FormattedMessage id="Net Amount" defaultMessage="Net Amount"/></th>
                                    <th style={{'whiteSpace':'nowrap'}}><FormattedMessage id="Action" defaultMessage="Action"/></th>

                                         
                                </tr>
                            </thead>

                            <tbody>

                            {  this.props.fileSets.interAffiliateSummary
                                    ? [
                                      this.props.fileSets.interAffiliateSummary.data.content.length > 0 ?  this.props.fileSets.interAffiliateSummary.data ?  this.props.fileSets.interAffiliateSummary.data.content.map((item,index) => (
                                            <tr key={index+1}>
                                            
                                                <td style={{'whiteSpace':'nowrap'}}><a href={"#/interAffiliate/settlement/summary/"+item.interAffSummary.batchDate+"/transactions"}><Moment format="ll">{item.interAffSummary.batchDate}</Moment></a></td>
                                                <td>
                                                
                                                    {item.interAffSummary.filename}
                                                </td>
                                                <td>{item.principal_amount_owed_by}</td>
                                                <td>{item.principal_amount_owed_to}</td>
                                                <td>{item.interch_sur_fee_owed_by}</td>
                                                <td>{item.interch_sur_fee_owed_to}</td>
                                                <td>
                                                    {item.net_position}
                                                </td>
                                                
                                                <td>
                                                    <i className="fa  fa-file" fa-lg  title="View Posting File" style={{color:'#262A2E',marginLeft:'10px',cursor:'pointer'}} onClick={(e) => this.showPostingFile(item.interAffSummary.batchDate)}> </i> 
                                                </td>
                                          
                                            </tr>
                                        )):<tr><td colSpan="8"><p className="text-center text-danger">There are no advisement records at the moment.</p></td></tr>:<tr><td colSpan="8"><p className="text-center text-danger">There are no advisement records at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }                                 
                            </tbody>
                            </Table>
                        
                             {this.props.fileSets.interAffiliateSummary?<nav>
                            <Pagination2
                                activePage={this.state.activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.fileSets.interAffiliateSummary.data?this.props.fileSets.interAffiliateSummary.data.totalElements:null}
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
                                <i className="fa fa-globe" style={{ color: '#20A8D8' }}></i><FormattedMessage id=" Issuer" defaultMessage=" Issuer"/> 
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                                >
                                <i className="fa fa-globe" style={{ color: '#20A8D8' }}></i><FormattedMessage id=" Acquirer" defaultMessage=" Acquirer"/> 
                                </NavLink>
                            </NavItem>
                            
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table" id="divToPDF">
                            <thead className="thead-light">
                                <tr>
                                    <th><FormattedMessage id="Date" defaultMessage="Date"/> </th>
                                    
                                    <th><FormattedMessage id="File Name" defaultMessage="File Name"/></th>
                                    {/* <th><FormattedMessage id="Action" defaultMessage="Action"/></th> */}
                                </tr>
                            </thead>

                            <tbody>

                            {  this.props.fileSets.interAffiliateiIssuers
                                    ? [
                                        this.props.fileSets.interAffiliateiIssuers.data.content.length > 0 ?  this.props.fileSets.interAffiliateiIssuers ?  this.props.fileSets.interAffiliateiIssuers.data.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td><Moment format="ll">{item['settlementDate']}</Moment></td>
                                                
                                                <td><a href={"#/interAffiliate/settlement/issuer/"+item.batchDate+"/transactions"}>{item['filename']?item['filename']:'N/A'}</a></td>
                                                {/* <td>
                                                    <i className="fa  fa-file" fa-lg  title="View Posting File" style={{color:'#262A2E',marginLeft:'10px',cursor:'pointer'}} onClick={(e) => this.showIssuerFile(item.settlementDate)}> </i> 
                                                </td> */}
                                                
                                          
                                            </tr>
                                        )):<tr><td colSpan="3"><p className="text-center text-danger">There are no records for interAffilaite Issuer at the moment.</p></td></tr>:<tr><td colSpan="4"><p className="text-center text-danger">There are no records for interAffilaite Issuer at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }                                 
                            </tbody>
                            </Table>
                        
                            {this.props.fileSets.interAffiliateiIssuers?<nav>
                            <Pagination2
                                activePage={this.state.activePageT140}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.fileSets.interAffiliateiIssuers?this.props.fileSets.interAffiliateiIssuers.data.totalElements:null}
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
                                    
                                    <th><FormattedMessage id="File Name" defaultMessage="File Name"/></th>
                                    {/* <th><FormattedMessage id="Action" defaultMessage="Action"/></th>        */}
                                </tr>
                            </thead>

                            <tbody>

                            {  this.props.fileSets.interAffiliateAcquirer
                                    ? [
                                      this.props.fileSets.interAffiliateAcquirer.data.content.length > 0 ?  this.props.fileSets.interAffiliateAcquirer.data ?  this.props.fileSets.interAffiliateAcquirer.data.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{item['settlementDate']?<Moment format="ll">{item['settlementDate']}</Moment>:'N/A' }</td>
                                                
                                                
                                                <td><a href={"#/interAffiliate/settlement/acquirer/"+item.batchDate+"/transactions"}>{item['filename']}</a></td>
                                                {/* <td>
                                                    <i className="fa  fa-file" fa-lg  title="View Posting File" style={{color:'#262A2E',marginLeft:'10px',cursor:'pointer'}} onClick={(e) => this.showAcquirerFile(item.settlementDate)}> </i> 
                                                </td> */}
                                          
                                            </tr>
                                        )):<tr><td colSpan="4"><p className="text-center text-danger">There are no acquirer files  at the moment.</p></td></tr>:<tr><td colSpan="4"><p className="text-center text-danger">There are no t112s at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }                                 
                            </tbody>
                            </Table>
                        
                            {this.props.fileSets.interAffiliateAcquirer?<nav>
                            <Pagination2
                                activePage={this.state.activePageT112}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.fileSets.interAffiliateAcquirer.data?this.props.fileSets.interAffiliateAcquirer.data.totalElements:null}
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
        fetchInterAffilliateSummary,
        fetchAllInterAffiliateIssuer,
        fetchAllInterAffiliateAcquirer
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(InterAffiliateSettlement);