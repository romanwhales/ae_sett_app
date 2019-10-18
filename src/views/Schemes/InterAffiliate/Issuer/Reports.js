/* eslint-disable import/first */
import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Alert,Badge} from 'reactstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";


import jsPDF from 'jspdf';
import {FormattedMessage} from 'react-intl';
require('jspdf-autotable');
// import AccountSearchForm from './accountSearchForm';
import T112SearchForm from './issuerSearchForm';

import {fetchInterAffiliateIssuerPostingReport,fetchInterAffiliatePostingReport} from '../../../../actions/reports';



import 'react-table/react-table.css';
import '../css/reports.css';





import moment from 'moment';
import Moment from 'react-moment';
import { end } from 'worker-farm';
 
// import 'react-datepicker/dist/react-datepicker.css';
// import '../Transactions/Transactions.css';





// const switchData = [{name:'Interswitch',amount:100023400,adviceAmount:130023400,posted:false},{name:'Unified Payments',amount:301267423,adviceAmount:401267423,posted:false},{name:'Etranzact',amount:122234556,adviceAmount:145234556,posted:false},{name:'Mastercard',amount:32222555,adviceAmount:42222555,posted:false},{name:'Visa',amount:86777445,adviceAmount:44777445,posted:false},{name:'Nibss',amount:32222555,adviceAmount:32552555,posted:false}]

