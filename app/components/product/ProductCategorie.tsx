"use client"

import { card } from "@/app/utils/products";
import Image from "next/image";


interface ProductCategorieProps{
    data:any
}
const ProductCategorie:React.FC<ProductCategorieProps>= ({data}) => {
    let  selectedProduct:any

    for (let item in Object.keys(card.items)) {
        if (JSON.stringify((Object.keys(card.items)as any)[item]) === JSON.stringify(data) ) {
            selectedProduct  =  Object.values(card.items as any)[item]
        }
    }
    console.log({selectedProduct});
    
  

    return ( 
        <div className=" ">
        <div  className="flex flex-cols-2 gap-8 justify-center items-center m-4  text-[15px] cursor-pointer hover:scale-105">
            <div >
                <div className="col-span-1 text-center font-semibold">{selectedProduct.title} </div>
                <div className="aspect-square overflow-hidden relative  rounded-md h-[280px] w-[300px]">
                    <Image
                        fill
                        src={selectedProduct.imageUrl.Default.urlDefault}
                        alt=""
                        
                    />
                </div>
                <div className=" text-center font-semibold">{selectedProduct.price.default}</div>
            </div>
            
        
        </div>
    </div>
    
    );
}

export default ProductCategorie ; 