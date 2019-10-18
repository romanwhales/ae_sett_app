import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import * as qs from 'query-string';
import CryptoJS from "crypto-js";
import Pagination2 from "react-js-pagination";

/**
 * Importing the charts
 */

import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from 'reactstrap';
// import Widget03 from '../../views/Widgets/Widget03'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import {fetchInterswitchComputationSummary} from '../../../actions/filesets';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Moment from 'react-moment';


// import Widget04 from '../../Utils/Widgets04';

// import 'moment/locale/pt';
// import 'moment/locale/es';
// import 'moment/locale/fr';

// import 'moment/locale/en-gb';
import {
 
  FormattedMessage
} from 'react-intl';

class InterswitchSettlementDailySummary extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.onDismissCreateSuccessAlert = this.onDismissCreateSuccessAlert.bind(this);
    
    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      startDate: moment(),
      endDate:moment(),
      activePage:1,
      bottomContributorAlertVisible:true,
    };
  }

  onDismissCreateSuccessAlert(){
    this.setState({bottomContributorAlertVisible:false});
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  componentWillMount(){
    
    this.props.fetchInterswitchComputationSummary(this.props.match.params.id,0)
    
  }


  handlePageChange = (pageNumber) => {
    let pageNumberParam = pageNumber - 1;
    this.props.fetchInterswitchComputationSummary(this.props.match.params.id,pageNumberParam);
    this.setState({activePage: pageNumber});
    // this.props.fetchOffices(pageNumber);
    // this.setState({activePage: pageNumber});
}

  render() {
    console.log('This props',this.props);
    console.log('Locale is ',moment.locale());

    
    // console.log('Language is ',navigator.language);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
              {this.props.bottomContributorsError?<Alert color="danger" className="text-center" isOpen={this.state.bottomContributorAlertVisible} toggle={this.onDismissCreateSuccessAlert}>
                {this.props.bottomContributorsError.data.message}
              </Alert>:null}
          </Col>
        </Row>
        <Row>
            <Col>
                {/* {this.props.banks.bankCreated ? <Alert color="success" isOpen={this.state.createSuccessAlertVisible} toggle={this.onDismissCreateSuccessAlert}>

                    <FormattedMessage id="Success: Bank Added Successfully!" defaultMessage="Success: Bank Added Successfully!" />
                </Alert> : null}

                {this.props.banks.bankUpdated ? <Alert color="success" isOpen={this.state.updateSuccessAlertVisible} toggle={this.onDismissUpdateSuccessAlert}>

                    <FormattedMessage id="Success: Bank Updated Successfully!" defaultMessage="Success: Bank Updated Successfully!" />
                </Alert> : null} */}
                <Card>
                    <CardHeader>

                        {/* <i class="fa fa-cog fa-spin"></i> */}
                        
                        <strong> {this.props.fileSets.interSwitchDailyComputationSummary ? <React.Fragment> 
                Interswitch's {this.props.fileSets.interSwitchDailyComputationSummary.data.content[0].dailyCom.batchDate} Details
                </React.Fragment> : ""}</strong>
                    </CardHeader>
                    <CardBody>
                        <Table hover bordered striped responsive size="sm" >
                            <thead>
                                <tr>
                                    {/* <th>
                                        #
                                    </th> */}
                                    <th><FormattedMessage id="Date" defaultMessage="Date" /></th>
                                    <th><FormattedMessage id="Type" defaultMessage="Type" /></th>
                                    <th><FormattedMessage id="Rate" defaultMessage="Rate" /></th>
                                    <th><FormattedMessage id="Category" defaultMessage="Category" /></th>
                                    <th><FormattedMessage id="Account Type" defaultMessage="Account Type" /></th>
                                    <th><FormattedMessage id="Total Amount" defaultMessage="Total Amount" /></th>
                                    <th><FormattedMessage id="Total Fee" defaultMessage="Total Fee" /></th>
                                    <th><FormattedMessage id="Sum Total Amount" defaultMessage="Sum Total Amount" /></th>
                                    <th><FormattedMessage id="Sum Total Fee" defaultMessage="Sum Total Fee" /></th>
                                    <th><FormattedMessage id="Grand Total" defaultMessage="Grand Total" /></th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.props.fileSets.interSwitchDailyComputationSummary
                                    ? [
                                        this.props.fileSets.interSwitchDailyComputationSummary.data.content.length > 0 ? this.props.fileSets.interSwitchDailyComputationSummary.data.content ? this.props.fileSets.interSwitchDailyComputationSummary.data.content.map((item, index) => (
                                            <tr key={index + 1}>
                                                {/* <td>{index + 1}</td> */}
                                                <td>{item.dailyCom['batchDate']}</td>
                                                <td>{item.type}</td>
                                                
                                                <td>
                                                   {item.conRate}
                                                </td>
                                                <td>
                                                   {item.category}
                                                </td>
                                                <td>
                                                   {item.accountType}
                                                </td>
                                                <td>
                                                   {item.totalAmt}
                                                </td>
                                                <td>
                                                   {item.totalFee}
                                                </td>
                                                <td>
                                                   {item.sumTotalAmt?item.sumTotalAmt:'N/A'}
                                                </td>
                                                <td>
                                                   {item.sumTotalFee?item.sumTotalFee:'N/A'}
                                                </td>
                                                <td>
                                                   {item.grandTotal? item.grandTotal:'N/A'}
                                                </td>
                                                
                                            </tr>
                                        )) : <tr><td colSpan="3"><p className="text-center text-danger"><FormattedMessage id="There are no banks created at the moment" defaultMessage="There are no banks created at the moment." /></p></td></tr> : <tr><td colSpan="4"><p className="text-center text-danger"><FormattedMessage id="There are no banks created at the moment" defaultMessage="There are no banks created at the moment." /></p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }


                            </tbody>
                        </Table>
                        {this.props.fileSets.interSwitchDailyComputationSummary ? <nav>
                            <Pagination2
                                activePage={this.state.activePage}
                                itemsCountPerPage={20}
                                totalItemsCount={this.props.fileSets.interSwitchDailyComputationSummary.data.content.length > 0 ? this.props.fileSets.interSwitchDailyComputationSummary.data.totalElements : null}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange}
                            />
                        </nav> : ''}
                    </CardBody>
                </Card>
            </Col>
        </Row>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('State is ',state);
  return {
    fileSets:state.fileSets
  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    fetchInterswitchComputationSummary
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(InterswitchSettlementDailySummary);
