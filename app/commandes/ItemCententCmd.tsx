'use client'

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../utils/formatPrice";
import { useState } from "react";
import useCard from "../hooks/useCard";

interface ItemCententProps{
    item:any,
    
}
const ItemCententCmd:React.FC<ItemCententProps>= ({item}) => {
    const {handleRemoveProductFromCart, dataUser} =useCard()
    
    const [showDetail,setShowDetail] =useState(false)
    const [count, setCount] =useState(0);

    const onCountChanged = (newCount: number) => {
        setCount(newCount);       
    };
    return (

        <div  className="grid grid-cols-5 text-xs md:text-sm
        gap-2 border-t-[1.5px] border-slate-200 py-4  items-center">
                <div className="justify-self-start flex-rows-2  md:flex lg:flex justify-content  gap-2 md:gap-4  ">
                    <div className="flex-rows-2 lg:flex gap-1  ">
                        <div  >
                        <Link href={`/product/${item.id}`}>
                        <Link href={``} className="font-bold text-md">{item.data.title}</Link>
                            <div className="relative w-[80px] aspect-square">
                                <Image  src={item.data.imageUrl} alt={""} fill className="object-contain"/>
                            </div>
                        </Link>
                        <div className="flex gap-2">
                                <button className="text-slate-500 underline" onClick={()=>{handleRemoveProductFromCart(item, dataUser);}}>Remove</button>
                                <button className="text-slate-500 underline" onClick={()=>{setShowDetail(!showDetail)}}>{showDetail?"Voir moins" :"Voir plus..."}</button>
                        </div>
                        </div>
                        
                    </div>
                    
                    
                    
                </div> 
                <div className="flex flex-col col-span-1 gap-2 justify-content w-[150%]">
                        <p className="font-semibold text-md">Composants de base : </p>
                        <div className="flex ">
                            {Object.keys(item.checkedItems).map((item)=><p key={item}>{item},</p>)}
                        </div>
                        {item.sup == null|| Object.keys(item.sup).length === 0 ? "" :
                        <div>
                        <p className="font-semibold text-md">composant supplimentaire : </p>
                        <div className="flex ">
                        {Object.keys(item.sup).map(key => (
                                <p key={key}>{key} x {item.sup[key]} ,</p>
                            ))}
                        </div>
                        </div>
                        }
                        
                </div>
                <div className="justify-self-end">{formatPrice(item.data.price)}</div>
                <div className="justify-self-end">
                X {item.quantity}
                </div>
                <div className="justify-self-end font-semibold"> {formatPrice(item.data.price*item.quantity)}</div>

        </div>
    );
}

export default ItemCententCmd;