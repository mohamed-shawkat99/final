import React from 'react'
import style from "./Categories.module.css"
import { useQuery } from 'react-query';
import  axios from 'axios';
import { Link } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';

export default function Categories() {
    function getCategories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let{data,isLoading}=useQuery(`Categories`,getCategories)
    let categories = data?.data.data








    return <>{categories?
    <div className="my-5 py-5  container">
    <div  className="row g-5">
        {categories.map((category)=>{
        return <div key={category._id} className="col-md-2 rounded-5 categories cursor-pointer">
            <Link to={`/CategoriesDetails/${category._id}`}>
            <h3 className=' fw-bold mb-3'>{category.name.split(" ").slice(0, 1).join(" ")}</h3>
        <img height={200} className='w-100 rounded-4' src={category.image} alt="" />
            </Link>


    </div>
        })}

    </div>
</div>
:<div className='w-100 py-5 my-5 d-flex justify-content-center align-items-center'>
<ClockLoader color="#36d7b7" size={300} />
</div>}

    </>
}

