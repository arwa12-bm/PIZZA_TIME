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
import InputProfile from "../../form/inputprofile";
import Commandes from "@/app/profile/Commandes";
import ModifierMdp from "./ModifierMdp";

interface MotdepasseoubliéProps {
    handleMenuCnx: () => void;
    isLoading: boolean;
    setIsLoading: (val: boolean) => void;
    setemail :(val: string) => void
    handleSignup: () => void;
    setPassword :(val: string) => void
    }
    
const Motdepasseoublié:React.FC<MotdepasseoubliéProps>= (
    {handleMenuCnx,
    isLoading,
    setIsLoading,
    handleSignup,
    setPassword,
    setemail}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm<FieldValues>({
        defaultValues: {
            email: "",
        },
        });


//const [isLoading,setIsLoading] = useState(false)
const [inputcode,setInputCode] = useState()
const [codeEnvoyé,setCodeEnvoyé] = useState(false)
const [codeVrai,setCodeVrai] = useState(false)
const [codeFalse,setCodeFalse] = useState(false)
const [code,setCode] = useState("")
const [Email, setEmail] = useState("");
const [isPassword, setIsPassword] = useState("");



const[jsonData,setjsonData]=useState<any>(null)
function genererCode(): string {
    let code = "";
    for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10).toString();
    }
    return code;
}

const handleVerifCode=(inputcode:any)=>{
    if(code === inputcode){
        setCodeVrai(true)
        console.log("code vrai")

    }else{
        setCodeFalse(true)
        console.log("code eroné")

    }


}


let email="" ;

const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    email = data.email;
    setEmail(email)
    setemail(email)

    email = data.password;
    setEmail(email)
    setemail(email)
    const code = genererCode();
    setCode(code)
    setIsLoading(true);
    const res = await fetch("http://localhost:8080/api/user/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({to: data.email,subject: "mot de passe",text:`votre code est ${code}`}),
    });
    console.log({res})
    const jsonData = await res.json();
    setjsonData(jsonData)
    console.log({jsonData})
    if(jsonData.message === "Email envoyé avec succès"){
        console.log("ccc")
        setCodeEnvoyé(true)

    }

    };
    

return (
    <>
{!codeVrai? <div className="p-2">
    
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
    {codeEnvoyé && <p className="text-green-500 p-1">Votre code a été envoyé avec succès</p>}
    <div className="p-2 ">
    <Button
        label={isLoading ? "Loading" :"Je réinitialise mon mot de passe"}
        onClick={handleSubmit(onSubmit)}
    />
    {jsonData?.message === "compte inexistant" && 
    <div>
    <p className="text-md text-red-500 p-1">Vous n'avez pas un compte creer un nouveau</p> 
    <button onClick={handleSignup} className="underline text-center">
        Inscription
    </button>
    </div>
    
    }

    </div>
    
    <div>
    <p className="p-2  text-sm ">Merci de vérifier vos courriers indésirables après avoir cliqué sur " je réinitialise mon mot de passe".</p>
    <div className="p-2 text-sm flex gap-1 ">
        <TbCircleNumber2 size={25}  className="bg-black text-white rounded-full"/>
        <p className="pt-1">Confirmer le code</p>
    </div>
    <div className="flex relative gap-0 h-full">
        <PiLockKeyThin size={30} className="absolute border-slate-200 p-1 mt-3"/>
    <input
        required
        type="text"
        placeholder="Saisissez votre code"
        onChange={(e:any)=>setInputCode(e.target.value)}
        className={` border-b-[2px] border-b-gray-200 pl-8 text-m w-full p-4 text-gray-500 mb-4 border-slate-300 `}
    />
    </div>
    {codeFalse && <p className="text-rose-400">Verifier votre code</p> }
    <div className="p-2 ">
        <Button
        label= "Valider le code"
        onClick={()=>handleVerifCode(inputcode)}
    />
    </div>
    </div>
</div>: 
<ModifierMdp  handleMenuCnx={handleMenuCnx}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                email={Email}
                setEmail={setEmail} />
}
</>
);
};

export default Motdepasseoublié;
