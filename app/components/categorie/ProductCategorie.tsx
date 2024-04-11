"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/app/utils/formatPrice";
import ModalCommander from "./ModalCommander";
import useCard from "@/app/hooks/useCard";

interface ProductCategorieProps{
    data:any
}

const ProductCategorie:React.FC<ProductCategorieProps>= ({data}) => {

    const {selectedCategorie,getselectedCategorie,card} = useCard()
    useEffect(()=>{
        getselectedCategorie()
        //console.log({selectedCategorie});

    },[])
//console.log({card})
    

    let  selectedProduct :any
    selectedProduct  = card?.items?.find((item:any)=> item.id === data )
 
    //console.log({selectedProduct})
    //console.log("xx",data)

    const [isOpen,setIsOpen]=useState(false)
    const handleOpenModal =()=>{
        setIsOpen(true)
    }
    const handleModalClose = () => {
        setIsOpen(false);
    };

    return ( 
        <div  className="flex flex-cols-2 gap-8 justify-center items-center m-4  text-[15px] cursor-pointer hover:scale-105">
            <div  onClick={handleOpenModal}>
                <div className="aspect-square overflow-hidden relative  rounded-md h-[280px] w-[300px]">
                    <Image
                        fill
                        src={selectedProduct.imageUrl}
                        alt=""
                        
                    />
                </div>
                <div className="flex justify-between">
                    <div className="col-span-1 text-center ">{selectedProduct.title}</div>
                    <div className=" text-center ">{formatPrice(selectedProduct.price)}</div>
                </div>
            </div>
            <ModalCommander  Open={isOpen} onClose={handleModalClose} data={selectedProduct} img={selectedProduct.imageUrl} CompList={selectedProduct.basicComposition}/>
        </div>
    );
}

export default ProductCategorie ; 