import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import { getStuff } from '@site/core/prompter/actions';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '250px',
    backgroundColor: 'white',
  },
});

const MenuList = props => (
  <div
    className={css(styles.container)}
    onClick={(e) => { e.stopPropagation(); }}
  >
    list
    <button
      type="button"
      onClick={props.getStuff}
    >
      Click me
    </button>
  </div>
);

MenuList.propTypes = {
  getStuff: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getStuff,
};

export default connect(undefined, mapDispatchToProps)(MenuList);
