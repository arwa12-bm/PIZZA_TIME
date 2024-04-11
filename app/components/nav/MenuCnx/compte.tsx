import { useRouter } from "next/navigation";
import { CiStar } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuBadgePercent, LuUserCircle2 } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbShoppingBagCheck } from "react-icons/tb";

import useCard from "@/app/hooks/useCard";

interface CompteProps {
handleMenu: () => void;
}

const Compte: React.FC<CompteProps> = ({ handleMenu }) => {
const { getData,handleClearCart,dataUser } = useCard();
const router = useRouter();
const HandleLogout = async () => {
    await fetch("http://localhost:8080/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    });
    localStorage.setItem("CartItem",JSON.stringify(null))        
    await getData();
    handleMenu();
    handleClearCart(dataUser)
    router.push("/");
};

return (
    <div className="grid flex-row-6  gap-5 p-4">
    <div
        className="flex gap-4 cursor-pointer"
        onClick={() => {
        router.push("/profile");
        handleMenu();
        }}
    >
        <LuUserCircle2 size={30} />
        <p className="text-2xl">Profile</p>
    </div>
    <div className="flex gap-4 cursor-pointer"
        onClick={() => {
            router.push("/commandes");
            handleMenu();
            }}>
        <TbShoppingBagCheck size={30} />
        <p className="text-2xl">Commandes</p>
    </div>
    <div className="flex gap-4">
        <CiStar size={30} />
        <p className="text-2xl">Fidélité</p>
    </div>
    <div className="flex gap-4">
        <LuBadgePercent size={30} />
        <p className="text-2xl">Promotions</p>
    </div>
    <div className="flex gap-4">
        <IoMdNotificationsOutline size={30} />
        <p className="text-2xl">Notificetions</p>
    </div>
    <div className="flex gap-4" onClick={HandleLogout}>
        <RiLogoutCircleLine size={30} />
        <p className="text-2xl">Déconnexion</p>
    </div>
    </div>
);
};

export default Compte;
