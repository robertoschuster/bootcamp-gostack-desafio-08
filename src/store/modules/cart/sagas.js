import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../../services/api';
// import history from '../../../services/history';
import { addToCartSuccess, updateAmountSuccess } from './actions';
import { formatPrice } from '../../../utils/formatt';

import NavigationService from '../../../services/navigation';

function* addToCart({ id }) {
  const product = yield select((state) => state.cart.find((p) => p.id === id));

  /** Valida o estoque */
  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  const currentAmount = product ? product.amount : 0;
  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    Alert.alert('Quantidade solicitada fora de estoque.');
    return;
  }

  /** Adiciona ou atualiza a quantidade */
  if (product) {
    yield put(updateAmountSuccess(product.id, product.amount + 1));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));

    NavigationService.navigate('Cart');
    // history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  /** Valida o estoque */
  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    Alert.alert('Quantidade solicitada fora de estoque.');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  // Considera apenas a ultima chamada (evita cliques duplicados)
  // Se clicar 3x adiciona apenas uma vez no carrinho
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
