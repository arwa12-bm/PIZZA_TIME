import { useState } from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

import DoubleInputApp from "../components/form/doubleInput";
import DoubleInputAppDT from "../components/form/doubleInputDT";

const ModeRetrait = () => {
    const [clicked,setClicked]=useState(false)

    let ModeRetrait:any=localStorage.getItem("ModeRetrait")!==null?JSON.parse(localStorage.getItem("ModeRetrait")??'{}'):{}

    return ( 
    <div className=" relative justify-content border-[1.2px] border-slate-200 bg-white shadow-md  rounded-2xl m-4 ">
        <div className="flex p-1 justify-between">
            <div className="flex  p-2 gap-1">
                <CiCreditCard1  size={25} />
                <p className="">Mes cartes</p>
            </div>
            {clicked?
            <RiArrowDropUpLine size={50} onClick={()=>setClicked(!clicked)}  />
            : <RiArrowDropDownLine size={50} onClick={()=>setClicked(!clicked)} />            }
        </div>
        {clicked?
        <div className="grid grid-row p-2 gap-2 ">
            <select className="justify-content border-[2px] rounded-md p-1">
                <option value="emporter"  selected={!ModeRetrait.livrer}>A emporter</option>
                <option value="livraison" selected={ModeRetrait.livrer} >En livraison</option>
            </select>
                <DoubleInputApp  />
                <DoubleInputAppDT  ModeRetrait={ModeRetrait} />
            </div>
        :""}
    </div> 
    );
}

export default ModeRetrait;