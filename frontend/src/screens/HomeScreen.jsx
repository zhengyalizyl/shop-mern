import React from 'react';
import { Row, Col } from 'react-bootstrap';
import products from '../products';
import ProductComp from '../components/ProductComp'

export default function HomeScreen() {
    return (
        <>
            <h1>latest Product</h1>
            <Row>
                {products.map(product => (
                    <Col sm={12} md={6} lg={4}>
                        <ProductComp product={product}></ProductComp>
                    </Col>
                ))}
            </Row>
        </>
    )
}
