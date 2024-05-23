'use client'

import { MdDeleteForever } from "react-icons/md";
import { FaRegPenToSquare } from "react-icons/fa6";
import { useState } from "react";
import Comfirmation from "./ModaComfirmation";
import Update from "./ModalUpdate";

interface ItemContentProps{
    item:any
    onDelete:(id:any)=>void
    categorie:boolean
    plat:boolean
    shop:boolean
}

const Items: React.FC<ItemContentProps> = ({ item, onDelete,categorie,plat,shop}) => {
    
    const [showModal, setShowModal] = useState(false);
    const onClose = () => {
    setShowModal(!showModal);
    };
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const onCloseUpdate = () => {
    setShowModalUpdate(!showModalUpdate);
    };
    
    return (
<div className="flex justify-between  border-b-[1px] gap-8  m-2 w-full ">
                        {!shop ?
                        <div className="flex ">
                        <div className="h-20 w-20 m-1 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src={item.imageUrl} alt="" className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="flex gap-4 mt-4 w-full justify-between text-base font-medium text-gray-900">
                            <h3>
                            <a href="#">{item.title}</a>
                            
                        </h3>
                        {/* <p className="">{formatPrice(item.price)}</p> */}
                        </div>
                        </div>
                        :
                        <div >
                        <div className="flex gap-4 mt-4 w-full justify-between text-base font-medium text-gray-900">
                            <h3>
                            <a href="#">{item.Company}</a>
                            
                        </h3>
                        {/* <p className="">{formatPrice(item.price)}</p> */}
                        </div>
                        </div>
                        }
                        <div className="grid grid-rows-2 justify-end ">
                            <FaRegPenToSquare  size={20} className="text-slate-800 m-2 text-green-700"onClick={()=>setShowModalUpdate(true)} />
                            <MdDeleteForever  size={25} className="text-red-800 m-1" onClick={()=>setShowModal(true)}/>
                        </div>
                        <Comfirmation onClose={onClose} Open={showModal} action={()=>onDelete(item.id)}/>
                        <Update  onClose={onCloseUpdate} Open={showModalUpdate} Data={item} categorie={categorie} plat={plat}  shop={shop}/>
            </div>
    );
}

export default Items;