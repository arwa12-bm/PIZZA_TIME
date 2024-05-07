'use client'

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../utils/formatPrice";
import NumberControl from "../components/form/InputNumber";
import { useEffect, useState } from "react";
import useCard from "../hooks/useCard";

interface ItemCententProps{
    item:any
}
const ItemCentent:React.FC<ItemCententProps>= ({item}) => {
    const {handleRemoveProductFromCart,dataUser} =useCard()
    
    const [showDetail,setShowDetail] =useState(false)
    const [count, setCount] =useState(0);

    const onCountChanged = (newCount: number) => {
        setCount(newCount);       
    };
  
    return (
<>
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src={item.data.imageUrl} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">{item.data.title}</a>
                              
                            </h3>
                            <p className="ml-4">{formatPrice(item.data.price)}</p>
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                            <button className="text-slate-500 underline" onClick={()=>{setShowDetail(!showDetail)}}>{showDetail?"Voir moins" :"Voir plus..."}</button>
                            {showDetail?
                        <div className="flex flex-col gap-2 px-2">
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
                        :""}
                            </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                                <NumberControl  value={item.quantity} onChange={onCountChanged} data = {item} />

                            </div>

                                <div className="flex">
                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={()=>{handleRemoveProductFromCart(item,dataUser);}}>Remove</button>
                    </div>
                        </div>
                      </div>

                      </>
        // <div  className="grid grid-cols-4 text-xs md:text-sm
        // gap-2 border-t-[1.5px] border-slate-200 py-4  items-center">
        //         <div className="justify-self-start flex-rows-2  md:flex lg:flex justify-content  gap-2 md:gap-4  ">
        //             <div className="flex-rows-2 lg:flex gap-1  ">
        //                 <div  >
        //                 <Link href={`/product/${item.id}`}>
        //                 <Link href={``} className="font-bold text-md">{item.data.title}</Link>
        //                     <div className="relative w-[80px] aspect-square">
        //                         <Image  src={item.data.imageUrl} alt={""} fill className="object-contain"/>
        //                     </div>
        //                 </Link>
        //                 <div className="flex gap-2">
        //                         <button className="text-slate-500 underline" onClick={()=>{handleRemoveProductFromCart(item,dataUser);}}>Remove</button>
        //                         <button className="text-slate-500 underline" onClick={()=>{setShowDetail(!showDetail)}}>{showDetail?"Voir moins" :"Voir plus..."}</button>
        //                 </div>
        //                 </div>
        //                 {showDetail?
        //                 <div className="flex flex-col gap-2 px-2">
        //                     <p className="font-semibold text-md">Composants de base : </p>
        //                     <div className="flex ">
        //                         {Object.keys(item.checkedItems).map((item)=><p key={item}>{item},</p>)}
        //                     </div>
        //                     {item.sup == null|| Object.keys(item.sup).length === 0 ? "" :
        //                     <div>
        //                     <p className="font-semibold text-md">composant supplimentaire : </p>
        //                     <div className="flex ">
        //                     {Object.keys(item.sup).map(key => (
        //                             <p key={key}>{key} x {item.sup[key]} ,</p>
        //                         ))}
        //                     </div>
        //                     </div>
        //                     }
                            
        //                 </div> 
        //                 :""}
                        
        //             </div>
                    
                    
                    
        //         </div>
        //         <div className="justify-self-center">{formatPrice(item.data.price)}</div>
        //         <div className="justify-self-center">
        //         <NumberControl  value={item.quantity} onChange={onCountChanged} data = {item} />
        //         </div>
        //         <div className="justify-self-end font-semibold"> {formatPrice(item.data.price*item.quantity)}</div>

        // </div>
    );
}

export default ItemCentent;