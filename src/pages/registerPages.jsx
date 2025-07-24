import logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Auth } from "../configs/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const [countryList, setCountryList] = useState([]);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState({});

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/independent?status=true")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountryList(sorted);
      })
      .catch((error) => console.error("fetching:", error));
  }, []);


async function handleRegister(e) {
  e.preventDefault();
  const newErrors = {};
    if (!email) {
    newErrors.email = "Email is required!";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Invalid email format!";
  }
     if (!password) {
    newErrors.password = "Password is required!";
  }
    if (!confirmPassword) {
    newErrors.confirmPassword = "Confirm Password is required!";
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match!";
  }

    setError(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    try {
      const userRegistered = await createUserWithEmailAndPassword(
        Auth,
        email,
        password
      );
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/");
      }, 3000);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, "-", errorMessage);
    }
  }

  return (
    <>
      {/* Alert Toast */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <div role="alert" className="alert alert-success shadow-lg">
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
            <span>Registration Success!</span>
          </div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-[#EAF6FF] p-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-4xl bg-[#F9FAFB] p-6 sm:p-10 rounded-lg shadow-md"
        >
          {/* Logo */}
          <img
            src={logo}
            alt="registerLogo"
            className="m-auto w-32 sm:w-1/5 mb-6"
          />

          {/* Email */}
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 capitalize">
              Email <span className="text-error">*</span>
            </label>
            <input
              id="email"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Input email"
              className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 ${error.email ? "border-red-500" : "border-gray-300"
                } border`}
              onBlur={() => {
                if (!email) {
                  setError((prev) => ({ ...prev, email: "Email is required!" }));
                } else if (!/\S+@\S+\.\S+/.test(email)) {
                  setError((prev) => ({ ...prev, email: "Invalid email format!" }));
                } else {
                  setError((prev) => {
                    const { email, ...rest } = prev;
                    return rest;
                  });
                }
              }}
            />

            {error.email && (
              <div className="text-red-500 text-sm mt-1">{error.email}</div>
            )}
          </div>


          {/* Password */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 capitalize">
              Password <span className="text-error">*</span>
            </label>
            <input
              id="password"
              type={showPass ? "text" : "password"}
              name="password"
              required
              minLength={6}
              maxLength={99}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Input password"
              className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 ${error.password ? "border-red-500" : "border-gray-300"
                } border`}
              onBlur={() => {
                if (!password) {
                  setError((prev) => ({ ...prev, password: "Password is required!" }));
                }else {
                  setError((prev) => {
                    const { password, ...rest } = prev;
                    return rest;
                  });
                }
              }}
            />
            {error.password && (
              <div className="text-red-500 text-sm mt-1">{error.password}</div>
            )}
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="mb-4 relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 capitalize">
              Confirm password <span className="text-error">*</span>
            </label>
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              required
              minLength={6}
              maxLength={99}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 ${error.confirmPassword ? "border-red-500" : "border-gray-300"
                } border`}
              onBlur={() => {
                if (!confirmPassword) {
                  setError((prev) => ({ ...prev, confirmPassword: "Confirm Password is required!" }));
                }else {
                  setError((prev) => {
                    const { confirmPassword, ...rest } = prev;
                    return rest;
                  });
                }
              }}
            />
            {error.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">{error.confirmPassword}</div>
            )}
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Country */}
          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-900">
              Country
            </label>
            <select
              id="country"
              name="country"
              className="mt-2 block w-full select select-bordered focus:outline-none"
            >
              {countryList.length > 0 ? (
                countryList.map((country) => (
                  <option key={country.cca3} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))
              ) : (
                <option disabled>Loading countries...</option>
              )}
            </select>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-sm font-semibold text-gray-900"
            >
              Cancel
            </button>
            <button type="submit" className="btn bg-[#6366F1] text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
