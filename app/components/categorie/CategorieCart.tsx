    "use client"

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ModeRetraitModal from "./ModalModeRetrait";
import useCard from "@/app/hooks/useCard";


    interface CategorieCartProps{
        data:any
        isTitle?:boolean
        
    }
    const CategorieCart:React.FC <CategorieCartProps> = ({data,isTitle}) => {
        const {ModeRetrait}=useCard()
        const [isOpen,setIsOpen]=useState(false)
        const handleOpenModal =()=>{
            setIsOpen(true)
        }
        const handleModalClose = () => {
            setIsOpen(false);
        };
    
        const router = useRouter()

        const handle=()=>{
            
            if (ModeRetrait === null || Object.keys(ModeRetrait).length === 0 ){
                handleOpenModal()
            }else{
                router.push(`/menu/${data.id}`)} 

        }
    
        return ( 
        <div>
        {isTitle?
            <div className="flex flex-col gap-2 justify-center items-center  text-[15px] cursor-pointer hover:scale-105 no-underline hover:underline decoration-black xl:decoration-font-semibold">
                    <div className="col-span-1 text-lg" onClick={()=>{router.push(`/menu/${data.id}`)}} >{data.title}</div>
            </div>
        :<>

            <div className=" ">
                <div  className="flex flex-col gap-2 justify-center items-center  text-[15px] cursor-pointer hover:scale-105">
                    <div onClick={handle } >
                        <div className="col-span-1 text-center font-semibold">{data.title} </div>
                        <div className="aspect-square overflow-hidden relative  rounded-md h-[280px] w-[300px]">
                            <Image
                                fill
                                src={data.imageUrl.Default.urlDefault}
                                alt=""
                                
                            />
                        </div>
                    </div>
                    
                    <ModeRetraitModal Open={isOpen} onClose={handleModalClose} data={data} />
                </div>
            </div>
            

        </>}
        
        </div>
        
        );
    }
    
    export default CategorieCart;