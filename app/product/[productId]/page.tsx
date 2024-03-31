    "use client";

    import { useEffect, useState } from "react";
    import { useParams } from "next/navigation";


    import Container from "@/app/components/Container";
    import HomePhoto from "@/app/components/HomePhoto";
    import CategorieCart from "@/app/components/categorie/CategorieCart";
    import MenuCategorie from "@/app/components/categorie/MenuCategorie";
    import useCard from "@/app/hooks/useCard";


    const Product = () => {
    const params = useParams();
    //console.log({params})
    const [data, setData] = useState(null);


    const {card ,selectedShoplist} = useCard();

    let selectedProduct:any;
useEffect(()=>{
    if(card){
        selectedProduct = card.shoplist?.filter((item:any)=> item.id === params.productId);
        //console.log({selectedProduct})
        setData(selectedProduct);
        localStorage.setItem(
            "selectedShoplist",
            JSON.stringify(selectedProduct)
        );
    }
},[card])





    //console.log("dataPanier",dataPanier)
    // console.log("dataBdxxxx",data);
    // console.log({selectedShoplist})

    return (
        <div className="flex flex-col">
        {selectedShoplist  && <HomePhoto data={selectedShoplist} />}
        <MenuCategorie  />
        <Container>
            <div className="grid grid-cols-1   md:grid-cols-2 sm:grid-cols-2 gap-8 m-8">
            {card  && card.categories.map((item: any) => (
                <div key={item.id} className="">
                {" "}
                <CategorieCart data={item} />
                </div>
            ))}
            </div>
        </Container>
        </div>
    );
    };

    export default Product;
