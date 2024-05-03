"use client";

import { useCallback, useEffect, useState } from "react";


import Container from "./components/Container";
import HomePhoto from "./components/HomePhoto";
import ProductCart from "./components/product/ProductCart";
import useCard from "./hooks/useCard";
import { FaMapMarkerAlt } from "react-icons/fa";
import Map from "./components/Map";
import toast from "react-hot-toast";
import Banner from "./components/Banner";
import Gallery from "./components/Gallery";
import { Fade } from "react-awesome-reveal";

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


//console.log({tokenData})
const showToast = () => {
  toast.success('Hello, world!', {
    style: {
      zIndex: 100, // Change the z-index here as needed
      marginTop:'50%' ,
    },
  });
  console.log("done")
};

// {!showMap && window.location.reload();}

  return (
    <div className="">
      <Banner />
      {/* <HomePhoto /> */}
      {showMap===true? <Map />:null}
      <div className="flex justify-between px-2 ">
          <div className="w-[30%] " >
          </div>
          <div  onClick={()=>{ setShowMap(!showMap)}}  className=" flex gap-2   border-b-[2px] border-l-[2px] border-r-[2px] p-2 border-red-800 transition hover:scale-105 cursor-pointer rounded-b-lg text-lg text-white bg-red-800 justify-center " >
            <FaMapMarkerAlt size={20}/>
            <p>Retrouvez nous sur la carte</p> 
            </div>
          </div>
      <Container>
        <div className="grid grid-cols-1  item-center   lg:gap-12  item-center justify-between">
          {/* <h1 className="text-[20px] ">Nos magasins à proximité</h1>
          <SearchInput /> */}
          <div>
            <div className='mx-auto max-w-7xl py-2 px-6' id="about-section">
                <div className='px-4 mb-4' >
                    <Fade direction={'up'} delay={400} cascade damping={1e-1} triggerOnce={true}>
                        <h3 className='text-3xl lg:text-5xl font-semibold text-lightgrey'>Nos magasins à proximité</h3>
                    </Fade>
                    {/* <Fade direction={'up'} delay={800} cascade damping={1e-1} triggerOnce={true}>
                        <p className='text-3xl lg:text-5xl font-semibold text-lightgrey'>Get a many of interesting <br /> features.</p>
                    </Fade> */}
                </div>


                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-5 mt-20'>
                    <Fade direction={'up'} delay={1000} cascade damping={1e-1} triggerOnce={true}>
                    {card && card.shoplist.map((item: any,i:any) => (
                        <div className='card-b  relative rounded-3xl bg-gray-100' key={i}> 
                          <ProductCart data={item} />
                        </div>
                      ))}
                    </Fade>
                </div>
            </div>
        </div>
      
        </div>

        <Gallery />
      </Container>
    </div>
  );
}
