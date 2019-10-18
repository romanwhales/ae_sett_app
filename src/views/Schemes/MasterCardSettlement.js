/* eslint-disable import/first */
import React, { Component } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Alert,Nav,NavItem,NavLink,TabContent,TabPane} from 'reactstrap';
import Moment from 'react-moment';
import classnames from 'classnames';


import {fetchAllT112s,fetchAllT464s,fetchAllAdvisements,fetchAllT140s,fetchAllT461s} from '../../actions/filesets'

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

class MastercardSettlement extends Component{
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
    //    this.props.fetchBatchesSummary('2018-04-12');
       
        this.props.fetchAllT112s(0);
        this.props.fetchAllT464s(0);
        this.props.fetchAllAdvisements();
        this.props.fetchAllT140s(0);
        this.props.fetchAllT461s(0);
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
                            <i className="fa fa-cc-mastercard" style={{ color: '#FFC108' }}></i><FormattedMessage id="Advisement" defaultMessage="Advisement"/>
                        </CardHeader>
                        <CardBody>
                            {/* {
                                this.props.accountReport ? <ReactTable data={this.props.accountReport} columns={columns}/>
                            :null} */}
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table" id="divToPDF">
                            <thead className="thead-light">
                                <tr>
                                    <th><FormattedMessage id="Batch Date" defaultMessage="Batch Date"/> </th>
                                    <th><FormattedMessage id="Net Amount" defaultMessage="Net Amount"/></th>
                                    <th><FormattedMessage id="Files" defaultMessage="Files"/></th>      
                                </tr>
                            </thead>

                            <tbody>
                            
