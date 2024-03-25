"use client";
import { LuUserCircle2 } from "react-icons/lu";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CiMobile3 } from "react-icons/ci";
import { MdArrowBack, MdOutlineMarkEmailRead, MdSaveAs } from "react-icons/md";
import { useRouter } from "next/navigation";


import Container from "../components/Container";
import HomePhoto from "../components/HomePhoto";
import useCard from "../hooks/useCard";
import InputProfile from "../components/form/inputprofile";
import Address from "./Address";
import Cartes from "./Cartes";
import { formatPrice } from "../utils/formatPrice";
import Commandes from "./Commandes";
import InputButton from "../components/form/InputButton";

const Profile = () => {
    const {
        selectedIdShopList,
        dataUser,
        getData,
        cartProducts,
        cartTotalAmount
    
    } = useCard();


const [formData, setFormData] = useState(dataUser);
const [selectedProductData, setSelectedProductData] = useState({});

const {
    register: registerSignup,
    handleSubmit: handleSubmitUpdate,
    formState: { errors: errorsSignup },
} = useForm<FieldValues>({
    defaultValues: {
    nom: "",
    prénom: "",
    télephone: "",
    email: "",
    },
});

const router =useRouter()
useEffect(() => {
    setSelectedProductData(
    localStorage.getItem("selectedProductData") !== null
        ? JSON.parse(localStorage.getItem("selectedProductData") ?? "{}")
        : {}
    );
    
}, []);



const onSubmitUpdate: SubmitHandler<FieldValues> = async (formData) => {
    await fetch(`http://localhost:8080/api/user/${dataUser?.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    });
    getData();
};

//console.log("prof",selectedProductData)
return (
    <div>
    <HomePhoto data={selectedProductData} />
    <Container>
        <div className="flex justify-between">
        <div className="flex  items-center gap-2 p-2">
            <LuUserCircle2 size={30} />
            <p className="text-xl">Bonjour {dataUser?.nom}</p>
        </div>
        </div>
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <div className="col-span-1  sm:w-[120%]  md:w-[130%] lg:w-[130%] xl:w-[130%]">
            <div className=" border-[1.2px] border-slate-200 bg-white shadow-md  rounded-2xl m-4  ">
            <div className="flex justify-between">
                <div className="flex p-2 gap-1">
                    <IoIosInformationCircleOutline size={25} />
                    <p className="">Informations générales</p>
                </div>
                <div className="p-2">
                    <MdSaveAs onClick={handleSubmitUpdate(onSubmitUpdate)} size={30} className="bg-white text-gray-600 rounded-md"/>
                </div>
            </div>
            <div className="p-2 grid md:grid-cols-2  gap-2">
                <InputProfile
                id="nom"
                required
                register={registerSignup}
                errors={errorsSignup}
                type="text"
                placeholder="Saisissez votre nom"
                label="Nom"
                Icon={LuUserCircle2}
                value={formData?.nom}
                onChange={(e: any) =>
                    setFormData({
                    ...formData,
                    nom: e.target.value,
                    })
                }
                />
                <InputProfile
                id="prénom"
                required
                register={registerSignup}
                errors={errorsSignup}
                type="text"
                placeholder="Saisissez votre prénom"
                label="Prénom"
                Icon={LuUserCircle2}
                value={formData?.prénom}
                onChange={(e: any) =>
                    setFormData({
                    ...formData,
                    prénom: e.target.value,
                    })
                }
                />
                <InputProfile
                id="télephone"
                required
                register={registerSignup}
                errors={errorsSignup}
                type="text"
                placeholder="06 12 34 56 78"
                label="Télephone"
                Icon={CiMobile3}
                value={formData?.télephone}
                onChange={(e: any) =>
                    setFormData({
                    ...formData,
                    télephone: e.target.value,
                    })
                }
                />
                <InputProfile
                id="email"
                required
                register={registerSignup}
                errors={errorsSignup}
                type="email"
                placeholder="Saisissez votre e-mail"
                label="E-mail"
                Icon={MdOutlineMarkEmailRead}
                value={formData?.email}
                onChange={(e: any) =>
                    setFormData({
                    ...formData,
                    email: e.target.value,
                    })
                }
                />
            </div>
            </div>
            <Address />
            <Cartes />
        </div>
        <div className="col-span-1 w-[100%] justify-self-center sm:w-[70%] md:w-[70%] lg:w-[70%] xl:w-[70%] md:justify-self-end lg:justify-self-end xl:justify-self-end ">
            <div className=" relative justify-content border-[1.2px] border-slate-400 bg-gray-700  text-white shadow-md  rounded-xl ml-4 mt-4 mr-4 mt-1  ">
            <div className="flex p-2 justify-between ">
                <div className="flex gap-1">
                <p className="w-[200px]">Total Commande</p>
                </div>
                <div>
                <span>{formatPrice(cartTotalAmount)}</span>
                </div>
            </div>
            
            </div>
            <div className=" relative justify-content border-[1.2px] border-slate-400 bg-white  shadow-md  rounded-xl ml-4 mr-4 mt-1">
            <div className="flex p-2 justify-between ">
                <div className="sm:w-[100px] md:w-[100px] lg:w-[100px] xl:w-[100px] ">
                <p className="">Cart de fidélité</p>
                </div>
                <div className="w-[250px] sm:w-[200px] md:w-[200px] lg:w-[200px] xl:w-[200px]" ><InputButton  label={"Valider"} placeholder={"123 123 123 123"}/></div>
            </div>
            </div>
            <div className=" relative justify-content border-[1.2px] border-slate-400 bg-white  shadow-md  rounded-xl ml-4 mr-4 mt-1">
            <div className="flex p-2 justify-between ">
                <div className="sm:w-[100px] md:w-[100px] lg:w-[100px] xl:w-[100px]">
                <p className="">Code Promo</p> 
                </div>
                <div className="w-[250px] sm:w-[200px] md:w-[200px] lg:w-[200px] xl:w-[200px]" ><InputButton  label={"Appliquer"}/></div>
            </div>
            </div>
            <div className=" relative justify-content border-[1.2px] border-slate-400 bg-white  shadow-md  rounded-xl ml-4 mr-4 mt-1">
            <div className="flex p-2 justify-between ">
                <div className="">
                <p className="p-1">Reste a payer</p>
                </div>
                <div>
                <span className="p-1">{formatPrice(cartTotalAmount)}</span>
                </div>
            </div>
            </div>
            <div className=" relative justify-content border-[1.2px] border-slate-400 bg-gray-700  text-white shadow-md  rounded-t-xl ml-4 mr-4 mt-4 ">
            <div className="grid flex-row p-2 justify-between ">
                <div className="flex gap-1 ">
                <p className="">Panier</p>
                </div>
            </div>
            </div>
            <div className=" relative justify-content border-[1.2px] border-slate-400 bg-white  shadow-md  rounded-b-xl ml-4 mr-4 mb-4">
            <div className="grid flex-row p-2 justify-between ">
                {cartProducts?
                cartProducts.map((item: any) => {
                    return <div key={item}><Commandes item={item} /></div>;
                }):
                <div className="p-2">
                    <div onClick={()=>{selectedIdShopList=== undefined?  router.push(`/`) : router.push(`/product/${selectedIdShopList}`)}} className="text-slate-500 cursor-pointer flex items-center gap-1 mt-2">
                        <MdArrowBack />
                        <span>Start Ordering</span>
                    </div>
                </div> 
                }
            </div>
            </div>
        </div>
        </div>
    </Container>
    </div>
);
};

export default Profile;
