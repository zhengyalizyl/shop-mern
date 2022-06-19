import React, { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import axios from "axios";
import { getOrderDetails,payOrder } from "../actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";
import {ORDER_PAY_RESET} from '../constants/orderConstants'

export default function OrderScreen({ match }) {
    const params = useParams();
    const orderId = params.id;
    const dispatch = useDispatch();
    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay=useSelector(state=>state.orderPay);
    const {loading:loadingPay,success:successPay} =orderPay;
    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2);
        };
        // 商品总价
        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        );
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script);
        }
        // 没有 order
        // 第一次加载页面时，order 是 undefined
        // 第一次只会执行 dispatch(getOrderDetails(orderId))
        // 当执行完 dispatch(getOrderDetails(orderId)) 之后，order 变化，有值就会执行 addPayPalScript
        if (!order||successPay) {
            dispatch({type:ORDER_PAY_RESET});
            dispatch(getOrderDetails(orderId))
            // 有 order，还没有支付
            // 有 order 之后支付才有意义
        } else if (!order.isPaid) {

            // 没有加载 script，就是没有执行 addPayPalScript
            if (!window.paypal) {
                addPayPalScript();
                // 没有支付的情况下，已经添加了 script 脚本
            } else {
                setSdkReady(true)
            }
        }
    }, [orderId, dispatch,order,sdkReady,successPay,userInfo]);

    const successPatmentHandler=(paymentResult)=>{
        dispatch(payOrder(orderId,paymentResult))
    }

    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : <>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{order.user.name}</p>
                        <p>
                            <strong>Email: </strong>
                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                            {order.shippingAddress.postalCode},{" "}
                            {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <Message variant="success">Delivered on {order.deliveredAt}</Message>
                        ) : (
                            <Message variant="danger">Not Delivered</Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <Message variant="success">Paid on {order.paidAt}</Message>
                        ) : (
                            <Message variant="danger">Not Paid</Message>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? (
                            <Message>Order is empty</Message>
                        ) : (
                            <ListGroup variant="flush">
                                {order.orderItems.map((item, index) => (
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
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {loadingPay&&<Loader/>}
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {!sdkReady ? (
                                    <Loader />
                                ) : (
                                    <PayPalButton
                                    onSuccess={successPatmentHandler}
                                        amount={order.totalPrice}
                                    />
                                )}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}