                            {  this.props.fileSets.advisements
                                    ? [
                                      this.props.fileSets.advisements.data.content.length > 0 ?  this.props.fileSets.advisements.data ?  this.props.fileSets.advisements.data.content.map((item,index) => (
                                            <tr key={index+1}>
                                                
                                                <td><a href={"#/mastercard/settlement/"+item.batchDate+"/detail"}><Moment format="ll">{item.batchDate}</Moment></a></td>
                                                <td>{item.accountTotal.netAmount} {item.accountTotal.netAmountCrDr}</td>
                                                
                                                <td>{item.fileIDS.length}</td>
                                          
                                            </tr>
                                        )):<tr><td colSpan="3"><p className="text-center text-danger">There are no advisement records at the moment.</p></td></tr>:<tr><td colSpan="3"><p className="text-center text-danger">There are no advisement records at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }                                 
                            </tbody>
                            </Table>
                        
                            {this.props.fileSets.advisements?<nav>
                            <Pagination2
                                activePage={this.state.activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.fileSets.advisements.data?this.props.fileSets.advisements.data.meta.totalElements:null}
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
                                <i className="fa fa-cc-mastercard" style={{ color: '#FFC108' }}></i><FormattedMessage id=" T140" defaultMessage=" T140"/> 
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                                >
                                <i className="fa fa-cc-mastercard" style={{ color: '#FFC108' }}></i><FormattedMessage id=" T112" defaultMessage=" T112"/> 
                                </NavLink>
                            </NavItem>
                            
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table" id="divToPDF">
                                <thead className="thead-light">
                                    <tr>
                                        <th><FormattedMessage id="Date" defaultMessage="Date"/> </th>
                                        <th><FormattedMessage id="Acquirer" defaultMessage="File ID"/></th>
                                        <th><FormattedMessage id="File Name" defaultMessage="File Name"/></th>
                                        {/* <th><FormattedMessage id="Action" defaultMessage="Action"/></th> */}
                                    </tr>
                                </thead>

                                <tbody>

                                {  this.props.fileSets.t140s
                                        ? [
                                            this.props.fileSets.t140s.data.content.length > 0 ?  this.props.fileSets.t140s ?  this.props.fileSets.t140s.data.content.map((item,index) => (
                                                <tr key={index+1}>
                                                    <td><Moment format="ll">{item['batchDate']}</Moment></td>
                                                    <td>{item['fileId']}</td>
                                                    <td>
                                                        <a href={"#/mastercard/settlement/t140/"+item.fileId+"/transactions"}>{item['filename']}</a>
                                                    </td>
                                                    {/* <td><i className="fa fa-eye fa-lg text-center" fa-lg  title="View Transactions" style={{color:'#262A2E',marginLeft:'10px',cursor:'pointer'}} onClick={(e) => this.viewT140Transactions(item.fileId)}> </i> </td> */}
                                                    
                                            
                                                </tr>
                                            )):<tr><td colSpan="3"><p className="text-center text-danger">There are no records for visa at the moment.</p></td></tr>:<tr><td colSpan="3"><p className="text-center text-danger">There are no records for visa at the moment.</p></td></tr>
                                        ]
                                        : [
                                            ''
                                        ]
                                    }                                 
                                </tbody>
                                </Table>
                            
                                {this.props.fileSets.t140s?<nav>
                                <Pagination2
                                    activePage={this.state.activePageT140}
                                    itemsCountPerPage={10}
                                    totalItemsCount={this.props.fileSets.t140s?this.props.fileSets.t140s.data.meta.totalElements:null}
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
                                        <th><FormattedMessage id="File ID" defaultMessage="File ID"/></th>
                                        <th><FormattedMessage id="File Name" defaultMessage="File Name"/></th>
                                        <th><FormattedMessage id="Action" defaultMessage="Action"/></th>       
                                    </tr>
                                </thead>

                                <tbody>

                                {  this.props.fileSets.t112s
                                        ? [
                                        this.props.fileSets.t112s.data.content.length > 0 ?  this.props.fileSets.t112s.data ?  this.props.fileSets.t112s.data.content.map((item,index) => (
                                                <tr key={index+1}>
                                                    <td>{item['batchDate']?<Moment format="ll">{item['batchDate']}</Moment>:'N/A' }</td>
                                                    
                                                    <td>{item['fileId']}</td>
                                                    <td><a href={"#/mastercard/settlement/t112/"+item.fileId+"/transactions"}>{item['filename']}</a></td>
                                                    <td>
                                                        <i className="fa  fa-file" fa-lg  title="View Posting File" style={{color:'#262A2E',marginLeft:'10px',cursor:'pointer'}} onClick={(e) => this.showPostingFileT112(item.fileId)}> </i> 
                                                    </td>
                                            
                                                </tr>
                                            )):<tr><td colSpan="4"><p className="text-center text-danger">There are no t112s at the moment.</p></td></tr>:<tr><td colSpan="4"><p className="text-center text-danger">There are no t112s at the moment.</p></td></tr>
                                        ]
                                        : [
                                            ''
                                        ]
                                    }                                 
                                </tbody>
                                </Table>
                            
                                {this.props.fileSets.t112s?<nav>
                                <Pagination2
                                    activePage={this.state.activePageT112}
                                    itemsCountPerPage={10}
                                    totalItemsCount={this.props.fileSets.t112s.data?this.props.fileSets.t112s.data.meta.totalElements:null}
                                    pageRangeDisplayed={5} 
                                    onChange={this.handlePageChangeT112}
                                />
                                </nav>:'' }
                            </TabPane>
                        </TabContent>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" md="12" className="mb-4">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab2 === '3' })}
                                onClick={() => { this.toggle2('3'); }}
                                >
                                <i className="fa fa-cc-mastercard" style={{ color: '#FFC108' }}></i><FormattedMessage id=" T461" defaultMessage=" T461"/> 
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab2 === '4' })}
                                onClick={() => { this.toggle2('4'); }}
                                >
                                <i className="fa fa-cc-mastercard" style={{ color: '#FFC108' }}></i><FormattedMessage id=" T464" defaultMessage=" T464"/> 
                                </NavLink>
                            </NavItem>
                            
