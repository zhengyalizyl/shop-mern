import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useSearchParams, useNavigate } from 'react-router-dom';

//填写地址之前得先登录
export default function ShippingScreen() {
    const [address, setAdress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [message, setMessage] = useState(null);
    const redirect= searchParams.get("redirect") || '/';
    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);




    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(address,country,city,postalCode));
    }

    return (
        <FormContainer>
            <h1>Shipping</h1>
            {/* {(error||message) && <Message variant='danger'>{error||message}</Message>}
            {loading && <Loader />} */}
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
