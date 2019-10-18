/* eslint-disable import/first */
import React, { Component } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Alert,Nav,NavItem,NavLink,TabContent,TabPane} from 'reactstrap';
import Moment from 'react-moment';
import {fetchAdvisementDetail} from '../../../actions/filesets';





import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";




import jsPDF from 'jspdf';
import {FormattedMessage,} from 'react-intl';
require('jspdf-autotable');



import ReactTable from "react-table";
import 'react-table/react-table.css'



import DatePicker from 'react-datepicker';
import moment from 'moment';
 




class MastercardAdvisementDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            activePage:1,
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
            activeTab: '1',
            activeTab2:'3',
            switchData:[{name:'Interswitch',amount:100023400,adviceAmount:130023400,posted:false},{name:'Unified Payments',amount:301267423,adviceAmount:401267423,posted:false},{name:'Etranzact',amount:122234556,adviceAmount:145234556,posted:false},{name:'Mastercard',amount:32222555,adviceAmount:42222555,posted:false},{name:'Visa',amount:86777445,adviceAmount:44777445,posted:false},{name:'Nibss',amount:32222555,adviceAmount:32552555,posted:false}]
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitDate = this.submitDate.bind(this);
    }

    componentDidMount(){
    this.props.fetchAdvisementDetail(this.props.match.params.date);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab,
          });
        }
      }
      toggle2(tab) {
        if (this.state.activeTab2 !== tab) {
          this.setState({
            activeTab2: tab,
          });
        }
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


    viewT140Transactions = fileId => {
        this.props.history.push(`/mastercard/settlement/t140/${fileId}/transactions`);
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
    
    
    render(){
        console.log('Props here is ',this.props);
        return(
            <div className="animated fadeIn">
                
                
                
                <Row>
                  <Col>
                        <Card>
                        <CardHeader>
                            <i className="fa fa-credit-card-alt"></i><FormattedMessage id="TRANSFER AGENT ADVISEMENT" defaultMessage="TRANSFER AGENT ADVISEMENT"/>
                        </CardHeader>
                        <CardBody>
                        {this.props.fileSets.advisementDetail
                                    ? [
                                        this.props.fileSets.advisementDetail.data ?  <React.Fragment>
                                    <Row>
                                        <Col md="6">
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">REPORT: </dt>
                                                    <dd className="col-sm-9">BSADV308-AA</dd>
                                                </dl>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">DATE: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.bodyDate}</dd>
                                                </dl>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">DELIVERY MEDIA: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.deliveryMedia}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">DESTINATION: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.destination}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">TO TRANSFER AGENT: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.toTransferAgent}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">TRANSFER AGENT BANK: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.transferAgentBank}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">CONTACT NAME: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.contactName}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">SETTLEMENT SERVICE NAME: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.settlementServiceName}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">SETTLEMENT SERVICE ID: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.settlementServiceId}</dd>
                                                </dl>
                                            </div>
                                            {/* <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">SETTLEMENT SERVICE ID: </dt>
                                                    <dd className="col-sm-9">US00000001</dd>
                                                </dl>
                                            </div> */}
                                            {/* <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">SETTLEMENT SERVICE TYPE: </dt>
                                                    <dd className="col-sm-9">US00000001</dd>
                                                </dl>
                                            </div> */}
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">SCHEDULED CUTOFF TIME: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.scheduledCutoffTime}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">SCHEDULED SETTLEMENT CYCLE: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.scheduledSettlementCycle}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">SETTLEMENT BANK NAME: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.settlementBankName}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">SETTLEMENT DATE: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.settlementDate}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">SETTLEMENT ACCOUNT NBR: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.settlementAccountNbr}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">SETTLEMENT ROUTING NBR: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.settlementRoutingNbr}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">AGENT ACCOUNT NUMBER: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.agentAccountNumber}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">BANK ROUTING NUMBER: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.bankRoutingNumber}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">CURRENCY NAME:  </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.currencyName}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">CURRENCY CODE: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.currencyCode}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">COUNTRY CODE: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.countryCode}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">VALUE DATE: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.valueDate}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">MEMBER NAME: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.memberName}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">INTERNAL ID: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.internalId}</dd>
                                                </dl>
                                            </div>
                                            <Table hover bordered striped responsive size="sm">
                                                <thead>
                                                    <tr>
                                                        
                                                        <th>
                                                            <FormattedMessage id="No" defaultMessage="No"/>
                                                        </th>
                                                        <th>
                                                            <FormattedMessage id="Recon Date" defaultMessage="Recon Date"/>
                                                        </th>
                                                        <th>
                                                        <FormattedMessage id="Input Source" defaultMessage="Input Source"/>
                                                        </th> 
                                                        <th><FormattedMessage id="File ID" defaultMessage="File ID"/></th>
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.props.fileSets.advisementDetail.data.fileIDS.map((item,index) => (<tr>
                                                        <td>{index+1}</td>
                                                        <td>{item.reconDate}</td>
                                                        <td>{item.inputSource}</td>
                                                        <td>{item.fileId}</td>
                                                    </tr>))
                                                }
                                                </tbody>
                                            </Table>
                                            <Table hover bordered striped responsive size="sm">
                                                <thead>
                                                    <tr>
                                                        
                                                        <th>
                                                            <FormattedMessage id="No" defaultMessage="No"/>
                                                        </th>
                                                        <th>
                                                            <FormattedMessage id="Originated in Payment" defaultMessage="Originated in Payment"/>
                                                        </th>
                                                        <th>
                                                        <FormattedMessage id="D/C" defaultMessage="D/C"/>
                                                        </th> 
                                                        <th><FormattedMessage id="Received In Payment" defaultMessage="Received In Payment"/></th>
                                                        <th><FormattedMessage id="D/C" defaultMessage="D/C"/></th>
                                                        <th><FormattedMessage id="Net Amount In Payment" defaultMessage="Net Amount In Payment"/></th>
                                                        <th><FormattedMessage id="D/C" defaultMessage="D/C"/></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.props.fileSets.advisementDetail.data.records.map((item,index) => (<tr>
                                                        <td>{index+1}</td>
                                                        <td>{item.originated}</td>
                                                        <td>{item.originatedCrDr}</td>
                                                        <td>{item.received}</td>
                                                        <td>{item.receivedCrDr}</td>
                                                        <td>{item.netAmount}</td>
                                                        <td>{item.netAmountCrDr}</td>
                                                    </tr>))
                                                }
                                                <tr>
                                                    <td colSpan="7">MEMBER TOTALS IN PAYMENT CURRENCY 840:</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>{this.props.fileSets.advisementDetail.data.memberTotal.originated}</td>
                                                    <td>{this.props.fileSets.advisementDetail.data.memberTotal.originatedCrDr}</td>
                                                    <td>{this.props.fileSets.advisementDetail.data.memberTotal.received}</td>
                                                    <td>{this.props.fileSets.advisementDetail.data.memberTotal.receivedCrDr}</td>
                                                    <td>{this.props.fileSets.advisementDetail.data.memberTotal.netAmount}</td>
                                                    <td>{this.props.fileSets.advisementDetail.data.memberTotal.netAmountCrDr}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="7">ACCOUNT TOTALS IN PAYMENT CURRENCY 840:</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>{this.props.fileSets.advisementDetail.data.accountTotal.originated}</td>
                                                    <td>{this.props.fileSets.advisementDetail.data.accountTotal.originatedCrDr}</td>
                                                    <td>{this.props.fileSets.advisementDetail.data.accountTotal.received}</td>
                                                    <td>{this.props.fileSets.advisementDetail.data.accountTotal.receivedCrDr}</td>
                                                    <td>{this.props.fileSets.advisementDetail.data.accountTotal.netAmount}</td>
                                                    <td>{this.props.fileSets.advisementDetail.data.accountTotal.netAmountCrDr}</td>
                                                </tr>
                                                </tbody>
                                            </Table>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">FROM NAME: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.fromName}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">FROM OFFICE: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.fromOffice}</dd>
                                                </dl>
                                            </div>
                                            <div className="bd-example">
                                                <dl className="row">
                                                    <dt className="col-sm-3">FROM PHONE NUMBER: </dt>
                                                    <dd className="col-sm-9">{this.props.fileSets.advisementDetail.data.fromPhoneNumber}</dd>
                                                </dl>
                                            </div>
                                        </Col>
                                    </Row>
                                        </React.Fragment>:<tr><td colSpan="5"><p className="text-center text-danger">There are no products at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                        </CardBody>
                        </Card>
                    </Col>
                  </Row>
                  
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        fileSets:state.fileSets,
        // utils:state.utils
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchAdvisementDetail
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(MastercardAdvisementDetail);