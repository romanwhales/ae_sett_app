import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Button,FormGroup,Label,Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ManualPostingForm from './ManualPostingForm';
import {fetchProducts,createProduct} from '../../actions/products';
import { manualBatchPosting } from '../../actions/batches';
import {getProcessor} from '../../actions/processor';
import {fetchAccounts} from '../../actions/accounts'; 
import './datepicker-modification.css';
import moment from 'moment';

class ManualPosting extends Component{
    constructor(props){
        super(props);
        this.state = {
            subgroups:[],
            currencyOptions:['Naira','Pounds','Dollars'],
            accountOptions:['Payable','Receivable','Income','Expense'],
            manualBatchCreatedStatus:true,
            focused:false,
            date: moment(),
        }
        
    }

    componentWillMount(){
        this.props.getProcessor();
        this.props.fetchAccounts();
    }

    onSubmit = (values) =>{
        values.batchDate = moment(this.state.date).format().split("T")[0];
        this.props.manualBatchPosting(values); 
        
    }
    onFocusChange=(focused) =>{
        this.setState({ focused:!this.state.focused });
    }
    onDateChange = (values) =>{
        console.log('Values is ',values);
        this.setState({date:values});
    //   debugger;
    }
    onDismissManualBatchCreatedStatus =() => {
        this.setState({manualBatchCreatedStatus:false});
    }

    componentDidUpdate(prevProps) {
        if(this.props.manualBatchCreated !== prevProps.manualBatchCreated){
            this.props.history.push(`/manualPostings`);
        }
        
      }
    render(){
        console.log('Props here is ',this.props);
        return(
            <div>
                <Row>
                    <Col>
                        {/* {this.props.manualBatchCreated?<Alert color="success">
                            Success: Account has been posted manually!
                        </Alert>:null} */}
                        {this.props.manualBatchCreated?[
                            this.props.manualBatchCreated.data.status == 202?<Alert color="warning" isOpen={this.state.manualBatchCreatedStatus} toggle={this.onDismissManualBatchCreatedStatus} key={1}>
                            {this.props.manualBatchCreated.data.message}
                        </Alert>:null
                            ]:['']
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.manualBatchCreatedError?<Alert color="danger">
                            Error: {this.props.manualBatchCreatedError.data.message}
                        </Alert>:null}
                    </Col>
                </Row>
                <ManualPostingForm {...this.props} {...this.state} onSubmit={this.onSubmit} onDateChange ={this.onDateChange} onFocusChange={this.onFocusChange} focused={this.state.focused}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    // console.log('Products State is ',state)
    return {
        processorData:state.processors.processors,
        productCreated:state.processors.createdProduct,
        manualBatchCreated:state.batches.manualAddBatch,
        accountList:state.accounts.accountList,
        manualBatchCreatedError:state.batches.manualAddBatchError,

    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchProducts,
        getProcessor,
        createProduct,
        manualBatchPosting,
        fetchAccounts
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ManualPosting);