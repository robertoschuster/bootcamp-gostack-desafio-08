import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

function Cart({ cart, total, updateAmountRequest, removeFromCart }) {
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  function loadCart() {
    return (
      <Container>
        <ProductList
          // onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
          // onEndReached={this.handleLoadMore} // Função que carrega mais itens
          // ListFooterComponent={this.renderFooter}
          // onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
          // refreshing={loading}
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
                  <ProductRemove onPress={() => removeFromCart(item.id)}>
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

Cart.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  total: PropTypes.string.isRequired,
  updateAmountRequest: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

Cart.navigationOptions = {
  title: 'Carrinho',
};

const mapStateToProps = (state) => ({
  cart: state.cart.map((product) => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subtotal: formatPrice(product.price * product.amount),
  })),

  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
