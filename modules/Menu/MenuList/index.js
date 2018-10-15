import React from 'react';

import { container } from './index.css';

const MenuList = () => (
  <div
    className={container}
    onClick={e => { e.stopPropagation(); }}
  >
    list
  </div>
);

export default MenuList;
