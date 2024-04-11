"use client";

import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { PiLockKeyThin } from "react-icons/pi";

import Button from "../../form/Button";
import Input from "../../form/Input";
import useCard from "@/app/hooks/useCard";
import { useState } from "react";
import { TbCircleNumber1, TbCircleNumber2 } from "react-icons/tb";


const Motdepasseoublié= () => {

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

return (
<>
    <p className="text-sm">Pas d'inquiétude, nous allons vous envoyer le code de validation à l'adresse suivante :</p>
    <div className="p-2 text-sm flex gap-1 ">
        <TbCircleNumber1 size={25}  className="bg-black text-white rounded-full"/>
        <p className="pt-1">Réinitialiser mon mot de passe</p>
    </div>
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
    <div className="p-2 ">
        <Button
        label= "Je réinitialisz mon mot de passe"
        onClick={()=>{}}
    />
    </div>
    
    <p className="p-2  text-sm ">Merci de vérifier vos courriers indésirables après avoir cliqué sur " je réinitialise mon mot de passe".</p>
    <div className="p-2 text-sm flex gap-1 ">
        <TbCircleNumber2 size={25}  className="bg-black text-white rounded-full"/>
        <p className="pt-1">Confirmer le code</p>
    </div>
    <Input
    id="code"
        required
        register={register}
        errors={errors}
        type="code"
        placeholder="Saisissez votre e-mail"
        label="Code"
        Icon={PiLockKeyThin}
    />
    <div className="p-2 ">
        <Button
        label= "Valider le code"
        onClick={()=>{}}
    />
    </div>
</>
);
};

export default Motdepasseoublié;
