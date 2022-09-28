import { FunctionComponent, useEffect, useState } from "react";
import { Product } from "../interfaces/Product";
import { getAllProducts, deleteProduct } from "../services/productsService";
import { getIsAdmin } from "../services/usersService";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { addToUserCart } from "../services/cartsService";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    getAllProducts()
      .then((result) => setProducts(result.data))
      .catch((error) => console.log(error));
  }, [isChanged]);

  const handleDelete = (product: Product) => {
    if (window.confirm(`Are your sure you want to delete ${product.name}?`))
      deleteProduct(product._id as string)
        .then(() => {
          setIsChanged(!isChanged);
          successMsg("Product deleted successfully");
        })
        .catch((err) => errorMsg(err));
  };

  const handleAddToCart = (product: Product) => {
    product.quantity = 1;
    addToUserCart(product)
      .then(() => {
        successMsg("Product was added to cart");
      })
      .catch((err) => errorMsg(err));
  };

  return (
    <>
      <Navbar />
      <h3 className="display-5 text-center">PRODUCTS</h3>
      {getIsAdmin() ? (
        <Link className="btn btn-success" to="add">
          <i className="fa-solid fa-plus"></i> Add Product
        </Link>
      ) : null}
      <div className="row">
        {products.length ? (
          products.map((product: Product) => (
            <div
              className="card col-md-3 m-1"
              key={product._id}
              style={{ width: "18rem" }}
            >
              <img src={product.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h6 className="text-secondary">{product.category}</h6>
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="text-success">{product.price}₪</p>
                <a
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-primary"
                >
                  <i className="fa-solid fa-cart-plus"></i> Add to Cart
                </a>
                {getIsAdmin() ? (
                  <>
                    <Link
                      to={`edit/${product._id}`}
                      className="btn btn-warning mx-1"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <a
                      onClick={() => handleDelete(product)}
                      className="btn btn-danger mx-1"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </a>
                  </>
                ) : null}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products in store </p>
        )}
      </div>
    </>
  );
};

export default Products;
