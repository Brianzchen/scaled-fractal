import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import MenuButton from './MenuButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
  },
});

const Header = () => (
  <div className={css(styles.container)}>
    <MenuButton />
    the rest of the header
  </div>
);

export default Header;
