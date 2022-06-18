import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

export default function PlaceOrderScreen() {
  const cart = useSelector((state) => state.cart)
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                { cart.shippingAddress.address }, { cart.shippingAddress.city }{ ' ' }
                { cart.shippingAddress.postalCode }, { ' ' }
                { cart.shippingAddress.country }
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              { cart.paymentMethod }
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              { cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  { cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          { item.qty } x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )) }
                </ListGroup>
              ) }
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}