"use client";

import CartCommande from "./CartCommande";
import Container from "../components/Container";
import useCard from "../hooks/useCard";
import { useEffect, useState } from "react";

const commandes = () => {
const { getData, getAllCommandes, AllCommande } = useCard();
useEffect(() => {
getData();
}, []);

getAllCommandes();

const [Passée, setPassée] = useState(true);
const [EnCoursPrep, setEnCoursPrep] = useState(false);
const [EnCoursLiv, setEnCoursLiv] = useState(false);
const [Expédié, setExpédié] = useState(false);

const handlePassée = () => {
setEnCoursPrep(false);
setEnCoursLiv(false);
setExpédié(false);
setPassée(true);
};
const handleEnCoursPrep = () => {
setEnCoursLiv(false);
setExpédié(false);
setPassée(false);
setEnCoursPrep(true);
};
const handleEnCoursLiv = () => {
setExpédié(false);
setPassée(false);
setEnCoursPrep(false);
setEnCoursLiv(true);
};

const handleExpédié = () => {
setPassée(false);
setEnCoursPrep(false);
setEnCoursLiv(false);
setExpédié(true);
};

return (
<div className="pt-8  mt-[4%]">
    <Container>
    <div className="grid grid-cols-4 gap-8 justify-between shadow-md shadow-rounded-lg shadow-black  my-2">
        <p
        onClick={handlePassée}
        className={
            !Passée
            ? "border-b-[1px] p-2 text-lg text-center text-slate-500 transition hover:scale-105 cursor-pointer "
            : "border-b-[2px] border-b-slate-700 p-2 text-lg text-center text-slate-500 transition hover:scale-105 cursor-pointer"
        }
        >
        Passée
        </p>
        <p
        onClick={handleEnCoursPrep}
        className={
            !EnCoursPrep
            ? "border-b-[1px] p-2 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer"
            : "border-b-[2px] border-b-slate-700  p-2 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer"
        }
        >
        En Cours de preparation
        </p>
        <p
        onClick={handleEnCoursLiv}
        className={
            !EnCoursLiv
            ? "border-b-[1px] p-2 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer"
            : "border-b-[2px] border-b-slate-700  p-2 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer"
        }
        >
        En Cours de livraison
        </p>
        <p
        onClick={handleExpédié}
        className={
            !Expédié
            ? "border-b-[1px] p-2 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer"
            : "border-b-[2px] border-b-slate-700  p-2 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer"
        }
        >
        Expédié
        </p>
    </div>

    {(Passée || EnCoursPrep || EnCoursLiv || Expédié) && (
        <CartCommande
    Passée={Passée} 
    EnCoursPrep={EnCoursPrep}
    EnCoursLiv={EnCoursLiv}
    Expédié={Expédié}
        />
    )}
    </Container>
</div>
);
};
export default commandes;
