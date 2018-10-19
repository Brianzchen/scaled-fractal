import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import { closeMenu } from '@site/core/menu/actions';

const styles = StyleSheet.create({
  background: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#444444',
  },
});

const Background = props => (
  <div
    className={css(styles.background)}
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
