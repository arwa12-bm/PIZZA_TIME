import { useEffect, useState } from "react";
import { CiCreditCard1, CiMobile3, CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import Subscriptions from "../profile/Braintree";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineMarkEmailRead, MdSaveAs } from "react-icons/md";
import InputProfile from "../components/form/inputprofile";
import { LuUserCircle2 } from "react-icons/lu";
import useCard from "../hooks/useCard";
import { title } from "process";
import Container from "../components/Container";


const FormAddCategorie = () => {


        const [itemData, setItemData] = useState<any>({
            title: "",
            imageUrl: "",
            idCard:1,
            shopParent: ""
        
        });
   

    const {
        register: registerSignup,
        handleSubmit: handleSubmitUpdate,
        formState: { errors: errorsSignup },
        } = useForm<FieldValues>({
        defaultValues: itemData,
        });

        const handleChange = (e:any) => {
            const { name, value } = e.target;
            setItemData({
                ...itemData,
                [name]: value
            });
        };


    

        const onSubmitUpdate: SubmitHandler<FieldValues> = async (formData) => {
            console.log({formData})
            await fetch(`http://localhost:8080/api/categories/Addcategories`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData ),
            });
            console.log("done")
            
            };

    return (
        <Container>
        <div className="flex justify-center">
            <div className=" border-[1.2px] border-slate-200 bg-white shadow-md  rounded-2xl m-4  w-[60%] ">
            <div className="flex justify-between">
                <div className="flex p-2 gap-1">
                <IoIosInformationCircleOutline size={25} />
                <p className="">Ajouter un categorie</p>
                </div>
                <div className="p-2">
                <MdSaveAs
                    onClick={handleSubmitUpdate(onSubmitUpdate)}
                    size={30}
                    className="bg-white text-gray-600 rounded-md"
                />
                </div>
            </div>
            <div className="p-2 grid gap-2">
                <InputProfile
                id="title"
                required
                register={registerSignup}
                errors={errorsSignup}
                type="text"
                placeholder=""
                label="Title"
                value={itemData.title}
                onChange={(e: any) =>
                    setItemData({
                    ...itemData,
                    title: e.target.value,
                    })
                }
                />
                <InputProfile
                id="imageUrl"
                required
                register={registerSignup}
                errors={errorsSignup}
                type="text"
                placeholder=""
                label="Image URL"
                value={itemData.imageUrl}
                onChange={(e: any) =>
                    setItemData({
                    ...itemData,
                    imageUrl: e.target.value,
                    })
                }
                />
                <InputProfile
                id="shopParent"
                required
                register={registerSignup}
                errors={errorsSignup}
                type="text"
                placeholder=""
                label="shop Parent"
                value={itemData.categoryParent}
                onChange={(e: any) =>
                    setItemData({
                    ...itemData,
                    shopParent: e.target.value,
                    })
                }
                />
                <div >
    </div>
            </div>
            </div>
        </div>
        </Container>
    )
}


export default FormAddCategorie;