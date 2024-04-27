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
    profile?:boolean
}
const ItemCommande:React.FC<ItemCententProps>= ({item,index,profile}) => {
    if(item.etat_Commande===''){ return null; }
    const [clicked,setClicked]=useState(false)
    const {dataUser}= useCard()


   // {item.ModeRetrait.livrer && console.log("xx",item.ModeRetrait)}

    const handleValide =(id:any)=>{
        const url = `http://localhost:8080/api/panier/Encours/${id}`;
        const requestOptions:any = {
            method: 'PUT',
        };
        fetch(url, requestOptions)
            .then(response => {
            //console.log({response})
            })
            .catch(error => {
                console.log(error)
            });
    }
    const handleLivrer =(id:any)=>{
        const url = `http://localhost:8080/api/panier/livrer/${id}`;
        const requestOptions:any = {
            method: 'PUT',
        };
        fetch(url, requestOptions)
            .then(response => {
            console.log({response})
            })
            .catch(error => {
                console.log(error)
            });
    }
    const handlePasser =(id:any)=>{
        const url = `http://localhost:8080/api/panier/passer/${id}`;
        const requestOptions:any = {
            method: 'PUT',
        };
        fetch(url, requestOptions)
            .then(response => {
            console.log({response})
            })
            .catch(error => {
                console.log(error)
            });
    }
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
            {profile && <p> {item.etat}</p>}
            </div>

            <div className="text- p-2">

            
            {profile && 
                <div className="flex gap-4 "> 
                <p>{item.etat_Commande}</p> 
                {item.etat_Commande === "En attente" &&
                <div className="bg-green-500 p-1 -m-1 rounded-xl text-center justify-content cursor-pointer hover:scale-105 "
                    onClick={()=>handleValide(item.id)}
                > valider</div>}
                {item.etat_Commande === "En cours de préparation" &&
                    <div className="bg-green-500 p-1 -m-1 rounded-xl text-center justify-content cursor-pointer hover:scale-105 "
                    onClick={()=>handlePasser(item.id)}
                > passer</div>}
                </div>
                }
            </div>

            <div className="text- p-2">
            {item.ModeRetrait?.livrer ? 
            <div className="flex gap-4 ">
                <div>
                    <p>En livraison</p> <p>à l'heure de {item.ModeRetrait.Time}</p>
                </div>
                
                {item.etat_Commande ==='En cours de livraison' && 
                <div className="bg-green-500 p-1 -m-1 rounded-xl text-center justify-content cursor-pointer hover:scale-105 "
                    onClick={()=>handleLivrer(item.id)}
                >livrer</div>}
            </div>
            : <div><p>En emporter</p> <p>à l'heure de{item.ModeRetrait.Time}</p></div>}
            </div>
            
            <div className="text- p-2">
            <p>{item.createdAt.toLocaleString().split('T')[0] }  </p>
            <p>{item.createdAt.toLocaleString().split('T')[1].split(':')[0] }:{item.createdAt.toLocaleString().split('T')[1].split(':')[1] }</p>
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