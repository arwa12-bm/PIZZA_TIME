"use client";

import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { PiLockKeyThin } from "react-icons/pi";

import Button from "../../form/Button";
import Input from "../../form/Input";
import useCard from "@/app/hooks/useCard";
import { useEffect } from "react";

interface LoginProps {
handleMenu: () => void;
isLoading: boolean;
setIsLoading: (val: boolean) => void;
setIsSignup: (val: boolean) => void;
setType: (val: string) => void;
}
const Login: React.FC<LoginProps> = ({
handleMenu,
isLoading,
setIsLoading,
setIsSignup,
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
const { getData,dataUser,getCommandes } = useCard();
const onSubmit: SubmitHandler<FieldValues> = async (data) => {
setIsLoading(true);
await fetch("http://localhost:8080/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
});
getData();
handleMenu();
};


useEffect(()=>{
    getData(); 

},[])

useEffect(()=>{
    if(dataUser!==null)
{ getCommandes(dataUser)
    console.log("ddd",dataUser);}
    
},[dataUser])

return (
<>
    <div className="">
    <Input
    id="email"
        required
        disabled={isLoading}
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
        disabled={isLoading}
        register={register}
        errors={errors}
        type="password"
        placeholder="Saisissez votre mot de passe"
        label="Mot de passe"
        Icon={PiLockKeyThin}
    />
    </div>

    <div className=" text-right  text-m text-black underline w-full">
    <Link href="">Mot de passe oublié !</Link>
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
        <Link href="">Conditions Générales d'Utilisation</Link>
    </p>
    <p className="text-m text-black underline mt-2">
        <Link href="">Conditions Générales de Vente</Link>
    </p>
    <p className="text-m text-black underline mt-2 mb-2">
        <Link href="">Politiques de Confidentialité</Link>
    </p>
    </div>
</>
);
};

export default Login;
