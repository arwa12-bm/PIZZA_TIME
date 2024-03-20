"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { card } from "../utils/products";
import toast from "react-hot-toast";

type  CartContextType={
    selectedProductData:any,
    selectedProductId:any,
    selectedElCategorie:any,
    selectedIdShopList:any,
    IdShopList:string,
    IdCategorieList:string,
    IdCategorieEl:string,
    CategorieObject:any,
    cartTotalQty :number;
    cartTotalAmount:number;
    cartProducts:any;
    dataUser:any;
    dataPanier:any
    ModeRetrait:any;
    setSelectedIdShopList:()=>any
    setSelectedIdCategirie:()=>any
    getSelectedIdShopList:(params:any)=>any
    getIdShopList:(el:any)=>any
    getIdCategorieList:(el:any)=>any
    getSelectedIdCategorieList:(params:any)=>any
    getCategorieById:(id:any)=>any
    handleAddProductToCart:(product:any,dataUser:any)=>void
    handleClearCart:()=>void
    HandleCartQtyIncrease:(product:any,dataUser:any)=>void
    HandleCartQtyDecrease:(product:any,dataUser:any)=>void
    handleRemoveProductFromCart :(product:any)=>void
    getData:()=>any
    getCommandes:(dataUserId:any)=>any
    handleAddPanier :(cartProducts:any,dataUser:any)=>void
    handleDelPanier:(dataUser:any)=>void


    
}

export const CardContext = createContext<CartContextType| null >(null);


