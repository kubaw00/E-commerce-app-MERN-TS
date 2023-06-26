import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FormContainer } from '../components/FormContainer';
import { useNavigate } from 'react-router';
import { saveShippingAddress } from '../actions/cartActions';
import { CheckoutSteps } from '../components/CheckoutSteps';
import { RootStore } from '../store';

export const ShippingScreen: React.FC = () => {
  const { shippingAddress } = useSelector((state: RootStore) => state.cart);
  const [state, setState] = useState(shippingAddress);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(saveShippingAddress(state));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={state.address}
            required
            onChange={(e) => setState({ ...state, address: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={state.city}
            required
            onChange={(e) => setState({ ...state, postalCode: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={state.postalCode}
            required
            onChange={(e) => setState({ ...state, city: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={state.country}
            required
            onChange={(e) => setState({ ...state, country: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-4'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};
