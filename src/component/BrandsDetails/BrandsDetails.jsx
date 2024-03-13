import React from 'react'
import style from "./BrandsDetails.module.css"
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'



export default function BrandsDetails() {
    let params = useParams()
    console.log(params.id);
    async function getBrandDetails(){
         let brandsApi = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${params.id}`)
         return brandsApi
    }
    let{isError,isLoading,data}=useQuery(`BrandDetails`,getBrandDetails)

    let apiBrandDetails = data?.data.data
    
    return <>{apiBrandDetails?
    <div className="m-5 p-5 container">
    <div className="row">
    <h3 className='h1 text-success text-uppercase fw-bold'>{apiBrandDetails.name}</h3>
                    <div className="col-md-2 mx-auto shadow-lg border border-5">
                        <img src={apiBrandDetails.image} alt="" />
                    </div>
    </div>
    </div>:''}
    

    </>
}

