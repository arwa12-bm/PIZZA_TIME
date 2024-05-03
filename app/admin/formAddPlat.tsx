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


const FormAddPlat = () => {


        const [itemData, setItemData] = useState<any>({
            price: 0,
            title: "",
            ranks: 0,
            imageUrl: "",
            basicComposition:[],
            categoryParent: "",
            allergens: []
        });
        const [basicCompositions, setBasicCompositions] = useState<{
            id: number,
            title: string,
        }[]>([{
            id: 1,
            title: "",
        }]);

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

        const handleAddComposition = (index:any) => {
          // Vous pouvez ajouter une nouvelle composition de base à la liste ici
          // Par exemple, vous pouvez initialiser une nouvelle composition avec des valeurs par défaut
            const newComposition = {
            id: index,
            title: '',
            // Ajoutez d'autres propriétés si nécessaire
            };
            setBasicCompositions([...basicCompositions, newComposition]);
        };
        const handleRemoveComposition = (indexToRemove:any) => {
            // Créer une nouvelle liste qui exclut le composant à supprimer
            const updatedCompositions = basicCompositions.filter((_:any, index:any) => index !== indexToRemove);
            // Mettre à jour l'état avec la nouvelle liste
            setBasicCompositions(updatedCompositions);
            };
            
        
        const handleCompositionChange = (index:any, newValue:any) => {
          // Vous pouvez gérer le changement de composition de base ici
          // Par exemple, mettre à jour la liste des compositions de base avec la nouvelle valeur
            const updatedCompositions = [...basicCompositions];
            updatedCompositions[index] = {
                id:index,
                title: newValue,
                // Ajoutez d'autres propriétés si nécessaire
                };
            setBasicCompositions(updatedCompositions);
        };

    
        const handleAllergensChange = (e:any) => {
            const { value } = e.target;
            setItemData({
                ...itemData,
                allergens: value.split(",") // Si les ID des allergènes sont séparés par des virgules
            });
        };
    

        const onSubmitUpdate: SubmitHandler<FieldValues> = async (formData) => {
            console.log({ basicCompositions });
                const item= basicCompositions;

                // Include basicComposition in formData
                const updatedFormData = {
                    ...formData,
                    basicComposition: item,
                };

                console.log({ updatedFormData });
            await fetch(`http://localhost:8080/api/items/AddItems`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(updatedFormData ),
            });
            console.log("done")
            
            };

    return ( 
        <Container>
        <div className="flex justify-center">
            <div className="border-[1.2px] border-slate-200 bg-white shadow-md  rounded-2xl m-4  w-[60%]  px-8 ">
            <div className="flex justify-between">
                <div className="flex p-2 gap-1">
                <IoIosInformationCircleOutline size={25} />
                <p className="">Ajouter un plat</p>
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
                id="price"
                required
                register={registerSignup}
                errors={errorsSignup}
                type="text"
                placeholder=""
                label="Price"
                value={itemData.price}
                onChange={(e: any) =>
                    setItemData({
                    ...itemData,
                    price: e.target.value,
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
                id="categoryParent"
                required
                register={registerSignup}
                errors={errorsSignup}
                type="text"
                placeholder=""
                label="Category Parent"
                value={itemData.categoryParent}
                onChange={(e: any) =>
                    setItemData({
                    ...itemData,
                    categoryParent: e.target.value,
                    })
                }
                />
                {/* <InputProfile
                id="allergens"
                required
                register={registerSignup}
                errors={errorsSignup}
                type="text"
                placeholder=""
                label="Allergens (IDs separated by comma)"
                value={Array.isArray(itemData.allergens) ? itemData.allergens.join(",") : ""}
                onChange={(e: any) =>
                    setItemData({
                    ...itemData,
                    allergens: e.target.value,
                    })
                }
                /> */}
                <div >



    {basicCompositions.map((composition:any, index:any) => (
        
        <div className="flex" key={index}>
            <div className="w-[100%]">
                <InputProfile
                key={index}
                id={`basicCompTitle ${index}`}
                errors={errorsSignup}
                type="text"
                placeholder=""
                label={`Composition de Base ${index+1}`}
                value={composition[index]?.title}
                onChange={(e: any) =>
                    handleCompositionChange(index, e.target.value)}
                />
            </div>
            <div className="grid grid-rows-2  items-center">
            {index == basicCompositions.length - 1 && index!=0 && ( // Affiche le bouton "Supprimer" uniquement pour le dernier élément
                <div className="" onClick={() => handleRemoveComposition(index)}><CiSquareMinus size={30} /></div>
                )}
            {index === basicCompositions.length - 1 && ( // Affiche le bouton "Ajouter" uniquement pour le dernier élément
                <div className="top-0"  onClick={() =>handleAddComposition(index)}><CiSquarePlus size={30} /> </div>
                )}
            </div>
        </div>
        
    ))}
    </div>
            </div>
            </div>
        </div>
        </Container>
    )
}


export default FormAddPlat;