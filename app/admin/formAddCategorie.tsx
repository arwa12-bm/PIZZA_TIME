import {  useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoIosInformationCircleOutline } from "react-icons/io";
import {MdSaveAs } from "react-icons/md";
import InputProfile from "../components/form/inputprofile";
import Container from "../components/Container";
import useCard from "../hooks/useCard";

interface FormAddCategorieProps{
    update?:boolean
    Data?:any
    onCloseModalUpdate?:()=>void
}
const FormAddCategorie:React.FC<FormAddCategorieProps> = ({update,Data,onCloseModalUpdate}) => {

        const {getDataCard}=useCard()
        const [itemData, setItemData] = useState<any>({
            title: "",
            imageUrl: "",
            idCard:1,
            shopParent: ""
        
        });
    

        useEffect(() => {
            if (update && Data) {
                setItemData(Data);
            }
            }, [update, Data]);

    const {
        register: registerSignup,
        handleSubmit: handleSubmitUpdate,
        formState: { errors: errorsSignup },
        } = useForm<FieldValues>({
        defaultValues: itemData,
        });


        const onSubmitUpdate: SubmitHandler<FieldValues> = async (formData) => {
            console.log({formData})
            if(update){
                await fetch(`http://localhost:8080/api/categories/${Data.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(formData ),
                });
            
                console.log("done Update")
                if (onCloseModalUpdate) {
                    onCloseModalUpdate();
                }
            }else{
            await fetch(`http://localhost:8080/api/categories/Addcategories`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData ),
            });
        
            console.log("done Add")
        }
            setItemData({
                title: "",
                imageUrl: "",
                idCard:1,
                shopParent: ""
            
            });
            getDataCard()
            
            };

    return (
        <Container>
        <div className="flex justify-center">
            <div className=" border-[1.2px] border-slate-200 bg-white shadow-md  rounded-2xl m-4 w-full px-8">
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