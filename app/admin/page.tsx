"use client"
import { useEffect, useState } from "react";
import useCard from "../hooks/useCard";
import { DropdownAppProfile } from "../components/form/dropDownProfile";
import ItemCommande from "../commandes/ItemCommande";
import FormAddPlat from "./formAddPlat";
import FormAddCategorie from "./formAddCategorie";
import Container from "../components/Container";
import Search from "../components/form/searchBar";
import { Steam } from "./charts/steam";
import SalesTable from "./table";
import Pie from "./charts/Pie";
import Drawer from "./Drawer";
import Data from "./Drawerdata";
import { MdMenu } from "react-icons/md";
import ListItem from "./ListItems";
import Comfirmation from "./ModaComfirmation";
import FormAddShop from "./formAddShop";


const Admin = () => {
    const {
        getAllCommandes,
        AllCommande,    
        } = useCard();
        

            getAllCommandes();

        
        
        
        const [commande, setCommande] = useState(true);
        const [addplat, setAddPlat] = useState(false);
        const [addcategorie, setAddCategorie] = useState(false);
        const [addshop, setAddShop] = useState(false);
        const [stat, setStat] = useState(false);
        const [isOpen, setIsOpen] = useState(false);

        const handleCommande = () => {
            setAddCategorie(false)
            setAddPlat(false)
            setStat(false)
            setAddShop(false)
            setCommande(true);
            };
            const handleAddPlat = () => {
                setAddCategorie(false)
                setCommande(false);
                setStat(false)
                setAddShop(false)
                setAddPlat(true)
                };
            
            const handleAddCategorie = () => {
                setAddPlat(false)
                setCommande(false);
                setStat(false)
                setAddShop(false)
                setAddCategorie(true)
            
                };
            const handleStat = () => {
                setAddPlat(false)
                setCommande(false);
                setAddCategorie(false)
                setAddShop(false)
                setStat(true)
                };
                const handleShop = () => {
                    setAddPlat(false)
                    setCommande(false);
                    setAddCategorie(false)
                    setStat(false)
                    setAddShop(true)
                    };
             

    return ( 
        <div className="mt-[10%]">
             
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                            <Data   
                                handleCommande={handleCommande}
                                handleAddPlat={handleAddPlat}
                                handleAddCategorie={handleAddCategorie}
                                handleStat={handleStat}
                                handleShop={handleShop}
                                commande={commande}
                                addplat={addplat}
                                addcategorie={addcategorie}
                                addshop={addshop}
                                stat={stat}
                                />
                        </Drawer>
        <Container >
        <div className='' onClick={() => setIsOpen(true)}>
                                <MdMenu
                        size={50}
                        className="text-slate-400 mt-2 border-rounded  cursor-pointer rounded-md  "
                            />
                        </div>
    <div className="my-2 mb-10">
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
        <div className="flex gap-2 p-4">
            <FormAddPlat />
            <ListItem plat={addplat}  categorie={addcategorie} shop={addshop} />
        </div>
        
    )}
    {addcategorie && (
        <div className="flex gap-2 p-4">
            <FormAddCategorie />
            <ListItem plat={addplat}  categorie={addcategorie} shop={addshop}/>
        </div>
        
    )}
    {addshop && (
        <div className="flex gap-2 p-4">
            <FormAddShop />
            <ListItem plat={addplat}  categorie={addcategorie} shop={addshop}/>
        </div>
        
    )}
    {stat && (
    <div className="p-8">
        <div className="w-full gap-4 bg-gray-100 shadow-lg rounded-2xl px-10 py-10">
        <p className="text-center font-semibold text-xl pb-32">statistique</p>
        <div className="py-8"><Pie /></div>
        <div className="py-8"><Steam/></div>
        <div className="py-8"><SalesTable/></div>

        </div>

        
    </div>
    
)}
    </div>

        </Container>
        </div>
    );
}

export default Admin;