import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import PaginatedProducts from "../../../components/PaginatedProducts/PaginatedProducts.jsx";
import { GET_ALL_PRODUCTS } from "../../../graphql/query.js";
import "./productCatalog.scss";

const ProductCatalog = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  const calculatePerPage = () => {
    const width = window.innerWidth;
    
    if (width < 832) return 6;
    if (width < 1024) return 9;
    if (width < 1300) return 12;
    if (width < 1400) return 10;  
  };

  const [productsPerPage, setProductsPerPage] = useState(calculatePerPage());

  useEffect(() => {
    const handleResize = () => {
      setProductsPerPage(calculatePerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading)
    return <div className="catalog-loading">Завантаження товарів...</div>;

  if (error) return <div className="catalog-error">Помилка завантаження</div>;

  const { products = [] } = data;

  return (
    <div className="main-content">
      <div className="products-list">
        <PaginatedProducts
          products={products}
          productsPerPage={productsPerPage}
        />
      </div>
    </div>
  );
};

export default ProductCatalog;
