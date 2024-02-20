"use client"
import MenuCategorie from "../../components/product/MenuCategorie";

interface Iparams{
    productId?:string
}

const Menu = ({params}:{params?:Iparams}) => {
    return ( 
    <div className="flex flex-col">
    {/* <HomePhoto  data={selectedProduct}  /> */}
    <MenuCategorie  />
    <div>Menu</div>
    </div> );
}

export default Menu;