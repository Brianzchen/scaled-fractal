// @flow
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import { doStuff } from '@core/reducers/prompter/actions';

const MenuList = (): React.Node => {
  const dispatch = useDispatch();

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

  return (
    <div
      className={css(styles.container)}
      onClick={(e) => { e.stopPropagation(); }}
    >
      list
      <button
        type="button"
        onClick={dispatch(doStuff())}
      >
        Click me
      </button>
    </div>
  );
};

export default MenuList;
