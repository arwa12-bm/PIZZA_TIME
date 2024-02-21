"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { card } from "../utils/products";

type  CartContextType={
    selectedElCategorie:any,
    selectedIdShopList:any,
    IdShopList:string,
    IdCategorieList:string,
    IdCategorieEl:string,
    CategorieObject:any,
    setSelectedIdShopList:()=>any
    setSelectedIdCategirie:()=>any
    getSelectedIdShopList:(params:any)=>any
    getIdShopList:(el:any)=>any
    getIdCategorieList:(el:any)=>any
    getSelectedIdCategorieList:(params:any)=>any
    getCategorieById:(id:any)=>any
}

export const CardContext = createContext<CartContextType| null >(null);


export const CardProvider = (props:any)=>{
    const [selectedElCategorie,setSelectedElCategorie]=useState()
    const [selectedIdShopList,setSelectedIdShopList]=useState()
    const [IdShopList,setIdShopList]=useState<string|undefined>()
    const [IdCategorieList,setIdCategorieList]=useState<string|undefined>()
    const [IdCategorieEl,setIdCategorieEl]=useState<string|undefined>()

    
    const[CategorieObject,setCategorieObject]=useState()

//get id from params
    const getSelectedIdShopList=useCallback((params:any)=>{
                for (let item in Object.keys(card.shoplist)) {
                    let  selectedProduct:any
                    if (JSON.stringify((Object.keys(card.shoplist)as any)[item]) === JSON.stringify(params.productId) ) {
                        selectedProduct  =  Object.values(card.shoplist as any)[item]
                        setSelectedIdShopList(selectedProduct)
                    }
                }
                setIdShopList(params.productId)
            },[selectedIdShopList]) 
    const getSelectedIdCategorieList=useCallback((params:any)=>{
                for (let item in Object.keys(card.categories)) {
                    let  selectedCategorie:any
                    if (JSON.stringify((Object.keys(card.categories)as any)[item]) === JSON.stringify(params?.productId) ) {
                        selectedCategorie  =  Object.values(card.categories as any)[item]
                        setSelectedElCategorie(selectedCategorie)
                    }
                }
                setIdCategorieList(params.productId)
    
            },[selectedElCategorie]) 

// get id from object

        const getIdShopList=useCallback((el:any)=>{
                let id:string
                for (let item of Object.keys(card.shoplist)) {
                    if (JSON.stringify((card.shoplist as any)[item]) === JSON.stringify(el)) {
                    id = item;
                    setIdShopList(id)
                    }
                }
                
            },[IdShopList])


        // const getIdCategorieList=useCallback((el:any)=>{
        //         console.log({el});
        //         let id:string
        //         for (let item of Object.keys(card.categories)) {
        //             if (JSON.stringify((card.categories as any)[item]) === JSON.stringify(el)) {
        //             setIdCategorieEl(item)
        //             console.log("id",item);
        //             }
        //         }
                
        //     },[IdCategorieList])

            const getCategorieById=useCallback((id:any)=>{
                let el:any
                for (let item of Object.keys(card.categories)) {
                    if (item === id) {
                    el = (card.categories as any)[item];
                    console.log("el",el)
                    setCategorieObject(el)
                    }
                }
                
            },[CategorieObject])
                    
            
    const value = { 
        selectedElCategorie,
        selectedIdShopList,
        IdShopList,
        IdCategorieList,
        CategorieObject,
        IdCategorieEl,
        getCategorieById,
        getIdShopList,
        getSelectedIdShopList,
        getSelectedIdCategorieList
        
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