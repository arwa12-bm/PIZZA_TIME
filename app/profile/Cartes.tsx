import { useState } from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const Cartes = () => {
    const [clicked,setClicked]=useState(false)
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
            <p>J'enregistre ma carte</p>
        </div>
        :""}
    </div> 
    );
}

export default Cartes;