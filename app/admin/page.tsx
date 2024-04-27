"use client"
import { useState } from "react";
import useCard from "../hooks/useCard";
import { DropdownAppProfile } from "../components/form/dropDownProfile";
import ItemCommande from "../commandes/ItemCommande";
import FormAddPlat from "./formAddPlat";
import FormAddCategorie from "./formAddCategorie";
import Container from "../components/Container";

const Admin = () => {
    const {
        getAllCommandes,
        AllCommande,    
        } = useCard();
        
        
        getAllCommandes();
        
        
        
        const [commande, setCommande] = useState(true);
        const [addplat, setAddPlat] = useState(false);
        const [addcategorie, setAddCategorie] = useState(false);
        
        const handleCommande = () => {
            setAddCategorie(false)
            setAddPlat(false)
            setCommande(true);
            };
            const handleAddPlat = () => {
                setAddCategorie(false)
                setCommande(false);
                setAddPlat(true)
                };
            
            const handleAddCategorie = () => {
                setAddPlat(false)
                setCommande(false);
                setAddCategorie(true)
            
                };
    return ( 
        <Container >
        <div className='grid grid-cols-3 gap-8 justify-between mt-2'>
            <p onClick={handleCommande} className={!commande ?'border-b-[1px] p-2 text-lg text-center text-slate-500 transition hover:scale-105 cursor-pointer ':'border-b-[2px] border-b-slate-700 p-2 text-lg text-center text-slate-500 transition hover:scale-105 cursor-pointer '}>Liste de commande</p>
            <p onClick={handleAddPlat} className={!addplat ?'border-b-[1px] p-2 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer':'border-b-[2px] border-b-slate-700  p-2 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer'}>Ajouter un plat</p>
            <p onClick={handleAddCategorie} className={!addcategorie?'border-b-[1px] p-2 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer':'border-b-[2px] border-b-slate-700  p-2 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer'}>Ajouter un categorie</p>
        </div>
        {commande && (
        <>
        {AllCommande &&
            AllCommande.sort((a:any, b:any) => a.id - b.id).map((item: any, index: number) => {
            return <div key={item.id}><ItemCommande index={index + 1} item={item}  profile /></div>;
            })}
        </>
    )}
    {addplat && (
        <div>
            <FormAddPlat />
        </div>
        
    )}
    {addcategorie && (
        <div>
            <FormAddCategorie />
        </div>
        
    )}
        </Container>
    );
}
 
export default Admin;