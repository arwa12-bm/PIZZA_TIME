"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSnapshot } from "valtio";
import { Fade } from "react-awesome-reveal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductCategorie from "@/app/components/categorie/ProductCategorie";
import useCard from "@/app/hooks/useCard";
import CategorieCartsmall from "@/app/components/categorie/CategorieCartsmall";
import Container from "@/app/components/Container";
import Banner from "@/app/components/Banner";
import MenuCart from "@/app/cart/MenuCart";
import Gallery from "@/app/components/Gallery";
import { store } from "@/app/hooks/store";

const Menu = () => {
const params = useParams();

const [data, setData] = useState<any>(null);
const { stat, card, getDataCard, fetchAllStat } = useCard();
const [isSticky, setIsSticky] = useState(false);
const [showTop, setShowTop] = useState(false);
const { isValidation } = useSnapshot(store);

useEffect(() => {
if (card && !showTop) {
    const selectedCat = card.categories.filter(
    (item: any) => item.id === Number(params.productId)
    );
    setData(selectedCat);
    localStorage.setItem("selectedCategorie", JSON.stringify(selectedCat));
}
}, [params, card,showTop]);

useEffect(() => {
if (!card) {
    getDataCard();
    fetchAllStat();
}
}, [card, getDataCard, fetchAllStat]);

useEffect(() => {
const handleScroll = () => {
    const offset = window.scrollY;
    setIsSticky(offset > 100 && !isValidation);
};

window.addEventListener('scroll', handleScroll);
return () => {
    window.removeEventListener('scroll', handleScroll);
};
}, [isValidation]);

const responsive = {
desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4,
},
tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3,
},
mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1,
},
};

console.log({ stat });

let sortedStat = [];
if (Array.isArray(stat)) {
sortedStat = [...stat].sort((a: any, b: any) => a.id - b.id);
} else {
console.error("stat is not an array or is undefined/null", stat);
}

const sorted7Stat = sortedStat.slice(-7);
console.log({ sorted7Stat });

let category: any = {};
sorted7Stat.forEach((el: any) => {
Object.keys(el.information).forEach((key: any) => {
    if (!category[key]) {
    category[key] = Number(el.information[key].nbrFois);
    } else {
    category[key] += Number(el.information[key].nbrFois);
    }
});
});

const sortedCategoryArray = Object.entries(category).sort(
([, a]: any, [, b]: any) => b - a
);
const sortedCategory = Object.fromEntries(sortedCategoryArray);

console.log({ sortedCategory });
let top10Items:any = [];

if (card) {
    Object.keys(sortedCategory).forEach(element => {
        const item = card.items.find((el:any) => el.title === element);
        if (item) {
            console.log(element);
            top10Items.push(item);
        }
    });
}

console.log({ top10Items });

console.log({ category });

return (
<div className="flex flex-col ">
    <Banner />
    <ToastContainer />
    <Container>
    <MenuCart />
    <div id="about-section">
        <div className={`${isSticky ? 'sticky top-[15%] z-10' : ''}`}>
        <div className="shadow-md shadow-rounded-lg shadow-black bg-white w-full">
            {card && (
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
                {card.categories
                .sort((a: any, b: any) => a.id - b.id)
                .map((item: any) => (
                    <div key={item.id}>
                    <CategorieCartsmall data={item} setShowTop={setShowTop} />
                    </div>
                ))}
            </Carousel>
            )}
            <div className="text-center p-2 relative">
            <Fade
                direction={"up"}
                delay={400}
                cascade
                damping={1e-1}
                triggerOnce={true}
            >
                <h2 className="text-pink text-lg font-normal m-2 tracking-widest uppercase ls-51">
                Commander chez nous
                </h2>
                <h2 className="text-xl font-bold mb-2 tracking-widest uppercase ls-51">
                {data && data[0]?.title}
                </h2>
                <h2
                className="text-xl text-right font-semibold px-4"
                onClick={() => { setShowTop(true);  }}
                >
                Top 10
                </h2>
            </Fade>
            </div>
        </div>
        </div>
        {showTop ? 
        <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-8">
            <Fade
            direction={"up"}
            delay={500}
            cascade
            damping={1e-1}
            triggerOnce={true}
            >
            {top10Items.length > 0 &&
                top10Items.map((item: any) => (
                <div key={item.id}>
                    <ProductCategorie
                    data={item}
                    selectedCatId={params.productId}
                    showTop={showTop}
                    />
                </div>
                ))}
            </Fade>
        </div> : (
        <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-8">
            <Fade
            direction={"up"}
            delay={500}
            cascade
            damping={1e-1}
            triggerOnce={true}
            >
            {data &&
                data[0].items?.map((item: any) => (
                <div key={item.id}>
                    <ProductCategorie
                    data={item}
                    selectedCatId={params.productId}
                    showTop={showTop}
                    />
                </div>
                ))}
            </Fade>
        </div>
        )}
    </div>
    <Gallery />
    </Container>
</div>
);
};

export default Menu;
