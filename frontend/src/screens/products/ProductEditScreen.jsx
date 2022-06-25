import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import { Link ,useNavigate,useParams} from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getProduct ,updateProduct} from '../../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants';
import axios from 'axios';

export default function ProductEditScreen() {
    const params = useParams();
    const productId = params.id;
  const [name, setName] = useState('');
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);
  const navigate=useNavigate();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetail)
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

  useEffect(() => {
      
    if(successUpdate){
       dispatch({type:PRODUCT_UPDATE_RESET});
       navigate('/admin/productList')
    }else{
    // 没有 product
    if (!product.name || product._id !== productId) {
      dispatch(getProduct(productId))
    } else {
      setName(product.name)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setPrice(product.price)
      setDescription(product.description)
    }
}
  }, [dispatch,navigate, productId, product,successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({
        ...product,
        name,
        image,
        brand,
        category,
        countInStock,
        price,
        description
    }))
  }
const uploadFileHandler=async (e)=>{
    const file=e.target.files[0];
    const formData=new FormData();
    setUploading(true);
    formData.append('image',file);
    try {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
    
          const { data:{data,success} } = await axios.post('/api/upload', formData, config);
          if(success){
              setImage(data)
          }
    } catch (error) {
        console.error(error)
    } finally{
        setUploading(false);
    }
 
}
  return (
    <>
      <Link to='/admin/productList' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        { loadingUpdate && <Loader /> }
        { errorUpdate && <Message variant="danger">{errorUpdate}</Message> }
        { loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
               <Form.Label>select image</Form.Label>
              <Form.Control
               type="file"
               onChange={uploadFileHandler}
               multiple />
              { uploading && <Loader /> }
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">Update</Button>
          </Form>
        )}
      </FormContainer>
    </>

  )
}