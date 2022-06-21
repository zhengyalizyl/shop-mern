import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts,deleteProduct } from '../actions/productActions';
import {useNavigate}  from 'react-router-dom'

export default function ProductListScreen() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const navigate=useNavigate();
  const productDelete = useSelector((state) => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin)  {
      dispatch(listProducts())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo,successDelete])

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  }

  const createProductHandler = () => {

  }

  return (
    <>
      <Row>
        <Col className="align-items-center">
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fa fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      { loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>
                  ${product.price}
                </td>
                <td>
                  { product.category }
                </td>
                <td>{ product.brand }</td>
                <td>
                  <LinkContainer to={`/admin/products/${product._id}/edit`}>
                    <Button className='btn-sm' variant='light'>
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            )) }
          </tbody>
        </Table>
      )}

    </>
  )
}