import store from '../store';
import { Order_Actions } from '../types';
import { Dispatch } from 'react';
import axios, { AxiosResponse } from 'axios';
import { OrderActionTypes, orderPayload } from '../reducers/orderReducers';

export const createOrder =
  (order: typeof orderPayload) =>
  async (
    dispatch: Dispatch<OrderActionTypes>,
    getState: typeof store.getState
  ) => {
    try {
      dispatch({
        type: Order_Actions.ORDER_CREATE_REQUEST,
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

      const { data } = await axios.post<
        any,
        AxiosResponse<typeof orderPayload>
      >(`/api/orders`, order, config);
      dispatch({
        type: Order_Actions.ORDER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: Order_Actions.ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getOrderDetails =
  (id: string) =>
  async (
    dispatch: Dispatch<OrderActionTypes>,
    getState: typeof store.getState
  ) => {
    try {
      dispatch({
        type: Order_Actions.ORDER_DETAIL_REQUEST,
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

      const { data } = await axios.get<any, AxiosResponse<typeof orderPayload>>(
        `/api/orders/${id}`,
        config
      );
      dispatch({
        type: Order_Actions.ORDER_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: Order_Actions.ORDER_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const payOrder =
  (orderId: string, paymentResult: {}) =>
  async (
    dispatch: Dispatch<OrderActionTypes>,
    getState: typeof store.getState
  ) => {
    try {
      dispatch({
        type: Order_Actions.ORDER_PAY_REQUEST,
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

      const { data } = await axios.put<any, AxiosResponse>(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      dispatch({
        type: Order_Actions.ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: Order_Actions.ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listMyOrders =
  () =>
  async (
    dispatch: Dispatch<OrderActionTypes>,
    getState: typeof store.getState
  ) => {
    try {
      dispatch({
        type: Order_Actions.ORDER_LIST_MY_REQUEST,
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

      const { data } = await axios.get<
        any,
        AxiosResponse<(typeof orderPayload)[]>
      >(`/api/orders/myorders`, config);
      dispatch({
        type: Order_Actions.ORDER_LIST_MY_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: Order_Actions.ORDER_LIST_MY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listOrders =
  () =>
  async (
    dispatch: Dispatch<OrderActionTypes>,
    getState: typeof store.getState
  ) => {
    try {
      dispatch({
        type: Order_Actions.ORDER_LIST_REQUEST,
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

      const { data } = await axios.get<
        any,
        AxiosResponse<(typeof orderPayload)[]>
      >(`/api/orders`, config);

      dispatch({
        type: Order_Actions.ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: Order_Actions.ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deliverOrder =
  (orderId: string) =>
  async (
    dispatch: Dispatch<OrderActionTypes>,
    getState: typeof store.getState
  ) => {
    try {
      dispatch({
        type: Order_Actions.ORDER_DELIVER_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.put<any, AxiosResponse>(
        `/api/orders/${orderId}/deliver`,
        {},
        config
      );
      dispatch({
        type: Order_Actions.ORDER_DELIVER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: Order_Actions.ORDER_DELIVER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
