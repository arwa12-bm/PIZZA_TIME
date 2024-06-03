import { Fade } from "react-awesome-reveal";
import useCard from "../hooks/useCard";
import Items from "./Items";
import { useEffect } from "react";


interface ListItemProps{
    plat:boolean
    categorie:boolean
    shop:boolean
    user:boolean
}
const ListItem:React.FC<ListItemProps> = ({plat, categorie,shop,user}) => {
    const {card,getDataCard,dataUser,getAllUser,AllUser}=useCard()
    useEffect(()=>{
        if (dataUser.role === "admin"){
            getAllUser()
        }
    },[])
    
    // {AllUser && console.log(AllUser)}
    //console.log(card.items)
    const DeleteShop = async (id: any) => {
        const url = `http://localhost:8080/api/shoplist/${id}`;
        const requestOptions:any = {
            method: 'DELETE',
        };
        fetch(url, requestOptions)
            .then(response => {
            // Handle response
            console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    getDataCard()

    };
    const DeleteCategorie = async (id: any) => {
        const url = `http://localhost:8080/api/categories/${id}`;
        const requestOptions:any = {
            method: 'DELETE',
        };
        fetch(url, requestOptions)
            .then(response => {
            // Handle response
            console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    getDataCard()

    };
    const DeleteItem = async (id: any) => {
        const url = `http://localhost:8080/api/items/${id}`;
        const requestOptions:any = {
            method: 'DELETE',
        };
        fetch(url, requestOptions)
            .then(response => {
            // Handle response
            console.log(response)

            })
            .catch(error => {
                console.log(error)
            });
            getDataCard()
    };
    const DeleteUser = async (id: any) => {
        const url = `http://localhost:8080/api/user/${id}`;
        const requestOptions:any = {
            method: 'DELETE',
        };
        fetch(url, requestOptions)
            .then(response => {
            // Handle response
            getAllUser()
            console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    };

    return ( 
        <div className="col-span-1 w-[60%] justify-self-end  ">  
        <Fade
        direction={"up"}
        delay={800}
        cascade
        damping={1e-1}
        triggerOnce={true}
        >
        <div className=" relative justify-content border-[1.2px]  border-slate-400 bg-slate-800   text-white shadow-md  rounded-t-xl ml-4 mr-4 mt-4 ">
        <div className="grid flex-row p-2 justify-between ">
            <div className="flex gap-1 ">
                {plat && <p className="">Liste de plat</p>}
                {categorie && <p className="">Liste de categorie</p>}
                {shop && <p className="">Liste de boutique</p>}
                {user && <p className="">Liste d'utilisateur</p>}


            </div>
        </div>
        </div>
        </Fade>
        <Fade
        direction={"up"}
        delay={800}
        cascade
        damping={1e-1}
        triggerOnce={true}
        >
        <div className=" relative justify-content border-b-[1.2px]  border-l-[1.2px] border-r-[1.2px] border-slate-400 bg-white  shadow-md  rounded-b-xl ml-4 mr-4 mb-4">
        <div className="grid flex-row p-2 justify-between ">
        { card && plat && card.items.map((item: any, i:any) => {
                return (
                <div key={i}>
                    <Items item={item} onDelete={DeleteItem} plat={plat}  categorie={categorie} shop={shop} user={user}/>
                </div>
                );
            })}
        { card && categorie && card.categories.map((item: any, i:any) => {
                return (
                <div key={i}>
                    <Items item={item}  onDelete={DeleteCategorie}  plat={plat} categorie={categorie} shop={shop} user={user}/>
                </div>
                );
            })}
        { card && shop && card.shoplist.map((item: any, i:any) => {
            return (
            <div key={i}>
                <Items item={item}  onDelete={DeleteShop}  plat={plat} categorie={categorie} shop={shop} user={user} />
            </div>
            );
            })}
            { AllUser && user && AllUser.map((item: any, i:any) => {
            return (
            <div key={i}>
                <Items item={item}  onDelete={DeleteUser}  plat={plat} categorie={categorie} shop={shop} user={user} />
            </div>
            );
            })}
        </div>
        </div>
    </Fade>
    </div>
    );
}

export default ListItem;