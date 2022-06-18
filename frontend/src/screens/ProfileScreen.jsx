import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.name || success) {
        //没有用户信息，应该将用户信息置空
        //更新成功后要重新获取用户的数据
        dispatch({ type: USER_UPDATE_PROFILE_RESET });//为了sucees不被污染
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [userInfo, user, success]);


  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('password not match')
      return;
    }
    dispatch(updateUserProfile({ name, email, password }));
  }

  return (
    <Row>
      <Col md={3}>
        <h3>User profile</h3>
        {(error || message) && <Message variant='danger'>{error || message}</Message>}

        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">Update</Button>

        </Form>
      </Col>
    </Row>
  )
}
