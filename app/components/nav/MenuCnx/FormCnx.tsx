import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaUserCircle } from "react-icons/fa";
import NavBar from "../NavBar";
import useCard from "@/app/hooks/useCard";
import Signup from "./signup";
import Login from "./login";
import Compte from "./compte";

const FormCnx = () => {
const [type, setType] = useState("Connexion");
const [isSignup, setIsSignup] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [isClicked, setIsClicked] = useState(true);
const { dataUser } = useCard();

useEffect(() => {
    if (dataUser) {
    setType("Mon compte");
    }
}, [dataUser]);

//close inscription Menu to connex
function handleMenuCnx() {
    setIsSignup(false);
    setIsLoading(false);
    setType("Connexion");
}

//close connex menu
function handleMenu() {
    setIsClicked(false);
}
return (
    <div>
    {isClicked ? (
        <div className="fixed  flex flex-col min-h-screen top-0 right-0 bg-white  h-screen z-30 w-[40%]  ">
        <div className="flex w-full justify-content  py-3">
            <button
            onClick={type === "Inscription" ? handleMenuCnx : handleMenu}
            >
            <FaChevronLeft size={20} className="pt-1 mt-1" />
            </button>
            <h1 className="text-2xl font-semibold w-full text-center">
            {type}
            </h1>
        </div>
        <hr className="w-[100%] my-2 " />
        <div className="flex-grow overflow-y-auto justify-content-between">
            {!dataUser?.error ? (
            <Compte handleMenu={handleMenu} />
            ) : (
            <>
                {isSignup ? (
                <Signup
                    handleMenuCnx={handleMenuCnx}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
                ) : (
                <Login
                    handleMenu={handleMenu}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    setIsSignup={setIsSignup}
                    setType={setType}
                />
                )}
            </>
            )}
        </div>
        <div className=" bg-white  h-[10%]  w-full opacity-75  text-center p-2 ">
            <p className=" flex text-sm  underline  justify-center p-2">
            <Link href="">Mention légales</Link>
            </p>
        </div>
        </div>
    ) : (
        <NavBar isClick={false} />
    )}
    </div>
);
};

export default FormCnx;
