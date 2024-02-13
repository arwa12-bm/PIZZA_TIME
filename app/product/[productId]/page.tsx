"use client"

import Container from "@/app/components/Container";
import HomePhoto from "@/app/components/HomePhoto";
import ProductCart from "@/app/components/product/ProductCart";
import { card } from "@/app/utils/products";

interface Iparams{
    productId?:string
}
const Product= ({params}:{params:Iparams}) => {
    console.log("params",params.productId);
    
    //const products: any= card.shoplist
    // const selectedProduct: any  = Object.values(products).find( product => Object.keys("8502b411-a195-4c6d-a3af-b92619097278"));
    //const selectedProduct: any  = Object.values(products).find( (product:any) => JSON.stringify(Object.keys(product)) === JSON.stringify( params.productId) );
    let selectedProduct:any
    for (let item in Object.keys(card.shoplist)) {
        
        if (JSON.stringify((Object.keys(card.shoplist)as any)[item]) === JSON.stringify(params.productId) ) {
            selectedProduct  =  Object.values(card.shoplist as any)[item]
           // console.log("xxx",Object.values(card.shoplist as any)[item])
        }
    }
    console.log("selectedProduct",selectedProduct)
    return ( 
    <div className="">
    <HomePhoto />
    <Container>
        <div className="p-4">
        <ProductCart  data={selectedProduct} />
        </div>
    </Container>
    </div>

        
        
        );
}

export default Product;