import { useRouter } from "next/router";
import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";

export default function Footer() {
  const router = useRouter();
  const path = router.pathname;

  const handleHomeClick = () => {
    // Scroll ke atas dengan animasi
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Animasi scroll
    });

    // Mengarahkan ke halaman utama setelah scroll
    setTimeout(() => {
      router.push("/");
    }, 500); // Sesuaikan waktu dengan durasi animasi scroll
  };

  return (
    <footer className="sticky bottom-0 bg-transparent p-5 w-full flex border-gray-200 justify-center space-x-12 text-gray-400">
      <div
        onClick={handleHomeClick}
        className={
          (path === "/" ? "text-emerald-500 font-bold" : "") +
          " flex justify-center items-center flex-col cursor-pointer"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-9 h-9 text-emerald-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <span>Home</span>
      </div>
    </footer>
  );
}
