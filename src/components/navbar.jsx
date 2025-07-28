import { FaBell } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from '../assets/logo.png';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Auth } from "../configs/firebase";
import Swal from 'sweetalert2'


export default function Navbar() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [checkAuth, setCheckAuth] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const unlogin = onAuthStateChanged(Auth, (user) => {
      setIsLoggedin(!!user);
      setCheckAuth(false)
    });
    return () => unlogin();
  }, []);


  const handleLogout = async () => {
    Swal.fire({
      title: 'Confrim',
      text: 'Are you sure want to Logout?',
      icon: 'question',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await signOut(Auth);
        navigate("/");
      }
    });
  }

  return (
    <>
      <nav className="navbar w-screen bg-linear-to-t from-[#3B82F6] to-[#2563EB] flex justify-between py-3 px-10">
        <div className="logo flex items-center">
          <img src={logo} alt="logo" className="h-10 w-auto" />
        </div>
        {/* nav desktop start */}
        <ul className="menus hidden lg:flex">
          <li className="dropdown dropdown-hover">
            <button onClick={() => navigate("/")} className="btn m-1 bg-transparent text-white border-0 shadow-none capitalize">home</button>
            {/* <div
              tabIndex={0}
              role="button"
              className="btn m-1 bg-transparent text-white border-0 shadow-none capitalize"
            >
              home
            </div> */}
          </li>
          <li className="dropdown dropdown-hover">
            <button onClick={() => navigate("/auth/ProductData")} className="btn m-1 bg-transparent text-white border-0 shadow-none capitalize">product list</button>
          </li>
          <li className="dropdown dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 bg-transparent text-white border-0 shadow-none capitalize"
            >
              about us
            </div>
          </li>
          {/* <FaSearch className="text-white self-center hidden lg:flex"/> */}
        </ul>
        {/* nav desktop end */}
        {/* hamburger start */}
        <div className="others flex gap-3 aligns-center">
          {isLoggedin && (
            <>
              <FaBell className="text-white self-center hidden" />
              <FaShoppingCart className="text-white self-center hidden" />
            </>
          )}
          <FaSearch className="text-white self-center flex lg:hidden" />
          {!checkAuth && (
            isLoggedin ? (
              <button onClick={handleLogout} className="btn  btn-error hidden lg:flex capitalize text-white">logout</button>
            ) : (
              <>
                <button onClick={() => navigate("/auth/login")} className="btn   btn-primary btn-soft hidden lg:flex capitalize">login</button>
                <button onClick={() => navigate("/auth/register")} className="btn btn-outline btn-primary text-white hidden lg:flex capitalize">signup</button>
              </>
            )
          )}


          <ul className="menus flex lg:hidden">
            <li className="dropdown dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="btn px-0 m-1 bg-transparent text-white border-0 shadow-none capitalize"
              >
                <GiHamburgerMenu />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-none left-auto right-0"
              >
                <li className="collapse collapse-arrow bg-base-100">
                  <input type="radio" name="my-accordion-2" defaultChecked />
                  <button onClick={() => navigate("/")} className="btn m-1 bg-transparent text-white border-0 shadow-none capitalize">home</button>
                </li>
                <li className="collapse collapse-arrow bg-base-100">
                  <input type="radio" name="my-accordion-2" defaultChecked />
                  <button onClick={() => navigate("/auth/ProductData")} className="btn m-1 bg-transparent text-white border-0 shadow-none capitalize">product list</button>
                </li>
                <li className="collapse bg-base-100">
                  <input type="radio" name="my-accordion-2" defaultChecked />
                  <div onClick={() => navigate("/auth/ProductData")} className="collapse-title font-semibold capitalize">
                    others
                  </div>
                </li>
                <li className="collapse bg-base-100">
                  <input type="radio" name="my-accordion-2" defaultChecked />
                  <div className="collapse-title font-semibold capitalize">
                    about us
                  </div>
                </li>
                <div className="buttons flex justify-around">
                  {!checkAuth && (
                    isLoggedin ? (
                      <button onClick={handleLogout} className="btn btn-error capitalize w-full text-white">logout</button>
                    ) : (
                      <>
                        <button onClick={() => navigate("/auth/login")} className="btn  btn-primary btn-soft">login</button>
                        <button onClick={() => navigate("/auth/register")} className="btn btn-outline btn-primary text-primary">signup</button>
                      </>
                    )
                  )}
                </div>
              </ul>
            </li>
          </ul>
          {/* hamburger end */}
        </div>
      </nav >
    </>
  );
}
