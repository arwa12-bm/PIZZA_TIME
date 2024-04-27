"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import MenuCategorie from "../../components/categorie/MenuCategorie";
import ProductCategorie from "@/app/components/categorie/ProductCategorie";
import useCard from "@/app/hooks/useCard";
import HomePhoto from "@/app/components/HomePhoto";
import CategorieCartsmall from "@/app/components/categorie/CategorieCartsmall";
import Container from "@/app/components/Container";

const Menu = () => {
const params = useParams();


const [data, setData] = useState<any>();
const { card,getDataCard,selectedShoplist} = useCard();

// console.log({card});


useEffect(() => {

console.log("aaa",card)
    if (card !== undefined) { // Check for undefined instead of "undefined"
        const selectedCat = card.categories.filter(
            (item: any) => item.id === Number(params.productId)
        );
        console.log({selectedCat});
        
        setData(selectedCat);
        localStorage.setItem("selectedCategorie", JSON.stringify(selectedCat));
    }  
}, [params,card]);
useEffect(()=>{
    if(card === "undefined"){
        getDataCard()
    console.log({card});
    }
    
},[])

return (
<div className="flex flex-col">
    <HomePhoto  />
    <MenuCategorie />
    <Container>

    <div className="flex ">
    <div className=" col-span-1 w-[30%]  p-2">
    {card  && card.categories.sort((a:any, b:any) => a.id - b.id).map((item: any) => (
        <div key={item.id} className="">
        {" "}
        <CategorieCartsmall data={item} />
        </div>
    ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-8 m-8  col-span-[170%]">
    {data &&
        data[0].items?.map((item: any) => (
        <div key={item}>
            <ProductCategorie data={item} selectedCatId={params.productId}/>
        </div>
        ))}
    </div>
    </div>
    </Container>

</div>
);
};

export default Menu;
