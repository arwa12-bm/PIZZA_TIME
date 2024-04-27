"use client";

import { GoogleMap, InfoWindowF, LoadScript, Marker, MarkerF } from "@react-google-maps/api";
import Container from "../components/Container";
import useLocation from "@/app/hooks/useLocation";
import { FaMapMarkerAlt } from "react-icons/fa";
import { card } from "../utils/products";
import L from 'leaflet';
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import isEqual from 'fast-deep-equal';

type place=
{ town: string; image: string; Nature: string; shopid: number; Address: string; Company: string; Country: string; PostalCode: string; latitude: number; longitude: number; Responsible: string; etat: string; } | undefined
type CustomSize ={ width: number; height: number; equals: (other: CustomSize) => boolean}
const Map = () => {

const ContainerStyle ={
    width:"100%",
    height:"100vh"
}
const cordinate = {lat:44.620720 ,lng: 4.390880}
const {userLocation}= useLocation()



console.log("locationx",userLocation)

const customPinView:any= new L.Icon({
    icon: FaMapMarkerAlt, // Specify the path to your icon image
    iconSize: [50, 50],
        // Set the size of the icon
});

    // const postalCodes: string[] = Object.values(card.shoplist).map((item) => item.PostalCode);
    // console.log(postalCodes);
    


//     const getLatLongFromAddress = async (address: any) => {
//         try {
//             const response = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${address}&fields=geometry&key=AIzaSyBqmxLZ9JxVPhiQ2sgGtneS12Xe4XnUapM`);
//             const { results } = response.data;
        
//             if (results.length > 0 && results[0].geometry && results[0].geometry.location) {
//                 const { lat, lng } = results[0].geometry.location;
//                 return { lat, lng };
//             } else {
//                 throw new Error('No results found for the given address');
//             }
//             } catch (error: any) {
//             console.error(`Error fetching geocode data: ${error.message}`);
//             console.error('Full response:', error.response || error.request || error.message);
//             }
//         };

//         const address = '80000'
//         const location = async (address: string) => {
//             try {
//                 const coordinates = await getLatLongFromAddress(address);
            
//                 if (coordinates) {
//                     const { lat, lng } = coordinates;
//                     console.log(`Latitude: ${lat}, Longitude: ${lng}`);
//                 } else {
//                     console.error('No coordinates available for the given address');
//                 }
//                 } catch (error: any) {
//                 console.error(error.message);
//                 }
//             };

// location(address)
const pixelOffset: CustomSize = {
    width: 0,
    height: 0,
    equals: function (other: CustomSize): boolean {
    return this.width === other.width && this.height === other.height;
    },
};

const [selectedPlace,setSelectedPlace]=useState<place>()
const router = useRouter();


console.log("locationaaa",userLocation)
const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

// Use a useEffect to set googleMapsLoaded when the Google Maps API is loaded
useEffect(() => {
if (window.google && window.google.maps) {
setGoogleMapsLoaded(true);
}
}, []);

return (

    <div className="">
   
        <LoadScript
        googleMapsApiKey="AIzaSyA27Qr71arQ8MrgCZf7q73bgGfs5x43XbI"
        onLoad={() => setGoogleMapsLoaded(true)}
        />
  
    {googleMapsLoaded && (
        <GoogleMap
        mapContainerStyle={ContainerStyle}
        center={cordinate}
        zoom={4}
        >
                            <MarkerF
                        key="myLocation"
                        icon={customPinView}
                        position={userLocation}
                            />

                {Object.values(card.shoplist).map((place)=>(
                    <MarkerF
                    key={`${place.Address}-${place.Company}-${place.latitude}-${place.longitude}`}
                    onClick={()=>{
                        place === selectedPlace
                        ? setSelectedPlace(undefined)
                        : setSelectedPlace(place)
                    }}
                    icon={customPinView}
                    position={{lat:place.latitude ,lng: place.longitude}}
                        />

                ))}
                {selectedPlace && (
                    <InfoWindowF 
                    position={{
                        lat: selectedPlace.latitude,
                        lng: selectedPlace.longitude
                    }}
                    zIndex={1}
                    options={{
                        pixelOffset: pixelOffset,
                    }}
                    onCloseClick={()=>setSelectedPlace(undefined)}
                    >
                        <div>
                        <div className="aspect-square overflow-hidden relative w-full rounded-md h-[180px]">
                                <Image
                                fill
                                src={selectedPlace.image}
                                alt=""
                                onClick={() => {
                                    localStorage.setItem("selectedShoplist",JSON.stringify(selectedPlace));
                                    router.push(`/menu/06bc3ded-c63b-412d-bea7-b3d1af1955c9`)
                                }}                            />
                            </div>
                        
                            <h3>{selectedPlace.Company}</h3>
                            <div className=" text-[15px] flex gap-1 ">
                            <div>{selectedPlace.Address},</div>
                            <div>{selectedPlace.PostalCode}</div>
                            <div>{selectedPlace.town}</div>
                            </div>
                        </div>
                    </InfoWindowF>
                )}

        </GoogleMap>
    )}
    </div>
);
}

export default Map;