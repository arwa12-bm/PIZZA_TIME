"use client"

import { useEffect, useState } from "react";

import Container from "./components/Container";
import HomePhoto from "./components/HomePhoto";
import { card } from "./utils/products";
import ProductCart from "./components/product/ProductCart";
import SearchInput from "./components/form/SearchInput";
import useCard from "./hooks/useCard";


export default function Home() {

  const {dataUser,getData,getCommandes,dataPanier}=useCard()


  useEffect(()=>{
      getData(); 
      
  },[])

  useEffect(()=>{
      if(dataUser!==null)
  { getCommandes(dataUser?.id)
      console.log("ddd",dataUser?.id);}
      

  },[dataUser])

  return (
    <div className="">
    <HomePhoto />
    <Container>
      <div className="grid grid-cols-1 p-4 item-center   gap-4 lg:gap-12 pt-2 item-center justify-between">
        <h1 className="text-[20px] ">Nos magasins à proximité</h1>
          <SearchInput />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Object.values(card.shoplist).map((item:any)=><div  key={item.Company}> <ProductCart  data={item} /></div> )}
        
          
        </div>
      </div>
      
    </Container>
    </div>
    
  );
}
