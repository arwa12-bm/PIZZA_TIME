"use client";
import Image from "next/image";
import { MdOutlinePayments } from "react-icons/md";
import { LuBadgeDollarSign } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { card } from "@/app/utils/products";

interface ProductCartProps {
  data: any;
}
const ProductCart: React.FC<ProductCartProps> = ({ data }) => {
  const router = useRouter();
  //let id:any
  //   const id = Object.values(card.shoplist).find(
  //     (item: any) =>
  //       JSON.stringify(item) === data)
  let id = "";
  for (let item of Object.keys(card.shoplist)) {
    if (JSON.stringify((card.shoplist as any)[item]) === JSON.stringify(data)) {
      id = item;
    }
  }

  // console.log("data xx",data)
  console.log("id xx", id);
  return (
    <div
      className="col-span-1 h-full cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm
    transition hover:scale-105  text-sm "
    >
      <div className="flex flex-col gap-2">
        <div className="aspect-square overflow-hidden relative w-full rounded-md h-[260px]">
          <Image
            fill
            src={data.image}
            alt=""
            onClick={() => router.push(`/product/${id}`)}
          />
        </div>
        <div className="grid grid-cols-2  justify-between  text-[15px] font-semibold px-1  w-full  text-green-600">
          <div className="col-span-1 w-[200%]">{data.Company}</div>
          <div className="flex flex-col text-right">{data.etat}</div>
        </div>
        <div className=" px-1 text-[15px] flex gap-1 ">
          <div>{data.Address},</div>
          <div>{data.PostalCode}</div>
          <div>{data.town}</div>
        </div>
        <div>
          <div className="flex gap-2 p-2">
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
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
