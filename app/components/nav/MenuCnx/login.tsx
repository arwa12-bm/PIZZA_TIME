"use client";

import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { PiLockKeyThin } from "react-icons/pi";

import Button from "../../form/Button";
import Input from "../../form/Input";
import useCard from "@/app/hooks/useCard";
import { useState } from "react";

interface LoginProps {
handleMenu: () => void;
isLoading: boolean;
setIsLoading: (val: boolean) => void;
setIsSignup: (val: boolean) => void;
setIsMotdepasseoublié: (val: boolean) => void;
setIsConditionsGénéralesUtilisation: (val: boolean) => void;
setIsConditionsGénéralesVente: (val: boolean) => void;
setIsPolitiqueConfidentialité: (val: boolean) => void;
setType: (val: string) => void;
}
const Login: React.FC<LoginProps> = ({
handleMenu,
isLoading,
setIsLoading,
setIsSignup,
setIsMotdepasseoublié,
setIsConditionsGénéralesUtilisation,
setIsConditionsGénéralesVente,
setIsPolitiqueConfidentialité,
setType,
}) => {


const {
register,
handleSubmit,
formState: { errors },
} = useForm<FieldValues>({
defaultValues: {
    email: "",
    password: "",
},
});

function handleSignup() {
setIsSignup(true);
setIsLoading(false);
setType("Inscription");
}

function handleMotdepasseoublié() {
    setIsMotdepasseoublié(true);
    setIsLoading(false);
    setType("Mot de passe oublié");
    }

function handleConditionsGénéralesUtilisation() {
    setIsConditionsGénéralesUtilisation(true);
    setIsLoading(false);
    setType("Conditions Générales d’Utilisation (CGU)");
    }

function handleConditionsGénéralesVente() {
    setIsConditionsGénéralesVente(true);
    setIsLoading(false);
    setType("Conditions Générales de vente (CGV)");
    }
function handlePolitiqueConfidentialité() {
    setIsPolitiqueConfidentialité(true);
    setIsLoading(false);
    setType("Politique de confidentialité");
    }
const { getData,dataUser,getCartProducts } = useCard();
const[jsonData,setjsonData]=useState<any>(null)

const onSubmit: SubmitHandler<FieldValues> = async (data) => {
setIsLoading(true);
const res = await fetch("http://localhost:8080/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
});
console.log({res})
const jsonData = await res.json();
setjsonData(jsonData)
console.log({jsonData})
if(jsonData.message === "success"){
    getData();
    getCartProducts()
    handleMenu();
}
    
};



return (
<>
    <div className="">
    <Input
    id="email"
        required
        register={register}
        errors={errors}
        type="email"
        placeholder="Saisissez votre e-mail"
        label="E-mail"
        Icon={MdOutlineMarkEmailRead}
    />
    <Input
        id="password"
        required
        register={register}
        errors={errors}
        type="password"
        placeholder="Saisissez votre mot de passe"
        label="Mot de passe"
        Icon={PiLockKeyThin}
    />
    {jsonData?.error  &&  <p className="text-red-500 px-2">{jsonData?.error.message}</p>}
    </div>
    <div className=" text-right  text-m text-black underline w-full">
    <button onClick={handleMotdepasseoublié} className="underline">
    Mot de passe oublié !
    </button>
    </div>
    <div className="w-full p-5">
    <Button
        label={isLoading ? "Loading" : "Connexion"}
        onClick={handleSubmit(onSubmit)}
    />
    </div>
    <h1 className="w-full text-center">Ou</h1>
    <div className=" text-center  text-xl p-2 text-black underline w-full">
    <button onClick={handleSignup} className="underline">
        Inscription
    </button>
    </div>

    <p className="text-sm text-black pl-2 pt-4">
    En continuant, vous acceptez nos :
    </p>
    <div className=" h-20 p-4  ">
    <p className="text-m text-black underline mt-2">
    <button onClick={handleConditionsGénéralesUtilisation} className="underline">
    Conditions Générales d'Utilisation
    </button>
        
    </p>
    <p className="text-m text-black underline mt-2">
    <button onClick={handleConditionsGénéralesVente} className="underline">
    Conditions Générales de Vente
    </button>
    </p>
    <p className="text-m text-black underline mt-2 mb-2">
    <button onClick={handlePolitiqueConfidentialité} className="underline">
    Politiques de Confidentialité
    </button>
    </p>
    </div>
</>
);
};

export default Login;
