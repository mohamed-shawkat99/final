import React from 'react'
import style from "./CategoriesDetails.module.css"
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'

export default function CategoriesDetails() 
{
    let params = useParams()
    console.log(params.id);

    function getcategoriesDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${params.id}`)
    }
    let{data,isLoading,isError}= useQuery(`CategoriesDetails`,getcategoriesDetails)

    let categoriesDetailsApi=data?.data.data
    return <>{categoriesDetailsApi?    
    <div className="container pt-5 mt-5">
    <div className="row ">
        <h3 className='h1 text-success text-uppercase fw-bold'>{categoriesDetailsApi.name}</h3>
        <div className="col-md-3 mx-auto my-5">
            <img src={categoriesDetailsApi.image} className='w-100' alt="" />
        </div>
    </div>
</div>:''}

    </>
}

