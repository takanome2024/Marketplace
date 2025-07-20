import logo from '../assets/logo.png';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '../configs/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed]=useState(false);
    // const [isLoggedin, setIsLoggedin] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(Auth, email, password);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate("/");
            }, 2000);
        } catch (error) {
            console.error(error.message)
            setShowFailed(true);
            setTimeout(()=>{
                setShowFailed(false);
            },2000);
        }
    }

    // useEffect(() => {
    //     const unlogin = onAuthStateChanged(Auth, (user) => {
    //         console.log("Auth state:", user);
    //         setIsLoggedin(!!user);
    //         setCheckAuth(false)
    //     });
    //     return () => unlogin();
    // }, []);

    return (
        <>
            {/* Alert Toast */}
            {
                showFailed && (
                    <div role="alert" className="alert alert-error text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Login Failed!</span>
                    </div>
                )
            }
            {
                showSuccess && (
                    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
                        <div role="alert" className="alert alert-success shadow-lg text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>Login Success!</span>
                        </div>
                    </div>
                )
            }
            <div className="min-h-screen flex items-center justify-center bg-[#EAF6FF] px-4">
                <div className="w-full max-w-md bg-[#F9FAFB] p-8 sm:p-10 rounded-lg shadow-md">
                    <div className="flex flex-col items-center">
                        <img src={logo} alt="loginLogo" className="h-10 mb-4" />
                        <h2 className="text-center text-2xl font-bold text-gray-900">Welcome back!</h2>
                    </div>

                    <form onSubmit={handleLogin} action="#" method="POST" className="mt-8 space-y-6 w-full">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900 capitalize">email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Input email"
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Input Password"
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                            />
                            <div className="text-right mt-1">
                                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                className="w-full bg-[#6366F1] text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <button onClick={() => navigate("/auth/register")} className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign up here
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
}
