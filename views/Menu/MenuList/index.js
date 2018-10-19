import React from 'react';
import { StyleSheet, css } from 'aphrodite';

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

const MenuList = () => (
  <div
    className={css(styles.container)}
    onClick={e => { e.stopPropagation(); }}
  >
    list
  </div>
);

export default MenuList;
