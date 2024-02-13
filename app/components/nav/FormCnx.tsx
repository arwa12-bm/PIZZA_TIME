import Link from "next/link";
import Button from "../form/Button";
import Input from "../form/Input";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { PiLockKeyThin } from "react-icons/pi";
import { useState } from "react";
import { FaChevronLeft, FaUserCircle } from "react-icons/fa";
import NavBar from "./NavBar";
import { CiMobile3 } from "react-icons/ci";
import { TiTick } from "react-icons/ti";

const FormCnx = () => {
    const [type,setType] =useState("Connexion")
    const [isSignup,setIsSignup] =useState(false)
    
    function handleSignup (){
        setIsSignup(true);
        setType("Inscription")
    }

    function handleMenuCnx (){
        setIsSignup(false);
        setType("Connexion")

    }
    const [isClicked,setIsClicked] =useState(true)

    function handleMenu (){
    
        setIsClicked(false);
    }
    return ( 
        
<div >
{isClicked?                     
<div className="fixed flex flex-col min-h-screen top-0 right-0 bg-white  h-screen z-10 w-[70%]  " >
                    <div className="flex w-full justify-content  py-3">
                        <button onClick={type==="Inscription"?handleMenuCnx : handleMenu}><FaChevronLeft size={20} className="pt-1 mt-1"/></button>
                        <h1 className="text-2xl font-semibold w-full text-center">{type}</h1>
                    </div>
                    <hr className="w-[100%] my-2 "/>
                    <div className="flex-grow overflow-y-auto justify-content-between">
    {isSignup?
    <>
        <Input type="text"  placeholder="Saisissez votre nom" label="Nom" Icon={FaUserCircle} />
        <Input type="text"  placeholder="Saisissez votre prénom" label="Prénom" Icon={FaUserCircle} />
        <Input type="text"  placeholder="06 12 34 56 78" label="Télephone" Icon={CiMobile3} />
        <Input type="email"  placeholder="Saisissez votre e-mail" label="E-mail" Icon={MdOutlineMarkEmailRead} />
        <Input type="password"  placeholder="Saisissez votre mot de passe" label="E-mail" Icon={PiLockKeyThin} />
        <Input type="password"  placeholder="Comfirmez votre mot de passe" label="E-mail" Icon={PiLockKeyThin} />
        <div >
            <p className="flex gap-1 px-4 "><TiTick size={15} className="rounded-2xl border-[1px] border-black mt-1 "/> 1 Minuscule & 1 Majuscule </p>
            <p className="flex gap-1 px-4"><TiTick size={15} className="rounded-2xl border-[1px] border-black mt-1 "/> 1 chiffre (0-9)</p>
            <p className="flex gap-1 px-4"><TiTick size={15}className="rounded-2xl border-[1px] border-black mt-1 "/> 8 caractères</p>
        </div>
        
        <div className="w-full p-5">
            <Button  
                label="Je crée mon compte"
                onClick={()=>{}} />
        </div>

    </> : 
    <>
    <div className="">
            
        <Input type="email"  placeholder="Saisissez votre e-mail" label="E-mail" Icon={MdOutlineMarkEmailRead} />
        <Input type="password"  placeholder="Saisissez votre mot de passe" label="Mot de passe" Icon={PiLockKeyThin}/>
        
    </div>
    
        
        <div  className=" text-right  text-m text-black underline w-full"><Link href="">Mot de passe oublié !</Link></div>
        <div className="w-full p-5">
            <Button  
                label="Connexion"
                onClick={()=>{}} />
        </div>
        <h1 className="w-full text-center">Ou</h1>
        < div className=" text-center  text-xl p-2 text-black underline w-full"><button onClick={handleSignup} className="underline">Inscription</button></div>
    
    
    <p className="text-sm text-black pl-2 pt-4">En continuant, vous acceptez nos :</p>
    <div className=" h-20 p-4  ">
        <p className="text-m text-black underline mt-2"><Link href="">Conditions Générales d'Utilisation</Link></p>
        <p className="text-m text-black underline mt-2"><Link href="">Conditions Générales de Vente</Link></p>
        <p className="text-m text-black underline mt-2 mb-2"><Link href="">Politiques de Confidentialité</Link></p>
    </div></>}
    </div>
                    <div className=" bg-white button-0 h-[20%]  w-full opacity-75  text-center pt-2 "> 
                        <p className="text-sm  underline  ">
                            <Link href="">Mention légales</Link>
                        </p>
                    </div>   
                </div>
            
    : <NavBar isClick={false} />}
</div> );
}

export default FormCnx;