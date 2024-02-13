"use client"

import { IconType } from "react-icons";


interface InputProps{
    type:string ,
    placeholder:string
    label?:string,
    Icon?:IconType,
}
const Input :React.FC<InputProps>= ({type,placeholder,label,Icon}) => {
    return ( 
        <div className=" px-2">
            <label  className="p-2 text-sm">{label}</label>
            <div className="flex relative gap-0 h-full">
                {Icon && <Icon size={30} className="absolute border-slate-200 p-1 mt-3"/>}
                <input 
                type={type}
                placeholder={placeholder}
                className=" border-b-[2px] border-b-gray-200 pl-8 text-m w-full p-4 text-gray-200 mb-4 "

            />    
            </div>
        </div>
    );
}

export default Input;