import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <Row>
        <Col>
          <Form.Control
            type='text'
            name='q'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setKeyword(e.target.value)
            }
            placeholder='Search products...'
            className='me-sm-1 ms-sm-3'
          ></Form.Control>
        </Col>
        <Col>
          <Button type='submit' variant='outline-success' className='p-2'>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
