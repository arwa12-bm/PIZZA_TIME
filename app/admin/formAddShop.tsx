import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdSaveAs } from "react-icons/md";
import InputProfile from "../components/form/inputprofile";
import Container from "../components/Container";
import useCard from "../hooks/useCard";
import Box from "@mui/material/Box";


interface FormAddShopProps {
update?: boolean;
Data?: any;
onCloseModalUpdate?: () => void;
}

const FormAddShop: React.FC<FormAddShopProps> = ({ update, Data, onCloseModalUpdate }) => {

    

const { getDataCard } = useCard();
const [itemData, setItemData] = useState<any>({
town: "",
image: "",
Nature: "",
shopid: 1,
Address: "",
Company: "",
Country: "",
PostalCode: "",
latitude: 0,
longitude: 0,
tel: "",
villelivraison: {
    ville1: {
    nom: "",
    fraislivraison: "",
    mincommande: "",
    },
},
horaire: {},
etat: "",
});

const [Listhoraire,setListhoraire]=useState({
    LUNDI: { firstStart: "", firstEnd: "", secondStart: "", secondEnd: "" },
    MARDI: { firstStart: "", firstEnd: "", secondStart: "", secondEnd: "" },
    MERCREDI: { firstStart: "", firstEnd: "", secondStart: "", secondEnd: "" },
    JEUDI: { firstStart: "", firstEnd: "", secondStart: "", secondEnd: "" },
    VENDREDI: { firstStart: "", firstEnd: "", secondStart: "", secondEnd: "" },
    SAMEDI: { firstStart: "", firstEnd: "", secondStart: "", secondEnd: "" },
    DIMANCHE: { firstStart: "", firstEnd: "", secondStart: "", secondEnd: "" },
}) 




useEffect(() => {
if (update && Data) {
    setItemData(Data);
    setListhoraire(Data.horaire)
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
    const horaire = Listhoraire;
// Include basicComposition in formData
const updatedFormData = {
    ...formData,
    horaire: horaire,

};

console.log({ updatedFormData });
if (update) {
    await fetch(`http://localhost:8080/api/shoplist/${Data?.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(updatedFormData),
    });

    console.log("done Update");
    if (onCloseModalUpdate) {
    onCloseModalUpdate();
    }
} else {
    await fetch(`http://localhost:8080/api/shoplist/Addshop`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(updatedFormData),
    });

    console.log("done Add");
}
setItemData({
    id: "",
    town: "",
    image: "",
    Nature: "",
    shopid: 1,
    Address: "",
    Company: "",
    Country: "",
    PostalCode: "",
    latitude: 0,
    longitude: 0,
    tel: "",
    villelivraison: {
    ville1: {
        nom: "",
        fraislivraison: "",
        mincommande: "",
    },
    },
    horaire: {},
    etat: "",
});
getDataCard();
};
const handleChange = (day:any, session:any, timeType:any, value:any) => {
    // Log the update to be applied
    console.log({ [day]: { [session + timeType]: value } });

    setListhoraire((prevState:any) => ({
        ...prevState,
        [day]: {
            ...prevState[day], // Preserve the other fields of the day's schedule
            [session + timeType]: value, // Update the specific field
        },
    }));

    // Log the updated state after applying the change
    console.log(Listhoraire);
};


return (
<Container>
    <div className="flex justify-center">
    <div className="border-[1.2px] border-slate-200 bg-white shadow-md rounded-2xl m-4 w-full px-8">
        <div className="flex justify-between">
        <div className="flex p-2 gap-1">
            <IoIosInformationCircleOutline size={25} />
            {!update ? <p >Ajouter un boutique</p>: <p>Modifier un boutique</p>}

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
            id="town"
            required
            register={registerSignup}
            errors={errorsSignup}
            type="text"
            placeholder=""
            label="Title"
            value={itemData.town}
            onChange={(e: any) =>
            setItemData({
                ...itemData,
                town: e.target.value,
            })
            }
        />
        <InputProfile
            id="image"
            required
            register={registerSignup}
            errors={errorsSignup}
            type="text"
            placeholder=""
            label="Image URL"
            value={itemData.image}
            onChange={(e: any) =>
            setItemData({
                ...itemData,
                image: e.target.value,
            })
            }
        />
        <InputProfile
            id="Nature"
            required
            register={registerSignup}
            errors={errorsSignup}
            type="text"
            placeholder=""
            label="Nature"
            value={itemData.Nature}
            onChange={(e: any) =>
            setItemData({
                ...itemData,
                Nature: e.target.value,
            })
            }
        />
        <InputProfile
            id="Address"
            required
            register={registerSignup}
            errors={errorsSignup}
            type="text"
            placeholder=""
            label="Address"
            value={itemData.Address}
            onChange={(e: any) =>
            setItemData({
                ...itemData,
                Address: e.target.value,
            })
            }
        />
        <InputProfile
            id="Company"
            required
            register={registerSignup}
            errors={errorsSignup}
            type="text"
            placeholder=""
            label="Company"
            value={itemData.Company}
            onChange={(e: any) =>
            setItemData({
                ...itemData,
                Company: e.target.value,
            })
            }
        />
        <InputProfile
            id="Country"
            required
            register={registerSignup}
            errors={errorsSignup}
            type="text"
            placeholder=""
            label="Country"
            value={itemData.Country}
            onChange={(e: any) =>
            setItemData({
                ...itemData,
                Country: e.target.value,
            })
            }
        />
        <InputProfile
            id="PostalCode"
            required
            register={registerSignup}
            errors={errorsSignup}
            type="text"
            placeholder=""
            label="Postal Code"
            value={itemData.PostalCode}
            onChange={(e: any) =>
            setItemData({
                ...itemData,
                PostalCode: e.target.value,
            })
            }
        />
        <InputProfile
            id="latitude"
            required
            register={registerSignup}
            errors={errorsSignup}
            type="number"
            placeholder=""
            label="Latitude"
            value={itemData.latitude}
            onChange={(e: any) =>
            setItemData({
                ...itemData,
                latitude: parseFloat(e.target.value),
            })
            }
        />
        <InputProfile
            id="longitude"
            required
            register={registerSignup}
            errors={errorsSignup}
            type="number"
            placeholder=""
            label="Longitude"
            value={itemData.longitude}
            onChange={(e: any) =>
            setItemData({
                ...itemData,
                longitude: parseFloat(e.target.value),
            })
            }
        />
        <InputProfile
            id="tel"
            required
            register={registerSignup}
            errors={errorsSignup}
            type="text"
            placeholder=""
            label="Phone Number"
            value={itemData.tel}
            onChange={(e: any) =>
            setItemData({
                ...itemData,
                tel: e.target.value,
            })
            }
        />
        {/* <InputProfile
            id="villelivraison"
            required
            register={registerSignup}
            errors={errorsSignup}
            type="text"
            placeholder=""
            label="City Delivery Details"
            value={JSON.stringify(itemData.villelivraison)}
            onChange={(e: any) =>
            setItemData({
                ...itemData,
                villelivraison: JSON.parse(e.target.value),
            })
            }
        /> */}
    <Box sx={{ minWidth: 120 }}>
        {Object.entries(Listhoraire).map(([day, sessions]:any, index:any) => (
                <div key={index} className="w-[100%]">
                    <InputProfile
                        id={`horaire_${day}_first_start`}
                        errors={errorsSignup}
                        type="time"
                        placeholder=""
                        label={`${day} - Session 1 Start`}
                        value={sessions.firstStart}
                        onChange={(e) => handleChange(day, 'first', 'Start', e.target.value)}
                    />
                    <InputProfile
                        id={`horaire_${day}_first_end`}
                        errors={errorsSignup}
                        type="time"
                        placeholder=""
                        label={`${day} - Session 1 End`}
                        value={sessions.firstEnd}
                        onChange={(e) => handleChange(day, 'first', 'End', e.target.value)}
                    />
                    <InputProfile
                        id={`horaire_${day}_second_start`}
                        errors={errorsSignup}
                        type="time"
                        placeholder=""
                        label={`${day} - Session 2 Start`}
                        value={sessions.secondStart}
                        onChange={(e) => handleChange(day, 'second', 'Start', e.target.value)}
                    />
                    <InputProfile
                        id={`horaire_${day}_second_end`}
                        errors={errorsSignup}
                        type="time"
                        placeholder=""
                        label={`${day} - Session 2 End`}
                        value={sessions.secondEnd}
                        onChange={(e) => handleChange(day, 'second', 'End', e.target.value)}
                    />
                </div>
            ))}
        </Box>
        <InputProfile
            id="etat"
            required
            register={registerSignup}
            errors={errorsSignup}
            type="text"
            placeholder=""
            label="Status"
            value={itemData.etat}
            onChange={(e: any) =>
            setItemData({
                ...itemData,
                etat: e.target.value,
            })
            }
        />
        </div>
    </div>
    </div>
</Container>
);
};

export default FormAddShop;
