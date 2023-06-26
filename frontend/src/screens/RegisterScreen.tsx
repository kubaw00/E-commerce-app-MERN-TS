import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { register } from '../actions/userActions';
import { FormContainer } from '../components/FormContainer';
import { useLocation, useNavigate } from 'react-router';
import { RootStore } from '../store';
import { initUserState, localUserReducer } from './common/helper';

const RegisterScreen: React.FC = () => {
  const [state, localDispatch] = useReducer(localUserReducer, initUserState);

  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector(
    (state: RootStore) => state.userRegister
  );

  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (state.password !== state.confirmPassword || state.password === '') {
      localDispatch({ id: 'message', value: 'Password do not match' });
    } else {
      dispatch(register(state.name, state.email, state.password));
      localDispatch({ id: 'message', value: '' });
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {state.message && <Message variant='danger'>{state.message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={handleSubmit}>
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
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link
            to={redirect !== '/' ? `/login?redirect=${redirect}` : '/login'}
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
