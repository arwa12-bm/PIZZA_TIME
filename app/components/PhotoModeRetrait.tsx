"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ModalInfoUtiles from "./ModalInfoUtiles";
import { MdDeleteForever, MdDeleteSweep, MdOutlineIndeterminateCheckBox } from "react-icons/md";
import { FaPenClip, FaRegPenToSquare } from "react-icons/fa6";
import { CiSquareMinus } from "react-icons/ci";

interface PhotoModeRetraitProps {
    data?:any

}
const PhotoModeRetrait: React.FC<PhotoModeRetraitProps> = ({data}) => {

    const [selectedProductData, setSelectedProductData] = useState();

    useEffect(()=>{
        setSelectedProductData(localStorage.getItem("selectedProductData")!==null?JSON.parse(localStorage.getItem("selectedProductData")??'{}'):{})
    },[])
    let ModeRetrait:any=localStorage.getItem("ModeRetrait")!==null?JSON.parse(localStorage.getItem("ModeRetrait")??'{}'):{}
    console.log({ModeRetrait});
    if (Object.keys(ModeRetrait).length === 0 ) {
        // ModeRetrait is an empty object
        return null;
    }

    const currentDate = new Date();
    const options:any = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);
    
    
    return ( 
        <>
            <div className="sticky justify-content  z-30 justify-self-start text-slate cursor-pointer border-[1.2px] border-slate-200 bg-white rounded-r-lg  transition hover:scale-105  "> 
            <div className="flex justify-self-start flex-col m-2  ">
                <div className="flex justify-between">
                    <div className="flex">
                    <Link href="/"  className="flex sticky absolute z-40 pl-8 " >           
                    <Image  src="/logo.png"  alt="logo"  width={"80"} height={"80"} />
                    </Link>
                    <div className="flex flex-cols-4 text-sm  sm:text-md md:text-lg lg:text-lg gap-1 p-2 justify-self-start ">
                        <div>{!ModeRetrait.livrer? "Commande sur place":" Commande en livraison"}</div>
                        <div>{formattedDate}</div>
                        <p>à</p>
                        <div>{ModeRetrait.Time}</div>
                    </div>
                    </div>
                    <div className="flex justify-self-end p-1">
                    <FaPenClip size={18} className="text-slate-800 "/>
                    <MdDeleteForever  size={25} className="text-red-800" onClick={()=>{localStorage.removeItem("ModeRetrait"); window.location.reload();}}/>
                    </div>
                    
                    
                </div>
            </div> 
        </div>
        <ModalInfoUtiles />
    </>

);
}

export default PhotoModeRetrait;