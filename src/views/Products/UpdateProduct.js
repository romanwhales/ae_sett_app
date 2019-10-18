import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, TabContent, TabPane,FormGroup,Label,Input,Alert,ControlLabel,FormControl} from 'reactstrap';
import CSVReader from "react-csv-reader";
import { Field, reduxForm } from 'redux-form';
import {FormattedMessage,FormattedDate, FormattedTime} from 'react-intl';

import {updateProduct} from '../../actions/products';
import {getProcessor,getSubGroups} from '../../actions/processor';
import ProductForm from '../Settlement/productForm';


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import readXlsxFile from 'read-excel-file'

class UpdateProduct extends Component {
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleChangeFriendlyName = this.handleChangeFriendlyName.bind(this);
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
    this.handleChangeProcessor = this.handleChangeProcessor.bind(this);
    this.handleChangeSubGroup = this.handleChangeSubGroup.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 0,
      mappedFields:[],
      fileName:'',
      accountNumber:'',
      name_of_product:'',
      headers_included:true,
      friendlyName:'',
      currency:'naira',
      products:[],
      subGroupId:'',
    };
  }
  componentWillMount(){
    // let product_name = this.props.formState.processors.subGroups.data.filter(item => item.id == this.props.match.params.id);
    // this.setState({name_of_product:product_name[0].name});
    this.props.getProcessor();
    // this.props.getSubGroups(this.props.match.params.id);
  }
  handleChangeProcessor(e){
    if(!e.target.value){
      return;
    }
    let filtered_subgroup = this.props.processorList.data.filter(item=>item.name === e.target.value);
    this.setState({products:filtered_subgroup[0].subgroups})
  }
  handleChange(e) {
    this.setState({ accountNumber: e.target.value });
  }
  handleChangeSubGroup(e){
    this.setState({subGroupId:e.target.value});
  }
  handleChangeFriendlyName(e){
    this.setState({friendlyName:e.target.value});
  }
  handleChangeCurrency(e){
    this.setState({
      currency:e.target.value
    });
    console.log('State is ',this.state);
  }
  handleRadio(e){
    // console.log(e.target.value);
   this.setState({headers_included:e.target.value});
  }
  handleForce = (data,name) => {
    // Fetch the characters before the digits
    // let firstDigit = name.match(/\d/);
    // let indexed2 = name.indexOf(firstDigit);
    // let extracted_name = name.substr(0,indexed2);

    //getting first digit after underscore
    // var n = name.match(/\_(\d+)/);
    //  var n = name.match(/\_(\d{4})/);
    // let indexed3 = name.indexOf(n[0]);
    // let extracted_name3 = name.substr(0,indexed3);
    

    // remove the last underscore
    // let extracted_name_final = extracted_name.replace(/_([^_]*)$/,'$1');
    // this.setState({mappedFields:data[0],fileName:extracted_name_final});
    let name_split= name.split('.');
    this.setState({mappedFields:data[0],friendlyName:name_split[0],fileName:name});
  };
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  onSubmit = (values) =>{
    console.log('Values are ',values);
    console.log(this.state);
    debugger;
    //Different Line items Obects instantiation
    let receivable_payload ={};
    let payable_payload ={};
    let commission_payload ={};
    let narration_payload = {};
    let transaction_payload = {};
    let value_payload = {};
    let extra1_payload = {};
    let extra2_payload = {};
    let extra3_payload = {};
    let extra4_payload = {};
    let extra5_payload ={};
    
    var payload_mappings =[];
     //Formatting the form values into the payload format
    let array_gotten = Object.keys(values);
    array_gotten.forEach((item,index,array)=>{
      if(item.startsWith('receivab')){
        if(item == 'receivable'){
          
          if(values[item][0].operator){
            receivable_payload.filter ={}
            receivable_payload.filter.selectors =[];
            receivable_payload.filter.operator = values[item][0].operator;
            delete values[item][0].operator;
            values[item].forEach(item2=>{
              
              receivable_payload.filter.selectors.push(item2);
            })
            // receivable_payload.filter.selectors.push(values[item])
          }
          
        }else{
          receivable_payload.name = 'receivable';
          let name_of_property = item.match(/[^_]*$/)[0];
          receivable_payload[name_of_property] = values[item];
        }
      }
      else if(item.startsWith('payab')){
        if(item == 'payable'){

          if(values[item][0].operator){
            payable_payload.filter ={}
            payable_payload.filter.selectors =[];
            payable_payload.filter.operator = values[item][0].operator;
            delete values[item][0].operator;
            values[item].forEach(item2=>{
              payable_payload.filter.selectors.push(item2);
            })
            // receivable_payload.filter.selectors.push(values[item])
          }
          
        }else{
          payable_payload.name = 'payable';
          let name_of_property = item.match(/[^_]*$/)[0];
          payable_payload[name_of_property] = values[item]
        }
      }
      else if(item.startsWith('commiss')){
        if(item == 'commission'){
          if(values[item][0].operator){
            commission_payload.filter ={}
            commission_payload.filter.selectors =[];
            commission_payload.filter.operator = values[item][0].operator;
            delete values[item][0].operator;
            values[item].forEach(item2=>{
              commission_payload.filter.selectors.push(item2);
            })
            // receivable_payload.filter.selectors.push(values[item])
          }
        }else{
          commission_payload.name = 'commission';
          let name_of_property = item.match(/[^_]*$/)[0];
          commission_payload[name_of_property] = values[item];
        }
      }
      else if(item.startsWith('narrati')){
        if(item == 'narration'){
          if(values[item][0].operator){
            narration_payload.filter ={}
            narration_payload.filter.selectors =[];
            narration_payload.filter.operator = values[item][0].operator;
            delete values[item][0].operator;
            values[item].forEach(item2=>{
              narration_payload.filter.selectors.push(item2);
            })
            // receivable_payload.filter.selectors.push(values[item])
          }
        }else{
          narration_payload.name = 'narration';
          let name_of_property = item.match(/[^_]*$/)[0];
          narration_payload[name_of_property] = values[item]
        }
      }else if(item.startsWith('transacti')){
          if(item == 'transaction'){
            transaction_payload.filter ={}
            transaction_payload.filter.selectors =[];
            transaction_payload.filter.operator = values[item][0].operator;
            delete values[item][0].operator;
            debugger;
            values[item].forEach(item2=>{
              transaction_payload.filter.selectors.push(item2);
            })
          }else{
            transaction_payload.name ='transactionDate';
            let name_of_property = item.match(/[^_]*$/)[0];
            transaction_payload[name_of_property] = values[item]
          }
      }else if(item.startsWith('valu')){
          if(item == 'value'){
            value_payload.filter ={}
            value_payload.filter.selectors =[];
            value_payload.filter.operator = values[item][0].operator;
            delete values[item][0].operator;
            values[item].forEach(item2=>{
              value_payload.filter.selectors.push(item2);
            })
          }else{
            value_payload.name = 'valueDate';
            let name_of_property = item.match(/[^_]*$/)[0];
            value_payload[name_of_property] = values[item]
          }
          
        
      }else if(item.startsWith('extra1')){
          if(item == 'extra1filter'){
            extra1_payload.filter ={}
            extra1_payload.filter.selectors =[];
            extra1_payload.filter.operator = values[item][0].operator;
            delete values[item][0].operator;
            values[item].forEach(item2=>{
              extra1_payload.filter.selectors.push(item2);
            })
          }else{
            extra1_payload.name = 'extra1';
            let name_of_property = item.match(/[^_]*$/)[0];
            extra1_payload[name_of_property] = values[item]
          }
      }else if(item.startsWith('extra2')){
          if(item =='extra2filter'){
            extra2_payload.filter ={}
            extra2_payload.filter.selectors =[];
            extra2_payload.filter.operator = values[item][0].operator;
            delete values[item][0].operator;
            values[item].forEach(item2=>{
              extra2_payload.filter.selectors.push(item2);
            })
          }else{
            extra2_payload.name = 'extra2';
            let name_of_property = item.match(/[^_]*$/)[0];
            extra2_payload[name_of_property] = values[item]
          }  
      }else if(item.startsWith('extra3')){
        if(item == 'extra3filter'){
          extra3_payload.filter ={}
          extra3_payload.filter.selectors =[];
          extra3_payload.filter.operator = values[item][0].operator;
          delete values[item][0].operator;
          values[item].forEach(item2=>{
            extra3_payload.filter.selectors.push(item2);
          })
        }else{
          extra3_payload.name = 'extra3';
          let name_of_property = item.match(/[^_]*$/)[0];
          extra3_payload[name_of_property] = values[item]
        }
          
        
      }else if(item.startsWith('extra4')){
        if(item == 'extra4filter'){
          extra4_payload.filter ={}
          extra4_payload.filter.selectors =[];
          extra4_payload.filter.operator = values[item][0].operator;
          delete values[item][0].operator;
          values[item].forEach(item2=>{
            extra4_payload.filter.selectors.push(item2);
          })
        }else{
          extra4_payload.name = 'extra4';
          let name_of_property = item.match(/[^_]*$/)[0];
          extra4_payload[name_of_property] = values[item]
        }
          
        
      }else if(item.startsWith('extra5')){
        if(item == 'extra5filter'){
          extra5_payload.filter ={}
          extra5_payload.filter.selectors =[];
          extra5_payload.filter.operator = values[item][0].operator;
          delete values[item][0].operator;
          values[item].forEach(item2=>{
            extra5_payload.filter.selectors.push(item2);
          })
        }else{
          extra5_payload.name = 'extra5';
          let name_of_property = item.match(/[^_]*$/)[0];
          extra5_payload[name_of_property] = values[item]
        }
      }
    })
    if(Object.keys(receivable_payload).length > 0){
      payload_mappings.push(receivable_payload);
    }
    if(Object.keys(payable_payload).length > 0){
      payload_mappings.push(payable_payload);
    }
    if(Object.keys(commission_payload).length > 0){
      payload_mappings.push(commission_payload);
    }
    if(Object.keys(narration_payload).length > 0){
      payload_mappings.push(narration_payload);
    }
    if(Object.keys(transaction_payload).length > 0){
      payload_mappings.push(transaction_payload);
    }
    if(Object.keys(value_payload).length > 0){
      payload_mappings.push(value_payload);
    }
    if(Object.keys(extra1_payload).length > 0){
      payload_mappings.push(extra1_payload);
    }
    if(Object.keys(extra2_payload).length > 0){
      payload_mappings.push(extra2_payload);
    }
    if(Object.keys(extra3_payload).length > 0){
      payload_mappings.push(extra3_payload);
    }
    if(Object.keys(extra4_payload).length > 0){
      payload_mappings.push(extra4_payload);
    }
    if(Object.keys(extra5_payload).length > 0){
      payload_mappings.push(extra5_payload);
    }

    // payload_mappings.push(receivable_payload,payable_payload, commission_payload,narration_payload,transaction_payload,value_payload,extra1_payload,extra2_payload,extra3_payload,extra4_payload,extra5_payload);
    let payload ={};
    payload.name = this.state.fileName;
    payload.friendlyName = this.state.friendlyName;
    payload.accountNumber = this.state.accountNumber;
    payload.currency = this.state.currency;
    payload.mapping ={};
    debugger;
    if(values.filters){
      let operatorValue = values.filters[0].operator;
      delete values.filters[0].operator;
      payload.mapping.filter = {
        operator:operatorValue,
        selectors:values.filters
      }
      
    }else{
      payload.mapping.filter = null;
    }
    
    payload.mapping.mappings = payload_mappings;
    payload.mapping.hasHeader = Boolean(this.state.headers_included);
    // console.log('State is ',this.state.subGroupId);
    // console.log('id is ',this.props.match.params.id);
    //post to the action
    this.props.updateProduct(payload,this.state.subGroupId,this.props.match.params.id);
  }
  handleFileChange(value){

    const file = value.target.files[0];
    readXlsxFile(file).then((rows) => {
        debugger;
        // `rows` is an array of rows
        // each row being an array of cells.
        // console.log('Rows are ',rows);
      })
    return;
  }

  render() {
    console.log('Props for Settlement ',this.props);

    // console.log('State is ',this.state);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-sitemap"></i><strong>{this.state.name_of_product} Product Update</strong> 
                {/* <div className="card-header-actions">
                  <Badge>NEW</Badge>
                </div> */}
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    {this.props.productUpdatedSuccess?<Alert color="success">
                    <FormattedMessage id="Success: Product Updated Successfully!" defaultMessage="Success: Product Updated Successfully!"/>
                    
                    </Alert>:null}
                  </Col>
                  <Col xs="12">
                    {this.props.formState.products.productCreatedError?<Alert color="danger">
                        Error!: An Error occured while adding Product! 
                    </Alert>:null}
                  </Col>
                  <Col xs="12">
                    <FormGroup row>
                      <Col md="2">
                        <Label htmlFor="file-input">Upload Sample File</Label>
                      </Col>
                      <Col xs="12" md="10">
                      <CSVReader
                          cssClass="react-csv-input"
                          onFileLoaded={this.handleForce}
                        />
                        {/* <Input type="file" id="file-input" name="file-input" /> */}
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="2">
                    <Label htmlFor="file-input">Headers Included</Label>
                  </Col>
                  <Col md="9">
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio1" value="true" checked={this.state.headers_included === "true"} onChange={this.handleRadio}/>
                        <Label className="form-check-label" check htmlFor="inline-radio1">Yes</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio2" value="false" onChange={this.handleRadio} checked={this.state.headers_included === "false"}/>
                        <Label className="form-check-label" check htmlFor="inline-radio2" >No</Label>
                      </FormGroup>
                    </Col>
                </Row>
                <Row>
                  <Col xs="12">
                  <FormGroup row>
                      <Col md="2">
                        <Label htmlFor="file-input">Enter Account Number</Label>
                      </Col>
                      <Col xs="12" md="10">
                        <Input type="text" id="text-input" name="text-input" placeholder="Enter Account Number" onChange={this.handleChange}
            value={this.state.accountNumber} required/>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup row>
                      <Col md="2">
                       <Label htmlFor="file-input">Enter Friendly Name</Label>
                      </Col>
                      <Col md="10" xs="12">
                      <Input type="text" id="text-input" name="text-input" placeholder="Enter Friendly Name" onChange={this.handleChangeFriendlyName}
            value={this.state.friendlyName} required/>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup row>
                        <Col md="2">
                          <Label htmlFor="select">Select Currency</Label>
                        </Col>
                        <Col xs="12" md="10">
                          <Input type="select" name="select" id="select" value={this.state.currency} onChange={this.handleChangeCurrency} >
                            <option value="">Please select Currency</option>
                            <option value="naira">Naira</option>
                            <option value="pounds">Pounds</option>
                            <option value="dollars">Dollars</option>
                          </Input>
                        </Col>
                      </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                      <FormGroup row>
                        <Col md="2">
                          <Label htmlFor="select_subgroup">Select Processor</Label>
                        </Col>
                        <Col xs="12" md="10">
                            <Input type="select" name="select" id="select" value={this.state.subgroup} onChange={this.handleChangeProcessor} >
                              <option value="">Please select Processor</option>
                              {
                                  this.props.processorList ? this.props.processorList.data.map((item,index)=>
                                  <option key={index} value={item.name}>{item.name}</option>):null
                              }
                            </Input>
                          </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                        <FormGroup row>
                            <Col md="2">
                              <Label htmlFor="select_product">Select SubGroup</Label>
                            </Col>
                            <Col xs="12" md="10">
                            <Input type="select" name="select" id="select" value={this.state.product} onChange={this.handleChangeSubGroup} >
                              <option value="">Please SubGroup</option>
                              {
                                  this.state.products ? this.state.products.map((item,index)=>
                                  <option key={index} value={item.id}>{item.name}</option>):null
                              }
                            </Input>
                          </Col>
                        </FormGroup>
                    </Col>
                  </Row>
                <Row>
                
                  <Col xs="4">
                    <ListGroup id="list-tab" role="tablist">
                      <ListGroupItem onClick={() => this.toggle(0)} action active={this.state.activeTab === 0} >Receivable</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle(1)} action active={this.state.activeTab === 1} >Payable</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle(2)} action active={this.state.activeTab === 2} >Commission</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle(3)} action active={this.state.activeTab === 3} >Narration</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle(4)} action active={this.state.activeTab === 4} >Transaction Date</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle(5)} action active={this.state.activeTab === 5} >Value Date</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle(6)} action active={this.state.activeTab === 6} >Filters</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle(7)} action active={this.state.activeTab === 7} >Extra 1</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle(8)} action active={this.state.activeTab === 8} >Extra 2</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle(9)} action active={this.state.activeTab === 9} >Extra 3</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle(10)} action active={this.state.activeTab === 10} >Extra 4</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle(11)} action active={this.state.activeTab === 11} >Extra 5</ListGroupItem>
                    </ListGroup>
                  </Col>
                  <Col xs="8">
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId={0} >
                        <ProductForm {...this.props} mappedFields={this.state.mappedFields} receivable="true" onSubmit = {this.onSubmit}/>
                      </TabPane>
                      <TabPane tabId={1}>
                        <ProductForm {...this.props} mappedFields={this.state.mappedFields} payable="true" onSubmit = {this.onSubmit}/>
                      </TabPane>
                      <TabPane tabId={2}>
                        <ProductForm {...this.props} mappedFields={this.state.mappedFields} commission="true" onSubmit = {this.onSubmit}/>
                      </TabPane>
                      <TabPane tabId={3}>
                        <ProductForm {...this.props} mappedFields={this.state.mappedFields} narration="true" onSubmit = {this.onSubmit}/>
                      </TabPane>
                      <TabPane tabId={4}>
                        <ProductForm {...this.props} mappedFields={this.state.mappedFields} transaction="true" onSubmit = {this.onSubmit}/>
                      </TabPane>
                      <TabPane tabId={5}>
                        <ProductForm {...this.props} mappedFields={this.state.mappedFields} value="true" onSubmit = {this.onSubmit}/>
                      </TabPane>
                      <TabPane tabId={6}>
                        <ProductForm {...this.props} mappedFields={this.state.mappedFields} filter="true" onSubmit = {this.onSubmit}/>
                      </TabPane>
                      <TabPane tabId={7}>
                        <ProductForm {...this.props} mappedFields={this.state.mappedFields} extra1="true" onSubmit = {this.onSubmit}/>
                      </TabPane>
                      <TabPane tabId={8}>
                        <ProductForm {...this.props} mappedFields={this.state.mappedFields} extra2="true" onSubmit = {this.onSubmit}/>
                      </TabPane>
                      <TabPane tabId={9}>
                        <ProductForm {...this.props} mappedFields={this.state.mappedFields} extra3="true" onSubmit = {this.onSubmit}/>
                      </TabPane>
                      <TabPane tabId={10}>
                        <ProductForm {...this.props} mappedFields={this.state.mappedFields} extra4="true" onSubmit = {this.onSubmit}/>
                      </TabPane>
                      <TabPane tabId={11}>
                        <ProductForm {...this.props} mappedFields={this.state.mappedFields} extra5="true" onSubmit = {this.onSubmit}/>
                      </TabPane>
                    </TabContent>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('State is ',state);
  return {
    formState:state,
    processorList:state.processors.processors,
    productUpdatedSuccess:state.products.productUpdated,
  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    updateProduct,
    getProcessor,
    getSubGroups
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateProduct);
