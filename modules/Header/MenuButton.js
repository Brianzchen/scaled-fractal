import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { openMenu } from '@site/core/menu/actions';

const MenuButton = props => (
  <button
    type="button"
    onClick={props.openMenu}
  >
    Open menu
  </button>
);

MenuButton.propTypes = {
  openMenu: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  openMenu,
};

export default connect(undefined, mapDispatchToProps)(MenuButton);
