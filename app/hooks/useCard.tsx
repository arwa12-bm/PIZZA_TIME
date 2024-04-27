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


//import { card } from "../utils/products";
import toast from "react-hot-toast";

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
    console.log({dataUser});
    setLogWithGoogle(true)
    
  } else {
    console.log('Token does not contain email');
  }

},[])




// console.log("Email:", email);
// console.log("First Name:", firstName);
// console.log("lastName:", lastName);


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
    console.log("ddd", dataUser);

    const fetchData = async () => {
        if (dataUser !== null || dataUser?.error?.length < 0 ) {
                await getPanier(dataUser);
            await getCommandes(dataUser);
            console.log("dddc", dataUser);
        }
    };
    fetchData();
}, [dataUser]);


useEffect(() => {
        if (cartProducts !== null) {  
            getPanier(dataUser)
        }
    }, [dataPanier]);

//get List of item in cart
useEffect(()=>{
    const getCartProducts =()=>{
        if (dataPanier !== null) {
            const cartItems: any = localStorage.getItem("CartItem");
            if (cartItems !== "undefined") {
                const cProducts = JSON.parse(cartItems);
                setCartProducts(cProducts);
            }
            }
    }
    getCartProducts()
},[])



useEffect(() => {
    const ModRetrait: any = localStorage.getItem("ModeRetrait");
    const MRetrait: any[] | null = JSON.parse(ModRetrait);
    setModeRetrait(MRetrait);
    console.log({ ModeRetrait });
}, []);  




useEffect(() => {
    const storedProductId = localStorage.getItem("selectedProductId");
    const parsedProductId = storedProductId
    ? JSON.parse(storedProductId)
    : null;
    setselectedProductId(parsedProductId);
}, []);

const getTotals =async()=>{
    console.log({cartProducts});
    
    if(cartProducts!==null ){
        const {total,qty} = cartProducts?.reduce((acc, item)=>{
        const itemTotal = item.data.price * item.quantity
        acc.total += itemTotal 
        acc.qty +=item.quantity
        return acc
    },{
        total:0,
        qty:0
    })
    setCartTotalQty(qty)
    console.log({total});
    setCartTotalAmount(total)
    return total

}
}

// get  totalAmount and total quantity
useEffect(() => {
    getTotals()
}, [cartProducts]);

//Add panier

const handleAddPanier = async (cartItem: any, dataUser: any) => {
    let total= await getTotals();
    console.log("panier Total",total?.toFixed(2))
    await fetch("http://localhost:8080/api/panier/AddPanier", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItem: cartItem, id_user: dataUser.id, prix: total?.toFixed(2) , ModeRetrait: ModeRetrait}),
    });
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
    setCartProducts((prev: any) => {
        let updatedCart;
        if (prev) {
        updatedCart = [...prev, product];
        } else {
        updatedCart = [product];
        }

        toast.success("Product added to cart");
        localStorage.setItem("CartItem", JSON.stringify(updatedCart));
        return updatedCart;
    });
    
    const cartItems: any = localStorage.getItem("CartItem");
    const cProducts: any[] | null |undefined = JSON.parse(cartItems);
    //console.log({ cProducts });
    await handleDelPanier(dataUser);
    await handleAddPanier(cProducts,dataUser);
    },
    []);

// Increase quantity
const HandleCartQtyIncrease = useCallback(
    async (product: any, dataUser: any) => {
    console.log({ product });

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
console.log({updatedCart});

    await handleDelPanier(dataUser);
    await handleAddPanier(updatedCart, dataUser);
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
    await handleDelPanier(dataUser);
    await handleAddPanier(updatedCart, dataUser);
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
        toast.success("Product removed from cart");
        localStorage.setItem("CartItem", JSON.stringify(updatedCart));
        const cartItems: any = localStorage.getItem("CartItem");
        const cProducts: any[] | null = JSON.parse(cartItems);
        await handleDelPanier(dataUser);
        await handleAddPanier(cProducts, dataUser);
    }
    },
    [cartProducts]);

//clear Cart
const handleClearCart = useCallback(async( dataUser: any) => {
    setCartProducts(null);
    setCartTotalQty(0);
    setCartTotalAmount(0);
    localStorage.setItem("supList", JSON.stringify(null));
    localStorage.setItem("ItemList", JSON.stringify(null));
    localStorage.setItem("CartItem", JSON.stringify(null));
    await handleDelPanier(dataUser);
}, [cartProducts]);

const getData = useCallback(async () => {
    try {
        if(!logWithGoogle){

    const res = await fetch("http://localhost:8080/api/user/user", {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    const jsonData = await res.json();
    //console.log({jsonData});

    setDataUser(jsonData);
}
    } catch (e) {
    console.error("get panier error", e);
    }
}, []);

const getPanier = async (dataUser:any) => {
    if(dataUser?.error){return;}
    try {
        
    const res = await fetch(
        `http://localhost:8080/api/panier/${dataUser.id}`,
        {
        method: "GET",
        credentials: "include",
        }
    );
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    const jsonData = await res.json();
//console.log({jsonData});
    localStorage.setItem("CartItem", JSON.stringify(jsonData[0]?.cartItem));
    setDataPanier(jsonData[0]);
    } catch (e) {
    console.error("getPanier error", e);
    }
};
const getCommandes = async (dataUserId: any) => {
    try {
    const res = await fetch(
        `http://localhost:8080/api/panier/commande/${dataUserId.id}`,
        {
        method: "GET",
        credentials: "include",
        }
    );
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    //console.log({res})
    const jsonData = await res.json();
    //console.log("cc",jsonData);
    //localStorage.setItem("CartItemCommande", JSON.stringify(jsonData.cartItem));
    setDataCommande(jsonData);
    } catch (e) {
    console.error("getCommande error", e);
    }
};
const getAllCommandes = async () => {
    try {
    const res = await fetch(
        `http://localhost:8080/api/panier`,
        {
        method: "GET",
        credentials: "include",
        }
    );
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    //console.log({res})
    const jsonData = await res.json();
    //console.log("cc",jsonData);
    //localStorage.setItem("CartItemCommande", JSON.stringify(jsonData.cartItem));
    setAllCommande(jsonData);
    } catch (e) {
    console.error("getAllCommande error", e);
    }
};


const getDataCard =  async () => {
    try {
    const res = await fetch("http://localhost:8080/api/card/card", {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data : shoplist");
    }
    const jsonData = await res.json();
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
