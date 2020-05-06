import React from 'react';
// import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import * as CartActions from '../../store/modules/cart/actions';

import {
  EmptyContainer,
  EmptyIcon,
  EmptyText,
  Container,
  ProductList,
  Product,
  ProductInfo,
  ProductImage,
  ProductText,
  ProductTitle,
  ProductPrice,
  ProductRemove,
  ProductRemoveIcon,
  ProductControls,
  ProductSub,
  ProductAdd,
  ProductSubIcon,
  ProductAddIcon,
  ProductInput,
  ProductSubtotal,
  Total,
  TotalText,
  TotalAmount,
  CheckoutButton,
  CheckoutIcon,
  CheckoutButtonText,
} from './styles';
import { formatPrice } from '../../utils/formatt';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) =>
    state.cart.map((product) => ({
      ...product,
      priceFormatted: formatPrice(product.price),
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  const total = useSelector((state) =>
    formatPrice(
      state.cart.reduce((totalSum, product) => {
        return totalSum + product.price * product.amount;
      }, 0)
    )
  );

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function loadCart() {
    return (
      <Container>
        <ProductList
          data={cart}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => {
            return (
              <Product key={item.id}>
                <ProductInfo>
                  <ProductImage source={{ uri: item.image }} />
                  <ProductText>
                    <ProductTitle>{item.title}</ProductTitle>
                    <ProductPrice>{item.priceFormatted}</ProductPrice>
                  </ProductText>
                  <ProductRemove
                    onPress={() =>
                      dispatch(CartActions.removeFromCart(item.id))
                    }>
                    <ProductRemoveIcon />
                  </ProductRemove>
                </ProductInfo>

                <ProductControls>
                  <ProductSub onPress={() => decrement(item)}>
                    <ProductSubIcon />
                  </ProductSub>
                  <ProductInput>{item.amount}</ProductInput>
                  <ProductAdd onPress={() => increment(item)}>
                    <ProductAddIcon />
                  </ProductAdd>
                  <ProductSubtotal>{item.subtotal}</ProductSubtotal>
                </ProductControls>
              </Product>
            );
          }}
        />

        <Total>
          <TotalText>TOTAL</TotalText>
          <TotalAmount>{total}</TotalAmount>
        </Total>
        <CheckoutButton>
          <CheckoutIcon />
          <CheckoutButtonText>FINALIZAR PEDIDO</CheckoutButtonText>
        </CheckoutButton>
      </Container>
    );
  }

  function loadEmptyCart() {
    return (
      <EmptyContainer>
        <EmptyIcon />
        <EmptyText>Seu carrinho está vazio.</EmptyText>
      </EmptyContainer>
    );
  }

  return cart.length > 0 ? loadCart() : loadEmptyCart();
}

// Cart.propTypes = {
//   navigation: PropTypes.shape({
//     getParam: PropTypes.func.isRequired,
//   }).isRequired,
//   cart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
//   total: PropTypes.string.isRequired,
//   updateAmountRequest: PropTypes.func.isRequired,
//   removeFromCart: PropTypes.func.isRequired,
// };
