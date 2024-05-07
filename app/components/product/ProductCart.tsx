"use client";

import { useEffect } from "react";
import Image from "next/image";
import { MdOutlinePayments } from "react-icons/md";
import { LuBadgeDollarSign } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface ProductCartProps {
  data: any;
}
const ProductCart: React.FC<ProductCartProps> = ({ data }) => {
  const router = useRouter();

  return (
  
  
      <div className="flex flex-col gap-2 h-[400px]  justify-between">
        <div className="aspect-square overflow-hidden relative w-full h-[50%] rounded-3xl ">
          <Image
            fill
            src={data.image}
            alt=""
            sizes="(max-width: 600px) 100vw, 600px"
            onClick={() => {localStorage.setItem("selectedShoplist",JSON.stringify(data));
                            router.push(`/menu/1`)}}
          />
        </div>
        <div>
        <div className="grid grid-cols-2  justify-between  text-[15px] font-semibold px-1  w-full  text-green-600">
        </div>
        <div className="text-[15px] font-semibold px-1  text-center">{data.Company}</div>

        <div className={data.etat==="OUVERT"? `text-[15px] font-semibold px-1 text-center text-green-600`: 'text-[15px] font-semibold px-1 text-center'}>{data.etat}</div>

        <div className=" px-1 text-[15px]  text-center">
          <div>{data.Address}, {data.PostalCode} {data.town}</div>
        </div>
</div>
        <div className=' '>
        <div  onClick={() => {localStorage.setItem("selectedShoplist",JSON.stringify(data));
                            router.push(`/menu/1`)}} >
              <p className='flex items-center justify-center text-center text-lg font-medium text-pink mt-2 hover-underline cursor-pointer hover-scale-150 transition '>Consulter<ChevronRightIcon width={20} height={20} /></p>
        </div>
        </div>
        </div>


  );
};

export default ProductCart;
