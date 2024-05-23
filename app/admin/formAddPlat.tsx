import { useEffect, useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdSaveAs } from "react-icons/md";
import InputProfile from "../components/form/inputprofile";
import Container from "../components/Container";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import useCard from "../hooks/useCard";
interface FormAddPlatProps {
update?: boolean;
Data?: any;
onCloseModalUpdate?:Function
}
const FormAddPlat: React.FC<FormAddPlatProps> = ({ update, Data,onCloseModalUpdate}) => {
const { card, getDataCard } = useCard();
const [selected, setSelected] = useState("");
const InitialData = () => {
setItemData({
    title: "",
    imageUrl: "",
    basicComposition: [],
    detail: {},
    categoryParent: "",
});
setBasicCompositions([
    {
    id: 1,
    title: "",
    },
]);
setBasicTaille(
    {
    taille: [""],
    price: [0],
    },
);
setSelected("");
};

const [itemData, setItemData] = useState<any>({
title: "",
imageUrl: "",
basicComposition: [],
detail: {},
categoryParent: "",
});
const [basicCompositions, setBasicCompositions] = useState<
{
    id: number;
    title: string;
}[]
>([
{
    id: 1,
    title: "",
},
]);
const [basicTaille, setBasicTaille] = useState<{
    taille: string[];
    price: number[];
  }>({
    taille: [""],
    price: [0],
  });

useEffect(() => {
if (update && Data) {
    setItemData(Data);
    setBasicCompositions(Data.basicComposition);
    console.log(Data.basicComposition)
    setBasicTaille(Data.detail);
    setSelected(Data.categoryParent);
}
}, [update, Data]);

const {
register: registerSignup,
handleSubmit: handleSubmitUpdate,
formState: { errors: errorsSignup },
} = useForm<FieldValues>({
defaultValues: itemData,
});

const handleAddComposition = (index: any) => {
const newComposition = {
    id: index,
    title: "",
};
setBasicCompositions([...basicCompositions, newComposition]);
};
const handleRemoveComposition = (indexToRemove: any) => {
const updatedCompositions = basicCompositions.filter(
    (_: any, index: any) => index !== indexToRemove
);
setBasicCompositions(updatedCompositions);
};

const handleCompositionChange = (index: any, newValue: any) => {
const updatedCompositions = [...basicCompositions];
updatedCompositions[index] = {
    id: index,
    title: newValue,
};
setBasicCompositions(updatedCompositions);
};

const handleTailleChange = (
    subIndex: number,
    field: 'taille' | 'price',
        value: string | number
    ) => {
        setBasicTaille(prevState => {
        const newState = { ...prevState };
        if (field === 'taille') {
            newState.taille[subIndex] = value as string;
        } else if (field === 'price') {
            newState.price[subIndex] = value as number;
        }
        return newState;
        });
    };
    
    const handleAddTaille = () => {
        setBasicTaille(prevState => ({
        taille: [...prevState.taille, ""],
        price: [...prevState.price, 0],
        }));
    };
    
    const handleRemoveTaille = (subIndex: number) => {
        setBasicTaille(prevState => ({
        taille: prevState.taille.filter((_, idx) => idx !== subIndex),
        price: prevState.price.filter((_, idx) => idx !== subIndex),
        }));
    };
  


let listCategorie;
listCategorie = card?.categories.map((el: any) => el.title);
// console.log({listCategorie})

const onSubmitUpdate: SubmitHandler<FieldValues> = async (formData) => {
// console.log({ basicCompositions });
const item = basicCompositions;
const detail = basicTaille;
const categoryParent = selected;
// Include basicComposition in formData
const updatedFormData = {
    ...formData,
    basicComposition: item,
    detail: detail,
    categoryParent: categoryParent,
};

console.log({ updatedFormData });
if(update){
    await fetch(`http://localhost:8080/api/items/${Data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedFormData),
    });
    console.log("done Update");
    if (onCloseModalUpdate) {
        onCloseModalUpdate();
    }
}else{
await fetch(`http://localhost:8080/api/items/AddItems`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(updatedFormData),
});
console.log("done Add");
}
InitialData()
getDataCard();
};

return (
<Container>
    <div className="flex justify-center ">
    <div className="border-[1.2px] border-slate-200 bg-white shadow-md  rounded-2xl m-4 w-full   px-8 ">
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
            <Box sx={{ minWidth: 120 }}>
        {basicTaille.taille.map((_, subIndex) => (
        <div className="flex" key={subIndex}>
            <div className="w-[100%]">
            <InputProfile
                id={`basicTailleTitle ${subIndex}`}
                errors={errorsSignup}
                type="text"
                placeholder=""
                label={`Taille ${subIndex + 1}`}
                value={basicTaille.taille[subIndex]}
                onChange={(e) =>
                handleTailleChange(subIndex, "taille", e.target.value)
                }
            />
            </div>
            <div className="w-[100%]">
            <InputProfile
                id={`basicPriceTitle ${subIndex}`}
                errors={errorsSignup}
                type="number"
                placeholder=""
                label={`Price ${subIndex + 1}`}
                value={basicTaille.price[subIndex]}
                onChange={(e) =>
                handleTailleChange(subIndex, "price", parseFloat(e.target.value))
                }
            />
            </div>
            <div className="grid grid-rows-2 items-center">
            {subIndex === basicTaille.taille.length - 1 && basicTaille.taille.length > 1 && (
                <div onClick={() => handleRemoveTaille(subIndex)}>
                <CiSquareMinus size={30} />
                </div>
            )}
            {subIndex === basicTaille.taille.length - 1 && (
                <div onClick={handleAddTaille}>
                <CiSquarePlus size={30} />
                </div>
            )}
            </div>
        </div>
        ))}
    </Box>

        {basicCompositions.map((composition: any, index: any) => (
            <div className="flex" key={index}>
            <div className="w-[100%]">
                <InputProfile
                key={index}
                id={`basicCompTitle ${index}`}
                errors={errorsSignup}
                type="text"
                placeholder=""
                label={`Composition de Base ${index + 1}`}
                value={basicCompositions[index]?.title}
                onChange={(e: any) =>
                    handleCompositionChange(index, e.target.value)
                }
                />
            </div>
            <div className="grid grid-rows-2  items-center">
                {index == basicCompositions.length - 1 &&
                index != 0 && ( // Affiche le bouton "Supprimer" uniquement pour le dernier élément
                    <div
                    className=""
                    onClick={() => handleRemoveComposition(index)}
                    >
                    <CiSquareMinus size={30} />
                    </div>
                )}
                {index === basicCompositions.length - 1 && ( // Affiche le bouton "Ajouter" uniquement pour le dernier élément
                <div
                    className="top-0"
                    onClick={() => handleAddComposition(index)}
                >
                    <CiSquarePlus size={30} />{" "}
                </div>
                )}
            </div>
            </div>
        ))}

        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="category-parent-native">
                Category Parent
            </InputLabel>
            <NativeSelect
                id="categoryParent"
                value={selected}
                onChange={(e: any) => {
                console.log(e.target.value);
                setSelected(e.target.value);
                }}
            >
                <option value={""}></option>
                {listCategorie.map((el: any, index: any) => (
                <option key={index} value={el}>
                    {el}
                </option>
                ))}
            </NativeSelect>
            </FormControl>
        </Box>

        <div></div>
        </div>
    </div>
    </div>
</Container>
);
};

export default FormAddPlat;
