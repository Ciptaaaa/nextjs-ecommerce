// import { useEffect, useState } from "react";
// import Product from "../components/Product";
// import { initMongoose } from "../lib/mongoose";
// import { findAllProducts } from "./api/products";
// import Footer from "../components/Footer";
// import Layout from "../components/Layout";
// export default function Home({ products }) {

export default function Home() {
  // DEFAULT CODINGAN UNTUK MENCARI DAN CHECKOUT BARANG
  // const [phrase, setPhrase] = useState("");
  // const categoriesNames = [...new Set(products.map((p) => p.category))];
  // if (phrase) {
  //   products = products.filter((p) => p.name.toLowerCase().includes(phrase));
  // }
  return (
    //   <Layout>
    //     <input
    //       value={phrase}
    //       onChange={(e) => setPhrase(e.target.value)}
    //       type="text"
    //       placeholder="Search for products..."
    //       className="bg-gray-200 w-full py-2 px-4 rounded-xl"
    //     />
    //     <div>
    //       {categoriesNames.map((categoryName) => (
    //         <div key={categoryName}>
    //           {products.find((p) => p.category === categoryName) && (
    //             <div>
    //               <h2 className="text-2xl py-5 capitalize">{categoryName}</h2>
    //               <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
    //                 {products
    //                   .filter((p) => p.category === categoryName)
    //                   .map((productInfo) => (
    //                     <div key={productInfo._id} className="px-5 snap-start">
    //                       <Product {...productInfo} />
    //                     </div>
    //                   ))}
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       ))}
    //     </div>
    //     <h1>hiiii</h1>
    //   </Layout>
    //CODINGAN BARUUUUU

    <div className="p-5">
      <div>
        <h2 className="text-2xl">Mobiles</h2>
        <div className="py-4">
          <div className="w-64">
            <div className="bg-blue-100 p-5 rounded-xl">
              <img src="/products/iphone.png" alt="" />
            </div>
            <div className="mt-2">
              <h3 className="font-bold text-lg">Iphone 15 pro max</h3>
            </div>
            <p className="text-sm mt-1 loading-4">
              lorem ipsum sit dolor amet lorem ipsum sit dolor ametlorem ipsum
              sit dolor amet{" "}
            </p>
            <div className="flex mt-1 ">
              <div className="text-2xl font-bold grow ">$999 </div>
              <button className="bg-emerald-400 text-white py-1 px-3 rounded-xl font-bold">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   await initMongoose();
//   const products = await findAllProducts();
//   return {
//     props: {
//       products: JSON.parse(JSON.stringify(products)),
//     },
//   };
// }
