import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { TbTruckDelivery } from 'react-icons/tb';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';


import useCard from '@/app/hooks/useCard';
import Button from '../components/form/Button';



interface ComfirmationProps{
    Open:boolean
    onClose:()=>void
    data?:any
    action:()=>void
}

const Comfirmation: React.FC<ComfirmationProps>= ({ Open,onClose,action,data}) => {
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
                onClick={()=>{action}}
            />
            ]}
        >
        <div>Supprimer cet element</div>
        </Modal>
        </>
    );
    };

export default Comfirmation;