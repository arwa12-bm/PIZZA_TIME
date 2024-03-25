"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Container from '../components/Container'
import CartClient from './CartClient'
import useCard from '../hooks/useCard'


const Cart = () => {
    const [selectedProductData, setSelectedProductData] = useState({});
    useEffect(() => {
        setSelectedProductData(
        localStorage.getItem("selectedProductData") !== null
            ? JSON.parse(localStorage.getItem("selectedProductData") ?? "{}")
            : {}
        );
        
    }, []);
    

    return (
        <div className='pt-8'> 
        <Container>
            <CartClient  data={selectedProductData}/>
        </Container>
        </div>

    )
}

export default Cart
