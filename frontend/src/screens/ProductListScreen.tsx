import React, { useEffect } from 'react';

import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { Paginate } from '../components/Paginate';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { useNavigate, useParams } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { PRODUCT_ACTIONS } from '../types';

import { RootStore } from '../store';

export const ProductListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pageNumber } = useParams<{ pageNumber: string }>();

  const productList = useSelector((state: RootStore) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state: RootStore) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state: RootStore) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state: RootStore) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_ACTIONS.PRODUCT_CREATE_RESET });

    if (!userInfo?.isAdmin) {
      navigate('/login');
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct?._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber ? pageNumber : '1'));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className='align-itmes-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-4' onClick={createProductHandler}>
            <i className='fas fa-plus'> Create Product</i>
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.products?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={products?.pages || 1}
            page={products?.page || 1}
            isAdmin={userInfo?.isAdmin || true}
            keyword=''
          />
        </>
      )}
    </>
  );
};
