import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/services/firebase/firebaseConfig";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-['Montserrat']">
        Loading products...
      </div>
    );
  }

  return (
    <section className="bg-white min-h-screen py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14">
          <p className="font-['Montserrat'] text-[#B76E79] uppercase tracking-[4px] text-[14px] font-semibold">
            Beauty Products
          </p>

          <h1 className="font-['Playfair_Display'] text-[42px] md:text-[56px] text-[#1A1A1A] mt-3">
            Our <span className="text-[#B76E79]">Shop</span>
          </h1>

          <p className="font-['Montserrat'] text-[#9CA3AF] max-w-[600px] mx-auto mt-4">
            Explore premium beauty products selected for luxury self-care and salon-quality results.
          </p>
        </div>

        {products.length === 0 ? (
          <p className="text-center font-['Montserrat'] text-[#9CA3AF]">
            No products available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-[24px] shadow-[0_8px_20px_rgba(0,0,0,0.08)] p-6 text-center hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-full h-[280px] rounded-[20px] bg-[#F9E4E0] flex items-center justify-center overflow-hidden">
                  <img
                    src={product.imageURL || product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>

                <h3 className="font-['Playfair_Display'] text-[24px] text-[#1A1A1A] mt-6">
                  {product.name}
                </h3>

                <p className="font-['Montserrat'] text-[#9CA3AF] text-[14px] mt-2 line-clamp-2">
                  {product.description}
                </p>

                <p className="font-['Montserrat'] text-[#D4AF37] text-[22px] font-bold mt-4">
                  CHF {product.price}
                </p>

                <button className="mt-6 border border-[#1A1A1A] text-[#1A1A1A] px-7 py-3 rounded-full font-['Montserrat'] text-[14px] font-semibold hover:bg-[#1A1A1A] hover:text-white transition-all duration-300">
                  ADD TO CART
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopPage;