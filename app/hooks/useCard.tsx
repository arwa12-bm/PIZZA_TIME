"use client";

import { diff } from "deep-object-diff";
import {
createContext,
useCallback,
useContext,
useEffect,
useState,
} from "react";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";


//import { card } from "../utils/products";


type CartContextType = {
selectedProductData: any;
selectedProductId: any;
selectedCategorie: any;
selectedShoplist: any;
IdShopList: string;
IdCategorieList: string;
IdCategorieEl: string;
CategorieObject: any;
cartTotalQty: number;
cartTotalAmount: number;
cartProducts: any;
dataUser: any;
dataPanier: any;
dataCommande:any;
AllCommande:any;
ModeRetrait: any;
statDay:any;
stat:any
card:any;
logWithGoogle:boolean;
getselectedShoplist: () => any;
getselectedCategorie: () => any;
handleAddProductToCart: (product: any, dataUser: any) => void;
handleClearCart: (dataUser: any) => void;
HandleCartQtyIncrease: (product: any, dataUser: any) => void;
HandleCartQtyDecrease: (product: any, dataUser: any) => void;
handleRemoveProductFromCart: (product: any, dataUser: any) => void;
getData: () => any;
getTotals: () => any;
getDataGoogle: () => any;
getPanier: (dataUserId: any) => any;
getCommandes: (dataUserId: any) => any;
getAllCommandes:()=>any;
getProductData: () => any;
handleAddPanier: (cartProducts: any, dataUser: any) => void;
handleDelPanier: (dataUser: any) => void;
getDataCard: () => any;
};

export interface card{
    id?:number;
    title:string;
    items?:any[];
    SupplimentComposition?:any[];
    shoplist?:any[];
    categories?:any[];
    createdAt?:Date;
}

export const CardContext = createContext<CartContextType | null>(null);

export const CardProvider = (props: any) => {
const [selectedCategorie, setSelectedCategorie] = useState();
const [selectedShoplist, setSelectedShoplist] = useState({});
const [IdCategorieEl, setIdCategorieEl] = useState<string | undefined>();
const [cartProducts, setCartProducts] = useState<any[] | null | undefined>(
    null
);
const [CategorieObject, setCategorieObject] = useState();
const [cartTotalQty, setCartTotalQty] = useState(0);
const [cartTotalAmount, setCartTotalAmount] = useState(0);
const [dataUser, setDataUser] = useState<any>(null);
const [ModeRetrait, setModeRetrait] = useState<any[] | null>();
const [selectedProductData, setselectedProductData] = useState<
    any | null
>();
const [selectedProductId, setselectedProductId] = useState<
    any[] | undefined
>();
const [dataPanier, setDataPanier] = useState<any | null>();
const [dataCommande, setDataCommande] = useState<any | null>();
const [AllCommande, setAllCommande] = useState<any | null>();
const [card,setcard]=useState<card| undefined>()
const [logWithGoogle,setLogWithGoogle]=useState(false)
const [done,setDone]=useState(false)
const [statDay,setStatDay]=useState<any | null>()
const [stat,setStat]=useState<any | null>()


useEffect(()=>{
    fetchAllStat()
    fetchStatData()
    //console.log({statDay})
},[])
const fetchAllStat=async()=>{
    const url = `http://localhost:8080/api/stat`;
    const requestOptions:any = {
        method: 'GET',

    };
    await fetch(url, requestOptions)
        .then(async(res )=> {
            const jsonData = await res.json();
            setStat(jsonData)
        })
        .catch(error => {
            console.log(error)
        });
        
}

const fetchStatData=async()=>{
    let jsonData
    const url = `http://localhost:8080/api/panier/stat/1`;
    const requestOptions:any = {
        method: 'GET',

    };
    await fetch(url, requestOptions)
        .then(async(res )=> {
            jsonData = await res.json();
            setStatDay(jsonData)
        })
        .catch(error => {
            console.log(error)
        });
    return  jsonData
}
const SaveStatData = async () => {
    let jsonData;
    const currentTime = new Date();
    const day = currentTime.toISOString().split('T')[0];
    const dataDay = await  fetchStatData()
    console.log({ date: day, information: dataDay });

    const url = `http://localhost:8080/api/stat/AddStat`;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: day, information: dataDay }),
    };

    try {
        const res = await fetch(url, requestOptions);
        jsonData = await res.json();
        console.log({ jsonData });
    } catch (error) {
        console.error("Failed to fetch data", error);
    }
}


