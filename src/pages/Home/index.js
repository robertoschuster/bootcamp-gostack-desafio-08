import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    addToCartRequest: PropTypes.func.isRequired,
    amount: PropTypes.shape().isRequired,
  };

  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('products');

    const data = response.data.map((product) => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  handleNavigate = () => {
    const { navigation } = this.props;
    navigation.navigate('Cart');
  };

  handleAddToCart = (id) => {
    const { addToCartRequest } = this.props;
    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <Container>
        <ListWrapper>
          <List
            horizontal
            // onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
            // onEndReached={this.handleLoadMore} // Função que carrega mais itens
            // ListFooterComponent={this.renderFooter}
            // onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
            // refreshing={loading}
            data={products}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => {
              return (
                <Product key={item.id}>
                  <Image source={{ uri: item.image }} />
                  <Title>{item.title}</Title>
                  <Price>{formatPrice(item.price)}</Price>
                  <Button onPress={() => this.handleAddToCart(item.id)}>
                    <ButtonAmount>
                      <ButtonIcon />
                      <ButtonAmountText>
                        {amount[item.id] || 0}
                      </ButtonAmountText>
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
}

Home.navigationOptions = {
  title: 'Loja',
};

const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
