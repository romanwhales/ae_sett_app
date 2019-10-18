/* eslint-disable import/first */
import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Alert} from 'reactstrap';
import {fetchBatchesSummary} from '../../actions/batches';
import {fetchAccountsReport,searchAccountsReport,downloadPdf,downloadCsv} from '../../actions/reports';
import {fetchDailyProcessorsSummary} from '../../actions/stats';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";

import '../Batches/datepicker.css';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import jsPDF from 'jspdf';
import {FormattedMessage} from 'react-intl';
require('jspdf-autotable');
import AccountSearchForm from './accountSearchForm';



import 'react-table/react-table.css'




import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';
import '../Transactions/Transactions.css';





// const switchData = [{name:'Interswitch',amount:100023400,adviceAmount:130023400,posted:false},{name:'Unified Payments',amount:301267423,adviceAmount:401267423,posted:false},{name:'Etranzact',amount:122234556,adviceAmount:145234556,posted:false},{name:'Mastercard',amount:32222555,adviceAmount:42222555,posted:false},{name:'Visa',amount:86777445,adviceAmount:44777445,posted:false},{name:'Nibss',amount:32222555,adviceAmount:32552555,posted:false}]

class AccountReports extends Component{
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
         this.props.fetchAccountsReport(date,date);
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
        if(values.accNameOrNo){
            this.setState({startDate:startDate,endDate:endDate,accNameOrNo:values.accNameOrNo,accountReportErrorAlertVisible:true}); 
        }else{
            this.setState({startDate:startDate,endDate:endDate,accountReportErrorAlertVisible:true});
        }
        
        this.props.searchAccountsReport(startDate,endDate,values.accNameOrNo);
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
        // console.log('Props here is ',this.props);
        const columns=[
            {
                Header:'Account Name',
                accessor:'accountName'
            },
            {
                Header:'Account Number',
                accessor:'accountNo',
                Cell: props => <span className='number'>{props.value}</span>
            },{
                Header:'Processor',
                accessor:'processor'
            },
            {
                Header:'Product',
                accessor:'product'
            },
            {
                Header:'Amount',
                accessor:'amount',
                Cell: props => <span className='number'>{props.value.toLocaleString()}</span> // Custom cell components!
            },{
                Header:'Average',
                accessor:'average',
                Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            },{
                Header:'Count',
                accessor:'count',
                Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            }]
        return(
            <div className="animated fadeIn">
                <Row style={{'marginBottom':'20px'}}>
                    <Col md={{ size: 4}}>
                        {/* {this.props.accountReport?<CSVLink data={this.props.accountReport} className="fa fa-file-excel-o btn btn-success " filename={"account-report.csv"}>Download CSV</CSVLink>:null} &nbsp;&nbsp;&nbsp; */}
                        {/* <Button type="submit" className="fa fa-file-pdf-o btn btn-danger" onClick={this.downloadPDF} color="primary" > Download PDF</Button> */}
                        {this.state.startDate && this.state.accNameOrNo? <a className="btn btn-success" onClick={e=>this.downloadAccountCSV(this.state.startDate,this.state.endDate,this.state.accNameOrNo)} href="javascript:;" download="accountReport.csv" target="_blank" rel="noopener noreferrer"><FormattedMessage id="Download CSV" defaultMessage="Download CSV"/></a>:
                        <a className="btn btn-success" href="javascript:;" download="accountReport.csv" target="_blank" rel="noopener noreferrer" onClick={e=>this.downloadAccountCSV(this.state.startDate,this.state.endDate)}><FormattedMessage id="Download CSV" defaultMessage="Download CSV"/></a>}&nbsp;&nbsp;&nbsp;
                        {this.state.startDate && this.state.accNameOrNo? <a className="btn btn-danger" href="javascript:;" download="accountReport.pdf" onClick={e=>this.downloadAccountPDF(this.state.startDate,this.state.endDate,this.state.accNameOrNo)}><FormattedMessage id="Download PDF" defaultMessage="Download PDF"/></a>:
                        <a className="btn btn-danger" download="accountReport.pdf" href="javascript:;" onClick={e=>this.downloadAccountPDF(this.state.startDate,this.state.endDate)}><FormattedMessage id="Download PDF" defaultMessage="Download PDF"/> </a>}
                        
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <AccountSearchForm {...this.props} {...this.state} onSubmit = {this.onSubmit} onFocusChange={this.onFocusChange}/>
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
                            <i className="fa fa-credit-card-alt"></i><FormattedMessage id="Account Reports" defaultMessage="Account Reports"/>
                        </CardHeader>
                        <CardBody>
                            {/* {
                                this.props.accountReport ? <ReactTable data={this.props.accountReport} columns={columns}/>
                            :null} */}
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table" id="divToPDF">
                            <thead className="thead-light">
                                <tr>
                                    <th><FormattedMessage id="Account Name" defaultMessage="Account Name"/> </th>
                                    <th><FormattedMessage id="Account Number" defaultMessage="Account Number"/></th>
                                    <th><FormattedMessage id="Processor" defaultMessage="Processor"/></th>
                                    <th><FormattedMessage id="Subgroup" defaultMessage="Subgroup"/></th>
                                    <th><FormattedMessage id="Product" defaultMessage="Product"/></th>
                                    <th><FormattedMessage id="Amount" defaultMessage="Amount"/></th>
                                    <th><FormattedMessage id="Average" defaultMessage="Average"/></th>
                                    <th><FormattedMessage id="Count" defaultMessage="Count"/></th>
                                </tr>
                            </thead>

                            <tbody>

                                {  this.props.accountReport
                                    ? [
                                        this.props.accountReport.length > 0 ? this.props.accountReport ? this.props.accountReport.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{item.accountName}</td>
                                                <td>{item.accountNo}</td>
                                                <td >{item.processor}</td>
                                                <td>{item.subgroup}</td>
                                                <td>{item.product}</td>
                                                <td> 
                                                   {item.amount.toLocaleString()}
                                                </td>
                                                <td> 
                                                   {item.average.toLocaleString()}
                                                </td>
                                                <td>{item.count.toLocaleString()}</td>
                                            </tr>
                                        )):<tr><td colSpan="8"><p className="text-center text-danger">There are no reports for today.</p></td></tr>:<tr><td colSpan="8"><p className="text-center text-danger">There are no reports for today.</p></td></tr>
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
                    </Row>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('State is ',state)
    return {
        batchesSummary:state.batches.batchSummary,
        dailySummary:state.stats.dailyProcessorSummary,
        accountReport:state.reports.accountReports,
        accountReportError:state.reports.accountReportsErr
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchBatchesSummary,
        fetchDailyProcessorsSummary,
        fetchAccountsReport,
        searchAccountsReport,
        downloadPdf,
        downloadCsv
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(AccountReports);