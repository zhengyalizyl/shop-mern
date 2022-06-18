import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductComp from '../components/ProductComp';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

export default function HomeScreen() {
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])
    const { loading, error, products } = useSelector(state => state.productList)
    return (
        <>
            <h1>latest Product</h1>
            {loading ? <Loader></Loader> : error ? <Message variant="danger">{error}</Message> : (
                <Row>
                    {products.map(product => (
                        <Col sm={12} md={6} lg={4}>
                            <ProductComp product={product}></ProductComp>
                        </Col>
                    ))}
                </Row>
            )}

        </>
    )
}
