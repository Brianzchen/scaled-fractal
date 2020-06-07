// @flow
import * as React from 'react';
import { useSelector } from 'react-redux';

import Background from './Background';
import MenuList from './MenuList';

const Menu = (): React.Node => {
  const open = useSelector((state) => state.menu.open);

  return open && (
    <Background>
      <MenuList />
    </Background>
  );
};

export default Menu;
