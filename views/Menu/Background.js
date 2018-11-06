// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import { closeMenu } from '@site/core/menu/actions';

type Props = {
  children: React.Node,
  closeMenu: Function,
};

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

const Background = (props: Props) => (
  <div
    className={css(styles.background)}
    onClick={props.closeMenu}
  >
    {props.children}
  </div>
);

const mapDispatchToProps = {
  closeMenu,
};

export default connect(undefined, mapDispatchToProps)(Background);
