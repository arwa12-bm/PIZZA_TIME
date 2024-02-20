import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { TbTruckDelivery } from 'react-icons/tb';

import TimePickerApp from './TimePicker';
import Button from '../form/Button';

const CategorieModalApp: React.FC = () => {

    const [taille, setTaille] = useState(0)
    const [small,setSmall]=useState(false)
    const [big,setBig]=useState(true)
    const[emporter,setEmporter]=useState(true)
    const[livrer,setLivrer]=useState(false)
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };


    const handleEmporter =()=>{
        setEmporter(!emporter)
        setLivrer(false)
    }
    const handleLivrer=()=>{
        setLivrer(!livrer)
        setEmporter(false)
    }


    useEffect(() => {
        
        setTaille(window.innerWidth)
        const handleResize = () => {
            if (window.innerWidth < 760) {
                setSmall(true)
                setBig(false)
                
            } else {
                setBig(true)
                setSmall(false)
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


   

    return (
        <>
        <Button label='Commander'  onClick={showModal}   />
            
        
        <Modal
            open={open}
            title="Modes de retrait"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
        
            <Button
                label='Valider  '
                key="link"
                href=""
                disabled={loading}
                onClick={handleOk}
            />
            ]}
        >
            <div className="flex  gap-14 w-full justify-content justify-center  font-semibold  text-center mt-8">
                <div className=" grid  gap-2 justify-content  justify-center" onClick={handleEmporter}>
                    <HiOutlineShoppingBag size={100} className={emporter?"rounded-full bg-green-500 text-white p-2":"rounded-full bg-gray-800 text-white p-2" } />
                    <h1 className={emporter?"text-green-500":""}>A emporter</h1>
                </div>
                <div className=" grid gap-2 justify-content   justify-center" onClick={handleLivrer}>
                    <TbTruckDelivery size={100} className={livrer?"rounded-full bg-green-500 text-white p-2":"rounded-full bg-gray-800 text-white p-2" }  />
                    <h1 className={livrer?"text-green-500":""}>En livraison</h1>
                </div>
            </div>
            <div className={big? "flex flex-col gap-8 mt-10 mb-8" : "flex flex-col" }>
                <label htmlFor="" className="relative mb-2 border-[1px] text-center p-2">Aujourd'hui</label>
                <TimePickerApp />
            </div>
        </Modal>
        </>
    );
    };

export default CategorieModalApp;