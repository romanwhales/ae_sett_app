import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col,Row, Button,Alert,Table as Table2} from 'reactstrap';
import {fetchAffiliateProcessorAccounts,fetchAffiliate,updateAffiliateProcessorAccount,fetchAffiliateProductAccounts,fetchAffiliateSres,fetchAffiliateBins,updateAffiliateProductAccount} from '../../actions/affiliates'
import {updateSre} from '../../actions/sres'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";

import PropTypes from 'prop-types';
// import AddSubGroup from './addSubGroup';

import {FormattedMessage,} from 'react-intl';


class ProcessorAccounts extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            createSuccessAlertVisible:true,
            updateSuccessAlertVisible:true,
            updateProcessorErrorAlertVisible:true,
            createProcessorErrorAlertVisible:true,
            updateProcessorAccountSuccessAlert:true,
            hasError:false,
            defaultHiddenColumnNames: ['sex', 'car'],
            numbers:[
                {name:'1',value:1},
                {name:'2',value:2},
                {name:'3',value:3},
                {name:'4',value:4},
                {name:'5',value:5},
                {name:'6',value:6},
                {name:'7',value:7},
                {name:'8',value:8},
                {name:'9',value:9},
                {name:'10',value:10},
            ],
            activePageSres:1,
            activePageBins:1,
            activePage:1,
            id:null,
            idProcessor:null,
            sreId:null,
            processorName:'',
            accountType:'',
            accountNo:'',
            productAccountNo:'',
            sreCode:'',
            sreDescription:''

        }
        this.onDismissCreateSuccessAlert = this.onDismissCreateSuccessAlert.bind(this);
        this.onDismissUpdateSuccessAlert = this.onDismissUpdateSuccessAlert.bind(this);
        this.onDismissUpdateProcessorErrorAlert = this.onDismissUpdateProcessorErrorAlert.bind(this);
        this.onDismisscreateProcessorErrorAlert = this.onDismisscreateProcessorErrorAlert.bind(this);
        

    }
    local=''
    componentWillMount=()=>{
        let id = this.props.match.params.id
        this.props.fetchAffiliateProcessorAccounts(id);
        this.props.fetchAffiliate(id);
        this.props.fetchAffiliateProductAccounts(id);
        this.props.fetchAffiliateSres(id,0);
        this.props.fetchAffiliateBins(id,0);
        
        
        // this.props.fetchAffiliate(id)
    }

    // componentDidCatch(error,info){
    //     console.log('Error is ',info);
    //     // Display fallback UI
    //     this.setState({ hasError: true });
    // }
    clearNotifications=()=>{
        // this.props.banks.bankCreated = null;
        // this.props.banks.bankUpdated = null;
        
      }
    componentWillUnmount(){
        this.clearNotifications();   
    }

    onDismissCreateSuccessAlert() {
        this.setState({ createSuccessAlertVisible: false });
      }

      onDismissUpdateSuccessAlert() {
          
        this.setState({ updateSuccessAlertVisible: false });
       
      }

      onDismissUpdateProcessorErrorAlert(){
        this.setState({ updateProcessorErrorAlertVisible: false });
      }

      onDismisscreateProcessorErrorAlert(){

      }
    onSubmit = (values) =>{
        this.props.createBin(values);
        this.closeModal();
    }

    updateBin = (id) => {
        this.clearNotifications();
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
        this.props.fetchBin(id)
    }

    closeUpdateModal = () => {
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
    }

    onSubmitUpdate = (values) => {
       this.props.updateBin(values);
        this.closeUpdateModal();
    }
    toggle = () => {
        
        this.props.history.push(`/configuration/affiliates/${this.props.match.params.id}/bins/addbin`)
    }
    closeModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }
    deleteProcessor = (id) => {
        this.props.deleteProcessor(id);
    }

    handlePageChange = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchAffiliateBins(this.props.match.params.id,pageNumberParam)
        this.setState({activePage: pageNumber});
        
    }

    setSreId = (item,index) => {
        this.setState({
            sreId:index,
            sreCode:item.code,
            sreDescription:item.description,

        })
    }

    setProductId = (item,index) => {
        this.setState({
            id:index,
            productAccountNo:item.accountNo

        })
    }

    setProcessorId = (item,index) => {
        this.setState({
            idProcessor:index,
            accountNo:item.accountNo
        })
        
    }


    handleChangeSreCode =(event) => {
        this.setState({
            sreCode:event.target.value
        })
    }

    handleChangeSreDescription = (event) => {
        this.setState({
            sreDescription:event.target.value
        })
    }

    handleChangeProcessorName = (event) => {
        this.setState({
            processorName:event.target.value
        })
    }

    handleChangeAccountType = (event) => {
        this.setState({
            accountType:event.target.value
        })
    }

    handleChangeAccountNo = (event) => {
        this.setState({
            accountNo:event.target.value 
        })
    }

    handleChangeProductAccountNo = (event) => {
        this.setState({
            productAccountNo:event.target.value 
        })
    }


    onSubmitSre = (item) => {
        let values = {}
        // values.code = this.state.sreCode;
        values.code = item.code;
        values.description = this.state.sreDescription;
        values.affiliate = {};
        values.affiliate.code = this.props.match.params.id;
        this.props.updateSre(values);
        this.setState({
            sreId:null
        })
    }

    onSubmitProductAccount = (item) =>{
        let values = {}
        values.productName = item.productName;
        values.treatAs = item.treatAs;
        values.accountNo = this.state.productAccountNo;
        debugger;
        this.props.updateAffiliateProductAccount(values,this.props.match.params.id,item.productId);
        this.setState({
            id:null
        })
        
    }

    onSubmitProcessorAccount = (item) =>{
        let values = {}
        values.accountNo = this.state.accountNo;
        values.accountType = item.accountType;
        values.processorName = item.processorName
        this.props.updateAffiliateProcessorAccount(values,this.props.match.params.id,item.processorId);
        this.setState({
            idProcessor:null
        })
        
    }

    handlePageChangeSres = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchAffiliateSres(this.props.match.params.id,pageNumberParam)
        this.setState({activePageSres: pageNumber});
        
    }

    handlePageChangeBins = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchAffiliateBins(this.props.match.params.id,pageNumberParam)
        this.setState({activePageBins: pageNumber});
        
    }

    toggleSres = () => {
        
        this.props.history.push(`/configuration/affiliates/${this.props.match.params.id}/addSre`)
    }

    toggleBins = () => {
        this.props.history.push(`/configuration/affiliates/${this.props.match.params.id}/bins/addbin`)
    }

    onDismissUpdateProcessorAccountSuccessAlert = () => {
        this.setState({
            updateProcessorAccountSuccessAlert:false
        })
    }

    onDismissAffiliateProductAccountUpdatedAlert = () => {
        this.setState({
            affiliateProductAccountUpdatedAlert:false
        })
    }

    editAffiliate = () => {
        debugger;
        
        this.props.history.push(`/configuration/affiliates/${this.props.affiliates.affiliate.code}/edit`)
    }


    
    render(){
        console.log('Props here is ',this.props ,'and local is ',this.local);
        
        
        return(
            <div className="animated fadeIn">
                <Row>

                    <Col xs="12">
                    
                     {this.props.sres.sreUpdated?<Alert color="success" isOpen={this.state.updateSuccessAlertVisible} toggle={this.onDismissUpdateSuccessAlert}>
                        
                        <FormattedMessage id="Success: Sre Updated Successfully!" defaultMessage="Success: Sre Updated Successfully!"/>
                    </Alert>:null} 
                    
                    {this.props.sres.sreUpdateError?<Alert color="danger" isOpen={this.state.createProcessorErrorAlertVisible} toggle={this.onDismisscreateProcessorErrorAlert}>
                        {this.props.sres.sreUpdateError.response.data.message}
                    </Alert>:null}
                    </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                        {this.props.affiliates.affiliate?
                        <Card>
                        <CardHeader>
                        <Button className={'float-right mb-0 btn-sm'} color="success" onClick={()=> this.editAffiliate()}><i className="fa fa-edit"></i>&nbsp; <FormattedMessage id="Edit Affiliate" defaultMessage="Edit Affiliate" /></Button>
                        </CardHeader>
                        <CardBody>
                        {/* <React.Fragment> */}
                        <Row>
                        <Col md="4" style={{'display':'grid',alignItems:'center','justifyContent':'center'}}>
                            <i className={"flag-icon flag-icon-"+this.props.affiliates.affiliate.code.toLowerCase()} title={this.props.affiliates.affiliate.code.toLowerCase()} id={this.props.affiliates.affiliate.code.toLowerCase()} style={{fontSize:'7.5rem'}}></i>
                            <h6 style={{textAlign:'center',paddingTop:'10px'}}>{this.props.affiliates.affiliate.name.toUpperCase()}</h6>
                    <h6 style={{textAlign:'center'}}>CODE: {this.props.affiliates.affiliate.code.toUpperCase()}</h6>
                    
                    <a style={{textAlign:'center'}} href={"#/configuration/affiliates/"+this.props.affiliates.affiliate.code+"/edit"}>Edit Affiliate</a>
                        </Col>
                        <Col md="4">
                            <dl className="row">
                                <dt className="col-sm-6">HTML Currency Code:</dt>
                                <dd className="col-sm-6">{this.props.affiliates.affiliate? this.props.affiliates.affiliate.htmlCurrencyCode:'N/A'}</dd>
                            </dl>
                            <dl className="row">
                                <dt className="col-sm-6">Alpha 3 Code :</dt>
                                <dd className="col-sm-6">{this.props.affiliates.affiliate ? this.props.affiliates.affiliate.alpha3code:'N/A'}</dd>
                            </dl>
                            <dl className="row">
                                <dt className="col-sm-6">Auto Post:</dt>
                                <dd className="col-sm-6">{this.props.affiliates.affiliate? this.props.affiliates.affiliate.autoPost.toString():'False'}</dd>
                            </dl>
                            <dl className="row">
                                <dt className="col-sm-6">Currency Number :</dt>
                                <dd className="col-sm-6">{this.props.affiliates.affiliate? this.props.affiliates.affiliate.currencyNumber:'N/A'}</dd>
                            </dl>
                        </Col>
                        <Col md="4">
                        <dl className="row">
                            <dt className="col-sm-6">Currency Unit:</dt>
                            <dd className="col-sm-6">{this.props.affiliates.affiliate? this.props.affiliates.affiliate.currencyUnit:'N/A'}</dd>
                        </dl>
                        <dl className="row">
                            <dt className="col-sm-6">MasterAcqInstId:</dt>
                            <dd className="col-sm-6">{this.props.affiliates.affiliate? this.props.affiliates.affiliate.masterAcqInstId:'N/A'}</dd>
                        </dl>
                        <dl className="row">
                            <dt className="col-sm-6">MasterMemberId:</dt>
                            <dd className="col-sm-6">{this.props.affiliates.affiliate? this.props.affiliates.affiliate.masterMemberId:'N/A'}</dd>
                        </dl>
                        <dl className="row">
                            <dt className="col-sm-6">McDualMessageT112:</dt>
                            <dd className="col-sm-6">{this.props.affiliates.affiliate? this.props.affiliates.affiliate.mcDualMessageT112:'N/A'}</dd>
                        </dl>
                        </Col>
                        </Row>
                        {/* </React.Fragment> */}
                        </CardBody>
                        </Card>
                        :''}
                        </Col>
                    </Row>
                    <Row>
                    <Col xs="5">
                        <Card>
                        <CardHeader>
                           
                            {this.props.affiliates.affiliate? <i className={"flag-icon flag-icon-"+this.props.affiliates.affiliate.code.toLowerCase()} title={this.props.affiliates.affiliate.code.toLowerCase()} id={this.props.affiliates.affiliate.code.toLowerCase()}></i>: 'N/A'}
                            <FormattedMessage id="Sres" defaultMessage="Sres"/>
                            <Button className={'float-right mb-0'} color="success" onClick={this.toggleSres} ><i className="fa fa-plus"></i>&nbsp; <FormattedMessage id="Add Sres" defaultMessage="Add Sres" /></Button>
                        </CardHeader>
                        <CardBody>
                            <Table2 hover bordered striped responsive size="sm" >
                            <thead>
                                <tr>
                                <th>
                                    #
                                </th>
                                <th><FormattedMessage id="Code" defaultMessage="Code"/></th>
                                <th><FormattedMessage id="Description" defaultMessage="Description"/></th>
                                <th><FormattedMessage id="app.actions" defaultMessage="Actions"/></th>
                                </tr>
                            </thead>
                            <tbody>
                                {  this.props.affiliates.affiliateSres
                                    ? [
                                        this.props.affiliates.affiliateSres.content.length > 0 ? this.props.affiliates.affiliateSres.content? this.props.affiliates.affiliateSres.content.map((item,index) => (
                                            <tr key={index+1}>
                                                {
                                                index == this.state.sreId ? <React.Fragment>
                                                    <td>{index+1}</td>
                                                    {/* <td><input value={this.state.sreCode} onChange={this.handleChangeSreCode}/></td> */}
                                                    <td>{item.code}</td>
                                                    <td><input className="form-control" value={this.state.sreDescription} onChange={this.handleChangeSreDescription}/> </td>
                                                    
                                                    <td><Button onClick={()=> this.onSubmitSre(item)} size="sm">Submit</Button></td>
                                                </React.Fragment>:<React.Fragment>
                                                <td>{index+1}</td>
                                                <td>{item.code}</td>
                                                <td>{item.description}</td>
                                                <td ><Button onClick={()=> this.setSreId(item,index)} size="sm">Edit</Button></td>
                                                
                                                </React.Fragment>
                                            }
                                            </tr>
                                        )):<tr><td colSpan="5"><p className="text-center text-danger">There are no sres attached to the affiliate at the moment.</p></td></tr>:<tr><td colSpan="5"><p className="text-center text-danger">There are no sres attached to the affiliate at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                            

                            </tbody>
                            </Table2>                   
                                {this.props.affiliates.affiliateSres?<nav>
                                <Pagination2
                                    activePage={this.state.activePageSres}
                                    itemsCountPerPage={20}
                                    totalItemsCount={this.props.affiliates.affiliateSres?this.props.affiliates.affiliateSres.meta.totalElements:null}
                                    pageRangeDisplayed={5} 
                                    onChange={this.handlePageChangeSres}
                                />
                                </nav>:'' }
                        </CardBody>
                        </Card>
                    </Col>
                    <Col xs="7">
                    <Card>
                        <CardHeader>
                           {this.props.affiliates.affiliate? <i className={"flag-icon flag-icon-"+this.props.affiliates.affiliate.code.toLowerCase()} title={this.props.affiliates.affiliate.code.toLowerCase()} id={this.props.affiliates.affiliate.code.toLowerCase()}></i>: 'N/A'}
                            <FormattedMessage id="Bins" defaultMessage="Bins"/>
                            <Button className={'float-right mb-0'} color="success" onClick={this.toggleBins}><i className="fa fa-plus"></i>&nbsp; <FormattedMessage id="Add Bin To Affiliate" defaultMessage="Add Bin To Affiliate"/></Button>
                        </CardHeader>
                        <CardBody>
                            <Table2 hover bordered striped responsive size="sm" >
                            <thead>
                                <tr>
                                <th>
                                    #
                                </th>
                                
                                <th><FormattedMessage id="Value" defaultMessage="Value"/></th>
                                {/* <th><FormattedMessage id="app.actions" defaultMessage="Actions"/></th> */}
                                </tr>
                            </thead>
                            <tbody>

                                {  this.props.affiliates.affiliateBinList
                                    ? [
                                        this.props.affiliates.affiliateBinList.content.length > 0 ? this.props.affiliates.affiliateBinList? this.props.affiliates.affiliateBinList.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{index+1}</td>
                                                
                                                <td>{item.value}</td>
                                                {/* <td> 
                                                    <i className="fa fa-edit fa-lg text-center" style={{color:'blue'}} onClick={(e)=>this.updateBin(item.value)}></i> &nbsp; &nbsp;
                                                    
                                                </td> */}
                                            </tr>
                                        )):<tr><td colSpan="5"><p className="text-center text-danger">There are no bins attached to the affiliate at the moment.</p></td></tr>:<tr><td colSpan="5"><p className="text-center text-danger">There are no bins attached to the affiliate at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                            

                            </tbody>
                            </Table2>                   
                                {this.props.affiliates.affiliateBinList?<nav>
                                <Pagination2
                                    activePage={this.state.activePageBins}
                                    itemsCountPerPage={20}
                                    totalItemsCount={this.props.affiliates.affiliateBinList?this.props.affiliates.affiliateBinList.meta.totalElements:null}
                                    pageRangeDisplayed={5} 
                                    onChange={this.handlePageChangeBins}
                                />
                                </nav>:'' }
                        </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12">
                   
                    {this.props.affiliates.affiliateProductAccountUpdated?<Alert color="success" isOpen={this.state.affiliateProductAccountUpdatedAlert} toggle={this.onDismissAffiliateProductAccountUpdatedAlert}>
                        
                        <FormattedMessage id="Success: Affiliate Product Account Updated Successfully!" defaultMessage="Success: Affiliate Product Account Updated Successfully!"/>
                    </Alert>:null}
                    <Card>
                        <CardHeader>
                           
                        {this.props.affiliates.affiliate? <i className={"flag-icon flag-icon-"+this.props.affiliates.affiliate.code.toLowerCase()} title={this.props.affiliates.affiliate.code.toLowerCase()} id={this.props.affiliates.affiliate.code.toLowerCase()}></i>: 'N/A'}
                            <FormattedMessage id="Product Accounts" defaultMessage="Product Accounts"/>
                           
                        </CardHeader>
                        <CardBody>
                            <Table2 hover bordered striped responsive size="sm" >
                            <thead>
                                <tr>
                                <th>
                                    #
                                </th>
                                <th><FormattedMessage id="Processor Name" defaultMessage="Processor Name"/></th>
                                <th><FormattedMessage id="Product Name" defaultMessage="Product Name"/></th>
                                <th><FormattedMessage id="AccountType" defaultMessage="Account Type"/></th>
                                <th><FormattedMessage id="Account Number" defaultMessage="Account Number"/></th>
                                <th><FormattedMessage id="app.actions" defaultMessage="Actions"/></th>
                                </tr>
                            </thead>
                            <tbody>

                                {  this.props.affiliates.affiliateProductAccounts
                                    ? [
                                        this.props.affiliates.affiliateProductAccounts.length > 0 ? this.props.affiliates.affiliateProductAccounts? this.props.affiliates.affiliateProductAccounts.map((item,index) => (
                                            <tr key={index+1}>
                                                {
                                                    index == this.state.id ? <React.Fragment>
                                                        <td>{index+1}</td>
                                                        <td>{item.processorName}</td>
                                                        <td>{item.productName}</td>
                                                        <td>{item.treatAs}</td>
                                                        <td><input className="form-control" value={this.state.productAccountNo} onChange={this.handleChangeProductAccountNo}/></td>
                                                        <td><Button onClick={()=> this.onSubmitProductAccount(item)}size="sm">Submit</Button></td>
                                                    </React.Fragment>:<React.Fragment>
                                                    <td>{index+1}</td>
                                                    <td>{item.processorName}</td>
                                                    <td>{item.productName}</td>
                                                    <td>{item.treatAs}</td>
                                                    <td>{item.accountNo}</td>
                                                    <td> <Button onClick={()=> this.setProductId(item,index)}size="sm">Edit</Button></td>
                                                    
                                                    </React.Fragment>
                                                }
                                                
                                                
                                            </tr>
                                        )):<tr><td colSpan="5"><p className="text-center text-danger">There are no bins attached to the affiliate at the moment.</p></td></tr>:<tr><td colSpan="5"><p className="text-center text-danger">There are no bins attached to the affiliate at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                            

                            </tbody>
                            </Table2>                   
                                {/* {this.props.affiliates.affiliateBinList?<nav>
                                <Pagination2
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={20}
                                    totalItemsCount={this.props.affiliates.affiliateBinList?this.props.affiliates.affiliateBinList.meta.totalElements:null}
                                    pageRangeDisplayed={5} 
                                    onChange={this.handlePageChange}
                                />
                                </nav>:'' } */}
                        </CardBody>
                        </Card>
                        {this.props.affiliates.affiliateProcessorAccountUpdated?<Alert color="success" isOpen={this.state.updateProcessorAccountSuccessAlert} toggle={this.onDismissUpdateProcessorAccountSuccessAlert}>
                        
                        <FormattedMessage id="Success: Processor Account Updated Successfully!" defaultMessage="Success: Processor Account Updated Successfully!"/>
                    </Alert>:null}
                        <Card>
                        <CardHeader>
                           
                            {/* <i class="fa fa-cog fa-spin"></i> */}
                            {this.props.affiliates.affiliate? <i className={"flag-icon flag-icon-"+this.props.affiliates.affiliate.code.toLowerCase()} title={this.props.affiliates.affiliate.code.toLowerCase()} id={this.props.affiliates.affiliate.code.toLowerCase()}></i>: 'N/A'}
                            <FormattedMessage id="Processor Accounts" defaultMessage="Processor Accounts"/>
                           
                        </CardHeader>
                        <CardBody>
                            <Table2 hover bordered striped responsive size="sm" >
                            <thead>
                                <tr>
                                <th>
                                    #
                                </th>
                                <th><FormattedMessage id="Processor Name" defaultMessage="Processor Name"/></th>
                                <th><FormattedMessage id="AccountType" defaultMessage="Account Type"/></th>

                                <th><FormattedMessage id="Account Number" defaultMessage="Account Number"/></th>
                                <th><FormattedMessage id="app.actions" defaultMessage="Actions"/></th>
                                </tr>
                            </thead>
                            <tbody>

                                {  this.props.affiliates.affiliateProcessorAccounts
                                    ? [
                                        this.props.affiliates.affiliateProcessorAccounts.length > 0 ? this.props.affiliates.affiliateProcessorAccounts? this.props.affiliates.affiliateProcessorAccounts.map((item,indexProcessor) => (

                                            <tr key={indexProcessor+1}>
                                                {
                                                    indexProcessor == this.state.idProcessor?<React.Fragment>
                                                        <td>{indexProcessor+1}</td>
                                                        <td>{item.processorName}</td>
                                                        <td>{item.accountType}</td>
                                                        <td><input value={this.state.accountNo} onChange={this.handleChangeAccountNo} className="form-control"/></td>
                                                        <td><Button onClick={()=> this.onSubmitProcessorAccount(item)} size="sm">Submit</Button></td>
                                                        
                                                    </React.Fragment>:<React.Fragment>
                                                    <td>{indexProcessor+1}</td>
                                                    <td>{item.processorName}</td>
                                                    <td>{item.accountType}</td>
                                                    <td>{item.accountNo}</td>
                                                    <td ><Button onClick={()=> this.setProcessorId(item,indexProcessor)}size="sm">Edit</Button></td>
                                                    </React.Fragment>
                                                    
                                                }
                                                

                                                
                                            </tr>
                                        )):<tr><td colSpan="5"><p className="text-center text-danger">There are no bins attached to the affiliate at the moment.</p></td></tr>:<tr><td colSpan="5"><p className="text-center text-danger">There are no bins attached to the affiliate at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                            

                            </tbody>
                            </Table2>                   
                                {/* {this.props.affiliates.affiliateBinList?<nav>
                                <Pagination2
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={20}
                                    totalItemsCount={this.props.affiliates.affiliateBinList?this.props.affiliates.affiliateBinList.meta.totalElements:null}
                                    pageRangeDisplayed={5} 
                                    onChange={this.handlePageChange}
                                />
                                </nav>:'' } */}
                        </CardBody>
                        </Card>
                    </Col>
                    </Row>
                    
                      
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('State is ',state);
    return {
        affiliates:state.affiliates,
        sres:state.sres,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchAffiliateProcessorAccounts,
        updateAffiliateProcessorAccount,
        fetchAffiliate,
        fetchAffiliateProductAccounts,
        fetchAffiliateSres,
        fetchAffiliateBins,
        updateAffiliateProductAccount,
        updateSre
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ProcessorAccounts);