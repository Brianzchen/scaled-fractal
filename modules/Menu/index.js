import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Background from './Background';

const Menu = props => props.open && (
  <Background>
    test menu
  </Background>
);

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  open: state.menu.open,
});

export default connect(mapStateToProps)(Menu);
