"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/app/utils/formatPrice";
import ModalCommander from "./ModalCommander";
import useCard from "@/app/hooks/useCard";
import ModeRetraitModal from "./ModalModeRetrait";

interface ProductCategorieProps{
    data:any
    selectedCatId:any
}

const ProductCategorie:React.FC<ProductCategorieProps>= ({data,selectedCatId}) => {

    const {selectedCategorie,getselectedCategorie,card,ModeRetrait} = useCard()
    useEffect(()=>{
        getselectedCategorie()
        //console.log({selectedCategorie});

    },[])
    //{card && console.log({data})}
    

    let  selectedProduct :any
    selectedProduct  = card?.items?.find((item:any)=> item.id === Number(data) )
    //console.log({card})

    //{card && console.log({selectedProduct})}
    //console.log("xx",data)

    const [isOpen,setIsOpen]=useState(false)
    const [isOpenModeRetrait,setIsOpenModeRetrait]=useState(false)

    const handleOpenModal =()=>{
        setIsOpen(true)
    }
    const handleModalClose = () => {
        setIsOpen(false);
    };
    const handleOpenModal2 =()=>{
        setIsOpenModeRetrait(true)
    }
    const handleModalClose2 = () => {
        setIsOpenModeRetrait(false);
    };

    const handle=()=>{
            
        if (ModeRetrait === null || Object.keys(ModeRetrait).length === 0 ){
            handleOpenModal2
        }else{
            handleOpenModal} 

    }

    return ( 
        <div  className="flex flex-cols-2 gap-8 justify-center items-center m-4  text-[15px] cursor-pointer hover:scale-105  border-gray-200 p-2">
            {card && <div  onClick={ModeRetrait === null || Object.keys(ModeRetrait).length === 0 ?handleOpenModal2:handleOpenModal}>
                <div className="aspect-square overflow-hidden relative  rounded-md h-[280px] w-[300px]">
                    <Image
                        fill
                        src={selectedProduct?.imageUrl}
                        alt=""
                        
                    />
                </div>
                <div className="flex flex-col">
                    <div className="col-span-1 text-center text-xl font-semibold p-1">{selectedProduct?.title}</div>
                    <div className=" text-center ">A partir de {formatPrice(selectedProduct?.price)}</div>
                    {/* <div className="flex text-center text-gray-600">
                                {selectedProduct.basicComposition.map((item:any)=><p key={item}>{item.title},</p>)}
                    </div> */}
                </div>
            </div>}
            <ModalCommander  Open={isOpen} onClose={handleModalClose} data={selectedProduct} img={selectedProduct?.imageUrl} CompList={selectedProduct?.basicComposition}/>
            <ModeRetraitModal Open={isOpenModeRetrait} onClose={handleModalClose2} data={selectedCatId} />

        </div>
    );
}

export default ProductCategorie ; 