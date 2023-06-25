import { CART_ACTIONS } from '../types';

export const shippingInitialState = {
  address: '',
  city: '',
  postalCode: '',
  country: '',
};

export type ShippingStateTypes = typeof shippingInitialState;

export type CartActionTypes =
  | {
      type: CART_ACTIONS.CART_ADD_ITEM;
      payload: (typeof cartInitialState.cartItems)[0];
    }
  | { type: CART_ACTIONS.CART_REMOVE_ITEM; payload: string }
  | {
      type: CART_ACTIONS.CART_SAVE_SHIPPING_ADDRESS;
      payload: ShippingStateTypes;
    }
  | { type: CART_ACTIONS.CART_SAVE_PAYMENT_METHOD; payload: string };

const cartInitialState = {
  paymentMethod: '',
  cartItems: [
    {
      product: '',
      name: '',
      image: '',
      price: 0,
      countInStock: 0,
      qty: 0,
    },
  ],
};

const cartState = {
  ...cartInitialState,
  shippingAddress: shippingInitialState,
};

type cartReducerTypes = typeof cartState;

export const cartReducer = (
  state = cartState,
  action: CartActionTypes
): cartReducerTypes => {
  switch (action.type) {
    case CART_ACTIONS.CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_ACTIONS.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_ACTIONS.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_ACTIONS.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};
