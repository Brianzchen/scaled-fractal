import React from 'react';

import { container } from './index.css';

import MenuButton from './MenuButton';

const Header = () => (
  <div className={container}>
    <MenuButton />
    the rest of the header
  </div>
);

export default Header;
