/* eslint-disable import/first */
import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col,Row, Table, Button, } from 'reactstrap';
import {fetchBatchesSummary} from '../../actions/batches';
import {fetchDailyProcessorsSummary} from '../../actions/stats';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";

import '../Batches/datepicker.css';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { CSVLink, CSVDownload } from "react-csv";
import jsPDF from 'jspdf';
require('jspdf-autotable');


import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';
import './Transactions.css';


const bar = {
  labels: ['Interswitch', 'Unified Payments', 'Etranzact', 'Mastercard', '	Visa', 'Nibss'],
  datasets: [
    {
      label: 'Switches Quota',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [100023400, 301267423, 122234556, 32222555, 86777445, 32222555],
    },
  ],
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

const pie = {
  labels: [
    'Interswitch',
    'Unified Payments',
    'Etranzact',
    'Mastercard',
    'Visa',
    'Nibss',
  ],
  datasets: [
    {
      data: [100023400, 301267423, 122234556, 32222555, 86777445, 32222555],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#8AC25D',
        '#054684',
        '#4AC0C0'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#8AC25D',
        '#054684',
        '#4AC0C0',
      ],
    }],
};

// const switchData = [{name:'Interswitch',amount:100023400,adviceAmount:130023400,posted:false},{name:'Unified Payments',amount:301267423,adviceAmount:401267423,posted:false},{name:'Etranzact',amount:122234556,adviceAmount:145234556,posted:false},{name:'Mastercard',amount:32222555,adviceAmount:42222555,posted:false},{name:'Visa',amount:86777445,adviceAmount:44777445,posted:false},{name:'Nibss',amount:32222555,adviceAmount:32552555,posted:false}]

class Transactions extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            activePage:1,
            date: new Date(),
            startDate: moment(),
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
       this.props.fetchDailyProcessorsSummary('2018-11-02');
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
    
    render(){
        console.log('Props here is ',this.props,this.state);
        return(
            <div className="animated fadeIn">
                <Row style={{'marginBottom':'20px'}}>
                    <Col md={{ size: 4}}>
                        <CSVLink data={this.state.switchData} className="fa fa-file-excel-o btn btn-success " filename={"switch-advice.csv"}>Download CSV</CSVLink> &nbsp;&nbsp;&nbsp;
                        <Button type="submit" className="fa fa-file-pdf-o btn btn-danger" onClick={this.downloadPDF} color="primary" > Download PDF</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                        <CardHeader>
                            <i className="fa fa-credit-card-alt"></i>Daily Switch Advice
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table" id="divToPDF">
                            <thead className="thead-light">
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>Switch</th>
                                    <th>Amount</th>
                                    <th>Advice Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {/* {  this.props.dailySummary
                                    ? [
                                        this.props.dailySummary.data.length > 0 ? this.props.dailySummary.data ? this.props.dailySummary.data.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{index+1}</td>
                                               
                                                <td ><a href={"#/processors/"+item.id+"/subgroups"}>{item.processor}</a></td>
                                                <td> 
                                                   {item.amount.toLocaleString()}
                                                </td>
                                                <td>N/A</td>
                                                <td>
                                                {item.posted? <Badge className="mr-1" href="#" color="success">Posted</Badge>: <Button color="primary"  size="sm" onClick={(e) => this.postTransactions(index)}>Post</Button> }
                                                </td>
                                            </tr>
                                        )):<tr><td colSpan="3"><p className="text-center text-danger">There is no summary for the specified date.</p></td></tr>:<tr><td colSpan="5"><p className="text-center text-danger">There is no summary for the specified date.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                } */}


                                {this.state.switchData?this.state.switchData.map((item,index) => (
                                    <tr key={index+1}>
                                        <td>{index+1}</td>
                                        <td>{item.name}</td>
                                        <td> 
                                            {item.amount.toLocaleString()}
                                        </td>
                                        <td>
                                            {item.adviceAmount.toLocaleString()}
                                        </td>
                                        <td>
                                        {item.posted? <Badge className="mr-1" href="#" color="success">Posted</Badge>: <Button color="primary"  size="sm" onClick={(e) => this.postTransactions(index)}>Post</Button> }
                                        </td>
                                    </tr>
                                )):null}
                                
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
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchBatchesSummary,
        fetchDailyProcessorsSummary
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Transactions);