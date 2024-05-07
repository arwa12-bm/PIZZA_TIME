'use client'


import { formatPrice } from "../utils/formatPrice";
import { useState } from "react";
import useCard from "../hooks/useCard";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { FaBasketShopping } from "react-icons/fa6";
import ItemCententCmd from "./ItemCententCmd";

interface ItemCommandeProps{
    item:any
    index:number
    profile?:boolean
}
const ItemCommande:React.FC<ItemCommandeProps>= ({item,index,profile}) => {
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
        <div className="flex  justify-between">
            <div className="flex  p-2 gap-2">
                <FaBasketShopping size={25} />
                <p className="text-xl">Commande {index}</p>
            </div>
            <div className="text-md p-2">
            {formatPrice(item.prix)}
            </div>

            {profile &&
            <>
            <div className="text-md p-2">
            <p> {item.etat}</p>
            </div>

            <div className="text-md p-2">

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
        
            </div>
            </>
            }
            
            <div className="flex" >
            <p className="text-md p-2">{item.createdAt.toLocaleString().split('T')[0].split('-')[1] }-{item.createdAt.toLocaleString().split('T')[0].split('-')[1] } / 
            {item.createdAt.toLocaleString().split('T')[1].split(':')[0] }:{item.createdAt.toLocaleString().split('T')[1].split(':')[1] }</p>
            {clicked?
            <RiArrowDropUpLine size={50} onClick={()=>setClicked(!clicked)}  />
            : <RiArrowDropDownLine size={50} onClick={()=>setClicked(!clicked)} />            }
            </div>


        </div>
        {clicked?
        <>
        <div className="text-md px-2">
                {item.ModeRetrait?.livrer ? 
                <div className="flex gap-4 ">
                    <div>
                        <p>En livraison  à l'heure de {item.ModeRetrait.Time}</p>
                    </div>
                    
                    {item.etat_Commande ==='En cours de livraison' && 
                    <div className="bg-green-500 p-1 -m-1 rounded-xl text-center justify-content cursor-pointer hover:scale-105 "
                        onClick={()=>handleLivrer(item.id)}
                    >livrer</div>}
                </div>
                : <div><p>En emporter à l'heure de{item.ModeRetrait.Time}</p></div>}
                </div>

    <div className="border-t-[1px] border-gray-100">
    <div > {/* Assuming you have a unique identifier for each commande */}
        {item.cartItem.map((item:any, itemIndex:any) => (
            <li className="flex py-6" key={itemIndex}><ItemCententCmd item={item}  /></li> 

        ))}
    </div>

    
    
    </div>
    </>:""}
    </div>    
    );
}

export default ItemCommande;