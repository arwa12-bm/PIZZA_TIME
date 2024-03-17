'use client'

import Link from "next/link";
import { useState } from "react";
import { MdRemoveCircleOutline, MdRemoveShoppingCart } from "react-icons/md";


import { formatPrice } from "../utils/formatPrice";
import useCard from "../hooks/useCard";

interface ItemCententProps{
    item:any
}

const Commandes:React.FC<ItemCententProps>= ({item}) => {
    
    const {handleRemoveProductFromCart} =useCard()
    
    const [showDetail,setShowDetail] =useState(false)
    

    return (

        <div  className="grid grid-cols-4 text-xs md:text-sm
        gap-2 border-t-[1.5px] border-slate-200 py-4  items-center">
                <div className="justify-self-center ">
                    <div> x {item.quantity} </div>
                </div>
                <div className="justify-self-start flex-rows-2  md:flex lg:flex justify-content  gap-2 md:gap-4  ">
                    <div className="flex-rows-2 lg:flex gap-1  ">
                        <div  >
                        <Link href={`/product/${item.id}`}>
                        <Link href={``} className="font-bold text-md">{item.data.title}</Link>
                        </Link>
                        <div className="flex gap-2">
                                <button className="text-slate-500 underline" onClick={()=>{setShowDetail(!showDetail)}}>{showDetail?"Voir moins" :"Voir plus..."}</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="justify-self-end font-semibold"> {formatPrice(item.data.price.default)}</div>
                <div className="justify-self-center">
                    <MdRemoveCircleOutline  onClick={()=>{handleRemoveProductFromCart(item)}} size={25} />
                </div>
                <div>
                    {showDetail?
                        <div className="grid flex-col ">
                            <p className="font-semibold text-md">Composants de base : </p>
                            <div className="flex ">
                                {Object.keys(item.checkedItems).map((item)=><p key={item}>{item},</p>)}
                            </div>
                            {item.sup == null|| Object.keys(item.sup).length === 0 ? "" :
                            <div>
                            <p className="font-semibold text-md">composant supplimentaire : </p>
                            <div className="flex  ">
                            {Object.keys(item.sup).map(key => (
                                    <p key={key}>{key} x {item.sup[key]} ,</p>
                                ))}
                            </div>
                            </div>
                            }
                            
                        </div> 
                        :""}
                </div>
                
        </div>
    );
}

export default Commandes;