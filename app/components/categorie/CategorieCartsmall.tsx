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
    const CategorieCartsmall:React.FC <CategorieCartProps> = ({data,isTitle}) => {
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
                <div  className=" text-[15px] cursor-pointer hover:scale-105">
                    <div onClick={()=>router.push(`/menu/${data.id}`)} className="flex gap-2 p-1 border-b-[1px]" >
                        <div className=" overflow-hidden relative aspect-square h-[60px] w-[60px]">
                            <Image
                                fill
                                src={data.imageUrl}
                                alt=""
                                
                            />
                        </div>
                        <div className="font-semibold pt-5">{data.title} </div>
                    </div>
                    
                    {/* <ModeRetraitModal Open={isOpen} onClose={handleModalClose} data={data} /> */}
                </div>
            </div>
            

        </>}
        
        </div>
        
        );
    }
    
    export default CategorieCartsmall;