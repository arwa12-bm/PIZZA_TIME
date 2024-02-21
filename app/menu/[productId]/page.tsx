"use client"

import MenuCategorie from "../../components/product/MenuCategorie";
import { card } from "@/app/utils/products";
import ProductCategorie from "@/app/components/product/ProductCategorie";
import { useEffect, useState } from "react";
import useCard from "@/app/hooks/useCard";
import HomePhoto from "@/app/components/HomePhoto";
import { log } from "console";

interface Iparams{
    productId?:string
}

const Menu = ({params}:{params?:Iparams}) => {
    
    const {selectedIdShopList,getSelectedIdCategorieList,selectedElCategorie} = useCard()
    console.log(params?.productId)

   

    useEffect(()=>{
        getSelectedIdCategorieList(params)
    },[])
    

    return ( 
    <div className="flex flex-col">
    <HomePhoto  data={selectedIdShopList}  />
    <MenuCategorie  />
    <div className="grid grid-cols-1   md:grid-cols-2 sm:grid-cols-2 gap-8 m-8">
    {(selectedElCategorie?.items)?.map((item:any)=> <ProductCategorie  data={item} />)}
    </div>
    </div> );
}

export default Menu;