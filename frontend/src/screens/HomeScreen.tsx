import React, { useEffect } from 'react';
import { Meta } from '../components/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../components/Product';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { Paginate } from '../components/Paginate';
import { listProducts } from '../actions/productActions';
import { useParams } from 'react-router';
import { ProductCarousel } from '../components/ProductCarousel';
import { Link } from 'react-router-dom';
import { RootStore } from '../store';

export const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();

  const { keyword } = useParams<{ keyword: string }>();
  const { pageNumber } = useParams<{ pageNumber: string }>();

  const { error, loading, products } = useSelector(
    (state: RootStore) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber || '1'));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-dark'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products?.products?.map((product) => (
              <Col
                className='align-items-stretch justify-content-around d-flex'
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={products?.pages || 1}
            page={products?.page || 1}
            keyword={keyword ? keyword : ''}
            isAdmin={false}
          />
        </>
      )}
    </>
  );
};
