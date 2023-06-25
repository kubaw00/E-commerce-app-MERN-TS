import { ProductType } from '../components/Product';
import { PRODUCT_ACTIONS } from '../types';

export type ProductListPayloadState = { products: ProductType[] } & {
  page: number;
  pages: number;
};
export type ProductActionTypes =
  | { type: PRODUCT_ACTIONS.PRODUCT_LIST_REQUEST }
  | {
      type: PRODUCT_ACTIONS.PRODUCT_LIST_SUCCESS;
      payload: ProductListPayloadState;
    }
  | { type: PRODUCT_ACTIONS.PRODUCT_LIST_FAIL; payload: Error };

export type ProductDetailsActionTypes =
  | { type: PRODUCT_ACTIONS.PRODUCT_DETAILS_REQUEST }
  | { type: PRODUCT_ACTIONS.PRODUCT_DETAILS_SUCCESS; payload: ProductType }
  | { type: PRODUCT_ACTIONS.PRODUCT_DETAILS_FAIL; payload: Error };

export interface ProductListStateType {
  loading: boolean;
  error?: Error;
  products?: {
    page: number;
    pages: number;
    products?: ProductType[];
  };
}

const productListInitialState: ProductListStateType = {
  loading: false,
  products: {
    page: 1,
    pages: 1,
    products: [],
  },
};

export const productListReducer = (
  state: ProductListStateType = productListInitialState,
  action: ProductActionTypes
): ProductListStateType => {
  switch (action.type) {
    case PRODUCT_ACTIONS.PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_ACTIONS.PRODUCT_LIST_SUCCESS:
      console.log(action.payload);
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_ACTIONS.PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export interface ReviewType {
  _id?: string;
  rating: number;
  comment: string;
  name?: string;
  createdAt?: string;
}

export const ProductInitialState = {
  _id: '',
  name: '',
  image: '',
  description: '',
  brand: '',
  category: '',
  price: 0,
  countInStock: 0,
  rating: 0,
  numReviews: 0,
};

export const productDetailsInitialState = {
  loading: false,
  product: ProductInitialState,
};

export interface ProductDetailsStateType {
  loading: boolean;
  product: ProductType & {
    reviews?: ReviewType[];
  };
  error?: Error;
}

export const productDetailsReducer = (
  state: ProductDetailsStateType = productDetailsInitialState,
  action: ProductDetailsActionTypes
): ProductDetailsStateType => {
  switch (action.type) {
    case PRODUCT_ACTIONS.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_ACTIONS.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_ACTIONS.PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export type ProductDeleteActionTypes =
  | { type: PRODUCT_ACTIONS.PRODUCT_DELETE_REQUEST }
  | { type: PRODUCT_ACTIONS.PRODUCT_DELETE_SUCCESS }
  | { type: PRODUCT_ACTIONS.PRODUCT_DELETE_FAIL; payload: Error };

export interface BasicState {
  loading?: boolean;
  success?: boolean;
  error?: Error;
}

export const productDeleteReducer = (
  state: BasicState = {},
  action: ProductDeleteActionTypes
): BasicState => {
  switch (action.type) {
    case PRODUCT_ACTIONS.PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_ACTIONS.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_ACTIONS.PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export type ProductCreateActionTypes =
  | { type: PRODUCT_ACTIONS.PRODUCT_CREATE_REQUEST }
  | { type: PRODUCT_ACTIONS.PRODUCT_CREATE_SUCCESS; payload: ProductType }
  | { type: PRODUCT_ACTIONS.PRODUCT_CREATE_FAIL; payload: Error }
  | { type: PRODUCT_ACTIONS.PRODUCT_CREATE_RESET };

export interface BasicState {
  loading?: boolean;
  success?: boolean;
  error?: Error;
}

export interface ProductCreateState extends BasicState {
  product?: ProductType;
}

export const productCreateReducer = (
  state: ProductCreateState = {},
  action: ProductCreateActionTypes
): ProductCreateState => {
  switch (action.type) {
    case PRODUCT_ACTIONS.PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_ACTIONS.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_ACTIONS.PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ACTIONS.PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export interface ProductUpdateType {
  _id?: string;
  name?: string;
  price?: number;
  brand?: string;
  image?: string;
  category?: string;
  description?: string;
  countInStock?: number;
}
export interface ProductUpdateState extends BasicState {
  product?: ProductUpdateType;
}
export type ProductUpdateActionTypes =
  | { type: PRODUCT_ACTIONS.PRODUCT_UPDATE_REQUEST }
  | { type: PRODUCT_ACTIONS.PRODUCT_UPDATE_SUCCESS; payload: ProductUpdateType }
  | { type: PRODUCT_ACTIONS.PRODUCT_UPDATE_FAIL; payload: Error }
  | { type: PRODUCT_ACTIONS.PRODUCT_UPDATE_RESET };

export const productUpdateReducer = (
  state: ProductUpdateState = {},
  action: ProductUpdateActionTypes
): ProductUpdateState => {
  switch (action.type) {
    case PRODUCT_ACTIONS.PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_ACTIONS.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_ACTIONS.PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ACTIONS.PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export type ProductCreateReviewActionTypes =
  | { type: PRODUCT_ACTIONS.PRODUCT_CREATE_REVIEW_REQUEST }
  | { type: PRODUCT_ACTIONS.PRODUCT_CREATE_REVIEW_SUCCESS }
  | { type: PRODUCT_ACTIONS.PRODUCT_CREATE_REVIEW_FAIL; payload: Error }
  | { type: PRODUCT_ACTIONS.PRODUCT_CREATE_REVIEW_RESET };

export const productReviewCreateReducer = (
  state: BasicState = {},
  action: ProductCreateReviewActionTypes
): BasicState => {
  switch (action.type) {
    case PRODUCT_ACTIONS.PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_ACTIONS.PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_ACTIONS.PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ACTIONS.PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export type ProductTopActionTypes =
  | { type: PRODUCT_ACTIONS.PRODUCT_TOP_REQUEST }
  | { type: PRODUCT_ACTIONS.PRODUCT_TOP_SUCCESS; payload: ProductType[] }
  | { type: PRODUCT_ACTIONS.PRODUCT_TOP_FAIL; payload: Error };

export interface ProducTopStateType {
  loading: boolean;
  products?: ProductType[];
  error?: Error;
}

export const productTopInitialState = {
  loading: false,
  products: [ProductInitialState],
};

export const productTopReducer = (
  state: ProducTopStateType = { loading: false },
  action: ProductTopActionTypes
): ProducTopStateType => {
  switch (action.type) {
    case PRODUCT_ACTIONS.PRODUCT_TOP_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_ACTIONS.PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_ACTIONS.PRODUCT_TOP_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
