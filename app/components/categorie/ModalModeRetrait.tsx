import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { TbTruckDelivery } from 'react-icons/tb';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';


import TimePickerApp from '../form/TimePicker';
import Button from '../form/Button';
import useCard from '@/app/hooks/useCard';


interface ModeRetraitModalProps{
    Open:boolean
    onClose:()=>void
    data?:any
}

const ModeRetraitModal: React.FC<ModeRetraitModalProps>= ({ Open,onClose,data}) => {
    if (!Open) return null

    const {selectedCategorie}= useCard()
    const format = 'HH:mm';
    const [big,setBig]=useState(true)
    const[emporter,setEmporter]=useState(true)
    const[livrer,setLivrer]=useState(false)
    const [loading, setLoading] = useState(false);
    const [selectedTime, setSelectedTime] = useState(dayjs('12:00', format));
    const [ModeRetrait, setModeRetrait] = useState();
    const router = useRouter()
    const handleEmporter =()=>{
        setEmporter(!emporter)
        setLivrer(false)
    }
    const handleLivrer=()=>{
        setLivrer(!livrer)
        setEmporter(false)
    }
    // console.log({selectedTime})

    const handleValider= ()=>{
        localStorage.setItem("ModeRetrait",JSON.stringify({"Time":selectedTime.format(format),"emporter":emporter,"livrer":livrer }))
        //{data && router.push(`/menu/${data.id}`)}
        onClose()
        // console.log({data})
        window.location.href = `/menu/1`
    }
    
    const handleTimeChange = (time:any) => {
        setSelectedTime(time);
    };

    useEffect(()=>{
        setModeRetrait(localStorage.getItem("ModeRetrait")!==null?JSON.parse(localStorage.getItem("ModeRetrait")??'{}'):{})
    },[])
    
    
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
                onClick={handleValider}
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
                <TimePickerApp  handleTimeChange={handleTimeChange}/>
            </div>
        </Modal>
        </>
    );
    };

export default ModeRetraitModal;