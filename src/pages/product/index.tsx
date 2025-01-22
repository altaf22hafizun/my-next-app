import { fetcher } from "@/utils/swr/fetcher";
import ProductView from "@/views/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const ProductPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  // const [products, setProduct] = useState([]);

  const { push } = useRouter();
  useEffect(() => {
    if (!isLogin) {
      push("/auth/login");
    }
  }, []);

  // Contoh penggunaan server-side rendering : mengambil data dari api dari sisi server menggunakan swr
  
  // // Contoh penggunaan client-side rendering : mengambil data dari api dari sisi client menggunakan fetch
  const { data, error, isLoading } = useSWR("api/product", fetcher);
  // useEffect(() => {
  //   fetch("api/product")
  //     .then((res) => res.json())
  //     .then((response) => setProduct(response.data));
  // }, []);

  return (
    <div>
      <title>Product</title>
      <ProductView products={isLoading ? [] : data.data} />
    </div>
  );
};

export default ProductPage;
