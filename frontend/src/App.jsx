import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductScreen from './screens/products/ProductScreen';
import ProductsScreen from './screens/products';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/products/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

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
                        <Route path="cart/:id/*" element={<CartScreen />} />
                        <Route path="login" element={<LoginScreen/>}/>
                        <Route path="register" element={<RegisterScreen/>}/>
                        {/* <Route path="test" element={<RegisterScreen/>}/> */}
                        <Route path="profile" element={<ProfileScreen/>}/>
                        <Route path="shipping" element={<ShippingScreen/>}/>
                        <Route path="payment" element={<PaymentScreen/>}/>
                        <Route path="placeorder" element={<PlaceOrderScreen/>}/>
                        <Route path="order/:id" element={<OrderScreen/>}/>
                        <Route path="admin/userlist" element={<UserListScreen/>}/>
                        <Route path="admin/user/:id/edit" element={<UserEditScreen/>}/>
                        <Route path="admin/productList" element={<ProductListScreen/>} />
                        <Route path="admin/products/:id/edit" element={<ProductEditScreen/>} />
                        <Route path="admin/orderlist" element={<OrderListScreen/>} />

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
