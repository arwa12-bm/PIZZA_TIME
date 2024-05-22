import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { TbTruckDelivery } from 'react-icons/tb';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';


import useCard from '@/app/hooks/useCard';
import Button from '../components/form/Button';
import FormAddPlat from './formAddPlat';
import FormAddCategorie from './formAddCategorie';
import FormAddShop from './formAddShop';



interface ComfirmationProps{
    Open:boolean
    onClose:()=>void
    Data?:any
    plat:boolean
    categorie:boolean
    shop:boolean
}

const Update: React.FC<ComfirmationProps>= ({ Open,onClose,Data,categorie,plat,shop}) => {
    if (!Open) return null

    const [big,setBig]=useState(true)
    const [loading, setLoading] = useState(false);
   

    const router = useRouter()
  
    useEffect(() => {
        
        const handleResize = () => {
            if (window.innerWidth < 760) {
                setBig(false)
                
            } else {
                setBig(true)
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return (
        <>
        <Modal
            open={Open}
            title="Modes de retrait"
            onCancel={onClose}
            footer={[
        
            <Button
                label='Valider  '
                key="link"
                href=""
                disabled={loading}
                onClick={()=>{}}
            />
            ]}
        >

{ plat && <FormAddPlat update={true} Data={Data} onCloseModalUpdate={()=>onClose()} /> } 
{ categorie && <FormAddCategorie update={true} Data={Data} onCloseModalUpdate={()=>onClose()}/> }        
{ shop && <FormAddShop update={true} Data={Data} onCloseModalUpdate={()=>onClose()}/> }        

</Modal>
        </>
    );
    };

export default Update;