class InterAffiliateIssuerReport extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            activePage:1,
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

    componentWillMount(){
    //    this.props.fetchBatchesSummary('2018-04-12');
        
        let date = moment(new Date()).format();
        if(date.includes("T")){
            let extract = date.split("T");
            date = extract[0];
         }
        //  console.log('Date is ',date);
         this.setState({startDate:date,endDate:date});
        this.props.fetchInterAffiliatePostingReport('2018-01-01','2019-12-12',0,'ALL','ALL');
    }
    handlePageChange = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchBatchesTransactions(this.props.match.params.id,pageNumberParam);
        this.setState({activePage: pageNumber});
        // this.props.fetchOffices(pageNumber);
        // this.setState({activePage: pageNumber});
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

        this.props.fetchInterAffiliatePostingReport(startDate,endDate,0,values.posting.value,values.validation.value);
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
    
    
    render(){
        console.log('Props here is ',this.props);
        let currentAffiliate = localStorage.getItem('selectedAfilliate');
        console.log('Current Affiliate is ',currentAffiliate);
        return(
            <div className="animated fadeIn">
                {/* <Row style={{'marginBottom':'20px'}}>
                    <Col md={{ size: 4}}>
                        {this.state.startDate && this.state.accNameOrNo? <a className="btn btn-success" onClick={e=>this.downloadAccountCSV(this.state.startDate,this.state.endDate,this.state.accNameOrNo)} href="javascript:;" download="accountReport.csv" target="_blank" rel="noopener noreferrer"><FormattedMessage id="Download CSV" defaultMessage="Download CSV"/></a>:
                        <a className="btn btn-success" href="javascript:;" download="accountReport.csv" target="_blank" rel="noopener noreferrer" onClick={e=>this.downloadAccountCSV(this.state.startDate,this.state.endDate)}><FormattedMessage id="Download CSV" defaultMessage="Download CSV"/></a>}&nbsp;&nbsp;&nbsp;
                        {this.state.startDate && this.state.accNameOrNo? <a className="btn btn-danger" href="javascript:;" download="accountReport.pdf" onClick={e=>this.downloadAccountPDF(this.state.startDate,this.state.endDate,this.state.accNameOrNo)}><FormattedMessage id="Download PDF" defaultMessage="Download PDF"/></a>:
                        <a className="btn btn-danger" download="accountReport.pdf" href="javascript:;" onClick={e=>this.downloadAccountPDF(this.state.startDate,this.state.endDate)}><FormattedMessage id="Download PDF" defaultMessage="Download PDF"/> </a>}
                        
                    </Col>
                </Row> */}
                <Row>
                    <Col>
                    
                        <T112SearchForm {...this.props} {...this.state} onSubmit = {this.onSubmit} onFocusChange={this.onFocusChange}/>
                    </Col>
                    
                </Row>
                <Row>
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
                            <i className="fa fa-globe"></i><FormattedMessage id="InterAffiliate Posting Reports" defaultMessage="InterAffiliate Posting Reports"/>
                        </CardHeader>
                        <CardBody>
                            {/* {
                                this.props.accountReport ? <ReactTable data={this.props.accountReport} columns={columns}/>
                            :null} */}
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table" id="divToPDF">
                            <thead className="thead-light">
                                <tr>
                                    <th><FormattedMessage id="File Name" defaultMessage="File Name"/> </th>
                                    <th><FormattedMessage id="Batch Date" defaultMessage="Batch Date"/></th>
                                    <th><FormattedMessage id="Acquirer Amount" defaultMessage="Acquirer Amount"/></th>
                                    <th><FormattedMessage id="Acquirer Fee" defaultMessage="Acquirer Fee"/></th>
                                    <th><FormattedMessage id="Issuer Amount" defaultMessage="Issuer Amount"/></th>
                                    <th><FormattedMessage id="Issuer Fee" defaultMessage="Issuer Fee"/></th>
                                    <th><FormattedMessage id="Summary Acquirer Amount" defaultMessage="Summary Acquirer Amount"/></th>
                                    <th><FormattedMessage id="Summary Acquirer Fee" defaultMessage="Summary Acquirer Fee"/></th>
                                    <th><FormattedMessage id="Summary Issuer Amount" defaultMessage="Summary Issuer Amount"/></th>
                                    <th><FormattedMessage id="Summary Issuer Fee" defaultMessage="Summary Issuer Fee"/></th>
                                    <th><FormattedMessage id="Validation Status" defaultMessage="Validation Status"/></th>
                                    <th><FormattedMessage id="Posted Status" defaultMessage="Posted Status"/></th>
                                </tr>
                            </thead>

                            <tbody>

                            {  this.props.reports.interAffiliatePostingReport
                                    ? [
                                        this.props.reports.interAffiliatePostingReport.content.length > 0 ?this.props.reports.interAffiliatePostingReport ? this.props.reports.interAffiliatePostingReport.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{item.filename}</td>
                                                <td>{item['batchDate']? <Moment format="ll">{item['batchDate']}</Moment>:'N/A'}</td>
                                                
                                                <td >{item.posting[currentAffiliate].acquirerAmt?item.posting[currentAffiliate].acquirerAmt:'N/A'}</td>
                                                <td >{item.posting[currentAffiliate].acquirerFee?item.posting[currentAffiliate].acquirerFee:'N/A'}</td>
                                                <td >{item.posting[currentAffiliate].issuerAmt?item.posting[currentAffiliate].issuerAmt.toLocaleString():'N/A'}</td>
                                                <td >{item.posting[currentAffiliate].issuerFee?item.posting[currentAffiliate].issuerFee.toLocaleString():'N/A'}</td>
                                                <td >{item.posting[currentAffiliate].summaryAcquirerAmt?item.posting[currentAffiliate].summaryAcquirerAmt:'N/A'}</td>
                                                <td >{item.posting[currentAffiliate].summaryAcquirerFee?item.posting[currentAffiliate].summaryAcquirerFee:'N/A'}</td>
                                                <td >{item.posting[currentAffiliate].summaryIssuerAmt?item.posting[currentAffiliate].summaryIssuerAmt:'N/A'}</td>
                                                <td >{item.posting[currentAffiliate].summaryIssuerFee?item.posting[currentAffiliate].summaryIssuerFee:'N/A'}</td>
                                                <td >{item.posting[currentAffiliate].postedDate?<Badge pill color="success">Posted</Badge>:<Badge pill color="danger">Not Posted</Badge>}</td>
                                                <td>{item.posting[currentAffiliate].validation == 'SUMMARY_MISMATCH'?<Badge pill color="danger">Summary Mismatch</Badge>:''}
                                                {item.posting[currentAffiliate].validation == 'SUCCESS'? <Badge pill color="success">Matched</Badge>:''} {item.posting[currentAffiliate].validation == 'NO_SUMMARY'? <Badge pill color="warning">No Summary</Badge>:''}
                                                
                                                </td>
                                            </tr>
                                        )):<tr><td colSpan="12"><p className="text-center text-danger">There are no reports for selected date range .</p></td></tr>:<tr><td colSpan="12"><p className="text-center text-danger">There are no reports for date range</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                } 
                            </tbody>
                            </Table>
                        
                            {this.props.reports.t112PostingReport?<nav>
                            <Pagination2
                                activePage={this.state.activePage}
                                itemsCountPerPage={20}
                                totalItemsCount={this.props.reports.t112PostingReport?this.props.reports.t112PostingReport.meta.totalElements:null}
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


const mapStateToProps = (state) => {
    console.log('State is ',state)
    return {
        reports:state.reports,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchInterAffiliateIssuerPostingReport,
        fetchInterAffiliatePostingReport
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(InterAffiliateIssuerReport);