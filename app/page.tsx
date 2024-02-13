import Image from "next/image";
import Container from "./components/Container";
import HomePhoto from "./components/HomePhoto";
import { MdGpsFixed } from "react-icons/md";
import { card, products } from "./utils/products";
import ProductCart from "./components/product/ProductCart";


export default function Home() {

 
  
  return (
    <div className="">
    <HomePhoto />
    <Container>
      <div className="grid grid-cols-1 p-4 item-center   gap-4 lg:gap-12 pt-2 item-center justify-between">
        <h1 className="text-[20px] ">Nos magasins à proximité</h1>
        <div className="flex gap-0 w-full">
          <input className="border-[1px] border-slate-400  w-full rounded-sm  text-sm p-2 item-center justify-center  md:item-center" type="text" placeholder="Saisisser votre adresse,code postale ou ville"/>
          <MdGpsFixed size={40}  className="border-[1px]  bg-slate-300 w-[10%] rounded-md p-2 " />
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {Object.values(card.shoplist).map((item)=><div  key={item.Company}> <ProductCart  data={item}/></div> )}
          
        </div>
      </div>
      
    </Container>
    </div>
    
  );
}
