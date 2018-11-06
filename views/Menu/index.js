// @flow
import React from 'react';
import { connect } from 'react-redux';

import Background from './Background';
import MenuList from './MenuList';

type Props = {
  open: boolean,
};

const Menu = (props: Props) => props.open && (
  <Background>
    <MenuList />
  </Background>
);

const mapStateToProps = state => ({
  open: state.menu.open,
});

export default connect(mapStateToProps)(Menu);
