'use client';

import { MdArrowBack } from "react-icons/md";
import useCard from "../hooks/useCard";
import { useEffect, useState } from "react";
import Subscriptions from "../profile/Braintree";
import Heading from "../cart/Heading";
import ItemCommande from "./ItemCommande";

interface CartCommandeProps {
    EnAttente: boolean;
    EnCoursPrep: boolean;
    EnCoursLiv: boolean;
    Expédié: boolean;
}

const CartCommande: React.FC<CartCommandeProps> = ({ 
    EnAttente,
    EnCoursPrep,
    EnCoursLiv,
    Expédié 
}) => {
    const { dataCommande } = useCard();
    const [showPay, setShowPay] = useState(false);
    const [commandeEnAttente, setCommandeEnAttente] = useState<any[]>([]);
    const [commandeEnCoursPrep, setCommandeEnCoursPrep] = useState<any[]>([]);
    const [commandeEnCoursLiv, setCommandeEnCoursLiv] = useState<any[]>([]);
    const [commandeExpédié, setCommandeExpédié] = useState<any[]>([]);

    useEffect(() => {
        if (dataCommande && dataCommande.length > 0) {
            setCommandeEnAttente(dataCommande.filter((item: any) => item.etat_Commande === 'En attente'));
            setCommandeEnCoursPrep(dataCommande.filter((item: any) => item.etat_Commande === 'En cours de préparation'));
            setCommandeEnCoursLiv(dataCommande.filter((item: any) => item.etat_Commande === 'En cours de livraison'));
            setCommandeExpédié(dataCommande.filter((item: any) => item.etat_Commande === 'Expédié'));
        }
    }, [dataCommande]);

    if (!dataCommande || dataCommande.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Your cart is empty</div>
                <div>
                    <div className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack />
                        <span>Start Ordering</span>
                    </div>
                </div>
            </div>
        );
    }

    if (showPay) {
        return (
            <div className="p-4">
                <Subscriptions />
            </div>
        );
    }

    return (
        <>
            <Heading title="Mes Commandes" center />
            <div>
                {EnAttente &&
                    commandeEnAttente.map((item: any, index: number) => (
                        <div key={index}><ItemCommande index={index + 1} item={item} /></div>
                    ))}
                {EnCoursPrep &&
                    commandeEnCoursPrep.map((item: any, index: number) => (
                        <div key={index}><ItemCommande index={index + 1} item={item} /></div>
                    ))}
                {EnCoursLiv &&
                    commandeEnCoursLiv.map((item: any, index: number) => (
                        <div key={index}><ItemCommande index={index + 1} item={item} /></div>
                    ))}
                {Expédié &&
                    commandeExpédié.map((item: any, index: number) => (
                        <div key={index}><ItemCommande index={index + 1} item={item} /></div>
                    ))}
            </div>
        </>
    );
};

export default CartCommande;