useEffect(() => {
    const intervalId = setInterval(async () => {
        const currentTime = new Date();
        const min = currentTime.getMinutes();
        console.log(min);
        if (min === 28 ) {
            await SaveStatData();
            console.log("cc");
        }
    }, 60000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
}, []);




const getDataGoogle = useCallback(async () => {
    const myCookieValue:any = Cookies.get('jwt')

//console.log({myCookieValue});
const tokenJSON = myCookieValue.substring(2);

// Decode the JSON portion
const decodedToken = JSON.parse(tokenJSON);
// Check if the token contains an email property
if (decodedToken && decodedToken.email) {
        // Access email and first name
    const email = decodedToken.email;
    const firstName = decodedToken.firstName;
    const lastName = decodedToken.lastNAme;
    setDataUser({email,nom:`${firstName} ${lastName}`})
    //console.log({dataUser});
    setLogWithGoogle(true)
    
} else {
console.log('Token does not contain email');
}

},[])



const getselectedShoplist = useCallback(()=>{

    setSelectedShoplist(
        localStorage.getItem("selectedShoplist") !== null
            ? JSON.parse(localStorage.getItem("selectedShoplist") ?? "{}")
            : {}
        );

},[])


const getselectedCategorie = useCallback(()=>{

    setSelectedCategorie(
        localStorage.getItem("selectedCategorie") !== null
            ? JSON.parse(localStorage.getItem("selectedCategorie") ?? "{}")
            : {}
        );

},[])

useEffect(() => {
    if(!logWithGoogle){
        getData();
    }else{
        getDataGoogle
    }
    
}, []);

useEffect(() => {
    //console.log("ddd", dataUser);

    const fetchData = async () => {
        if (dataUser !== null || dataUser?.error?.length < 0 ) {
                await getPanier(dataUser);
            await getCommandes(dataUser);
            //console.log("dddc", dataUser);
        }
    };
    fetchData();
}, [dataUser,cartProducts]);


//get List of item in cart
useEffect(()=>{
    const getCartProducts =()=>{
        if (dataPanier !== null ) {
            const cartItems: any = localStorage.getItem("CartItem");
            if (cartItems !== "undefined") {
                const cProducts = JSON.parse(cartItems);
                setCartProducts(cProducts);
            }
            }
    }
    if( !dataUser?.error && dataUser !== null ){
        getCartProducts()

    }
    
    
},[dataPanier])



useEffect(() => {
    const ModRetrait: any = localStorage.getItem("ModeRetrait");
    const MRetrait: any[] | null = JSON.parse(ModRetrait);
    setModeRetrait(MRetrait);
    //console.log({ ModeRetrait });
}, []);  




useEffect(() => {
    const storedProductId = localStorage.getItem("selectedProductId");
    const parsedProductId = storedProductId
    ? JSON.parse(storedProductId)
    : null;
    setselectedProductId(parsedProductId);
}, []);

const getTotals =async()=>{
    // console.log({cartProducts});
    
    if(cartProducts!==null && typeof cartProducts !== "undefined" ){
        const {total,qty} = cartProducts?.reduce((acc, item)=>{
            // console.log({item});
        let index=item.data.detail.taille.findIndex((el:any)=>el===item.checkedDetail)
        // console.log({index});
       
        const itemTotal = item.data.detail.price[index] * item.quantity
        acc.total += itemTotal 
        acc.qty +=item.quantity
        return acc
    },{
        total:0,
        qty:0
    })
    setCartTotalQty(qty)
    //console.log({total});
    setCartTotalAmount(total)
    return total

}
}

// get  totalAmount and total quantity
useEffect(() => {
    if(cartProducts !== null && typeof cartProducts !== "undefined"){
        getTotals()
    }
}, [cartProducts,dataPanier]);

//Add panier


const handleAddPanier = async (cartItem: any, dataUser: any,prix:any) => {
    let total:any
    // console.log("panier Total",prix)
    { cartTotalAmount === 0 ? total= prix.toFixed(2) : total=cartTotalAmount?.toFixed(2) }
    // console.log("panier Total",total)
    await fetch("http://localhost:8080/api/panier/AddPanier", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItem: cartItem, id_user: dataUser.id, prix:total, ModeRetrait: ModeRetrait}),
    });
    await getTotals();
};

//Del panier
const handleDelPanier = async (dataUser: any) => {
    if(dataUser.error){return}
    const url = `http://localhost:8080/api/panier/${dataUser.id}`;
    const requestOptions:any = {
        method: 'DELETE',
    };
    fetch(url, requestOptions)
        .then(response => {
        // Handle response
        })
        .catch(error => {
            console.log(error)
        });
        
};


