import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import { Col, Row, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import { Loader } from '../components/Loader';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { Message } from '../components/Message';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions';
import { Order_Actions } from '../types';

declare const window: any;

export const OrderScreen: React.FC = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const { order, loading, error } = useSelector(
    (state: RootStore) => state.orderDetail
  );
  const { success: successPay, loading: loadingPay } = useSelector(
    (state: RootStore) => state.orderPay
  );
  const { success: successDeliver } = useSelector(
    (state: RootStore) => state.orderDeliver
  );
  const { userInfo } = useSelector((state: RootStore) => state.userLogin);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams<{ id: any }>();

  //@ts-expect-error
  const handleSuccessPay = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    dispatch(getOrderDetails(id));
    if (!order || successPay || successDeliver) {
      if (!order || order._id !== id) {
        dispatch({ type: Order_Actions.ORDER_PAY_RESET });
        dispatch({ type: Order_Actions.ORDER_DELIVER_RESET });
        dispatch(getOrderDetails(id));
      }
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [id, successPay, order, userInfo, navigate, successDeliver, dispatch]);

  const handleDeliver = () => {
    dispatch(deliverOrder(id));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h1>Order {order?._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong>
                    {order?.user?.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${order?.user?.email}`}>
                      {order?.user?.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order?.shippingAddress.address},{' '}
                    {order?.shippingAddress.city}{' '}
                    {order?.shippingAddress.postalCode},{' '}
                    {order?.shippingAddress.country}
                  </p>
                  {order?.isDelivered ? (
                    <Message variant='success'>
                      Deliveried on {order?.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not Deliveried</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order?.paymentMethod}
                  </p>
                  {order?.isPaid ? (
                    <Message variant='success'>Paid on {order?.paidAt}</Message>
                  ) : (
                    <Message variant='danger'>Not paid</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order?.orderItems?.length === 0 ? (
                    <Message>Your order is empty</Message>
                  ) : (
                    <>
                      {order?.orderItems?.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order?.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order?.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order?.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order?.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {error && <Message variant='danger'>{error}</Message>}
                  </ListGroup.Item>
                  {!order?.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={order?.totalPrice}
                          onSuccess={handleSuccessPay}
                        />
                      )}
                    </ListGroup.Item>
                  )}
                  {userInfo && userInfo?.isAdmin && !order?.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type='button'
                        className='btn btn-block'
                        onClick={handleDeliver}
                      >
                        Mark as Delivered
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
