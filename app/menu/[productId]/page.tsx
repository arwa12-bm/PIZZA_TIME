"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import MenuCategorie from "../../components/categorie/MenuCategorie";
import ProductCategorie from "@/app/components/categorie/ProductCategorie";
import useCard from "@/app/hooks/useCard";
import HomePhoto from "@/app/components/HomePhoto";

const Menu = () => {
const params = useParams();

const [data, setData] = useState<any>();
const { card, selectedShoplist } = useCard();

let selectedCat: any;
useEffect(() => {
if (card) {
    selectedCat = card.categories?.filter(
    (item: any) => item.id === params.productId
    );
    setData(selectedCat);
    localStorage.setItem("selectedCategorie", JSON.stringify(selectedCat));
}
}, [card]);

return (
<div className="flex flex-col">
    {selectedShoplist && <HomePhoto data={selectedShoplist} />}
    <MenuCategorie />
    <div className="grid grid-cols-1   md:grid-cols-2 sm:grid-cols-2 gap-8 m-8">
    {data &&
        data[0].items?.map((item: any) => (
        <div key={item}>
            <ProductCategorie data={item} />
        </div>
        ))}
    </div>
</div>
);
};

export default Menu;
