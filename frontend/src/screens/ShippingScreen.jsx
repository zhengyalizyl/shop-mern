import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { saveSHippingAddress } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';

//填写地址之前得先登录
export default function ShippingScreen() {
    const cart=useSelector(state=>state.cart);
    const {shippingAddress} =cart;
    const [address, setAdress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveSHippingAddress(address,country,city,postalCode));
        navigate('/payment');
    }
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  
    useEffect(() => {
      if (!userInfo) {
        navigate('/login')
      }
    }, [userInfo])

    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAdress(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>city</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>postalCode</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter postalCode"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="country"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Row className='py-3'>

                    <Button type="submit" variant="primary">Continue</Button>
                </Row>

               
            </Form>
        </FormContainer>
    )
}
