import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closeMenu } from '@tabdigital/events/menu/actions';

import { background } from './Background.css';

const Background = props => (
  <div
    className={background}
    onClick={props.closeMenu}
  >
    {props.children}
  </div>
);

Background.propTypes = {
  children: PropTypes.node.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  closeMenu,
};

export default connect(undefined, mapDispatchToProps)(Background);
