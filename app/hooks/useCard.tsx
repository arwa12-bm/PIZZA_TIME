"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { card } from "../utils/products";

type  CartContextType={
    selectedIdCategirie:any,
    selectedIdShopList:any,
    Id:string,
    setSelectedIdShopList:()=>any
    setSelectedIdCategirie:()=>any
    getSelectedIdShopList:(params:any)=>any
    getIdShopList:(el:any)=>any
}

export const CardContext = createContext<CartContextType| null >(null);


export const CardProvider = (props:any)=>{
    const [selectedIdCategirie,setSelectedIdCategirie]=useState()
    const [selectedIdShopList,setSelectedIdShopList]=useState()
    const [Id,setId]=useState<string|undefined>()

    const getSelectedIdShopList=useCallback((params:any)=>{
                for (let item in Object.keys(card.shoplist)) {
                    let  selectedProduct:any
                    if (JSON.stringify((Object.keys(card.shoplist)as any)[item]) === JSON.stringify(params.productId) ) {
                        selectedProduct  =  Object.values(card.shoplist as any)[item]
                        setSelectedIdShopList(selectedProduct)
                    }
                }
                setId(params.productId)
            },[selectedIdShopList]) 

     const getIdShopList=useCallback((el:any)=>{
                let id:string
                for (let item of Object.keys(card.shoplist)) {
                    if (JSON.stringify((card.shoplist as any)[item]) === JSON.stringify(el)) {
                    id = item;
                    setId(id)
                    }
                }
                
            },[Id])
                    
            
    const value = { 
        selectedIdCategirie,
        selectedIdShopList,
        Id,
        getIdShopList,
        getSelectedIdShopList
        
        };
    return <CardContext.Provider  value={value}  {...props} />
}


const useCard = () => {
    const context =useContext(CardContext);

    if(context === null ){
        throw new Error("useCard must used within a CardContextProvider")
    }
    return context
}

export default useCard ;