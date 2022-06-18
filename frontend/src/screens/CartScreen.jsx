import React, { useEffect } from 'react';
import { useSearchParams, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeToCart } from '../actions/cartActions';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { Link ,useNavigate} from 'react-router-dom';


export default function Cart() {
  const [searchParams, setSearchParams] = useSearchParams();
  const qty = searchParams.get("qty") || 1;
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = params;
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [id, dispatch, qty]);

  const { cartItems } = useSelector(state => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const removeFromCartHandler = (id) => {
    dispatch(removeToCart(id))
  }

  const checkoutHandler = () => {
    //先判断有没有登录再去跳转到地址页面
   !userInfo? navigate('/login?redirect=/shipping'):navigate('/shipping')
    // navigate('/shipping')
  }


  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>Your cart is empty <Link to="/">Go Back</Link></Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fa fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h2>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}
