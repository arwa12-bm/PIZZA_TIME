"use client";
import { LuUserCircle2 } from "react-icons/lu";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CiMobile3 } from "react-icons/ci";
import { MdOutlineMarkEmailRead, MdSaveAs } from "react-icons/md";

import Container from "../components/Container";
import HomePhoto from "../components/HomePhoto";
import useCard from "../hooks/useCard";
import InputProfile from "../components/form/inputprofile";
import Address from "./Address";
import Cartes from "./Cartes";
import { formatPrice } from "../utils/formatPrice";
import Commandes from "./Commandes";
import ModeRetraitProfile from "./ModeRetraitProfile";

const Profile = () => {
const {
    selectedIdShopList,
    dataUser,
    getData,
    cartTotalAmount,
    cartProducts,
} = useCard();
const [formData, setFormData] = useState(dataUser);

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


useEffect(() => {
    getData();
}, []);


const onSubmitUpdate: SubmitHandler<FieldValues> = async (formData) => {
    await fetch(`http://localhost:8080/api/user/${dataUser?.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    });
    getData();
    console.log("Updated");
};

return (
    <div>
    <HomePhoto data={selectedIdShopList} />
    <Container>
        <div className="flex justify-between">
        <div className="flex  items-center gap-2 p-2">
            <LuUserCircle2 size={30} />
            <p className="text-xl">Bonjour {dataUser?.nom}</p>
        </div>
        </div>
        <div className="grid grid-cols-2">
        <div className="col-span-1 w-[130%]">
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
            <ModeRetraitProfile/>
        </div>
        <div className="col-span-1 w-[70%] justify-self-end">
            <div className=" relative justify-content border-[1.2px] border-slate-400 bg-gray-700  text-white shadow-md  rounded-xl ml-4 mt-4 mr-4 mt-1  ">
            <div className="flex p-2 justify-between ">
                <div className="flex gap-1">
                <p className="">Total Commande</p>
                </div>
                <div>
                <span>{formatPrice(cartTotalAmount)}</span>
                </div>
            </div>
            </div>
            <div className=" relative justify-content border-[1.2px] border-slate-400 bg-white  shadow-md  rounded-xl ml-4 mr-4 mt-1">
            <div className="flex p-2 justify-between ">
                <div className="flex gap-1">
                <p className="">Cart de fidélité</p>
                </div>
                <div>cc</div>
            </div>
            </div>
            <div className=" relative justify-content border-[1.2px] border-slate-400 bg-white  shadow-md  rounded-xl ml-4 mr-4 mt-1">
            <div className="flex p-2 justify-between ">
                <div className="flex gap-1">
                <p className="">Code Promo</p>
                </div>
                <div>ccc</div>
            </div>
            </div>
            <div className=" relative justify-content border-[1.2px] border-slate-400 bg-white  shadow-md  rounded-xl ml-4 mr-4 mt-1">
            <div className="flex p-2 justify-between ">
                <div className="flex gap-1">
                <p className="">Reste a payer</p>
                </div>
                <div>
                <span>{formatPrice(cartTotalAmount)}</span>
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
                {cartProducts &&
                cartProducts.map((item: any) => {
                    return <Commandes item={item} />;
                })}
            </div>
            </div>
        </div>
        </div>
    </Container>
    </div>
);
};

export default Profile;
