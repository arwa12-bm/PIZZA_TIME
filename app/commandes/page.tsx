"use client";

import CartCommande from "./CartCommande";
import Container from "../components/Container";
import useCard from "../hooks/useCard";
import { useEffect } from "react";

const commandes = () => {
const {
getData,
} = useCard();
useEffect(() => {
getData();
}, []);



return (
<div className="pt-8">
    <Container>
    <CartCommande />
    </Container>
</div>
);
};

export default commandes;
