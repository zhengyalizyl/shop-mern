import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { savePaymentMenthod } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';

//填写地址之前得先登录
export default function PaymentScreen() {
    const cart = useSelector(state => state.cart);
    const { shippingAddress,paymentMethod:oldPaymentMethod } = cart;

    const [paymentMethod, setPaymentMethod] = useState(oldPaymentMethod)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMenthod(paymentMethod));
        navigate('/placeorder');
    }
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    useEffect(() => {
        if (Object.keys(shippingAddress).length === 0) {
            navigate('/shipping')
        }
    }, [shippingAddress])

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
    }, [userInfo])

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>payment method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='payment'>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id="PayPal"
                        name="paymentMethod"
                        value='PayPal'
                        checked={paymentMethod==='PayPal'}
                        onChange={e => setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>
                    <Form.Check
                        type='radio'
                        label='Stripe'
                        id="Stripe"
                        name="paymentMethod"
                        value='Stripe'
                        checked={paymentMethod=='Stripe'}
                        onChange={e => setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>
                </Form.Group>

                <Row className='py-3'>

                    <Button type="submit" variant="primary">Continue</Button>
                </Row>


            </Form>
        </FormContainer>
    )
}
