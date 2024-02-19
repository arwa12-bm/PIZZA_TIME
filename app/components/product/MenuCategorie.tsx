import { card } from "@/app/utils/products";
import { useEffect, useState } from "react";
import CategorieCart from "./CategorieCart";
import { DropdownApp } from "./dropDown";

const MenuCategorie:React.FC = () => {
    const [taille,setTaille] = useState(0)
    const [n,setN] = useState(4)
    
    let listCategorie:any[]
    let ListDrop:any[]
    useEffect(() => {
        
        setTaille(window.innerWidth)
        const handleResize = () => {
            if (window.innerWidth < 760) {
                setN(4)
                
                
            } else {
                setN(Object.values(card.categories).length)
                
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    listCategorie =Object.values(card.categories).slice(1, n)
    //console.log({listCategorie});
    
    
    ListDrop= Object.values(card.categories).filter((item:any)=>listCategorie.findIndex((el:any)=>el.title===item.title)===-1 )
    //console.log({ListDrop});

    return (  
    <div className="flex justify-center shadow-md shadow-rounded-lg shadow-black gap-2  w-full justify-content p-4 ">
    {listCategorie.map((item)=><div  className=""><CategorieCart  data={item} isTitle={true} /></div>)}
    <DropdownApp items={ListDrop}/>
    
</div> );
}
 
export default MenuCategorie  ;