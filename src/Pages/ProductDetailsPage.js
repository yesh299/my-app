import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  console.log("Product ID:", id);
  return <p>This is a Product details page</p>;
};

export default ProductDetailsPage;
