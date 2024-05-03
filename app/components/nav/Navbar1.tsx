"use client";
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Signindialog from './Signindialog';
import Image from 'next/image';
import CartCount from './CartCount';
import useCard from '@/app/hooks/useCard';
import { MdMenu } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useSnapshot } from "valtio";
import { setIsValidation ,store} from "@/app/hooks/store";



interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
}

const navigation: NavigationItem[] = [
    { name: 'Accueil', href: '#home-section', current: false },
    { name: 'Nos magasin', href: '#about-section', current: false },
    { name: 'Nos galerie', href: '#gallery-section', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {

    const {isValidation}=useSnapshot(store)
    const {logWithGoogle,dataUser} = useCard()
    const [isOpen, setIsOpen] = React.useState(false);
    const router = useRouter()

    return (
        <Disclosure as="nav" className="navbar ">
            <>
                <div className="mx-auto max-w-7xl p-3 md:p-6 lg:px-8">
                    <div className="relative flex h-10 sm:h-15 items-center">
                        <div className="flex flex-1 items-center sm:justify-between">

                            {/* LOGO */}

                            <div className="flex sm:hidden flex-shrink-0 items-center border-right cursor-pointer" onClick={()=>router.push("/")}>

                                <Image src="/logo.png" alt="logo" width={36} height={36} />
                            </div>
                            <div className="hidden sm:flex flex-shrink-0 items-center border-right cursor-pointer" onClick={()=>router.push("/")}>
                                <Image src="/logo.png" alt="logo" width={120} height={120} />
                            </div>

                            {/* LINKS */}

                            <div className="hidden lg:flex items-center border-right ">
                                <div className="flex justify-end space-x-4">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-black' : 'navlinks hover:opacity-100',
                                                'px-3 py-4 rounded-md text-lg font-normal opacity-50 hover:text-black space-links'
                                            )}
                                            aria-current={item.href ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>

                            </div>
                        <div className='flex items-center pt-4' onClick={()=>setIsValidation(!isValidation)}>
                        <CartCount  />
                        </div>
                        {/* <button className='flex justify-end text-xl font-medium bg-bgpink text-pink py-4 px-4 lg:px-8 navbutton rounded-full hover:text-black'>Sign in</button> */}
                        <div>
                        {!dataUser?.error || logWithGoogle ? 
                        ""
                        : 
                            <Signindialog />
                        }
                        </div>
                        </div>

                        {/* DRAWER FOR MOBILE VIEW */}

                        {/* DRAWER ICON */}
                        {!dataUser?.error || logWithGoogle ? <>

                        <div className='' onClick={() => setIsOpen(true)}>
                                <MdMenu
                        size={50}
                        className="text-slate-400 mt-2   border-rounded  cursor-pointer rounded-md  "
                            />
                        </div>

                        {/* DRAWER LINKS DATA */}

                        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                            <Drawerdata />
                        </Drawer>

                        

                        </>


                        : "" }

                    </div>
                </div>
            </>
        </Disclosure>
    )
}

export default Navbar;
