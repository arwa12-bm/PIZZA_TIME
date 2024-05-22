"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSnapshot } from "valtio";
import { Fade } from "react-awesome-reveal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductCategorie from "@/app/components/categorie/ProductCategorie";
import useCard from "@/app/hooks/useCard";
import CategorieCartsmall from "@/app/components/categorie/CategorieCartsmall";
import Container from "@/app/components/Container";
import Banner from "@/app/components/Banner";
import MenuCart from "@/app/cart/MenuCart";
import Gallery from "@/app/components/Gallery";
import {store} from "@/app/hooks/store";




const Menu = () => {
const params = useParams();


const [data, setData] = useState<any>();
const { stat,card, getDataCard} = useCard();
const [isSticky, setIsSticky] = useState(false);
const [showTop, setShowTop] = useState(false);


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
console.log({stat})

const sortedStat = [...stat].sort((a:any, b:any) => a.id - b.id);
const sorted7Stat = sortedStat.map((el: any) => el).slice(-7);

console.log({sorted7Stat})

    let category:any= {};
sorted7Stat?.forEach((el:any) => {
    Object.keys(el.information).forEach((key:any) => {
        if (!category[key]) {
            category[key] =  Number(el.information[key].nbrFois);
        }else{
            category[key] = category[key] + Number(el.information[key].nbrFois);
        }
    });
});
// Convert category object to an array of [key, value] pairs
const sortedCategoryArray = Object.entries(category).sort(([, a]:any, [, b]:any) => b  - a );

// Convert sorted array back to an object (if needed)
const sortedCategory = Object.fromEntries(sortedCategoryArray);

console.log({ sortedCategory });
console.log({category});
// const filteredItems = data[0].items.filter((item: any) => sortedCategory.hasOwnProperty(item.key));

// console.log({ filteredItems });

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
                                <CategorieCartsmall data={item}  setShowTop={setShowTop} />
                            </div>
                            ))}
                </Carousel>
                }
                <div className="text-center p-2  relative ">
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
                        <h2 className="text-xl text-right font-semibold px-4" onClick={()=>{setShowTop(true)}}>Top 10</h2>
                    </Fade>
                    </div>

            </div>
        </div>
        {showTop? "":

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
        }
    </div>
    <Gallery />
    </Container>
</div>
);
};

export default Menu;