//add product to cart
const handleAddProductToCart = useCallback(
    async (product: any, dataUser: any) => {
        let updatedCart;
        let prix: any;
        const total = await getTotals();
        // console.log({total});
        // console.log({cartTotalAmount});
        // console.log({dataPanier});
        let index=product.data.detail.taille.findIndex((el:any)=>el===product.checkedDetail)
        // console.log({index});
        if (cartProducts) {
            updatedCart = [...cartProducts, product]; // Ajoute le nouveau produit à la fin du panier existant
            // const itemTotal = product.data.detail.price[index] * product.quantity
            prix = cartTotalAmount + product.data.detail.price[index]; // Met à jour le prix total en ajoutant le prix du nouveau produit
        } else {
            updatedCart = [product]; // Crée un nouveau panier avec le produit si le panier est vide
            prix = product.data.detail.price[index]; // Définit le prix total comme le prix du nouveau produit
        }

        setCartProducts(updatedCart); // Met à jour l'état du panier avec le nouveau contenu
        localStorage.setItem("CartItem", JSON.stringify(updatedCart)); // Stocke le panier mis à jour dans le stockage local
        // console.log({updatedCart});
        // console.log({prix});
        await handleDelPanier(dataUser); // Supprime l'ancien panier de l'utilisateur
        await handleAddPanier(updatedCart, dataUser, prix); // Ajoute le nouveau panier à la base de données ou à toute autre destination
        return updatedCart;
    },
    [cartProducts,cartTotalAmount] // Dépendances pour le hook useCallback
);


    // Decrease quantity
    const HandleCartQtyIncrease = useCallback(
        async (product: any, dataUser: any) => {
        // console.log({ product });
    
        let updatedCart;
    
        if (product.quantity === 99) {
            return toast.error("Ooop! Maximum reached");
        }
    
    
        if (cartProducts) {
            updatedCart = [...cartProducts];
    
            const Existingindex = cartProducts.findIndex(
            (item) =>
                item.data.id === product.data.id &&
                Object.keys(diff(item.sup, product.sup)).length === 0 &&
                Object.keys(diff(item.checkedItems, product.checkedItems)).length === 0
            );
            if (Existingindex > -1) {
            updatedCart[Existingindex].quantity = ++updatedCart[Existingindex]
                .quantity;
            }
            setCartProducts(updatedCart);
        }
    // console.log({updatedCart});
    let prix:undefined
        await handleDelPanier(dataUser);
        await handleAddPanier(updatedCart, dataUser,prix);
        localStorage.setItem("CartItem", JSON.stringify(updatedCart));
        return updatedCart;
        },
        [cartProducts]);
    
    // Decrease quantity
    const HandleCartQtyDecrease = useCallback(
        async (product: any, dataUser: any) => {
        let updatedCart;
    
        if (product.quantity === 1) {
            return toast.error("Ooop! Manimum reached");
        }
    
        if (cartProducts) {
            updatedCart = [...cartProducts];
    
            const Existingindex = cartProducts.findIndex(
            (item) => item.data.id === product.data.id &&
            Object.keys(diff(item.sup, product.sup )).length === 0 &&
            Object.keys(diff(item.checkedItems, product.checkedItems)).length === 0
        
            );
            if (Existingindex > -1) {
            updatedCart[Existingindex].quantity = --updatedCart[Existingindex]
                .quantity;
            }
            setCartProducts(updatedCart);
        }
        let prix:undefined

        await handleDelPanier(dataUser);
        await handleAddPanier(updatedCart, dataUser,prix);
        localStorage.setItem("CartItem", JSON.stringify(updatedCart));
        return updatedCart;
        },
        [cartProducts]);
    
    const handleRemoveProductFromCart = useCallback(
        async (product: any, dataUser: any) => {
        if (cartProducts) {
            // Filter out the product to be removed from the cart
            const updatedCart = cartProducts.filter(
            (item: any) => item !== product
            );
            setCartProducts(updatedCart);
            // Notify user and update local storage
            toast.success("produit est supprimé");
            localStorage.setItem("CartItem", JSON.stringify(updatedCart));
            const cartItems: any = localStorage.getItem("CartItem");
            const cProducts: any[] | null = JSON.parse(cartItems);
            let prix:undefined
            await handleDelPanier(dataUser);
            await handleAddPanier(cProducts, dataUser,prix);
        }
        },
        [cartProducts]);
    



