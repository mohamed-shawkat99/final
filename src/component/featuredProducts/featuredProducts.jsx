import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ClockLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/wishlistContext';

export default function FeaturedProducts(props) {
    const { addToCart } = useContext(CartContext);
    const { addToWishlist } = useContext(WishlistContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [wishlistItems, setWishlistItems] = useState([]);

    async function getAddToWishlist(id) {
        let data = await addToWishlist(id);
        console.log(data,id);
        if (data?.status == 'success') {
            toast.success('Item added to Wishlist successfully');
            setWishlistItems([...wishlistItems, id]);
        } else {
            toast.error('Item didn\'t add');
        }
    }

    async function getAddToCart(id) {
        let data = await addToCart(id);
        if (data?.status == 'success') {
            toast.success('Item added to cart successfully');
        } else {
            toast.error('Item didn\'t add');
        }
    }

    function GetFeaturedProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }

    let { isLoading, isError, data } = useQuery('featuredProducts', GetFeaturedProducts);

    const filteredProducts = data?.data.data.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="container mt-5">
                {isLoading ? (
                    <div className='w-100 py-5 my-5 d-flex justify-content-center align-items-center'>
                        <ClockLoader color="#36d7b7" size={300} />
                    </div>
                ) : (
                    <div className="row gy-5 mt-5">
                        <div className="col-md-12 mb-3">
                            <input
                                type="text"
                                placeholder="Search Products"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        {filteredProducts.map(item => (
                            <div key={item.id} className="col-md-2">
                                <div className="product position-relative cursor-pointer p-3 rounded-3">
                                    <i
                                        onClick={() => getAddToWishlist(item.id)}
                                        className={`fa-solid fa-heart position-absolute heart ${wishlistItems.includes(item.id) ? 'text-danger' : ''}`}
                                    ></i>
                                    <Link to={`/ProductDetails/${item.id}`}>
                                        <img src={item.imageCover} className='w-100' alt="" />
                                        <p className='text-main font-sm'>{item.category.name}</p>
                                        <h5 className='mt-2'>{item.title.split(" ").slice(0, 2).join(" ")}</h5>
                                        <div className='d-flex justify-content-between my-2'>
                                            <div>
                                                {item.price}EGP
                                            </div>
                                            <div>
                                                <i className="fa-solid fa-star rating-color"></i>
                                                {item.ratingsAverage}
                                            </div>
                                        </div>
                                    </Link>
                                    <button onClick={() => getAddToCart(item.id)} className='btn bg-main text-white w-100'>Add to cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
