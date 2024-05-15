"use client"
import { useEffect, useState } from "react";
import useCard from "../hooks/useCard";
import { DropdownAppProfile } from "../components/form/dropDownProfile";
import ItemCommande from "../commandes/ItemCommande";
import FormAddPlat from "./formAddPlat";
import FormAddCategorie from "./formAddCategorie";
import Container from "../components/Container";
import App from "./sideBar";
import Search from "../components/form/searchBar";
import { Steam } from "./charts/steam";

const Admin = () => {
    const {
        getAllCommandes,
        AllCommande,    
        } = useCard();
        

            getAllCommandes();

        
        
        
        const [commande, setCommande] = useState(true);
        const [addplat, setAddPlat] = useState(false);
        const [addcategorie, setAddCategorie] = useState(false);
        const [stat, setStat] = useState(false);


        const handleCommande = () => {
            setAddCategorie(false)
            setAddPlat(false)
            setStat(false)
            setCommande(true);
            };
            const handleAddPlat = () => {
                setAddCategorie(false)
                setCommande(false);
                setStat(false)
                setAddPlat(true)
                };
            
            const handleAddCategorie = () => {
                setAddPlat(false)
                setCommande(false);
                setStat(false)
                setAddCategorie(true)
            
                };
            const handleStat = () => {
                setAddPlat(false)
                setCommande(false);
                setAddCategorie(false)
                setStat(true)
            
                };

                

    return ( 
        <Container >
        <div className="flex sticky top-[15%] rounded-md bg-white z-10 justify-center items-center shadow-md shadow-rounded-lg shadow-black gap-2  mt-[8%]   p-4 -mx-8 ">

        <div className={`grid grid-cols-4 gap-8 justify-between   `}>
            <p onClick={handleCommande} className={!commande ?'border-b-[1px] p-2 text-lg text-center text-slate-500 transition hover:scale-105 cursor-pointer ':'border-b-[2px] border-b-slate-700 p-2 text-lg text-center text-slate-500 transition hover:scale-105 cursor-pointer '}>Liste de commande</p>
            <p onClick={handleAddPlat} className={!addplat ?'border-b-[1px] p-2 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer':'border-b-[2px] border-b-slate-700  p-2 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer'}>Ajouter un plat</p>
            <p onClick={handleAddCategorie} className={!addcategorie?'border-b-[1px] p-2 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer':'border-b-[2px] border-b-slate-700  p-2 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer'}>Ajouter un categorie</p>
            <p onClick={handleStat} className={!stat?'border-b-[1px] p-2 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer':'border-b-[2px] border-b-slate-700  p-2 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer'}>Statistique</p>

        </div>
        </div>
    
    <div className="m-2 pt-2 mb-10">
    {commande && (
        <>
            <Search />
        {AllCommande &&
            AllCommande.sort((a:any, b:any) => a.id - b.id).map((item: any, index: number) => {
            return <div key={item.id}><ItemCommande index={index + 1} item={item}  profile /></div>;
            })}
        </>
    )}
    {addplat && (
        <div className="p-4">
            <FormAddPlat />
        </div>
        
    )}
    {addcategorie && (
        <div className="p-4">
            <FormAddCategorie />
        </div>
        
    )}
    {stat && (
    <div className="p-4">
        <p>statistique</p>
        <Steam />
    </div>
    
)}
    </div>

        </Container>
    );
}

export default Admin;