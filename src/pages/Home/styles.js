import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { darken } from 'polished';
import Icon from '../../components/Icon';
import colors from '../../styles/colors';
/**
 * Home
 */

export const Container = styled.View`
  flex: 1;
`;

/**
 * Lista
 */

export const ListWrapper = styled.View`
  /* background: greenyellow; */
`;

export const List = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
})``;

export const Product = styled.View`
  background: ${colors.light};
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  width: 220px;
`;

export const Image = styled.Image`
  height: 200px;
  width: 200px;
  background: ${colors.grey};
  border-radius: 4px;
`;

export const Title = styled.Text`
  font-size: 16px;
`;

export const Price = styled.Text`
  margin: 14px 0px;
  font-size: 20px;
  font-weight: bold;
`;

/** Botão */

export const Button = styled.TouchableOpacity`
  background: ${colors.primary};
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  margin-top: auto;
`;

export const ButtonAmount = styled.View`
  padding: 12px;
  background: ${darken(0.03, colors.primary)};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const ButtonIcon = styled(Icon).attrs({
  name: 'add-shopping-cart',
  color: colors.light,
  size: 25,
})``;

export const ButtonAddText = styled.Text`
  flex: 1;
  color: ${colors.light};
  font-weight: bold;
  text-align: center;
`;

export const ButtonAmountText = styled.Text`
  color: ${colors.light};
  margin: 0px 4px 0px 10px;
`;
