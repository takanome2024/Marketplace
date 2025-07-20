import { Outlet } from "react-router";
import Navbar from "../components/navbar"

export default function AdminLayouts(){
    return(
        <>
        <Navbar />
        <Outlet />
        </>
    )
}