//clear Cart
const handleClearCart = useCallback(async( dataUser: any) => {
    setCartProducts(null);
    setDataPanier(null)
    setCartTotalQty(0);
    setCartTotalAmount(0);
    localStorage.setItem("supList", JSON.stringify(null));
    localStorage.setItem("ItemList", JSON.stringify(null));
    localStorage.setItem("CartItem", JSON.stringify(null));
    await handleDelPanier(dataUser);
}, []);

const getData = useCallback(async () => {
    try {
        let jsonData :any
        if(!logWithGoogle){
            const url = `http://localhost:8080/api/user/user`;
            const requestOptions:any = {
                method: 'GET',
                credentials: "include",
    
            };
            await fetch(url, requestOptions)
                .then(async(res )=> {
                    jsonData = await res.json();
                })
                .catch(error => {
                    throw new Error("Failed to fetch data",error);
                });

    
    //console.log({jsonData});

    setDataUser(jsonData);
}
    } catch (e) {
    console.error("get panier error", e);
    }
}, []);

const getPanier = async (dataUser:any) => {
    let jsonData:any
    if( !dataUser?.error || dataUser === null) {
    try {
        const url = `http://localhost:8080/api/panier/${dataUser.id}`;
        const requestOptions:any = {
            method: 'GET',
            credentials: "include",

        };
        await fetch(url, requestOptions)
            .then(async(res )=> {
                jsonData = await res.json();
            })
            .catch(error => {
                throw new Error("Failed to fetch data",error);
            });

//console.log({jsonData});
if (typeof jsonData !== "undefined") {
    localStorage.setItem("CartItem", JSON.stringify(jsonData[0]?.cartItem));
    setDataPanier(jsonData[0]);
}
    } catch (e) {
    console.error("getPanier error", e);
    }
}
};
const getCommandes = async (dataUserId: any) => {
    try {
    let jsonData:any
        const url = `http://localhost:8080/api/panier/commande/${dataUserId.id}`;
        const requestOptions:any = {
            method: 'GET',
            credentials: "include",

        };
        await fetch(url, requestOptions)
            .then(async(res )=> {
                jsonData = await res.json();
            })
            .catch(error => {
                throw new Error("Failed to fetch data",error);
            }); 

    //console.log({res})
    //console.log("cc",jsonData);
    //localStorage.setItem("CartItemCommande", JSON.stringify(jsonData.cartItem));
    setDataCommande(jsonData);
    } catch (e) {
    console.error("getCommande error", e);
    }
};
const getAllCommandes = async () => {
    try {
        let jsonData:any
        const url = `http://localhost:8080/api/panier`;
        const requestOptions:any = {
            method: 'GET',
            credentials: "include",

        };
        await fetch(url, requestOptions)
            .then(async(res )=> {
                jsonData = await res.json();
            })
            .catch(error => {
                throw new Error("Failed to fetch data",error);
            });
        
 
    //console.log({res})
    //console.log("cc",jsonData);
    //localStorage.setItem("CartItemCommande", JSON.stringify(jsonData.cartItem));
    setAllCommande(jsonData);
    } catch (e) {
    console.error("getAllCommande error", e);
    }
};


const getDataCard =  async () => {
    try {
let jsonData:any
        const url = `http://localhost:8080/api/card`;
        const requestOptions:any = {
            method: 'GET',
            credentials: "include",
        };
        await fetch(url, requestOptions)
            .then(async(res)=> {
                jsonData = await res.json();
            })
            .catch(error => {
                throw new Error("Failed to fetch data",error);
            });

    setcard(jsonData);
    } catch (e) {
    console.error("get shoplist error", e);
    }
}

useEffect(() => {
    getDataCard(); 
}, []);


const value = {
    logWithGoogle,
    selectedCategorie,
    selectedShoplist,
    card,
    statDay,
    stat,
    dataUser,
    dataPanier,
    dataCommande,
    AllCommande,
    selectedProductData,
    selectedProductId,
    CategorieObject,
    IdCategorieEl,
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    ModeRetrait,
    getselectedShoplist,
    getselectedCategorie,
    handleAddProductToCart,
    handleClearCart,
    HandleCartQtyIncrease,
    HandleCartQtyDecrease,
    handleRemoveProductFromCart,
    handleAddPanier,
    handleDelPanier,
    getData,
    getDataGoogle,
    getPanier,
    getCommandes,
    getAllCommandes,
    getDataCard,
    getTotals,
    // getProductData
};
return <CardContext.Provider value={value} {...props} />;
};

const useCard = () => {
const context = useContext(CardContext);

if (context === null) {
    throw new Error("useCard must used within a CardContextProvider");
}
return context;
};

export default useCard;
