import { FunctionComponent, useEffect, useState } from "react";
import { Product } from "../interfaces/Product";
import { getUserCart } from "../services/cartsService";
import Navbar from "./Navbar";

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    getUserCart()
      .then((result) => {
        setCart(result.data);
        console.log(cart);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      {cart.length ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product: Product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products in cart</p>
      )}
    </>
  );
};

export default Cart;
