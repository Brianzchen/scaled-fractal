// @flow
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import { doStuff } from '@core/reducers/prompter/actions';

type Props = {
  doStuff: Function
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
      onClick={props.doStuff}
    >
      Click me
    </button>
  </div>
);

const mapDispatchToProps = {
  doStuff,
};

export default connect(undefined, mapDispatchToProps)(MenuList);
