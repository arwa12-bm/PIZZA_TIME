"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ProductCategorie from "@/app/components/categorie/ProductCategorie";
import useCard from "@/app/hooks/useCard";
import CategorieCartsmall from "@/app/components/categorie/CategorieCartsmall";
import Container from "@/app/components/Container";
import { Fade } from "react-awesome-reveal";
import Banner from "@/app/components/Banner";
import MenuCart from "@/app/cart/MenuCart";
import Gallery from "@/app/components/Gallery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Autoplay from "embla-carousel-autoplay"
import { setIsValidation ,store} from "@/app/hooks/store";


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSnapshot } from "valtio";
import Slider from "./Slider";


const Menu = () => {
const params = useParams();


const [data, setData] = useState<any>();
const { card, getDataCard, selectedShoplist,selectedCategorie} = useCard();

// console.log({card});

const {isValidation}=useSnapshot(store)


useEffect(() => {
console.log("aaa", card);
if (card !== undefined) {
    // Check for undefined instead of "undefined"
    const selectedCat = card.categories.filter(
    (item: any) => item.id === Number(params.productId)
    );
    console.log({ selectedCat });

    setData(selectedCat);
    localStorage.setItem("selectedCategorie", JSON.stringify(selectedCat));
}
}, [params, card]);
useEffect(() => {
if (card === "undefined") {
    getDataCard();
    console.log({ card });
}
}, []);
const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 100 && !isValidation) {
        setIsSticky(true);
        } else {
        setIsSticky(false);
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, [])
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide: 4 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 768 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 767, min: 464 },
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        }
    };

return (
<div className="flex flex-col ">
    <Banner />
    <ToastContainer />

    <Container>
    <MenuCart />
    <div  id="about-section">
        {/* <MenuCategorie /> */}
        
        <div className={`${isSticky  ? 'sticky top-[15%]  z-10' : ''} `}>
        <div className="shadow-md shadow-rounded-lg shadow-black bg-white w-full">
                {card && 
                <Carousel
                    responsive={responsive}
                    autoPlay={true}
                    swipeable={true}
                    draggable={true}
                    showDots={true}
                    infinite={true}
                    partialVisible={false}
                    dotListClass="custom-dot-list-style"
                >
                    {card?.categories
                            .sort((a: any, b: any) => a.id - b.id)
                            .map((item: any) => (
                            <div key={item.id} className="">
                                {" "}
                                <CategorieCartsmall data={item} />
                            </div>
                            ))}
                </Carousel>
                }
                <div className="text-center p-2   relative ">
                    <Fade
                        direction={"up"}
                        delay={400}
                        cascade
                        damping={1e-1}
                        triggerOnce={true}
                    >
                        <h2 className="text-pink text-lg font-normal m-2  tracking-widest uppercase ls-51">
                        Commander chez nous
                        </h2>
                        <h2 className="text-xl font-bold mb-2 tracking-widest uppercase ls-51">
                            {data && data[0]?.title}
                        </h2>
                        
                    </Fade>
                
                    </div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-5  gap-8 mt-4  ">
        <Fade
            direction={"up"}
            delay={500}
            cascade
            damping={1e-1}
            triggerOnce={true}
        >
            {data &&
            data[0].items?.map((item: any) => (
                <div key={item}>
                <ProductCategorie
                    data={item}
                    selectedCatId={params.productId}
                />
                </div>
            ))}
        </Fade>
        </div>
    </div>
    <Gallery />
    </Container>
</div>
);
};

export default Menu;
