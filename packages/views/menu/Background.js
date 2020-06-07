// @flow
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import { closeMenu } from '@core/reducers/menu/actions';

type Props = {
  children: React.Node,
};

const Background = (props: Props): React.Node => {
  const dispatch = useDispatch();

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

  return (
    <div
      className={css(styles.background)}
      onClick={dispatch(closeMenu())}
    >
      {props.children}
    </div>
  );
};

export default Background;
