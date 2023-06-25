import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Rating } from './Rating';

export interface ProductType {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}
export interface ProductProps {
  product: ProductType;
}

export const Product: React.FC<ProductProps> = ({
  product: { _id, name, image, rating, numReviews, price },
}) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${_id}`}>
        <Card.Img src={image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title as='div'>
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <div className='my-3'>
            <Rating value={rating} text={`${numReviews} reviews`} />
          </div>
        </Card.Text>
        <Card.Text as='h3'>
          <div className='my-3'>${price}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};
