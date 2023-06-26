import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; shOp</Col>
        </Row>
      </Container>
    </footer>
  );
};
