import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/navbar"
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Auth } from "../configs/firebase";

export default function MainLayouts() {
    // untuk protecting route start
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(Auth, (user) => {
            console.log(user);
            if (!user) {
                navigate('/auth/login');
            }
        });
    }, []); // untuk protecting route end
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}