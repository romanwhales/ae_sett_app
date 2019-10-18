import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button,Alert} from 'reactstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchCardsPaginated} from '../../actions/cards';
import {addCardsToBank} from '../../actions/banks';
// import {addCa} from '../../actions/banks';


import Pagination2 from "react-js-pagination";

class AddBankCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption:null,
      showModal:false,
      terminalStatus:false,
      terminalError:false,
      terminalDeletedStatus:false,
      deletemodal:false,
      fileModal:false,
      terminalId:'',
      levelCreatedAlert:true,
      terminalDeletedAlert:true,
      terminalDeletedErrorAlert:true,
      terminalUpdatedErrorAlert:true,
      terminalCreatedAlert:true,
      showUpdateModal:false,
      terminalCreatedErrorAlert:true,
      terminalUpdatedAlert:true,
      escalationCreatedErrorAlert:true,
      ageMode:[{option:'DAYS',value:'DAY'},{option:'HOURS',value:'HOUR'}],
      age:[{option:1},{option:2},{option:3},{option:4},{option:5},{option:6},{option:7},{option:8},{option:9},{option:10}],
      checkedListAll: [],
      activePage:1,
      ItemsChecked: false,
      postArray:[],
      terminalAddedToTemplateAlert:true
    }
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }
  selectValue=''
  id=''
  closeModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }
  /**
   * Launch Individual Terminal Form
   */
  toggle = () => {
    this.setState({ showModal: !this.state.showModal });
  }
  /**
   * Launch Batch Upload Modal
   */

  showFileModal = () => {
    this.setState({fileModal:!this.state.fileModal});
  }
  /**
   * Close File Modal
   */

  closeFileModal = () =>{
    this.setState({fileModal:!this.state.fileModal});
  }

  toggleConfirm = () =>{
    this.setState({ deletemodal: !this.state.deletemodal });
  }
  deleteTerminal = (value) => {
    this.setState({deletemodal:true})
    this.id = value;
  }
  confirm =()=> {
    this.props.deleteTerminal(this.id);
    this.setState({deletemodal:false});

  }
  componentWillMount(){
     this.props.fetchCardsPaginated(0)
  }
  componentDidUpdate(prevProps,prevState){
   
    if(this.props.atms !== prevProps.atms){
     
      if(this.props.atms.terminalCreated){
        this.setState({terminalStatus:true})
      }
      if(this.props.atms.terminalCreatedError){
        this.setState({terminalError:true});
      }
      if(this.props.atms.deletedTerminal){
        this.setState({terminalDeletedStatus:true});
      }
      
      // if(this.props.auth.)
    }
    
  }
  onSubmit = (values) =>{
    values.channel ={}
    values.channel.id = 1;
    this.props.createTerminal(values);
    this.toggle();
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  toggle = () => {
    this.clearNotifications();
    this.setState({ showModal: !this.state.showModal });
  }
  getValue = (value) =>{
     
  }

  handlePageChange =(pageNumber)=>{
    // debugger;
  }

  toggleDropDown = (id) => {
    // f
    if(id == this.state.terminalId){
      this.setState({terminalId:null});
    }else{
      this.setState({terminalId:id});
    }
    
  }

  deleteTerminal = (idTosend) => {
    this.clearNotifications();
    this.setState({deletemodal:true});
    this.id = idTosend;
  }

  onDismissCreatedLevelSuccessAlert =() => {
    this.setState({levelCreatedAlert:false});
  }

  onDismissCreatedLevelErrorAlert = () => {
    this.setState({levelCreatedErrorAlert:false});
  }

  onDismissUpdatedEscalationSuccessAlert =() => {
    this.setState({escalationUpdatedAlert:false});
  }

  levelDeletedErrorAlert = () => {
    this.setState({levelDeletedErrorAlert:false});
  }

  onDismissUpdatedTerminalSuccessAlert = () => {
      this.setState({
        terminalUpdatedAlert:false
      })
  }

  onDismissCreatedEscalationErrorAlert = () => {
    this.setState({escalationCreatedErrorAlert:false});
  }

  onDismissDeletedTerminalErrorAlert = () => {
      this.setState({
        terminalDeletedErrorAlert: false
      })
  }

  

  onDismissUpdatedEscalationErrorAlert = () => {
    this.setState({escalationUpdatedErrorAlert:false});
  }

  

  onDismissDeletedTerminalSuccessAlert = () => {
      this.setState({terminalDeletedAlert:false});
  }

  onDismissUpdatedTerminalErrorAlert =() => {
      this.setState({
        terminalUpdatedErrorAlert:false
      })
  }

  updateTerminal=(id)=>{
    this.clearNotifications();
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
    this.props.fetchTerminal(id);
  }

  closeUpdateModal=()=>{

    this.setState({ showUpdateModal: !this.state.showUpdateModal});
  }

  onSubmitUpdate=(values)=>{
    values.channel ={}
    values.channel.id = 1;
    this.props.updateTerminal(values);
    this.setState({ showUpdateModal:false});
  }

  onDismissCreatedTerminalSuccessAlert = () => {
    this.setState({
      terminalCreatedAlert: false
    })
  }

  clearNotifications =() => {
    
    this.props.banks.cardsAddedToBank = null;
  }

  componentWillUnmount(){
    this.clearNotifications();
  }

  handleCheckboxClick(e) {
    //e.preventDefault();

    const { value, checked } = e.target;

    if (checked) {
      this.setState(prevState => ({
        checkedListAll: [...prevState.checkedListAll, value * 1]
      }));
    } else {
      this.setState(prevState => ({
        checkedListAll: prevState.checkedListAll.filter(item => item != value)
      }));
    }
  }

  selectItem(e) {
    const { checked } = e.target;
    const { content } = this.props.cards.cardList;
    const collection = [];
    const postArray =[];
    // this.props;
    
    if (checked) {
      for (const row of content) {
        // for (const item of cat.items) {
          collection.push(row.id);
            postArray.push({id:row.id})
        // }
      }
    }
    this.setState({
      checkedListAll: collection,
      ItemsChecked: checked,
      postArray
    });
  }

  addTerminals(){
    if (this.state.checkedListAll){
      let selectedids = []
      this.state.checkedListAll.forEach(item => selectedids.push({id:item}))
      this.props.addCardsToBank(selectedids,this.props.match.params.id);
    }
    
  }

  onDismissTerminalAddedToTemplateSuccessAlert = () => {
      this.setState({
        terminalAddedToTemplateAlert:false
      })
  }

  handlePageChange = (pageNumber) => {
    let pageNumberParam = pageNumber - 1;
    this.props.fetchCardsPaginated(pageNumberParam)
    this.setState({activePage: pageNumber});
    
}
  

  
  render() {
    const { selectedOption } = this.state;
    console.log('Props',this.props)
    const {checkedListAll, ItemsChecked} = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>


          
           {this.props.banks.cardsAddedToBank?<Alert color="success" isOpen={this.state.terminalAddedToTemplateAlert} toggle={this.onDismissTerminalAddedToTemplateSuccessAlert}>
                  Cards Added To Bank Successfully!
                </Alert>:null}

            {/* {this.props.terminals.terminalCreated?<Alert color="success" isOpen={this.state.terminalCreatedAlert} toggle={this.onDismissCreatedTerminalSuccessAlert}>
                  Terminal Created Successfully!
            </Alert>:null}
                
          {this.props.terminals.terminalCreatedError?<Alert color="danger" isOpen={this.state.terminalCreatedErrorAlert} toggle={this.onDismissCreatedTerminalErrorAlert}>
            {this.props.terminals.terminalCreatedError.response.data.message}
          </Alert>:null}
          {this.props.terminals.terminalDeleted?<Alert color="success" isOpen={this.state.terminalDeletedAlert} toggle={this.onDismissDeletedTerminalSuccessAlert}>
            Terminal Deleted Successfully!
          </Alert>:null}
          {this.props.terminals.terminalDeletedError?<Alert color="danger" isOpen={this.state.terminalDeletedErrorAlert} toggle={this.onDismissDeletedTerminalErrorAlert}>
            {this.props.terminals.terminalDeletedError.response.data.message}
          </Alert>:null}
           {this.props.terminals.updatedTerminal?<Alert color="success" isOpen={this.state.terminalUpdatedAlert} toggle={this.onDismissUpdatedTerminalSuccessAlert}>
            Terminal Updated Successfully!
          </Alert>:null}
          {this.props.terminals.updatedTerminalError?<Alert color="danger" isOpen={this.state.terminalUpdatedErrorAlert} toggle={this.onDismissUpdatedTerminalErrorAlert}>
            {this.props.terminals.updatedTerminalError.response.data.message}
          </Alert>:null} */}
            <Card>
              <CardHeader>
                <i className="fa fa-credit-card"></i> Cards
              </CardHeader>
              <CardBody>
                <label>
                  <input
                    type="checkbox"
                    checked={ItemsChecked}
                    onClick={this.selectItem.bind(this)}
                  /> Select All
                </label>
                <span  className="left-css" style={{'float':'right','marginBottom':'20px'}}>{checkedListAll.length} items Selected <Button disabled={checkedListAll.length <= 0 } onClick={(e)=>this.addTerminals()} className="btn btn-success">Add</Button></span>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                        <th></th>
                      <th>Name</th>
                      <th>Card Type</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.cards.cardList
                        ? [
                            this.props.cards.cardList.content.length > 0 ? this.props.cards.cardList.content.map((item,index) => (
                                <tr key={index+1}>  
                                  <td>
                                    <input type="checkbox" value={item.id} checked={this.state.checkedListAll.includes(item.id)} onChange={this.handleCheckboxClick}/>
                                  </td>
                                  <td>{item.name}</td>
                                  <td>{item.type}</td>
                                  
                                </tr>
                            )):<tr key={1}><td colSpan="7"><p className="text-center text-danger">There are no terminals at the moment.</p></td></tr>
                        ]
                        : [
                        <tr key={1}><td colSpan="7"><p className="text-center text-danger">There are no terminals at the moment.</p></td></tr>
                        ]
                    }
                  </tbody>
                </Table>
               
                {this.props.cards.cardList?<nav>
                <Pagination2
                    activePage={this.state.activePage}
                    itemsCountPerPage={20}
                    totalItemsCount={this.props.cards.cardList?this.props.cards.cardList.meta.totalElements:null}
                    pageRangeDisplayed={5} 
                    onChange={this.handlePageChange}
                />
                </nav>:'' }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
//   console.log('State is ',state)
  return {
    cards:state.cards,
    banks:state.banks
  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    fetchCardsPaginated,
    addCardsToBank
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(AddBankCards);