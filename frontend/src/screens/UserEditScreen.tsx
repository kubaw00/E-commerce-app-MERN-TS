import { Link } from 'react-router-dom';
import React, { useEffect, useReducer } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { FormContainer } from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_ACTIONS } from '../types';
import { initUserState, localUserReducer } from './common/helper';
import { RootStore } from '../store';

export const UserEditScreen: React.FC = () => {
  const [state, localDispatch] = useReducer(localUserReducer, initUserState);

  const { id: userId } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector(
    (state: RootStore) => state.userDetails
  );

  const {
    loading: loadingUpdate,
    error: errorUpdate,

    success: successUpdate,
  } = useSelector((state: RootStore) => state.userUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_ACTIONS.USER_UPDATE_RESET });
      navigate('/admin/userlist');
    } else {
      if (!user?.name || user?._id !== userId) {
        //@ts-expect-error
        dispatch(getUserDetails(userId));
      } else {
        localDispatch({ id: 'isAdmin', value: user?.isAdmin });
        localDispatch({ id: 'name', value: user?.name });
        localDispatch({ id: 'email', value: user?.email });
      }
    }
  }, [navigate, user, userId, dispatch, successUpdate]);

  const submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        email: state.email,
        name: state.name,
        isAdmin: state.isAdmin,
      })
    );
  };

  return (
    <>
      <Link to='/admin/userList' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
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

            <Form.Group className='py-2' controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={state.isAdmin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  localDispatch({ id: 'isAdmin', value: e.target.checked })
                }
              ></Form.Check>
            </Form.Group>

            <Button className='my-1' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
