import { Order_Actions } from '../types';
import { shippingInitialState } from './cartReducers';

export const orderPayload = {
  orderItems: [
    {
      product: '',
      name: '',
      image: '',
      price: 0,
      countInStock: 0,
      qty: 0,
    },
  ],
  shippingAddress: shippingInitialState,
  paymentMethod: '',
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
};

export interface OrderInitialType {
  loading?: boolean;
  order?: typeof orderPayload & {
    _id?: string;
    user?: {
      name: string;
      email: string;
    };
    isPaid?: boolean;
    paidAt?: string;
    isDelivered?: boolean;
    deliveredAt?: string;
  };
  error?: Error;
  success?: boolean;
}

export type OrderActionTypes =
  | { type: Order_Actions.ORDER_CREATE_REQUEST }
  | { type: Order_Actions.ORDER_CREATE_SUCCESS; payload: typeof orderPayload }
  | { type: Order_Actions.ORDER_CREATE_FAIL; payload: Error }
  | { type: Order_Actions.ORDER_DETAIL_REQUEST }
  | { type: Order_Actions.ORDER_DETAIL_SUCCESS; payload: typeof orderPayload }
  | { type: Order_Actions.ORDER_DETAIL_FAIL; payload: Error }
  | { type: Order_Actions.ORDER_PAY_REQUEST }
  | { type: Order_Actions.ORDER_PAY_SUCCESS; payload: Error }
  | { type: Order_Actions.ORDER_PAY_FAIL; payload: Error }
  | { type: Order_Actions.ORDER_PAY_RESET }
  | { type: Order_Actions.ORDER_LIST_MY_REQUEST }
  | { type: Order_Actions.ORDER_LIST_MY_RESET }
  | {
      type: Order_Actions.ORDER_LIST_MY_SUCCESS;
      payload: (typeof orderPayload)[];
    }
  | { type: Order_Actions.ORDER_LIST_MY_FAIL; payload: Error }
  | { type: Order_Actions.ORDER_LIST_REQUEST }
  | { type: Order_Actions.ORDER_LIST_SUCCESS; payload: (typeof orderPayload)[] }
  | { type: Order_Actions.ORDER_LIST_FAIL; payload: Error }
  | { type: Order_Actions.ORDER_DELIVER_REQUEST }
  | { type: Order_Actions.ORDER_DELIVER_RESET }
  | { type: Order_Actions.ORDER_DELIVER_SUCCESS; payload: Error }
  | { type: Order_Actions.ORDER_DELIVER_FAIL; payload: Error };

export const orderCreateReducer = (
  state: OrderInitialType = { order: orderPayload },
  action: OrderActionTypes
): OrderInitialType => {
  switch (action.type) {
    case Order_Actions.ORDER_CREATE_REQUEST:
      return { ...state, loading: true };
    case Order_Actions.ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, order: action.payload, success: true };
    case Order_Actions.ORDER_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailReducer = (
  state: OrderInitialType = { order: orderPayload },
  action: OrderActionTypes
): OrderInitialType => {
  switch (action.type) {
    case Order_Actions.ORDER_DETAIL_REQUEST:
      return { ...state, loading: true };
    case Order_Actions.ORDER_DETAIL_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case Order_Actions.ORDER_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

interface OrderPayType {
  loading?: boolean;
  success?: boolean;
  error?: Error;
}

export const orderPayReducer = (
  state: OrderPayType = { loading: false },
  action: OrderActionTypes
): OrderPayType => {
  switch (action.type) {
    case Order_Actions.ORDER_PAY_REQUEST:
      return { ...state, loading: true };
    case Order_Actions.ORDER_PAY_SUCCESS:
      return { ...state, loading: false, success: true };
    case Order_Actions.ORDER_PAY_FAIL:
      return { ...state, loading: false, error: action.payload };
    case Order_Actions.ORDER_PAY_RESET:
      return state;
    default:
      return state;
  }
};

type OrdersMyType = typeof orderPayload & {
  _id?: string;
  createdAt?: string;
  isPaid?: boolean;
  paidAt?: string;
  isDelivered?: boolean;
  deliveredAt?: string;
  user?: {
    _id?: string;
    name?: string;
  };
};

type OrdersType = OrderPayType & { orders?: OrdersMyType[] };

export const orderListMyReducer = (
  state: OrdersType = { orders: [orderPayload] },
  action: OrderActionTypes
): OrdersType => {
  switch (action.type) {
    case Order_Actions.ORDER_LIST_MY_REQUEST:
      return { ...state, loading: true };
    case Order_Actions.ORDER_LIST_MY_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case Order_Actions.ORDER_LIST_MY_FAIL:
      return { ...state, loading: false, error: action.payload };
    case Order_Actions.ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderListReducer = (
  state: OrdersType = { orders: [orderPayload] },
  action: OrderActionTypes
): OrdersType => {
  switch (action.type) {
    case Order_Actions.ORDER_LIST_REQUEST:
      return { ...state, loading: true };
    case Order_Actions.ORDER_LIST_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case Order_Actions.ORDER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDeliverReducer = (
  state: OrderPayType = { loading: false },
  action: OrderActionTypes
): OrderPayType => {
  switch (action.type) {
    case Order_Actions.ORDER_DELIVER_REQUEST:
      return { ...state, loading: true };
    case Order_Actions.ORDER_DELIVER_SUCCESS:
      return { ...state, loading: false, success: true };
    case Order_Actions.ORDER_DELIVER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case Order_Actions.ORDER_DELIVER_RESET:
      return state;
    default:
      return state;
  }
};
