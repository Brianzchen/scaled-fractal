// @flow
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import { getStuff } from '@site/core/prompter/actions';

type Props = {
  getStuff: Function
};

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

const MenuList = (props: Props) => (
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

const mapDispatchToProps = {
  getStuff,
};

export default connect(undefined, mapDispatchToProps)(MenuList);