export const CardProvider = (props:any)=>{
    const [selectedElCategorie,setSelectedElCategorie]=useState()
    const [selectedIdShopList,setSelectedIdShopList]=useState()
    const [IdCategorieEl,setIdCategorieEl]=useState<string|undefined>()
    const [cartProducts,setCartProducts]=useState<any[] | null>(null)
    const[CategorieObject,setCategorieObject]=useState()
    const [cartTotalQty,setCartTotalQty]=useState(0)
    const [cartTotalAmount,setCartTotalAmount]=useState(0)
    const [dataUser, setDataUser] = useState(null);
    const [ModeRetrait,setModeRetrait]=useState<any[] | null >()
    const[selectedProductData,setselectedProductData ]=useState<any[] | null >()
    const[selectedProductId,setselectedProductId ]=useState<any[] | undefined >()
    const [dataPanier, setDataPanier] = useState<any | null >();

    
    

//get List of item in cart
    useEffect(()=>{
        const cartItems: any = localStorage.getItem('CartItem')
        const cProducts: any[] | null = JSON.parse(cartItems)
    
        setCartProducts(cProducts)
    },[])

    useEffect(()=>{
        const ModRetrait: any = localStorage.getItem('ModeRetrait')
        const MRetrait: any[] | null = JSON.parse(ModRetrait)
        setModeRetrait(MRetrait)
        console.log({ModeRetrait})
    },[])

    useEffect(() => {
        const storedProduct = localStorage.getItem("selectedProductData");
        const parsedProduct = storedProduct ? JSON.parse(storedProduct) : null;
        setselectedProductData(parsedProduct);
    }, []);
    
    useEffect(() => {
        const storedProductId = localStorage.getItem("selectedProductId");
        const parsedProductId = storedProductId ? JSON.parse(storedProductId) : null;
        setselectedProductId(parsedProductId);
    }, []);

//get  totalAmount and total quantity
    useEffect(()=>{
        
        const getTotals =()=>{
            if(cartProducts!==null ){
                const {total,qty} = cartProducts?.reduce((acc, item)=>{
                const itemTotal = item.data.price.default * item.quantity
                acc.total += itemTotal 
                acc.qty +=item.quantity
                return acc
            },{
                total:0,
                qty:0
            })
            setCartTotalQty(qty)
            setCartTotalAmount(total)
        }
        console.log({setCartTotalAmount});
        
        }
        getTotals()
    },[cartProducts])

//Add panier

    const handleAddPanier =useCallback(async(cartItem:any,dataUser:any)=>{
        await fetch('http://localhost:8080/api/panier/AddPanier',{
            method:"POST", 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({cartItem:cartItem,id_user:dataUser.id})
        })
    },[])

//Del panier
    const handleDelPanier =useCallback(async(dataUser:any)=>{
        await fetch(`http://localhost:8080/api/panier/${dataUser.id}`,{
            method:"DELETE", 
        })
    },[])


//get id and product from params (shoplist)
    const getSelectedIdShopList=useCallback((params:any)=>{
                for (let item in Object.keys(card.shoplist)) {
                    let  selectedProduct:any
                    if (JSON.stringify((Object.keys(card.shoplist)as any)[item]) === JSON.stringify(params.productId) ) {
                        selectedProduct  =  Object.values(card.shoplist as any)[item]
                        setSelectedIdShopList(selectedProduct)
                        localStorage.setItem("selectedProductData",JSON.stringify(selectedProduct))
                    }
                }
                localStorage.setItem("selectedProductId",JSON.stringify({"Id":params.productId}))
            },[selectedIdShopList]) 

//get id and product from params (categorielist)
    const getSelectedIdCategorieList=useCallback((params:any)=>{
                for (let item in Object.keys(card.categories)) {
                    let  selectedCategorie:any
                    if (JSON.stringify((Object.keys(card.categories)as any)[item]) === JSON.stringify(params?.productId) ) {
                        selectedCategorie  =  Object.values(card.categories as any)[item]
                        setSelectedElCategorie(selectedCategorie)
                        localStorage.setItem("selectedCategorieData",JSON.stringify(selectedCategorie))
                    }
                }
                localStorage.setItem("selectedCategorieId",JSON.stringify({"Id":params.productId}))
            },[selectedElCategorie]) 



//getObject from Id
            const getCategorieById=useCallback((id:any)=>{
                let el:any
                for (let item of Object.keys(card.categories)) {
                    if (item === id) {
                    el = (card.categories as any)[item];
                    setCategorieObject(el)
                    }
                }
                
            },[CategorieObject])

//add product to cart

            const handleAddProductToCart = useCallback(async(product:any,dataUser:any) => {
                setCartProducts((prev:any) => {
            
                    let updatedCart;
                    if (prev) {
                        updatedCart = [...prev, product];
                    }else{
                        updatedCart= [product]
                    }
            
                    toast.success("Product added to cart");
                    localStorage.setItem('CartItem', JSON.stringify(updatedCart));
                    return updatedCart;
                });
                const cartItems: any = localStorage.getItem('CartItem')
                const cProducts: any[] | null = JSON.parse(cartItems)
                console.log({cProducts});
                await handleDelPanier (dataUser)
                await handleAddPanier (cProducts,dataUser)
            }, []);
            


// Increase quantity
            const HandleCartQtyIncrease = useCallback(async(product:any,dataUser:any)=>{
                console.log({product});
                

                let updatedCart;
        
                if(product.quantity===99){
                    return toast.error("Ooop! Maximum reached")
                }
        
                if(cartProducts){
                    updatedCart  = [...cartProducts]
                
                    const Existingindex =cartProducts.findIndex((item)=> item.data.id === product.data.id 
                                                                    && item.sup === product.sup 
                                                                    && item.checkedItems=== product.checkedItems)
                    if(Existingindex > -1 ){
                        updatedCart[Existingindex].quantity = ++updatedCart[Existingindex].quantity
                    }
                    setCartProducts(updatedCart)
                }
        
                await handleDelPanier (dataUser)
                await handleAddPanier (updatedCart,dataUser)
                localStorage.setItem('CartItem',JSON.stringify(updatedCart))
                return updatedCart ;
        
            },[cartProducts])
        
// Decrease quantity
            const  HandleCartQtyDecrease = useCallback(async(product:any,dataUser:any)=>{
                let updatedCart;
                console.log({product});
                
                if(product.quantity=== 1){
                    return toast.error("Ooop! Manimum reached")
                }
        
                if(cartProducts){
                    
                    updatedCart  = [...cartProducts]
                    const Existingindex =cartProducts.findIndex((item)=> item.data.id === product.data.id)
                    if(Existingindex > -1 ){
                        updatedCart[Existingindex].quantity = --updatedCart[Existingindex].quantity
                    }
                    setCartProducts(updatedCart)
                }
                await handleDelPanier (dataUser)
                await handleAddPanier (updatedCart,dataUser)
                localStorage.setItem('CartItem',JSON.stringify(updatedCart))
                return updatedCart ;
        
            },[cartProducts])


            const handleRemoveProductFromCart = useCallback((product:any) => {
                if(cartProducts){
                    // Filter out the product to be removed from the cart
                    const updatedCart = cartProducts.filter((item:any) => item !== product );
                    setCartProducts(updatedCart)
                    // Notify user and update local storage
                    toast.success("Product removed from cart");
                    localStorage.setItem('CartItem', JSON.stringify(updatedCart))
                };
            }, [cartProducts]);



//clear Cart
            const handleClearCart =useCallback(()=>{
                
                setCartProducts(null)
                setCartTotalQty(0)
                setCartTotalAmount(0)
                localStorage.setItem("supList",JSON.stringify(null))
                localStorage.setItem("ItemList",JSON.stringify(null))
                localStorage.removeItem('CartItem')
        
            },[cartProducts])


            const getData =useCallback(async()=>{
                try {
                    const res = await fetch('http://localhost:8080/api/user/user',{
                        method:"GET", 
                        credentials:"include",
                    });        
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                        }
                    const jsonData = await res.json();
                    //console.log({jsonData});
                        
                    setDataUser( jsonData );
                } catch (e) {
                    console.error('Login error', e);
                    }
            },[])



            const getCommandes = async(dataUserId:any)=>{
                try {
                    console.log({dataUser});
                    const res = await fetch(`http://localhost:8080/api/panier/${dataUserId}`,{
                        method:"GET", 
                        credentials:"include",
                    });        
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                        }
                    const jsonData = await res.json();
                    //console.log({jsonData});
                    localStorage.setItem('CartItem', JSON.stringify(jsonData.cartItem ))
                    setDataPanier( jsonData );
                } catch (e) {
                    console.error('Login error', e);
                    }
            }
            
        
        
        
            
    const value = { 
        selectedElCategorie,
        selectedIdShopList,
        dataUser,
        dataPanier,
        selectedProductData,
        selectedProductId,
        CategorieObject,
        IdCategorieEl,
        cartTotalQty ,
        cartTotalAmount,
        cartProducts,
        ModeRetrait,
        getCategorieById,
        getSelectedIdShopList,
        getSelectedIdCategorieList,
        handleAddProductToCart,
        handleClearCart,
        HandleCartQtyIncrease,
        HandleCartQtyDecrease,
        handleRemoveProductFromCart,
        handleAddPanier ,
        handleDelPanier,
        getData,
        getCommandes,
    
        };
    return <CardContext.Provider  value={value}  {...props} />
}


const useCard = () => {
    const context =useContext(CardContext);

    if(context === null ){
        throw new Error("useCard must used within a CardContextProvider")
    }
    return context
}

export default useCard ;