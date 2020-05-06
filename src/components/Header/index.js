import React from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import {
  Container,
  Logo,
  Cart,
  CartIcon,
  CartTextCircle,
  CartText,
} from './styles';

export default function Header({ navigation }) {
  const cartSize = useSelector((state) => state.cart.length);

  return (
    <Container>
      <Logo />

      <Cart
        onPress={() => {
          navigation.navigate('Cart');
        }}>
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
  // cartSize: PropTypes.number.isRequired,
};
