// @flow
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { openMenu } from '@core/reducers/menu/actions';

const MenuButton = (): React.Node => {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      onClick={dispatch(openMenu())}
    >
      Open menu
    </button>
  );
};

export default MenuButton;
