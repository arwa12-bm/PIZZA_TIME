    "use client"

    import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "./ModalCategorie";


    interface CategorieCartProps{
        data:any
        isTitle?:boolean
    }
    const CategorieCart:React.FC <CategorieCartProps> = ({data,isTitle}) => {
        const [showModal,setShowModal]=useState(false)
        const[isClicked,setIsClicked]=useState(false)
        

        const handleCommande =()=>{
            setIsClicked(true)
        }
        const handleCloseCommande =()=>{
            setIsClicked(false)

        }
        
        //console.log("small",small)
        //console.log("big",big)

        return ( 
        <div>
        {isTitle?
            <div className="flex flex-col gap-2 justify-content  text-[15px] cursor-pointer hover:scale-105  no-underline hover:underline decoration-black xl:decoration-font-semibold">
                    <div className="col-span-1 text-lg ">{data.title}</div>
                    
            </div>
        :<>

            <div className="grid gid-cols-2">
                <div className="flex flex-col gap-2 justify-center items-center  text-[15px] cursor-pointer hover:scale-105">
                <div className="col-span-1 font-semibold">{data.title}</div>
                <div className="aspect-square overflow-hidden relative  rounded-md h-[280px] w-[300px]">
                    <Image
                        fill
                        src={data.imageUrl.Default.urlDefault}
                        alt=""
                        onClick={() => { }}
                    />
                </div>
                <button className="bg-green-600 text-white p-1 w-full rounded-md text-2xl" onClick={handleCommande} >Commander</button>
            </div>
            
            </div>
            

        </>}
        
        <div className="">
                <Modal isVisible={isClicked} onClose={handleCloseCommande} />
        </div>
        </div>
        
        );
    }
    
    export default CategorieCart;