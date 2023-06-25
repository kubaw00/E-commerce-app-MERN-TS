import { USER_ACTIONS } from '../types';

export interface UserPayload {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export type UserLoginActionTypes =
  | { type: USER_ACTIONS.USER_LOGIN_REQUEST }
  | { type: USER_ACTIONS.USER_LOGIN_SUCCESS; payload: UserPayload }
  | { type: USER_ACTIONS.USER_LOGIN_FAIL; payload: Error }
  | { type: USER_ACTIONS.USER_LOGOUT };

export type UserRegisterActionTypes =
  | { type: USER_ACTIONS.USER_REGISTER_REQUEST }
  | { type: USER_ACTIONS.USER_REGISTER_SUCCESS; payload: UserPayload }
  | { type: USER_ACTIONS.USER_REGISTER_FAIL; payload: Error };

export type UserDetailsActionTypes =
  | { type: USER_ACTIONS.USER_DETAILS_REQUEST }
  | { type: USER_ACTIONS.USER_DETAILS_RESET }
  | { type: USER_ACTIONS.USER_DETAILS_SUCCESS; payload: UserPayload }
  | { type: USER_ACTIONS.USER_DETAILS_FAIL; payload: Error };

interface UserLoginStateType {
  loading?: boolean;
  userInfo?: UserPayload;
  error?: Error;
}

const userInitialState: UserLoginStateType = {};

export const userLoginReducer = (
  state: UserLoginStateType = userInitialState,
  action: UserLoginActionTypes
): UserLoginStateType => {
  switch (action.type) {
    case USER_ACTIONS.USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_ACTIONS.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_ACTIONS.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_ACTIONS.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (
  state: UserLoginStateType = userInitialState,
  action: UserRegisterActionTypes
): UserLoginStateType => {
  switch (action.type) {
    case USER_ACTIONS.USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_ACTIONS.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_ACTIONS.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

interface UserDetailsStateType {
  user?: UserPayload;
  loading?: boolean;
  error?: Error;
  success?: boolean;
}
export const userDetailsReducer = (
  state: UserDetailsStateType = {},
  action: UserDetailsActionTypes
): UserDetailsStateType => {
  switch (action.type) {
    case USER_ACTIONS.USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_ACTIONS.USER_DETAILS_RESET:
      return {};
    case USER_ACTIONS.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_ACTIONS.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export type UserUpdateProfileActionTypes =
  | { type: USER_ACTIONS.USER_UPDATE_PROFILE_REQUEST }
  | { type: USER_ACTIONS.USER_UPDATE_PROFILE_SUCCESS; payload: UserPayload }
  | { type: USER_ACTIONS.USER_UPDATE_PROFILE_FAIL; payload: Error };

export const userUpdateProfileReducer = (
  state: UserDetailsStateType = {},
  action: UserUpdateProfileActionTypes
): UserDetailsStateType => {
  switch (action.type) {
    case USER_ACTIONS.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_ACTIONS.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_ACTIONS.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export type UserListActionTypes =
  | { type: USER_ACTIONS.USER_LIST_REQUEST }
  | { type: USER_ACTIONS.USER_LIST_SUCCESS; payload: UserPayload[] }
  | { type: USER_ACTIONS.USER_LIST_FAIL; payload: Error }
  | { type: USER_ACTIONS.USER_LIST_RESET };

export type UserListState = { users?: UserPayload[] } & {
  loading?: boolean;
  error?: Error;
};

export const userListReducer = (
  state: UserListState = { users: [] },
  action: UserListActionTypes
): UserListState => {
  switch (action.type) {
    case USER_ACTIONS.USER_LIST_REQUEST:
      return { ...state, loading: true };
    case USER_ACTIONS.USER_LIST_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case USER_ACTIONS.USER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_ACTIONS.USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export type UserDeleteActionTypes =
  | { type: USER_ACTIONS.USER_DELETE_REQUEST }
  | { type: USER_ACTIONS.USER_DELETE_SUCCESS }
  | { type: USER_ACTIONS.USER_DELETE_FAIL; payload: Error };

export interface BasicState {
  loading?: boolean;
  success?: boolean;
  error?: Error;
}

export const userDeleteReducer = (
  state: BasicState = { success: false },
  action: UserDeleteActionTypes
): BasicState => {
  switch (action.type) {
    case USER_ACTIONS.USER_DELETE_REQUEST:
      return { loading: true };
    case USER_ACTIONS.USER_DELETE_SUCCESS:
      return { loading: false };
    case USER_ACTIONS.USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export interface UserUpdatePayload {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
export type UserUpdateActionTypes =
  | { type: USER_ACTIONS.USER_UPDATE_REQUEST }
  | { type: USER_ACTIONS.USER_UPDATE_SUCCESS; payload: UserUpdatePayload }
  | { type: USER_ACTIONS.USER_UPDATE_FAIL; payload: Error }
  | { type: USER_ACTIONS.USER_UPDATE_RESET };

export interface UpdateType extends BasicState {
  user?: UserUpdatePayload;
}

export const userUpdateReducer = (
  state: UpdateType = {},
  action: UserUpdateActionTypes
): UpdateType => {
  switch (action.type) {
    case USER_ACTIONS.USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_ACTIONS.USER_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true, user: action.payload };
    case USER_ACTIONS.USER_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_ACTIONS.USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
