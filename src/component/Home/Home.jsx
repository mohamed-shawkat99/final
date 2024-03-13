import React, { useContext } from 'react'
import style from "./Home.module.css"
import { CounterContext } from '../../Context/CounterContext'
import FeaturedProducts from '../featuredProducts/featuredProducts'
import MainSlider from './../MainSlider/MainSlider';
import CategorySlider from './../CategorySlider/CategorySlider';

export default function Home() {

let {changeCounter}=useContext(CounterContext)

    return <>
    <MainSlider/>
    <CategorySlider/>
    <FeaturedProducts/>
    </>
}

