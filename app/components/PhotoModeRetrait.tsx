"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

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
    if (Object.keys(ModeRetrait).length === 0) {
        // ModeRetrait is an empty object
        return null;
    }

    const currentDate = new Date();
    const options:any = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);
    
    
    return ( 
        <>
            <div className="sticky justify-content  z-30 justify-self-start   text-slate cursor-pointer border-[1.2px] border-slate-200 bg-white rounded-r-lg  transition hover:scale-105  "> 
            <div className="flex justify-self-start px-8  flex-col m-2  ">
                <div className="flex  gap-4">
                    <Link href="/"  className=" flex sticky absolute z-40 " >           
                    <Image  src="/logo.png"  alt="logo"  width={"80"} height={"80"} />
                    </Link>
                    <div className="flex gap-1 p-1">
                        <div>{!ModeRetrait.livrer? "Commande sur place":" Commande en livraison"}</div>
                        <div>{formattedDate}</div>
                        <p>à</p>
                        <div>{ModeRetrait.Time}</div>
                    </div>
                    
                </div>
            </div> 
        </div>
    </>

);
}

export default PhotoModeRetrait;