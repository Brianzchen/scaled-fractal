// @flow
import React from 'react';
import { connect } from 'react-redux';

import { openMenu } from '@site/core/menu/actions';

type Props = {
  openMenu: Function,
};

const MenuButton = (props: Props) => (
  <button
    type="button"
    onClick={props.openMenu}
  >
    Open menu
  </button>
);

const mapDispatchToProps = {
  openMenu,
};

export default connect(undefined, mapDispatchToProps)(MenuButton);
