'use client'

import { MdArrowBack } from "react-icons/md";
import useCard from "../hooks/useCard";
import { useState } from "react";
import Subscriptions from "../profile/Braintree";
import Heading from "../cart/Heading";
import ItemCentent from "./ItemCommande";



const CartCommande= () => {
    const {dataCommande} = useCard()
    const [showPay,setShowPay] =useState(false)
    console.log({dataCommande});
    



    if (!dataCommande || dataCommande.length === 0 || dataCommande.e ){
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Your cart is empty</div>
                <div>
                    <div className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack />
                        <span>Start Ordering</span>
                    </div>
                </div>
            </div>
        );
    }

    if(showPay){
        return (   <div className="p-4"><Subscriptions /></div> )
    }
    
    return ( 
    <>
        <Heading  title="Mes Commandes" center />
        <div >
        {dataCommande  && 
    dataCommande.map((item:any, index:number)=>{
        return <ItemCentent index={index + 1} item={item} />
    })}
        
        
        </div>
    
    </>
    );



}

export default CartCommande;