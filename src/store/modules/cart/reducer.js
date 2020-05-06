import { produce } from 'immer';

export default function cart(state = [], action) {
  // console.tron.log('LOG: reducer->cart(state, action)', state, action);

  switch (action.type) {
    case '@cart/ADD_SUCCESS': {
      return produce(state, (draft) => {
        draft.push(action.product);
      });
    }

    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      return produce(state, (draft) => {
        const index = draft.findIndex((p) => p.id === action.id);

        if (index >= 0) {
          draft[index].amount = Number(action.amount);
        }
      });
    }

    case '@cart/REMOVE':
      return produce(state, (draft) => {
        const index = draft.findIndex((p) => p.id === action.id);

        if (index >= 0) {
          draft.splice(index, 1);
        }
      });

    default: {
      return state;
    }
  }
}
