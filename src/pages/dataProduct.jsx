import { FiEdit2 } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../configs/firebase';


export default function DataProducts() {
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const products = querySnapshot.docs.map((doc, index) => ({
                    id: doc.id,
                    no: index + 1,
                    ...doc.data()
                }));
                setProductList(products);
            } catch (error) {
                console.error("fetching data:", error)
            }
        };
        fetchProducts();
    }, []);

    const handleProduct = () => {
        navigate('/auth/add');
    }
    const handleDelete=async(id)=>{
        const confirmDelete=window.confirm("Are you sure?");
        if(!confirmDelete) return;
        try {
            await deleteDoc(doc(db,"products",id));
            setProductList((prevList)=>prevList.filter((item)=>item.id !==id))
        } catch (error) {
            console.error("error:",error)
        }
    }
    return (
        <div className="overflow-x-auto">
            <div className="w-screen flex justify-end p-2">
                <button onClick={handleProduct} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl text-[14px] py-1 capitalize rounded-full bg-green-500 text-white"><MdAdd /> add product</button>
            </div>
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th className="capitalize">no</th>
                        <th className="capitalize">product name</th>
                        <th className="capitalize">category</th>
                        <th className="capitalize">price</th>
                        <th className="capitalize">stock</th>
                        <th className="capitalize">img thumb</th>
                        <th className="capitalize">img</th>
                        <th className="capitalize">description</th>
                        <th className="capitalize">status</th>
                        <th className="capitalize">action</th>
                    </tr>
                </thead>
                <tbody>
                    {productList.map((products) => (
                        <tr key={products.id}>
                            <th>{products.no}</th>
                            <td>{products.productName}</td>
                            <td>{products.categories}</td>
                            <td>{products.price}</td>
                            <td>{products.stocks}</td>
                            <td>{products.thumb}</td>
                            <td>{products.img}</td>
                            <td>{products.desc}</td>
                            <td>{products.status}</td>
                            <td>
                                <ul className="flex gap-3">
                                    <li onClick={()=>navigate(`/auth/edit`,{state:products})} className='text-md rounded-full bg-blue-500 p-2'><FiEdit2 className='text-white text-lg' /></li>
                                    <li onClick={()=>navigate(`/auth/view`,{state:products})} className='text-md rounded-full bg-yellow-500 p-2'><FaRegEye className='text-white text-lg' /></li>
                                    <li onClick={()=>handleDelete(products.id)} className='text-md rounded-full bg-red-500 p-2'><FaRegTrashAlt className='text-white text-lg' /></li>
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}