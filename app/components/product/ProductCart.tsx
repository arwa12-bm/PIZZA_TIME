"use client";

import { useEffect } from "react";
import Image from "next/image";
import { MdOutlinePayments } from "react-icons/md";
import { LuBadgeDollarSign } from "react-icons/lu";
import { useRouter } from "next/navigation";

interface ProductCartProps {
  data: any;
}
const ProductCart: React.FC<ProductCartProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div
      className="relative col-span-1 h-full cursor-pointer border-[1.2px] border-black rounded-md bg-white 
    transition hover:scale-105  text-sm  "
    >
      <div className="flex flex-col gap-2 p-1">
        <div className="aspect-square overflow-hidden relative w-full rounded-md h-[260px] ">
          <Image
            fill
            src={data.image}
            alt=""
            onClick={() => {localStorage.setItem("selectedShoplist",JSON.stringify(data));
                            router.push(`/menu/1`)}}
          />
        </div>
        <div className="grid grid-cols-2  justify-between  text-[15px] font-semibold px-1  w-full  text-green-600">
        </div>
        <div className="text-[15px] font-semibold px-1  text-center">{data.Company}</div>

        <div className={data.etat==="OUVERT"? `text-[15px] font-semibold px-1 text-center text-green-600`: 'text-[15px] font-semibold px-1 text-center'}>{data.etat}</div>

        <div className=" px-1 text-[15px]  text-center">
          <div>{data.Address}, {data.PostalCode} {data.town}</div>
        </div>
        {/* <div>
          <div className="flex gap-2 p-2 items-center">
            <MdOutlinePayments
              size={40}
              className="rounded-3xl p-1 bg-green-600 text-white "
            />
            <LuBadgeDollarSign
              size={40}
              className="rounded-3xl p-1 bg-green-600 text-white"
            />
            <LuBadgeDollarSign
              size={40}
              className="rounded-3xl p-1 bg-green-600 text-white"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCart;
