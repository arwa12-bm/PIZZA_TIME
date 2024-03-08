"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { card } from "../utils/products";
import toast from "react-hot-toast";

type  CartContextType={
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
    setSelectedIdShopList:()=>any
    setSelectedIdCategirie:()=>any
    getSelectedIdShopList:(params:any)=>any
    getIdShopList:(el:any)=>any
    getIdCategorieList:(el:any)=>any
    getSelectedIdCategorieList:(params:any)=>any
    getCategorieById:(id:any)=>any
    handleAddProductToCart:(product:any)=>void
    handleClearCart:()=>void
    HandleCartQtyIncrease:(product:any)=>void
    HandleCartQtyDecrease:(product:any)=>void
    handleRemoveProductFromCart :(product:any)=>void
    getData:()=>any

    
}

export const CardContext = createContext<CartContextType| null >(null);


export const CardProvider = (props:any)=>{
    const [selectedElCategorie,setSelectedElCategorie]=useState()
    const [selectedIdShopList,setSelectedIdShopList]=useState()
    const [IdShopList,setIdShopList]=useState<string|undefined>()
    const [IdCategorieList,setIdCategorieList]=useState<string|undefined>()
    const [IdCategorieEl,setIdCategorieEl]=useState<string|undefined>()
    const [cartProducts,setCartProducts]=useState<any[] | null>(null)
    const[CategorieObject,setCategorieObject]=useState()
    const [cartTotalQty,setCartTotalQty]=useState(0)
    const [cartTotalAmount,setCartTotalAmount]=useState(0)
    const [dataUser, setDataUser] = useState(null);
    const[selectedProductId,setselectedProductId ]=useState()


//get List of item in cart
    useEffect(()=>{
        const cartItems: any = localStorage.getItem('CartItem')
        const cProducts: any[] | null = JSON.parse(cartItems)
    
        setCartProducts(cProducts)
    },[])

    // useEffect(() => {
    //     const storedProductId = localStorage.getItem("selectedProductId");
    //     const parsedProductId = storedProductId ? JSON.parse(storedProductId) : null;
    //     setselectedProductId(parsedProductId);
    // }, []);

//get  totalAmount and total quantity
    useEffect(()=>{
        
        const getTotals =()=>{
            if(cartProducts){
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
        }
        getTotals()
    },[cartProducts])

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
                setIdShopList(params.productId)
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
                setIdCategorieList(params.productId)
                localStorage.setItem("selectedCategorieId",JSON.stringify({"Id":params.productId}))
            },[selectedElCategorie]) 

// get id from object (shopList)
        const getIdShopList=useCallback((el:any)=>{
                let id:string
                for (let item of Object.keys(card.shoplist)) {
                    if (JSON.stringify((card.shoplist as any)[item]) === JSON.stringify(el)) {
                    id = item;
                    setIdShopList(id)
                    }
                }
                
            },[IdShopList])


        // const getIdCategorieList=useCallback((el:any)=>{
        //         console.log({el});
        //         let id:string
        //         for (let item of Object.keys(card.categories)) {
        //             if (JSON.stringify((card.categories as any)[item]) === JSON.stringify(el)) {
        //             setIdCategorieEl(item)
        //             console.log("id",item);
        //             }
        //         }
                
        //     },[IdCategorieList])

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

            const handleAddProductToCart = useCallback((product:any) => {
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
            }, []);
            


// Increase quantity
            const HandleCartQtyIncrease = useCallback((product:any)=>{
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
        
                localStorage.setItem('CartItem',JSON.stringify(updatedCart))
                return updatedCart ;
        
            },[cartProducts])
        
// Decrease quantity
            const  HandleCartQtyDecrease = useCallback((product:any)=>{
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
        
                localStorage.setItem('CartItem',JSON.stringify(updatedCart))
                return updatedCart ;
        
            },[cartProducts])


            const handleRemoveProductFromCart = useCallback((product:any) => {
                setCartProducts((prev:any) => {
                    // Filter out the product to be removed from the cart
                    const updatedCart = prev.filter((item:any) => item.data.id !== product.data.id 
                                                                && item.sup !== product.sup 
                                                                && item.checkedItems  !== product.checkedItems);
            
                    // Notify user and update local storage
                    toast.success("Product removed from cart");
                    localStorage.setItem('CartItem', JSON.stringify(updatedCart));
            
                    // Update the state with the new cart
                    return updatedCart;
                });
            }, [setCartProducts]);



//clear Cart
            const handleClearCart =useCallback(()=>{
                
                setCartProducts(null)
                setCartTotalQty(0)
                localStorage.setItem("supList",JSON.stringify(null))
                localStorage.setItem("ItemList",JSON.stringify(null))
                localStorage.setItem('CartItem',JSON.stringify(null))
        
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
        
        
            
    const value = { 
        selectedElCategorie,
        selectedIdShopList,
        IdShopList,
        dataUser,
        selectedProductId,
        //IdCategorieList,
        CategorieObject,
        IdCategorieEl,
        cartTotalQty ,
        cartTotalAmount,
        cartProducts,
        getCategorieById,
        getIdShopList,
        getSelectedIdShopList,
        getSelectedIdCategorieList,
        handleAddProductToCart,
        handleClearCart,
        HandleCartQtyIncrease,
        HandleCartQtyDecrease,
        handleRemoveProductFromCart,
        getData,
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