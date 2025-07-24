import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/navbar"
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Auth } from "../configs/firebase";
import Loading from "../components/loading";

export default function AdminLayouts() {
    // untuk protecting route start
    const navigate = useNavigate();
    const [isLoading,setIsLoading]=useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(Auth, (user) => {
            console.log(user);
            if (user) {
                navigate('/');
            }else{
                setIsLoading(false);
            }
        });
        return()=>unsubscribe();
    }, []); // untuk protecting route end

    return (
        <>
            <Navbar />
            <div>
                {isLoading?
                <Loading />:
                <Outlet />
                }
            </div>
        </>
    )
}