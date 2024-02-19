"use client"

import Container from "@/app/components/Container";
import HomePhoto from "@/app/components/HomePhoto";
import CategorieCart from "@/app/components/product/CategorieCart";
import MenuCategorie from "@/app/components/product/MenuCategorie";
import ProductCart from "@/app/components/product/ProductCart";
import { DropdownApp } from "@/app/components/product/dropDown";
import { card } from "@/app/utils/products";
import { useEffect, useState } from "react";

interface Iparams{
    productId?:string
}

const Product= ({params}:{params:Iparams}) => {
    console.log("params",params.productId);
    let selectedProduct:any
    for (let item in Object.keys(card.shoplist)) {
        console.log("cc",(Object.keys(card.shoplist)as any)[item]),"cc1",JSON.stringify(params.productId);
        
        if (JSON.stringify((Object.keys(card.shoplist)as any)[item]) === JSON.stringify(params.productId) ) {
            selectedProduct  =  Object.values(card.shoplist as any)[item]
           // console.log("xxx",Object.values(card.shoplist as any)[item])
        }
    }
    console.log("selectedProduct",selectedProduct)
    return ( 
    <div className="flex flex-col">
    <HomePhoto  data={selectedProduct}  />
    <MenuCategorie  />
    <Container>
        
        <div className="grid grid-cols-2  gap-8 m-8">

            {Object.values(card.categories).map((item)=><div  className=""><CategorieCart  data={item} /></div>)}
        
        </div>
    </Container>
    </div>

        
        
        );
}

export default Product;