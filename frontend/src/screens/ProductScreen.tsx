import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { Rating } from '../components/Rating';
import { Meta } from '../components/Meta';
import { RootStore } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { useNavigate } from 'react-router';
import { addToCart } from '../actions/cartActions';
import { PRODUCT_ACTIONS } from '../types';

export const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();
  let { id } = useParams();

  const productDetails = useSelector(
    (store: RootStore) => store.productDetails
  );
  const { product, loading, error } = productDetails;

  const userLogin = useSelector((store: RootStore) => store.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector(
    (store: RootStore) => store.productReviewCreate
  );
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted');
      setComment('');
      setRating(0);
      dispatch({ type: PRODUCT_ACTIONS.PRODUCT_CREATE_REVIEW_RESET });
    }
    // @ts-expect-error
    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    navigate(`/cart`);
  };

  const submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    // @ts-expect-error
    dispatch(createProductReview(id, { rating, comment }));
  };

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col sm={6}>
              <Image src={product?.image} alt={product?.name} fluid />
            </Col>
            <Col sm={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h5>{product.name}</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product?.rating as number}
                    text={`${product?.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: ${product?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price</Col>
                      <Col>
                        <strong>${product?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status</Col>
                      <Col>
                        {(product?.countInStock as number) > 0
                          ? 'In Stock'
                          : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product?.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setQty(+e.target.value)}
                          >
                            {[...Array(product?.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item className='d-grid gap-2'>
                    <Button
                      onClick={addToCartHandler}
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Card
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h1>Reviews</h1>
              {product?.reviews?.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product?.reviews?.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating
                      value={review.rating}
                      text={review.rating.toString()}
                    />
                    <p>{review?.createdAt?.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setRating(Number(e.target.value))
                          }
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          value={comment}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button className='my-2' type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in </Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
