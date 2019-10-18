import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Progress } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';
import ReactHtmlParser from 'react-html-parser';

const propTypes = {
  header: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  invert: PropTypes.bool,
  currencycode:PropTypes.string,
};

const defaultProps = {
  header: '87.500',
  icon: 'icon-people',
  color: 'info',
  value: '25',
  children: 'Visitors',
  currencycode:'',
  invert: false,
};

class Widget05 extends Component {
   
  render() {

    const { className, cssModule, header, icon, color, value, children, invert,currencycode, ...attributes } = this.props;

    // demo purposes only
    const progress = { style: '', color: color, value: value,currencycode:currencycode };
    const card = { style: '', bgColor: '', icon: icon };

    if (invert) {
      progress.style = 'progress-white';
      progress.color = '';
      card.style = 'text-white';
      card.bgColor = 'bg-' + color;
    }
    {console.log('Currency Code is',currencycode)}

    function createMarkup() {
        return {__html: 'First &middot; Second'};
      }
    

    const classes = mapToCssModules(classNames(className, card.style, card.bgColor), cssModule);
    progress.style = classNames('progress-xs mt-3 mb-0', progress.style);
    
    return (
        
      <Card className={classes} {...attributes}>
        <CardBody>
          <div className="h1 text-muted text-right mb-2">
            <i className={card.icon}></i>
          </div>
          

          <div className="h4 mb-0">  {currencycode?  ReactHtmlParser(currencycode) :''} {header}</div>
          <small className="text-muted text-uppercase font-weight-bold">{children}</small>
          <Progress className={progress.style} color={progress.color} value={progress.value} />

        </CardBody>
      </Card>
    );
  }
}

Widget05.propTypes = propTypes;
Widget05.defaultProps = defaultProps;

export default Widget05;