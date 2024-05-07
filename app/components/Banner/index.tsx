"use client";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import Link from "next/link";
import { useEffect, useState } from "react";
import useCard from "@/app/hooks/useCard";
import ModalInfo from "../ModalInfo";
import { MdOutlinePayments } from "react-icons/md";
import { LuBadgeDollarSign } from "react-icons/lu";
import PhotoModeRetrait from "../PhotoModeRetrait";

const Banner = () => {
const { card, selectedShoplist, getselectedShoplist, ModeRetrait } =
useCard();
useEffect(() => {
getselectedShoplist();
console.log({ selectedShoplist });
}, []);

const [showModal, setShowModal] = useState(false);
const onClose = () => {
setShowModal(!showModal);
};

return (
<div id="home-section" className="bg-gray-100 pt-28">
    <div className="mx-auto max-w-7xl  sm:pb-24 px-6 ">
    <div className="grid grid-cols-1 lg:grid-cols-12 space-x-1 ">
        {Object.values(selectedShoplist)?.length > 0 ? (
            <div className="col-span-6 flex flex-col pt-10 justify-center">
            <Fade
                direction={"up"}
                delay={400}
                cascade
                damping={1e-1}
                triggerOnce={true}
            >
                <h1 className="text-4xl lg:text-7xl font-semibold mb-5 text-lightgrey md:4px lg:text-start text-center">
                {selectedShoplist.Company}
                </h1>
            </Fade>
            <Fade
                direction={"up"}
                delay={800}
                cascade
                damping={1e-1}
                triggerOnce={true}
            >
                <div className="text-grey lg:text-lg font-normal mb-10 lg:text-start text-center">
                    {selectedShoplist.Address},
                    {selectedShoplist.PostalCode}
                    {selectedShoplist.town}<br/>
                {selectedShoplist.etat} DE 11:00 à 14:30 ET DE 18:00 à 23:00{" "} <br />
                </div>
            </Fade>
            <Fade
                direction={"up"}
                delay={1000}
                cascade
                damping={1e-1}
                triggerOnce={true}
            >
                <div className="md:flex align-middle justify-center lg:justify-start">

                <ModalInfo
                    Open={showModal}
                    onClose={onClose}
                    data={selectedShoplist}
                />
                <button className="flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-sm font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink">
                    <p onClick={() => setShowModal(!showModal)}> INFORMATION UTILES</p>
                </button>
                </div>
            </Fade>
            <Fade
                direction={"left"}
                delay={1000}
                cascade
                damping={1e-1}
                triggerOnce={true}
            >
                <div className="pt-10 pb-4">
                { ModeRetrait && <PhotoModeRetrait data={selectedShoplist} />}

                </div>

            </Fade>
            </div>

        ) : (
        <div className="col-span-6 flex flex-col justify-center">
            <Fade
            direction={"up"}
            delay={400}
            cascade
            damping={1e-1}
            triggerOnce={true}
            >
            <h1 className="text-4xl lg:text-7xl font-semibold mb-5 text-lightgrey md:4px lg:text-start text-center">
                PIZZA TIME<br /> with the experts
            </h1>
            </Fade>
            <Fade
            direction={"up"}
            delay={800}
            cascade
            damping={1e-1}
            triggerOnce={true}
            >
            <p className="text-grey lg:text-lg font-normal mb-10 lg:text-start text-center">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem{" "}
                <br /> accusantium doloremque laudantium, totam
            </p>
            </Fade>
            <Fade
            direction={"up"}
            delay={1000}
            cascade
            damping={1e-1}
            triggerOnce={true}
            >
            <div className="md:flex align-middle justify-center lg:justify-start">
                <button className="text-xl w-full md:w-auto font-medium rounded-full text-white py-5 px-6 bg-pink lg:px-14 mr-6">
                <Link href="#cook-section">Lets cook</Link>
                </button>
                <button className="flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-xl font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink">
                <Link href="#about-section">Explore now</Link>
                </button>
            </div>
            </Fade>
        </div>
        )}
        <div className="col-span-6 flex justify-center -mt-4">
        <Image
            src="/images/Banner/pizza2.png"
            alt="nothing"
            width={900}
            height={700}
            
        />
        </div>
    </div>
  
    </div>

</div>
);
};

export default Banner;
