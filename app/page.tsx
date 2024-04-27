"use client";

import { useCallback, useEffect, useState } from "react";


import Container from "./components/Container";
import HomePhoto from "./components/HomePhoto";
import ProductCart from "./components/product/ProductCart";
import useCard from "./hooks/useCard";
import { FaMapMarkerAlt } from "react-icons/fa";
import Map from "./components/Map";

export default function Home() {
const {card} =useCard()
const [showMap,setShowMap]=useState(false)
const [tokenData, setTokenData] = useState(null);





// useEffect(() => {
//     // Fonction pour extraire les paramètres de l'URL
//     const getTokenDataFromUrl = () => {
//         const searchParams = new URLSearchParams(window.location.search);
//         console.log({searchParams})
//         const token = searchParams.get('token');
//         if (token) {
//             try {
//                 // Convertir la chaîne JSON en objet JavaScript
//                 const parsedTokenData = JSON.parse(decodeURIComponent(token));
//                 console.log({parsedTokenData})
//                 setTokenData(parsedTokenData);
//             } catch (error) {
//                 console.error('Error parsing token data:', error);
//             }
//         }
//     };

//     // Appeler la fonction pour extraire les données du token lorsque le composant est monté
//     getTokenDataFromUrl();
// }, []);
console.log({tokenData})

// {!showMap && window.location.reload();}

  return (
    <div className="">
      <HomePhoto />
      {showMap===true? <Map />:null}
      <div className="flex justify-between px-2 ">
          <h1 className="text-[20px] p-4 ">Nos magasins à proximité</h1>
          <div className="w-[30%] " >
          </div>
          <div  onClick={()=>{ setShowMap(!showMap)}}  className=" flex gap-2   border-b-[2px] border-l-[2px] border-r-[2px] p-2 border-red-800 transition hover:scale-105 cursor-pointer rounded-b-lg text-lg text-white bg-red-800 justify-center " >
            <FaMapMarkerAlt size={20}/>
            <p>Retrouvez nous sur la carte</p> 
            </div>
          </div>
      <Container>
        <div className="grid grid-cols-1 p-4 item-center   gap-4 lg:gap-12 pt-2 item-center justify-between">
          {/* <h1 className="text-[20px] ">Nos magasins à proximité</h1>
          <SearchInput /> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {card && card.shoplist.map((item: any) => (
              <div key={item.Company}>
                {" "}
                <ProductCart data={item} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
