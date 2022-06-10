import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductScreen from './screens/products/ProductScreen';
import ProductsScreen from './screens/products';
import CartScreen from './screens/CartScreen';

export default function App() {
    return (
        <BrowserRouter>

            <Header />
            <main className='py-3'>
                <Container>
                    <Routes>
                        <Route path='/' element={<HomeScreen />} />
                        <Route path="products" element={< ProductsScreen />}></Route>
                        <Route path="products/:id" element={<ProductScreen />} />
                        <Route path="cart/:id" element={<CartScreen />} />
                        <Route
                            path="*"
                            element={
                                <main style={{ padding: "1rem" }}>
                                    <p>There's nothing here!</p>
                                </main>
                            }
                        />
                    </Routes>
                </Container>
            </main>
            <Footer></Footer>

        </BrowserRouter>
    )
}
