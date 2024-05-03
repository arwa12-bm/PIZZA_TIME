"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import MenuCategorie from "../../components/categorie/MenuCategorie";
import ProductCategorie from "@/app/components/categorie/ProductCategorie";
import useCard from "@/app/hooks/useCard";
import HomePhoto from "@/app/components/HomePhoto";
import CategorieCartsmall from "@/app/components/categorie/CategorieCartsmall";
import Container from "@/app/components/Container";
import { Fade } from "react-awesome-reveal";
import Banner from "@/app/components/Banner";
import MenuCart from "@/app/cart/MenuCart";
import Gallery from "@/app/components/Gallery";

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
<div className="flex flex-col " >
    <Banner />

    <Container>
    <MenuCart  setIsOpenMenu={()=>{}} isOpenMenu={false} />
    <div className="flex "  id="about-section">
    <div className=" col-span-1 w-[30%]  p-2">
    {card  && card.categories.sort((a:any, b:any) => a.id - b.id).map((item: any) => (
        <div key={item.id} className="">
        {" "}
        <CategorieCartsmall data={item} />
        </div>
    ))}
    </div>
    <div className="grid grid-rows-2 px-8 col-span-[170%]">
    <div className="text-center pt-32">
            <Fade direction={'up'} delay={400} cascade damping={1e-1} triggerOnce={true}>
                <h2 className='text-pink text-lg font-normal mb-3 tracking-widest uppercase ls-51'>Commander chez nous</h2>
            </Fade>
            <Fade direction={'up'} delay={500} cascade damping={1e-1} triggerOnce={true}>
                <h3 className="text-3xl lg:text-5xl font-semibold text-black">
                    Menu
                </h3>
            </Fade>
        </div>
    <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-8  ">
    <Fade direction={'up'} delay={500} cascade damping={1e-1} triggerOnce={true}>

    {data &&
        data[0].items?.map((item: any) => (
        <div key={item}>
            <ProductCategorie data={item} selectedCatId={params.productId}/>
        </div>
        ))}
        </Fade>
    </div>
    </div>
    </div>
    <Gallery />

    </Container>

</div>
);
};

export default Menu;