                        </Nav>
                        <TabContent activeTab={this.state.activeTab2}>
                            <TabPane tabId="3">
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table" id="divToPDF">
                            <thead className="thead-light">
                                <tr>
                                    <th><FormattedMessage id="Batch Date" defaultMessage="Batch Date"/> </th>
                                    <th><FormattedMessage id="File ID" defaultMessage="File ID"/></th>
                                    <th><FormattedMessage id="File Name" defaultMessage="File Name"/></th> 
                                    {/* <th><FormattedMessage id="Action" defaultMessage="Action"/></th>        */}
                                </tr>
                            </thead>

                            <tbody>

                                {  this.props.fileSets.t461s
                                    ? [
                                      this.props.fileSets.t461s.data.content.length > 0 ?  this.props.fileSets.t461s.data ?  this.props.fileSets.t461s.data.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{item['batchDate']?<Moment format="ll">{item['batchDate']}</Moment>:'N/A' }</td>
                                                
                                                <td>{item['fileId']}</td>
                                               
                                                <td><a href={"#/mastercard/settlement/t461/"+item.fileId+"/transactions"}>{item['filename']}</a></td>
                                                {/* <td>
                                                    <i className="fa fa-eye fa-lg text-center" fa-lg  title="View Transactions" style={{color:'#262A2E',marginLeft:'10px',cursor:'pointer'}} onClick={(e) => this.showT461Transactions(item.fileId)}> </i>
                                                </td> */}
                                          
                                            </tr>
                                        )):<tr><td colSpan="4"><p className="text-center text-danger">There are no t112s at the moment.</p></td></tr>:<tr><td colSpan="4"><p className="text-center text-danger">There are no t461s at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }                                 
                            </tbody>
                            </Table>
                        
                            {this.props.fileSets.t461s?<nav>
                            <Pagination2
                                activePage={this.state.activePageT461}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.fileSets.t461s?this.props.fileSets.t461s.data.meta.totalElements:null}
                                pageRangeDisplayed={5} 
                                onChange={this.handlePageChange}
                            />
                            </nav>:'' }
                            </TabPane>
                            <TabPane tabId="4">
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table" id="divToPDF">
                            <thead className="thead-light">
                                <tr>
                                    <th><FormattedMessage id="Date" defaultMessage="Date"/> </th>
                                    <th><FormattedMessage id="File ID" defaultMessage="File ID"/></th> 
                                    <th><FormattedMessage id="File Name" defaultMessage="File Name"/></th>
                                    <th><FormattedMessage id="Action" defaultMessage="Action"/></th>
                                         
                                </tr>
                            </thead>

                            <tbody>

                            {  this.props.fileSets.t464s
                                    ? [
                                      this.props.fileSets.t464s.data.content.length > 0 ?  this.props.fileSets.t464s.data ?  this.props.fileSets.t464s.data.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{item['batchDate']? <Moment format="ll">{item['batchDate']}</Moment>:'N/A'}</td>
                                                <td>{item['fileId']}</td>
                                                <td><a href={"#/mastercard/settlement/t464/"+item.fileId+"/transactions"}>{item['filename']}</a></td>
                                                <td>
                                                    <i className="fa  fa-file" fa-lg  title="View Posting File" style={{color:'#262A2E',marginLeft:'10px',cursor:'pointer'}} onClick={(e) => this.showPostingFile(item.fileId)}> </i> 
                                                </td>
                                                
                                                
                                          </tr>
                                        )):<tr><td colSpan="4"><p className="text-center text-danger">There are no records for T464 at the moment.</p></td></tr>:<tr><td colSpan="4"><p className="text-center text-danger">There are no records for T464 at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }                                 
                            </tbody>
                            </Table>
                        
                            {this.props.fileSets.t464s?<nav>
                            <Pagination2
                                activePage={this.state.activePageT464}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.fileSets.t464s?this.props.fileSets.t464s.data.meta.totalElements:null}
                                pageRangeDisplayed={5} 
                                onChange={this.handlePageChangeT464}
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
        fetchAllT112s,
        fetchAllT464s,
        fetchAllAdvisements,
        fetchAllT140s,
        fetchAllT461s,
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(MastercardSettlement);