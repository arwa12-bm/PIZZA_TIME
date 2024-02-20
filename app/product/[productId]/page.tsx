"use client"

import { useEffect } from "react";

import Container from "@/app/components/Container";
import HomePhoto from "@/app/components/HomePhoto";
import CategorieCart from "@/app/components/product/CategorieCart";
import MenuCategorie from "@/app/components/product/MenuCategorie";
import useCard from "@/app/hooks/useCard";
import { card } from "@/app/utils/products";


interface Iparams{
    productId?:string
}

const Product= ({params}:{params:Iparams}) => {

    const {selectedIdShopList,getSelectedIdShopList,getIdShopList,Id} = useCard()
    
    useEffect(()=>{
        getSelectedIdShopList(params)
    },[])
    
    
    return ( 
    <div className="flex flex-col">
    <HomePhoto  data={selectedIdShopList}  />
    <MenuCategorie data={selectedIdShopList}  />
    <Container>
        <div className="grid grid-cols-1   md:grid-cols-2 sm:grid-cols-2 gap-8 m-8">
            {Object.values(card.categories).map((item)=><div key={item.id}  className=""> <CategorieCart  data={item} Id={Id} /></div>)}
        </div>
    </Container>
    </div>
        );
}

export default Product;