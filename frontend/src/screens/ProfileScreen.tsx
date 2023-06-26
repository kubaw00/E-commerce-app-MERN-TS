import React, { useEffect, useReducer } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { getUserDetails, updateUserDetails } from '../actions/userActions';
import { useNavigate } from 'react-router';
import { listMyOrders } from '../actions/orderActions';
import { RootStore } from '../store';
import { initUserState, localUserReducer } from './common/helper';
import { USER_ACTIONS } from '../types';

export const ProfileScreen: React.FC = () => {
  const [state, localDispatch] = useReducer(localUserReducer, initUserState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector(
    (state: RootStore) => state.userDetails
  );
  const { userInfo } = useSelector((state: RootStore) => state.userLogin);
  const { success } = useSelector(
    (state: RootStore) => state.userUpdateProfile
  );

  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
  } = useSelector((state: RootStore) => state.orderListMy);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
        return;
      }
      if (success) {
        dispatch({ type: USER_ACTIONS.USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));

        return;
      }
      localDispatch({ id: 'name', value: user.name });
      localDispatch({ id: 'email', value: user.email });
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (state.password !== state.confirmPassword || state.password === '') {
      localDispatch({ id: 'message', value: 'Password do not match' });
    } else {
      dispatch(
        updateUserDetails({
          _id: user?._id,
          name: state.name,
          email: state.email,
          password: state.password,
        })
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {state.message && <Message variant='danger'>{state.message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && (
          <Message variant='success'>User profile updated success!</Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Name'
              value={state.name}
              onChange={(e) =>
                localDispatch({ id: 'name', value: e.target.value })
              }
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Email'
              value={state.email}
              onChange={(e) =>
                localDispatch({ id: 'email', value: e.target.value })
              }
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={state.password}
              onChange={(e) =>
                localDispatch({ id: 'password', value: e.target.value })
              }
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={state.confirmPassword}
              onChange={(e) =>
                localDispatch({ id: 'confirmPassword', value: e.target.value })
              }
            ></Form.Control>
          </Form.Group>

          <Button className='my-3' type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order?.createdAt?.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order?.paidAt?.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order?.deliveredAt?.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};
