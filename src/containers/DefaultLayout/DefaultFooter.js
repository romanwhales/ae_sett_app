import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {
    
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      
      <React.Fragment>
        {/* <span><a href="">ActivEdge</a> &copy; 2018 ActivEdge Technologies.</span> */}
        <span className="ml-auto"><FormattedMessage id="Powered By" defaultMessage="Powered By"/>&nbsp;
        <a href="">
        Introspec Financial Services.</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
