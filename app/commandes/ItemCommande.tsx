'use client'


import { formatPrice } from "../utils/formatPrice";
import { useState } from "react";
import useCard from "../hooks/useCard";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { FaBasketShopping } from "react-icons/fa6";
import ItemCententCmd from "./ItemCententCmd";

interface ItemCententProps{
    item:any
    index:number
}
const ItemCommande:React.FC<ItemCententProps>= ({item,index}) => {
    const {cartProducts,cartTotalAmount,dataCommande}=useCard()
    const [clicked,setClicked]=useState(false)
    let itemTotalPrice: number = 0; // Initialize itemTotalPrice to 0

    // item.cartItem.map((cartItem: any, itemIndex: any) => {
    //     const totalPriceForItem = cartItem.data.price.default * cartItem.quantity; // Calculate total price for each item
    //     itemTotalPrice += totalPriceForItem; // Add the total price for the current item to itemTotalPrice
    // });
    
    //console.log({item});
    return ( 
    <div className=" relative justify-content border-[1.2px] border-slate-200 bg-white shadow-md  rounded-2xl m-4 p-2">
        <div className="flex p-1 justify-between">
            <div className="flex  p-2 gap-2">
                <FaBasketShopping size={25} />
                <p className="text-xl">Commande {index}</p>
            </div>
            <div className="text- p-2">
            {formatPrice(item.prix)}
            </div>
            <div className="text- p-2">
            {item.createdAt.toLocaleString().split('T')[0]}
            </div>
            {clicked?
            <RiArrowDropUpLine size={50} onClick={()=>setClicked(!clicked)}  />
            : <RiArrowDropDownLine size={50} onClick={()=>setClicked(!clicked)} />            }
        </div>
        {clicked?
        <>
        <div className="grid grid-cols-5 text-xs font-semibold gap-4 pb-2 items-center mt-8">
            <div className="justify-self-start">PRODUCT</div>
            <div className="justify-self-center">DETAILS</div>
            <div className="justify-self-end">PRICE</div>
            <div className="justify-self-end">QUANTITY</div>
            <div className="justify-self-end">TOTAl</div>
        </div>
    <div className="">
    <div > {/* Assuming you have a unique identifier for each commande */}
        {item.cartItem.map((item:any, itemIndex:any) => (
            <ItemCententCmd key={itemIndex} item={item}  />
        ))}
    </div>

    
    
    </div>
    </>:""}
    </div>    
    );
}

export default ItemCommande;