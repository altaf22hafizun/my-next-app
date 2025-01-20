import { ProductType } from "@/types/product.type";
import { fetcher } from "@/utils/swr/fetcher";
import DetailProduct from "@/views/detail product";
import { useRouter } from "next/router";
import useSWR from "swr";

const DetailProductPage = ({ product }: { product: ProductType }) => {
  const { query } = useRouter();

  // Client Side
  // const { data, error, isLoading } = useSWR(`/api/product/${query.slug}`, fetcher);

  return (
    <div>
      {/* Client Side */}
      {/* <DetailProduct product={isLoading ? [] : data.data} /> */}

      {/* Server Side */}
      <DetailProduct product={product} />

      {/* Static */}
    </div>
  );
};

export default DetailProductPage;

// Server Side
// export async function getServerSideProps({ query }: { query: { slug: string } }) {
//   // fetch data
//   const res = await fetch(`http://localhost:3000/api/product/${query.slug}`);
//   const response = await res.json();

//   return {
//     props: {
//       product: response.data,
//     },
//   };
// }

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/product");
  const response = await res.json();

  const paths = response.data.map((slug: ProductType) => ({
    params: {
      slug: slug.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

// Static
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const res = await fetch(`http://localhost:3000/api/product/${params.slug}`);
  const response = await res.json();

  return {
    props: {
      product: response.data,
    },
  };
}
