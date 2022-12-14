import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import MetaData from './layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import Product from './product/Product';
import { useAlert } from 'react-alert';
import Loader from './layout/Loader';

const {createSliderWithTooltip} = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export const Home = () => {
    const [currentPage, setCurrenPage] = useState(1)
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState('');
    const [ratings, setRatings]= useState(0);
    
    const categories = [
        'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
    ]
    
    const alert = useAlert();
    const dispatch = useDispatch();
    const match = { params: useParams() };

    const { loading, products, error, productsCount, resPerPage} = useSelector(state => state.products)

    const keyword = match.params.keyword;

    useEffect(()=>{
        if(error){
            return alert.error(error);
        }
        dispatch(getProducts(keyword, currentPage, price, category, ratings));
    },[dispatch, alert, error, keyword, currentPage, price, category, ratings]);

    function setCurrentPageNo(pageNumber){
        setCurrenPage(pageNumber)
    }

    let count =productsCount;
  
    const LoaderIcon =(
        <Fragment>
             <MetaData title = {'Buy Best Products Online'}/>
            <Loader/>
        </Fragment>
    )
    
     const content =( 
            <Fragment>
                <MetaData title = {'Buy Best Products Online'}/>
                <div className="container container-fluid " id='content'>
                <h1 id="products_heading">Latest Products</h1>

                <section id="products" className="container mt-2">
                    <div className="row">

                        {keyword? (
                            <Fragment>
                                <div className='col-6 col-md-3 mt-5 mb-5'>
                                    <div className='px-5'>
                                        <Range
                                            marks = {{
                                                1:`$1`,
                                                1000: `$1000`
                                            }}
                                            min = {1}
                                            max = {1000}
                                            defaultValue = { [1, 1000] }
                                            tipFormatter = {value => `$${value}`}
                                            tipProps ={{
                                                placement: "top",
                                                visible: true
                                            }}
                                            value = {price}
                                            onChange= {price => setPrice(price)}
                                        />
                                        <hr className='mt-5'/>
                                        <div className='mt-5'>
                                            <h4 className='mb-3'>
                                                Categories
                                            </h4>
                                            <ul className='pl-0'>
                                                {categories.map(category => (
                                                    <li 
                                                        style ={{cursor:'pointer',
                                                                listStyle:'none'}}
                                                        key = {category}
                                                        onClick={() => setCategory(category)}        
                                                    >
                                                        {category}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        <hr className='mt-3'/>
                                        <div className='mt-3'>
                                            <h4 className='mb-3'>
                                                Ratings
                                            </h4>
                                            <ul className='pl-0'>
                                                {[5,4,3,2,1].map(star => (
                                                    <li 
                                                        style ={{cursor:'pointer',
                                                                listStyle:'none'}}
                                                        key = {star}
                                                        onClick={() => setRatings(star)}        
                                                    >
                                                        <div className='rating-outer'>
                                                            <div className='rating-inner'
                                                                 style={{width:`${star * 20}%`}}
                                                            >

                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                    </div>     
                                </div>

                                <div className='col-6 col-md-9'>
                                    <div className='row'>
                                        {
                                            products && products.map(product => (
                                                <Product key={product._id}  product={product} col={4}/>
                                           ))
                                        }
                                    </div>
                                </div>

                            </Fragment>
                        ):(
                            products && products.map(product => (
                                <Product key={product._id}  product={product} col={3}/>
                           ))
                        )}

                       
                            
                    
                    </div>
                </section>

                {resPerPage <= count && (
                    <div className='d-flex justify-content-center mt-2'>
                    <Pagination
                        activePage = {currentPage}
                        itemsCountPerPage ={resPerPage}
                        totalItemsCount ={productsCount}
                        onChange ={setCurrentPageNo}
                        nextPageText = {'Next'}
                        prevPageText = {'Prev'}
                        firstPageText = {'First'}
                        lastPageText = {'Last'}
                        itemClass = "Page-item"
                        linkClass ="page-link"
                    />
                    </div> 
                )}
            </div>    
                 
            </Fragment>
        );
        
    return loading ? LoaderIcon:content;
  
}


export default Home 