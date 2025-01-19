import { useRouter } from "next/router"

const DetailProductPage = () => {
    const {query} = useRouter()
    
    return (
        <div>
            <h1>Detail Product</h1>
            <p>Product : {query.slug}</p>
        </div>
    )
}

export default DetailProductPage