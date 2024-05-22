"use client";

import React from "react";

interface DataProps{
    handleCommande:Function
    handleAddPlat:Function
    handleAddCategorie:Function
    handleStat:Function
    handleShop:Function
    commande:boolean
    addplat:boolean
    addcategorie:boolean
    stat:boolean
    addshop:boolean
}

const Data:React.FC<DataProps> = ({
    handleCommande,
    handleAddPlat,
    handleAddCategorie,
    handleStat,
    handleShop,
    commande,
    addplat,
    addshop,
    addcategorie,
    stat,}) => {
    return (
        <div className="">

        <p onClick={()=>handleCommande()} className={!commande ?'border-b-[1px] py-8 text-lg text-center text-slate-500 transition hover:scale-105 cursor-pointer ':'border-b-[2px] border-b-slate-700 py-8 text-lg text-center text-slate-500 transition hover:scale-105 cursor-pointer '}>Liste de commande</p>
        <p onClick={()=>handleAddPlat()} className={!addplat ?'border-b-[1px] py-8 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer':'border-b-[2px] border-b-slate-700  py-8  text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer'}>Ajouter un plat</p>
        <p onClick={()=>handleAddCategorie()} className={!addcategorie?'border-b-[1px] py-8 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer':'border-b-[2px] border-b-slate-700  py-8  text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer'}>Ajouter un categorie</p>
        <p onClick={()=>handleShop()} className={!addshop?'border-b-[1px] py-8 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer':'border-b-[2px] border-b-slate-700  py-8  text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer'}>Ajouter un boutique</p>
        <p onClick={()=>handleStat()} className={!stat?'border-b-[1px] py-8 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer':'border-b-[2px] border-b-slate-700  py-8  text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer'}>Statistique</p>

    </div>
    );
}

export default Data;
