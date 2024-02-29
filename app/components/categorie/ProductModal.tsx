import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Modal } from 'antd';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';


import Button from '../form/Button';
import { card } from '@/app/utils/products';
import InputSupp from '../form/InputSupp';
import useCard from '@/app/hooks/useCard';


interface ProductModalAppProps{
    Open:boolean
    onClose:()=>void
    img:any
    data:any
    CompList?:any
    
}

const ProductModalApp: React.FC<ProductModalAppProps> = ({Open,onClose,img,data,CompList}) => {
    if (!Open) return null

    const [big,setBig]=useState(true)
    const [loading, setLoading] = useState(false);
    const [checkedItems, setCheckedItems] = useState({CREMEFRAICHE:true,FROMAGE:true,OIGNON:true});
    const{handleAddProductToCart,HandleCartQtyIncrease,cartProducts}=useCard()

    const handleSuppChange=(item:any,SuppItems:any,newCount:any)=>
        {const newCheckedItems:any = {...SuppItems};
        if (newCheckedItems[item.title] === undefined || newCheckedItems[item.title] >= 0  ) {
        newCheckedItems[item.title] = newCount;
        }
        localStorage.setItem("supList",JSON.stringify(newCheckedItems))}
        

    const handleValider=()=>{
        let sup:any=localStorage.getItem("supList")!==null?JSON.parse(localStorage.getItem("supList")??'{}'):{}
        localStorage.setItem("ItemList",JSON.stringify({sup,checkedItems,data}))
        const Existingindex =cartProducts?.findIndex((item:any)=>  JSON.stringify(item.data) === JSON.stringify(data))
        if( Existingindex == -1 || cartProducts == null){
            handleAddProductToCart({sup,checkedItems,data,quantity:1})
            localStorage.setItem("supList",JSON.stringify(null))
            localStorage.setItem("ItemList",JSON.stringify(null))
        }else{
            HandleCartQtyIncrease(cartProducts[Existingindex])

        }
        setLoading(true)
        onClose()
        }
    

    
        
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
            title= {data.title}
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
                                <FormControlLabel key={item.title} control={<Checkbox value={item.title} 
                                                                        onChange={e => {
                                                                            const newCheckedItems:any = {...checkedItems};
                                                                            if (newCheckedItems[item.title] === undefined || e.target.checked) {
                                                                            newCheckedItems[item.title] = true;
                                                                            } else {
                                                                            delete newCheckedItems[item.title];
                                                                            }
                                                                            setCheckedItems(newCheckedItems);
                                                                        }}
                                                                        defaultChecked />}
                                                                    label={item.title} className='border-[1px] rounded-lg justify-content' />
                                )}
                        </FormGroup>
                    </div>
                    <div className='text-left text-lg '>
                        <p>PIZZA SUPPLEMENTS</p>
                        <p className='text-sm'>Choisissez jusqu'à 9</p>
                        <FormGroup className='flex gap-2'>
                            {Object.values(card.SupplimentComposition)?.map((item:any,index:number)=>
                                    <InputSupp item={item} 
                                                index={index}
                                                onchangeList={handleSuppChange}
                                                />
                                
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