import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../components/ProductsContext";

export default function CheckoutPage() {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [productsInfos, setProductsInfos] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorAddress, setErrorAddress] = useState("");
  const [errorCity, setErrorCity] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    fetch("/api/products?ids=" + uniqIds.join(","))
      .then((response) => response.json())
      .then((json) => setProductsInfos(json))
      .catch((error) => console.error("Error fetching products:", error));
  }, [selectedProducts]);

  const handleCheckout = (e) => {
    e.preventDefault();

    // Reset error messages
    setErrorAddress("");
    setErrorCity("");
    setErrorName("");
    setErrorEmail("");

    // Validasi input
    let valid = true;

    if (!address) {
      setErrorAddress("Address is required.");
      valid = false;
    }
    if (!city) {
      setErrorCity("City is required.");
      valid = false;
    }
    if (!name) {
      setErrorName("Name is required.");
      valid = false;
    }
    if (!email) {
      setErrorEmail("Email is required.");
      valid = false;
    }

    if (!valid) return; // Hentikan jika ada field yang tidak valid
    // Jika semua field valid, lanjutkan dengan pengiriman form
    e.currentTarget.submit(); // Mengirimkan form secara manual

    // Lanjutkan pengiriman data ke API...
  };

  function moreOfThisProduct(id) {
    setSelectedProducts((prev) => [...prev, id]);
  }
  function lessOfThisProduct(id) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts((prev) => [
        ...prev.slice(0, pos),
        ...prev.slice(pos + 1),
      ]);
    }
  }
  let deliveryPrice = 15;

  if (selectedProducts?.length) {
    // Jika ada produk yang dipilih
    let totalProductPrice = 0; // Untuk menjumlahkan harga produk yang dipilih

    for (let id of selectedProducts) {
      const priceDelivery = productsInfos.find((p) => p._id === id)?.price || 0;
      totalProductPrice += priceDelivery; // Menjumlahkan harga
    }

    // Jika total harga produk lebih dari 0, gunakan deliveryPrice; jika tidak, set ke 0
    deliveryPrice = totalProductPrice > 0 ? deliveryPrice : 0;
  } else {
    // Jika tidak ada produk yang dipilih, set deliveryPrice dan chart ke 0
    deliveryPrice = 0;
  }

  let subtotal = 0;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const price = productsInfos.find((p) => p._id === id)?.price || 0;
      subtotal += price;
    }
  }

  const total = subtotal + deliveryPrice;

  return (
    <Layout>
      {(!productsInfos.length || !selectedProducts.length) && (
        <div className="border border-transparent font-bold text-lg p-2 mx-8 text-center">
          no products in your shopping cart
        </div>
      )}
      {productsInfos.length > 0 && selectedProducts.length > 0 ? (
        productsInfos.map((productInfo) => {
          const amount = selectedProducts.filter(
            (id) => id === productInfo._id
          ).length;
          if (amount === 0) return null;

          return (
            <div className="flex mb-5" key={productInfo._id}>
              <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                <img className="w-24" src={productInfo.picture} alt="" />
              </div>
              <div className="pl-4">
                <h3 className="font-bold text-lg">{productInfo.name}</h3>
                <p className="text-sm leading-4 text-gray-500">
                  {productInfo.description}
                </p>
                <div className="flex">
                  <div className="grow">${productInfo.price}</div>
                  <div>
                    <button
                      onClick={() => lessOfThisProduct(productInfo._id)}
                      className="border border-emerald-500 px-2 rounded-lg text-emerald-500"
                    >
                      -
                    </button>
                    <span className="px-2">
                      {
                        selectedProducts.filter((id) => id === productInfo._id)
                          .length
                      }
                    </span>
                    <button
                      onClick={() => moreOfThisProduct(productInfo._id)}
                      className="bg-emerald-500 px-2 rounded-lg text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div></div> //Suggest product jika tidak ada produk yang dipilih
      )}
      <form action="/api/checkout" method="POST" onSubmit={handleCheckout}>
        <div className="mt-8">
          <input
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="Street address, number"
          />
          {errorAddress && <p className="text-red-500">{errorAddress}</p>}

          <input
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="City and postal code"
          />
          {errorCity && <p className="text-red-500">{errorCity}</p>}

          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="Your name"
          />
          {errorName && <p className="text-red-500">{errorName}</p>}

          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="email"
            placeholder="Email address"
          />
          {errorEmail && <p className="text-red-500">{errorEmail}</p>}
        </div>

        <div className="text-center text-red-500">{errorMessage}</div>

        <div className="mt-8">
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
            <h3 className="font-bold">${subtotal}</h3>
          </div>
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Delivery:</h3>
            <h3 className="font-bold">${deliveryPrice}</h3>
          </div>
          <div className="flex my-3 border-t pt-3 border-dashed border-emerald-500">
            <h3 className="grow font-bold text-gray-400">Total:</h3>
            <h3 className="font-bold">${total}</h3>
          </div>
        </div>

        <input
          type="hidden"
          name="products"
          value={selectedProducts.join(",")}
        />

        <button
          type="submit"
          className="bg-emerald-500 px-5 py-2 rounded-xl font-bold text-white w-full my-4 shadow-emerald-300 shadow-lg"
        >
          Pay ${total}
        </button>
      </form>
    </Layout>
  );
}
