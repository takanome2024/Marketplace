import { collection, addDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";

export default function HomePage() {
    // const products = [
    //     {
    //         id: 1,
    //         name: "Stationary",
    //         href: "#",
    //         price: "$48",
    //         imageSrc:
    //             "https://img.brdu.pw/img/300/bq15x7szbq42fpbqc2_1/CvDwu6knbFQpL1fCvD6aMnW5ElUazfR3KBLSXzA3x4uQ.webp",
    //         imageAlt:
    //             "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    //     },
    //     {
    //         id: 2,
    //         name: "Desktop & Organizer",
    //         href: "#",
    //         price: "$35",
    //         imageSrc:
    //             "https://img.brdu.pw/img/300/bq15x7szbq42fpbqc2_1/CxMSufXa7ayRLdZCxMtcvMUI86mw2S5W9GD7ju6IbDQ.webp",
    //         imageAlt:
    //             "Olive drab green insulated bottle with flared screw lid and flat top.",
    //     },
    //     {
    //         id: 3,
    //         name: "Paper",
    //         href: "#",
    //         price: "$89",
    //         imageSrc:
    //             "https://imgx.brdcdn.com/imgx/300/aW1hZ2VzLnRva29wZWRpYS5uZXQvaW1nL2NhY2hlLzcwMC9oRGpta1EvMjAyMi81LzE0LzgwOWQ0ZmQ0LTVkM2MtNGMwNC04NTQ3LWM3MjZhNzJmNjdkYg==.jpg",
    //         imageAlt:
    //             "Person using a pen to cross a task off a productivity paper card.",
    //     },
    //     {
    //         id: 4,
    //         name: "Office Tecno",
    //         href: "#",
    //         price: "$35",
    //         imageSrc:
    //             "https://imgx.brdcdn.com/imgx/300/aW1hZ2VzLnRva29wZWRpYS5uZXQvaW1nL2NhY2hlLzcwMC9WcWJjbU0vMjAyMi84LzUvMjdkZGQ5ZjktMTFmMy00NjQyLWE4YmQtNjdhNjRkMDJhMzRl.jpg",
    //         imageAlt:
    //             "Hand holding black machined steel mechanical pencil with brass tip and top.",
    //     },
    //     {
    //         id: 5,
    //         name: "White Board",
    //         href: "#",
    //         price: "$64",
    //         imageSrc:
    //             "https://imgx.brdcdn.com/imgx/300/aW1hZ2VzLnRva29wZWRpYS5uZXQvaW1nL2NhY2hlLzcwMC9WcWJjbU0vMjAyMi8yLzIyL2NmMjUwNzQ3LTE1ODctNGZhMC04NDg3LWQ2NmQ3Yjk3ZmE2ZQ==.jpg",
    //         imageAlt: "Paper card sitting upright in walnut card holder on desk.",
    //     },
    //     {
    //         id: 6,
    //         name: "Office Equipment",
    //         href: "#",
    //         price: "$39",
    //         imageSrc:
    //             "https://img.brdu.pw/img/300/bq15x7szbq42fpbqc2_1/Cq9iwm8FB7ztiWOCq9zADe0zBTFPjSJixaU811h58w.webp",
    //         imageAlt:
    //             "Stack of 3 small drab green cardboard paper card refill boxes with white text.",
    //     },
    //     {
    //         id: 7,
    //         name: "Battery",
    //         href: "#",
    //         price: "$50",
    //         imageSrc:
    //             "https://imgx.brdcdn.com/imgx/300/aW1hZ2VzLnRva29wZWRpYS5uZXQvaW1nL2NhY2hlLzcwMC9wcm9kdWN0LTEvMjAxNi84LzI3LzUxNDg5MjcvNTE0ODkyN183ODViZDYwNC0yMzgxLTQ5NDYtYTk3ZC1iZDg0ZDk0NTViODM=.jpg",
    //         imageAlt:
    //             "Brass scissors with geometric design, black steel finger holes, and included upright brass stand.",
    //     },
    // ];
    const callouts = [
        {
            name: "Cutter: Jenis, Fungsi & Rekomendasinya",
            description: "Cutter: Jenis, Fungsi & Rekomendasinya",
            imageSrc:
                "https://bangkitperkasa.com/storage/2025/07/fungsi-dan-jenis-cutter-BPS.webp",
            imageAlt:
                "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
            href: "#",
        },
        {
            name: "Persiapan Toko Grosir ATK Menyambut Tahun Ajaran Baru 2025/2026",
            description: "Persiapan Toko Grosir ATK Menyambut Tahun Ajaran Baru 2025/2026",
            imageSrc:
                "https://bangkitperkasa.com/storage/2025/07/persiapan-toko-grosir-ATK-2025-BPS.webp",
            imageAlt:
                "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
            href: "#",
        },
        {
            name: "10+ Jenis Amplop dan Rekomendasinya yang Umum Digunakan",
            description: "10+ Jenis Amplop dan Rekomendasinya yang Umum Digunakan",
            imageSrc:
                "https://bangkitperkasa.com/storage/2025/07/jenis-amplop-BPS.webp",
            imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
            href: "#",
        },
    ];
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const data = querySnapshot.docs.map((doc) => ({
                    id:doc.id,
                    ...doc.data(),
                }))
                setProducts(data);
            } catch (error) {
                console.error("fetching product:", error)
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <div className="bg-[#EAF6FF]">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 capitalize mb-5">
                        our products
                    </h2>
                    <div className="card grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <a key={product.id} href="#" className="group  shadow-sm p-2">
                                <figure>
                                    <img alt={product.imageAlt} src={`${product.thumb}`} className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-center m-auto">{product.productName}</h2>
                                    <p className="text-center text-gray-500">Rp {product.price}</p>
                                    <div className="card-actions justify-center">
                                        <button className="btn btn-primary capitalize">view more</button>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                        <h2 className="text-2xl font-bold text-gray-900">News</h2>
                        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-6">
                            {callouts.map((callout) => (
                                <div key={callout.name} className="group relative">
                                    <img
                                        alt={callout.imageAlt}
                                        src={callout.imageSrc}
                                        className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-2/1 lg:aspect-square"
                                    />
                                    <h3 className="mt-6 text-sm text-gray-500">
                                        <a href={callout.href}>
                                            <span className="absolute inset-0" />
                                            {callout.name}
                                        </a>
                                    </h3>
                                    <p className="text-base font-semibold text-gray-900">
                                        {callout.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
