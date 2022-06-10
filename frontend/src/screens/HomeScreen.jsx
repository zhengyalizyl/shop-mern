import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductComp from '../components/ProductComp';
import axios from 'axios';

export default function HomeScreen() {
    const [products,setProducts] =useState([]);
    const fetchProducts = async () => {
        const { data } = await axios.get(`/api/products/`);
        setProducts(data);
      };
    
    useEffect(()=>{
        fetchProducts();
    },[])
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
