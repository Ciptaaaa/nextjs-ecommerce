// import Layout from "../components/Layout";
import Link from "next/link";
import { json } from "micro";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import { initMongoose } from "../lib/mongoose";
import { findAllProducts } from "./api/products";
import Footer from "../components/Footer";
import { useContext } from "react";
import { ProductsContext } from "../components/ProductsContext";
import { useRouter } from "next/router";

export default function Home({ products }) {
  const [phrase, setPhrase] = useState("");

  const categoriesNames = [...new Set(products.map((p) => p.category))];

  if (phrase) {
    products = products.filter((p) => p.name.toLowerCase().includes(phrase));
  }
  const { selectedProducts } = useContext(ProductsContext);
  const router = useRouter();
  const path = router.pathname;

  return (
    //Mapping data for categories
    <div className="p-5">
      <div className="flex items-center p-1">
        <a href="#home">
          <img
            className="flex h-19 w-17 bg-cover bg-center"
            alt="Takipedia_Logo"
            src="/logo/Takipediaa.png"
          />
        </a>

        <div className="flex items-center ml-4 flex-grow">
          <div className="relative w-full">
            <span>
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                type="text"
                placeholder="Search the product..."
                className="w-full border border-gray-300 rounded-lg py-3 px-9 pl-10"
              />
            </span>
          </div>
        </div>

        <Link href={"/checkout"}>
          <a
            className={
              (path === "./checkout" ? "text-emerald-500" : "") +
              " flex justify-center items-center flex-col"
            }
          >
            <span className="flex justify-center relative px-0 px-3 pr-6 border border border-transparent">
              {selectedProducts.length > 0 && (
                <div className="absolute left-8">
                  <p className="flex h-1 w-1 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                    {selectedProducts.length}
                  </p>
                </div>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mt-2 flex-none-14 w-8 h-8 pl-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </span>
          </a>
        </Link>

        <div className="hidden md:flex justify-center text-center items-center">
          {" "}
          {/* Menyembunyikan pada layar kecil */}
          <button className="border border-emerald-500 font-bold text-md rounded-lg px-3 pr-3 mx-1 flex items-center justify-center py-1 text-emerald-500">
            Masuk
          </button>
          <button className="bg-emerald-500 px-3 pl-3 mx-1 font-bold text-md rounded-lg flex items-center justify-center py-1 text-white">
            Daftar
          </button>
        </div>
      </div>

      <div>
        {categoriesNames.map((categoryName) => (
          <div key={categoryName}>
            {products.find((p) => p.category === categoryName) && (
              <div>
                <h2 className="text-2xl py-5 capitalize ">{categoryName}</h2>
                <div className="flex -mx-5 overflow-x-auto snap-x scrollbar-hide">
                  {products
                    .filter((p) => p.category === categoryName)
                    .map((productInfo) => (
                      <div key={productInfo._id} className="px-5 snap-start">
                        <Product {...productInfo} />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
