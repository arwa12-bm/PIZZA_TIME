"use client"
import { TiTick } from "react-icons/ti";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { PiLockKeyThin } from "react-icons/pi";

import Button from "../../form/Button";
import Input from "../../form/Input";


interface SignupProps{
    handleMenuCnx:()=>void,
    isLoading:boolean,
    setIsLoading:(val:boolean)=>void
}

const Signup:React.FC<SignupProps> = ({handleMenuCnx,isLoading,setIsLoading}) => {

    const {
        register: registerSignup,
        handleSubmit: handleSubmitSignup,
        formState: { errors:errorsSignup }} = useForm<FieldValues>(
            {defaultValues: {
                nom: '',
                prénom: '',
                télephone: '',
                email: '',
                password: '',
                },
            });

    
        const onSubmitSignup:SubmitHandler<FieldValues>=async (data)=>{
            setIsLoading(true)
            const {password1,...result} = data;
            await fetch('http://localhost:8080/api/user/register',{
                method:"POST", 
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(result)
            })
            handleMenuCnx()
            //console.log(result)
        }
    return ( 
        <>
        <Input id="nom" required register={registerSignup}  errors={errorsSignup}
    type="text"  placeholder="Saisissez votre nom" label="Nom" Icon={FaUserCircle} />
        <Input id="prénom" required register={registerSignup}  errors={errorsSignup}
    type="text"  placeholder="Saisissez votre prénom" label="Prénom" Icon={FaUserCircle} />
        <Input  id="télephone" required register={registerSignup}  errors={errorsSignup}
    type="text"  placeholder="06 12 34 56 78" label="Télephone" Icon={CiMobile3} />
        <Input  id="email" required register={registerSignup}  errors={errorsSignup}
    type="email"  placeholder="Saisissez votre e-mail" label="E-mail" Icon={MdOutlineMarkEmailRead} />
        <Input  id="password" required register={registerSignup}  errors={errorsSignup}
    type="password"  placeholder="Saisissez votre mot de passe" label="Password" Icon={PiLockKeyThin} />
        <Input  id="password1" register={registerSignup}  errors={errorsSignup} 
    type="password"  placeholder="Comfirmez votre mot de passe"  Icon={PiLockKeyThin}  />
        <div >
            <p className="flex gap-1 px-4 "><TiTick size={15} className="rounded-2xl border-[1px] border-black mt-1 "/> 1 Minuscule & 1 Majuscule </p>
            <p className="flex gap-1 px-4"><TiTick size={15} className="rounded-2xl border-[1px] border-black mt-1 "/> 1 chiffre (0-9)</p>
            <p className="flex gap-1 px-4"><TiTick size={15}className="rounded-2xl border-[1px] border-black mt-1 "/> 8 caractères</p>
        </div>
        
        <div className="w-full p-5">
            <Button 
                label={isLoading? "Loading":"Je crée mon compte"}
                onClick={handleSubmitSignup(onSubmitSignup)} />

        </div>
</>
    );
}

export default Signup;