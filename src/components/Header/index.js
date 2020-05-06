import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {
  Container,
  Logo,
  Cart,
  CartIcon,
  CartTextCircle,
  CartText,
} from './styles';

function Header({ navigation, cartSize }) {
  return (
    <Container>
      <Logo />

      <Cart
        onPress={() => {
          navigation.navigate('Cart');
        }}
      >
        <CartIcon />
        <CartTextCircle>
          <CartText>{cartSize}</CartText>
        </CartTextCircle>
      </Cart>
    </Container>
  );
}

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  cartSize: PropTypes.number.isRequired,
};

// Header.defaultProps = {
//   prop1: { foobar: 'foobar' },
// };

export default connect((state) => ({
  cartSize: state.cart.length,
}))(Header);
