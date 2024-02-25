import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import Button from '../form/Button';
import Image from 'next/image';
import CheckBox from './checkList';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { formatPrice } from '@/app/utils/formatPrice';
import { card } from '@/app/utils/products';
import NumberControl from './InputNumber';
interface ProductModalAppProps{
    Open:boolean
    onClose:()=>void
    img:any
    titleP:any
    CompList?:any
    
}
const ProductModalApp: React.FC<ProductModalAppProps> = ({Open,onClose,img,titleP,CompList}) => {
    if (!Open) return null

    const [big,setBig]=useState(true)
    const [loading, setLoading] = useState(false);
    
    
    
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

    const [count, setCount] = React.useState(0);

    const onCountChanged = (newCount: number) => {
        setCount(newCount);
    };


    return (
        <>
    
        <Modal
            open={Open}
            title= {titleP}
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
            <div className="flex w-full  justify-center overflow-y-auto h-[400px] font-semibold  text-center mt-8">
                <div className='w-full flex flex-col gap-2 '>
                    <div className='flex w-full  justify-content justify-center'>
                        <Image
                            height={450}
                            width={450}
                            src={img}
                            alt=""
                            
                        />
                    </div>
                    <div className='text-left text-lg '>
                        <p>COMPOSITION DE BASE</p>
                        <FormGroup className='flex gap-2'>
                            {Object.values(CompList).map((item:any)=>
                                <FormControlLabel control={<Checkbox defaultChecked />} label={item.title} className='border-[1px] rounded-lg justify-content' />
                                )}
                        </FormGroup>
                    </div>
                    <div className='text-left text-lg '>
                        <p>PIZZA SUPPLEMENTS</p>
                        <p className='text-sm'>Choisissez jusqu'à 9</p>
                        <FormGroup className='flex gap-2'>
                            {Object.values(card.SupplimentComposition)?.map((item:any,index:number)=>
                                    <div key={index} className='flex justify-content justify-between border-[1px] rounded-lg '>
                                        <FormControlLabel control={<Checkbox checked={count > 0} />} value={count} label={item.title}  />
                                        <NumberControl value={count} onChange={onCountChanged} />
                                        <p className='p-2'>{formatPrice(item.price)}</p>
                                    </div>
                                
                                )}
                        </FormGroup>
                    </div>
                    
                </div>
                
            
            </div>
        </Modal>
        </>
    );
    };

export default ProductModalApp;