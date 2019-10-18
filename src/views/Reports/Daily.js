/* eslint-disable import/first */
import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col,  Row, Table,  } from 'reactstrap';
import {fetchBatchesSummary} from '../../actions/batches';
import {fetchChannelReport,searchChannelReport,fetchDailyProcessorReport,downloadDailyPdf,downloadDailyCsv} from '../../actions/reports';
import {fetchDailyProcessorsSummary} from '../../actions/stats';
import {getProcessor} from '../../actions/processor';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";

import '../Batches/datepicker.css';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import jsPDF from 'jspdf';
require('jspdf-autotable');
import {FormattedMessage} from 'react-intl';


import DailySearchForm from './DailySearchForm';



import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';
import '../Transactions/Transactions.css';







// const switchData = [{name:'Interswitch',amount:100023400,adviceAmount:130023400,posted:false},{name:'Unified Payments',amount:301267423,adviceAmount:401267423,posted:false},{name:'Etranzact',amount:122234556,adviceAmount:145234556,posted:false},{name:'Mastercard',amount:32222555,adviceAmount:42222555,posted:false},{name:'Visa',amount:86777445,adviceAmount:44777445,posted:false},{name:'Nibss',amount:32222555,adviceAmount:32552555,posted:false}]

class DailyReports extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            activePage:1,
            focused:false,
            date: moment(),
            date2:'',
            processorId:'',
            switchData:[{name:'Interswitch',amount:100023400,adviceAmount:130023400,posted:false},{name:'Unified Payments',amount:301267423,adviceAmount:401267423,posted:false},{name:'Etranzact',amount:122234556,adviceAmount:145234556,posted:false},{name:'Mastercard',amount:32222555,adviceAmount:42222555,posted:false},{name:'Visa',amount:86777445,adviceAmount:44777445,posted:false},{name:'Nibss',amount:32222555,adviceAmount:32552555,posted:false}]
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitDate = this.submitDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount(){
        this.props.getProcessor();
        
        let date = moment(new Date()).format();
        if(date.includes("T")){
            let extract = date.split("T");
            date = extract[0];
         }
         this.props.fetchDailyProcessorReport(date,null);
         this.setState({date2:date});
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
      onSubmit(values){
        
        //   console.log('Submit State',moment(this.state.date).format().split("T")[0]);
          var date = moment(this.state.date).format().split("T")[0];
        //   debugger;
      if(values.hasOwnProperty('processorId')){
         this.setState({processorId:values.processorId.value,date2:date});
          this.props.fetchDailyProcessorReport(date,values.processorId.value);
          
      }else{
        // this.setState({date:date});
        // this.setState({date:date});
        this.props.fetchDailyProcessorReport(date,null);
        // debugger;
        
      }
    }
    onFocusChange=(focused) =>{
        this.setState({ focused:!this.state.focused });
    }
    onDateChange = (values) =>{

        this.setState({date:values,date2:moment(values).format().split("T")[0]});
        console.log('State is ',this.state);
        console.log(values);
        // console.log('Date here is ',moment(values).format())
    }

    downloadDailyPDF =(date,processorId) =>{
      
      this.props.downloadDailyPdf(date,processorId);
      
    }

    downloadDailyCSV = (date,processorId) => {
      this.props.downloadDailyCsv(date,processorId);
    }
    
    render(){
        // console.log('Props here is ',this.props);
        return(
            <div className="animated fadeIn">
                <Row style={{'marginBottom':'20px'}}>
                    <Col md={{ size: 4}}>
                        {this.state.date2  && this.state.processorId ? <a className="btn btn-success" href="javascript:;" onClick={e=>this.downloadDailyCSV(this.state.date2,this.state.processorId)}><FormattedMessage id="Download CSV" defaultMessage="Download CSV"/></a>:null}
                        {this.state.date2 != null&& !this.state.processorId ? <a className="btn btn-success" href="javascript:;" download="dailyReport.csv" target="_blank" rel="noopener noreferrer" onClick={e=>this.downloadDailyCSV(this.state.date2,this.state.processorId)}><FormattedMessage id="Download CSV" defaultMessage="Download CSV"/></a>:null}
                        {!this.state.date2 && this.state.processorId ? <a className="btn btn-success" href="javascript:;" onClick={e=>this.downloadDailyCSV(null,this.state.processorId)} download="dailyReport.pdf" target="_blank" rel="noopener noreferrer"><FormattedMessage id="Download CSV" defaultMessage="Download CSV"/></a>:null} &nbsp;&nbsp;&nbsp;


                        {this.state.date2  && this.state.processorId ? <a className="btn btn-danger" href="javascript:;" download="dailyReport.pdf" target="_blank" rel="noopener noreferrer" onClick={e=>this.downloadDailyPDF(this.state.date2,this.state.processorId)}><FormattedMessage id="Download PDF" defaultMessage="Download PDF"/></a>:null}
                        {this.state.date2 != null && !this.state.processorId ? <a className="btn btn-danger" href="javascript:;" onClick={e=>this.downloadDailyPDF(this.state.date2,null)} download="dailyReport.pdf" target="_blank" rel="noopener noreferrer"><FormattedMessage id="Download PDF" defaultMessage="Download PDF"/></a>:null}
                        {!this.state.date2 && this.state.processorId ? <a className="btn btn-danger" href="javascript:;" download="dailyReport.pdf" target="_blank" rel="noopener noreferrer" onClick={e=>this.downloadDailyPDF(null,this.state.processor)}><FormattedMessage id="Download PDF" defaultMessage="Download PDF"/></a>:null}
                        
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <DailySearchForm {...this.props} {...this.state} onSubmit={this.onSubmit} onDateChange ={this.onDateChange} onFocusChange={this.onFocusChange} focused={this.state.focused}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                        <CardHeader>
                            <i className="fa fa-credit-card-alt"></i> <FormattedMessage id="Daily Reports" defaultMessage="Daily Reports"/>
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table" id="divToPDF">
                            <thead className="thead-light">
                                <tr>
                                    <th><FormattedMessage id="Processor" defaultMessage="Processor"/></th>
                                    <th><FormattedMessage id="Amount" defaultMessage="Amount"/></th>
                                    <th><FormattedMessage id="Count" defaultMessage="Count"/></th>
                                </tr>
                            </thead>
                            <tbody>

                                {  this.props.dailyReport
                                    ? [
                                        this.props.dailyReport.length > 0 ? this.props.dailyReport ? this.props.dailyReport.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{item.processor}</td>
                                                <td> 
                                                   {item.amount?item.amount.toLocaleString():'N/A'}
                                                </td>
                                                <td>{item.count?item.count.toLocaleString():'N/A'}</td>
                                            </tr>
                                        )):<tr key={1}><td colSpan="3"><p className="text-center text-danger">There is no summary for the specified date.</p></td ></tr>:<tr key={1}><td colSpan="5"><p className="text-center text-danger">There is no summary for the specified date.</p></td></tr>
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
        dailyReport:state.reports.dailyReport,
        processorList:state.processors.processors,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchBatchesSummary,
        fetchDailyProcessorsSummary,
        fetchChannelReport,
        searchChannelReport,
        getProcessor,
        fetchDailyProcessorReport,
        downloadDailyPdf,
        downloadDailyCsv
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(DailyReports);