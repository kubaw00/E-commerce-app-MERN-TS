import { Dispatch } from 'redux';
import {
  UserDeleteActionTypes,
  UserDetailsActionTypes,
  UserListActionTypes,
  UserLoginActionTypes,
  UserPayload,
  UserRegisterActionTypes,
  UserUpdateActionTypes,
  UserUpdatePayload,
  UserUpdateProfileActionTypes,
} from '../reducers/userReducers';
import { Order_Actions, USER_ACTIONS } from '../types';
import store from '../store';
import axios, { AxiosResponse } from 'axios';
import { OrderActionTypes } from '../reducers/orderReducers';

export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<UserLoginActionTypes>) => {
    try {
      dispatch({
        type: USER_ACTIONS.USER_LOGIN_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post<any, AxiosResponse<UserPayload>>(
        '/api/user/login',
        { email, password },
        config
      );

      const data = response.data;
      dispatch({
        type: USER_ACTIONS.USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: USER_ACTIONS.USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout =
  () =>
  (
    dispatch: Dispatch<
      | UserLoginActionTypes
      | UserListActionTypes
      | UserDetailsActionTypes
      | OrderActionTypes
    >
  ) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_ACTIONS.USER_LOGOUT });
    dispatch({ type: USER_ACTIONS.USER_DETAILS_RESET });
    dispatch({ type: Order_Actions.ORDER_LIST_MY_RESET });
    dispatch({ type: USER_ACTIONS.USER_LIST_RESET });
  };

export const register =
  (name: string, email: string, password: string) =>
  async (
    dispatch: Dispatch<UserRegisterActionTypes | UserLoginActionTypes>
  ) => {
    try {
      dispatch({
        type: USER_ACTIONS.USER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post<any, AxiosResponse<UserPayload>>(
        '/api/user/register',
        { name, email, password },
        config
      );
      dispatch({
        type: USER_ACTIONS.USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_ACTIONS.USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: USER_ACTIONS.USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserDetails =
  (id: string) =>
  async (
    dispatch: Dispatch<UserDetailsActionTypes>,
    getState: typeof store.getState
  ) => {
    try {
      dispatch({
        type: USER_ACTIONS.USER_DETAILS_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.get<any, AxiosResponse<UserPayload>>(
        `/api/user/${id}`,
        config
      );
      dispatch({
        type: USER_ACTIONS.USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: USER_ACTIONS.USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export interface UserUpdateProfilePayload {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

export const updateUserDetails =
  (user: UserUpdateProfilePayload) =>
  async (
    dispatch: Dispatch<UserUpdateProfileActionTypes>,
    getState: typeof store.getState
  ) => {
    try {
      dispatch({
        type: USER_ACTIONS.USER_UPDATE_PROFILE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.put<any, AxiosResponse<UserPayload>>(
        `/api/user/profile`,
        user,
        config
      );
      dispatch({
        type: USER_ACTIONS.USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: USER_ACTIONS.USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listUsers =
  () =>
  async (
    dispatch: Dispatch<UserListActionTypes>,
    getState: typeof store.getState
  ) => {
    try {
      dispatch({
        type: USER_ACTIONS.USER_LIST_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.get<any, AxiosResponse<UserPayload[]>>(
        `/api/user`,
        config
      );
      dispatch({
        type: USER_ACTIONS.USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: USER_ACTIONS.USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteUser =
  (id: string) =>
  async (
    dispatch: Dispatch<UserDeleteActionTypes>,
    getState: typeof store.getState
  ) => {
    try {
      dispatch({
        type: USER_ACTIONS.USER_DELETE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      await axios.delete<any, AxiosResponse>(`/api/user/${id}`, config);
      dispatch({
        type: USER_ACTIONS.USER_DELETE_SUCCESS,
      });
    } catch (error: any) {
      dispatch({
        type: USER_ACTIONS.USER_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUser =
  (user: UserUpdatePayload) =>
  async (
    dispatch: Dispatch<UserUpdateActionTypes>,
    getState: typeof store.getState
  ) => {
    try {
      dispatch({
        type: USER_ACTIONS.USER_UPDATE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.put<any, AxiosResponse<UserUpdatePayload>>(
        `/api/user/${user?._id}`,
        user,
        config
      );
      dispatch({ type: USER_ACTIONS.USER_UPDATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: USER_ACTIONS.USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
