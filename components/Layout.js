import Footer from "./Footer";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";

export default function Layout({ children }) {
  const { setSelectedProducts } = useContext(ProductsContext);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log(window.location.href); // Log URL

    // Memeriksa URL saat komponen dimuat
    if (window.location.href.includes("success")) {
      setSelectedProducts([]);
      setSuccess(true);

      // Menghapus pesan setelah 5 detik (5000 ms)
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);

      return () => clearTimeout(timer); // Cleanup timer saat unmount
    }
  }, [setSelectedProducts]); // Menambahkan setSelectedProducts sebagai dependency

  return (
    <div>
      <div className="p-5">
        {success && (
          <div className="mb-5 bg-green-400 text-white text-lg p-5 rounded-xl">
            Thanks for your order!
          </div>
        )}
        {children}
      </div>
      <Footer />
    </div>
  );
}
