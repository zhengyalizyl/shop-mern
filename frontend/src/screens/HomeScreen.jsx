import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductComp from '../components/ProductComp';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from "../components/ProductCarousel";

export default function HomeScreen() {
    const dispatch = useDispatch();
    const params = useParams();
    const { keyword, pageNumber = 1 } = params;

    const { loading, error, products, pages, page } = useSelector(state => state.productList);
    console.log(useSelector(state => state.productList))
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])
    return (
        <>
            <Meta />
            {!keyword ? (
                <ProductCarousel />
            ) : (
                <Link to='/' className='btn btn-light'>
                    Go Back
                </Link>
            )}
            <h1>latest Product</h1>
            {loading ? <Loader></Loader> : error ? <Message variant="danger">{error}</Message> : (
                <>
                    <Row>
                        {products.map(product => (
                            <Col sm={12} md={6} lg={4}>
                                <ProductComp product={product}></ProductComp>
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword} />
                </>
            )}

        </>
    )
}
