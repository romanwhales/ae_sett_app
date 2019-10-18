import React, { Component } from 'react';
import { Col, Row,Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FormattedMessage} from 'react-intl';
// import EditAccountForm from './EditAccountForm';
import EditAffiliateForm from './editAffiliateForm';
import {fetchAffiliate,updateAffiliate} from '../../actions/affiliates';


class EditAffiliate extends Component{
    constructor(props){
        super(props);
        this.state = {
            
            
        }
    }

    componentWillMount(){
        this.props.fetchAffiliate(this.props.match.params.code);

    }

    
    // getSubGroup = (name ) => {
    //     debugger;
    //     if(this.props){
    //         // console.log('Props needed is ',this.props);
    //         let filtered_subgroup = this.props.processorData.data.filter(item=>item.name === name);
    //         this.setState({subgroups:filtered_subgroup[0].subgroups});
    //     }
        
    // }
    code:''
    onSubmit = (values) =>{
        this.code = values.code;
        this.props.updateAffiliate(values);
        
        
    }
    
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
            // console.log(this.props,prevProps);
            // debugger;
            if (this.props.affiliates.affiliateUpdated !== prevProps.affiliates.affiliateUpdated) {
                
                this.props.history.push(`/configuration/affiliates/${this.props.initialValues.code}/details`);
                
              }
        
        
      }
    // componentWillUnmount(){
    //     this.clearNotifications();
    // }
    // clearNotifications = () => {
    //     this.props.accountUpdated = null;
    // }
    render(){
        console.log(this.props);
        return(
            <div>
                <Row>
                    <Col>
                        
                        {this.props.affiliates.affiliateUpdated ? <Alert color="success" isOpen={this.state.updateSuccessAlertVisible} toggle={this.onDismissUpdateSuccessAlert}>

                            <FormattedMessage id="Success: Affiliate Updated Successfully!" defaultMessage="Success: Affiliate Updated Successfully!" />
                        </Alert> : null}
                    </Col>
                </Row>
                <EditAffiliateForm {...this.props} {...this.state}  onSubmit = {this.onSubmit}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('State is ',state);
    return {
        initialValues:state.affiliates.affiliate,
        affiliates:state.affiliates
    }
}
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchAffiliate,
        updateAffiliate
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(EditAffiliate);