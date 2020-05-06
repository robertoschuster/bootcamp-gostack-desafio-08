import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import * as CartActions from '../../store/modules/cart/actions';

import api from '../../services/api';

import {
  Container,
  ListWrapper,
  List,
  Product,
  Title,
  Price,
  Image,
  Button,
  ButtonAddText,
  ButtonAmount,
  ButtonAmountText,
  ButtonIcon,
} from './styles';

import { formatPrice } from '../../utils/formatt';

export default function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const amount = useSelector((state) =>
    state.cart.reduce((amountSum, product) => {
      amountSum[product.id] = product.amount;
      return amountSum;
    }, {})
  );

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');

      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddToCart(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <Container>
      <ListWrapper>
        <List
          horizontal
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => {
            return (
              <Product key={item.id}>
                <Image source={{ uri: item.image }} />
                <Title>{item.title}</Title>
                <Price>{formatPrice(item.price)}</Price>
                <Button onPress={() => handleAddToCart(item.id)}>
                  <ButtonAmount>
                    <ButtonIcon />
                    <ButtonAmountText>{amount[item.id] || 0}</ButtonAmountText>
                  </ButtonAmount>
                  <ButtonAddText>ADICIONAR</ButtonAddText>
                </Button>
              </Product>
            );
          }}
        />
      </ListWrapper>
    </Container>
  );
}

// Home.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
//   addToCartRequest: PropTypes.func.isRequired,
//   amount: PropTypes.shape().isRequired,
// };
