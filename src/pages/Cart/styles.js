import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import Icon from '../../components/Icon';
import colors from '../../styles/colors';

/**
 * Empty
 */

export const EmptyContainer = styled.View`
  background: ${colors.light};
  height: 160px;
  padding: 10px;
  margin: 10px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const EmptyIcon = styled(Icon).attrs({
  name: 'remove-shopping-cart',
  color: colors.lightGrey,
  size: 70,
})``;

export const EmptyText = styled.Text`
  color: ${colors.grey};
  font-weight: bold;
  font-size: 22px;
`;

/**
 * Cart
 */

export const Container = styled.View`
  background: ${colors.light};
  flex: 1;
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
`;

export const ProductList = styled(FlatList).attrs({
  // showsVerticalScrollIndicator: false,
  // showsHorizontalScrollIndicator: false,
})`
  /* background: lightcoral; */
`;

/**
 * Product
 */
export const Product = styled.View`
  padding: 6px 0;
`;

/**
 * Product Info
 */

export const ProductInfo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ProductImage = styled.Image`
  height: 80px;
  width: 80px;
  background: ${colors.grey};
  border-radius: 4px;
`;

export const ProductText = styled.View`
  /* background: lightsalmon; */
  flex: 1;
  /* display: flex;
  flex-direction: column; */
  padding: 10px;
`;

export const ProductTitle = styled.Text`
  color: ${colors.dark};
`;

export const ProductPrice = styled.Text`
  color: ${colors.dark};
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
`;

export const ProductRemove = styled.TouchableOpacity`
  padding: 6px;
`;

export const ProductRemoveIcon = styled(Icon).attrs({
  name: 'delete-forever',
  color: colors.primary,
  size: 24,
})``;

/**
 * Product COntrols
 */

export const ProductControls = styled.View`
  background: ${colors.lightGrey};
  padding: 6px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ProductSub = styled.TouchableOpacity`
  padding: 6px;
`;

export const ProductSubIcon = styled(Icon).attrs({
  name: 'remove-circle-outline',
  color: colors.primary,
  size: 24,
})``;

export const ProductAdd = styled.TouchableOpacity`
  padding: 6px;
`;

export const ProductAddIcon = styled(Icon).attrs({
  name: 'add-circle-outline',
  color: colors.primary,
  size: 24,
})``;

export const ProductInput = styled.Text`
  color: ${colors.dark};
  background: ${colors.light};
  border-radius: 4px;
  padding: 6px;
  border: 1px solid #ddd;
  width: 60px;
`;

export const ProductSubtotal = styled.Text`
  color: ${colors.dark};
  font-size: 16px;
  font-weight: bold;
  margin-left: auto;
  padding: 6px;
`;

/**
 * Total
 */

export const Total = styled.View`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px;
  /* background: lightseagreen; */
`;

export const TotalText = styled.Text`
  color: ${colors.grey};
  font-weight: bold;
  font-size: 16px;
`;

export const TotalAmount = styled.Text`
  color: ${colors.dark};
  font-weight: bold;
  font-size: 30px;
`;

/**
 * Botão Finalizar
 */

export const CheckoutButton = styled.TouchableOpacity`
  margin-top: 10px;
  background: ${colors.primary};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

export const CheckoutIcon = styled(Icon).attrs({
  name: 'done',
  color: colors.light,
  size: 24,
})``;

export const CheckoutButtonText = styled.Text`
  color: ${colors.light};
  font-weight: bold;
  padding: 12px;
`;
