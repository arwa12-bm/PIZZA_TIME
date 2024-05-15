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

                    <div onClick={()=>router.push(`/menu/${data.id}#about-section`)} className="flex p-2 text-[15px] justify-center items-center cursor-pointer hover:scale-105" >
                        <div className="relative rounded-full h-[80px] w-[100px]">
                            <Image
                                fill  
                                src={data.imageUrl}
                                alt=""
                                sizes="(max-width: 80px) 30vw, 80px"
                                
                            />
                        </div>
                        <div className=" font-semibold  px-2 ">{data.title} </div>
                    </div>
                                

        </>}
        
        </div>
        
        );
    }
    
    export default CategorieCartsmall;