import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { FormContainer } from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_ACTIONS } from '../types';
import { RootStore } from '../store';
import { initProductState, localProductReducer } from './common/helper';

const ProductEditScreen: React.FC = () => {
  const [state, localDispatch] = useReducer(
    localProductReducer,
    initProductState
  );
  const [uploading, setUploading] = useState(false);

  let { id: productId } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, product } = useSelector(
    (state: RootStore) => state.productDetails
  );

  const userLogin = useSelector((state: RootStore) => state.userLogin);
  const { userInfo } = userLogin;

  const {
    loading: loadingUpdate,
    error: errorUpdate,

    success: successUpdate,
  } = useSelector((state: RootStore) => state.productUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_ACTIONS.PRODUCT_UPDATE_RESET });
      navigate('/admin/productlist');
    } else {
      if (!product?.name || product?._id !== productId) {
        // @ts-expect-error
        dispatch(listProductDetails(productId));
      } else {
        localDispatch({ id: 'price', value: product?.price });
        localDispatch({ id: 'image', value: product?.image });
        localDispatch({ id: 'name', value: product?.name });
        localDispatch({ id: 'brand', value: product?.brand });
        localDispatch({ id: 'category', value: product?.category });
        localDispatch({ id: 'countInStock', value: product?.countInStock });
        localDispatch({ id: 'description', value: product?.description });
      }
    }
  }, [dispatch, navigate, product, productId, successUpdate]);

  const submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name: state.name,
        price: state.price,
        brand: state.brand,
        image: state.image,
        category: state.category,
        description: state.description,
        countInStock: state.countInStock,
      })
    );
  };

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      localDispatch({ id: 'image', value: data });

      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to='/admin/productList' className='btn btn-outline-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
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

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Set price'
                value={state.price}
                onChange={(e) =>
                  localDispatch({ id: 'price', value: e.target.value })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group className='py-2' controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={state.image}
                onChange={(e) =>
                  localDispatch({ id: 'image', value: e.target.value })
                }
              ></Form.Control>
              {/* <Form.File
      id='img-file'
      label='Choose file'
      custom
      onChange={uploadFileHandler}
    ></Form.File> */}
            </Form.Group>

            <Form.Control id='image-file' onChange={uploadFileHandler}>
              {uploading && <Loader />}
            </Form.Control>

            <Form.Group className='py-2' controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={state.brand}
                onChange={(e) =>
                  localDispatch({ id: 'brand', value: e.target.value })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group className='py-2' controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='text'
                placeholder='countInStock'
                value={state.countInStock}
                onChange={(e) =>
                  localDispatch({ id: 'countInStock', value: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <Form.Group className='py-2' controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={state.category}
                onChange={(e) =>
                  localDispatch({ id: 'category', value: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <Form.Group className='py-2' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='description'
                value={state.description}
                onChange={(e) =>
                  localDispatch({ id: 'description', value: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <Button className='my-2' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
