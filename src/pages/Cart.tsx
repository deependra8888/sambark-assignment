import { useContext } from "react";

import { CartContext } from "../context/CartContext";

function Cart() {
  const context = useContext(CartContext);

  if (!context) return null;

  const total = context.cart.reduce(
    (acc, item) => acc + item.price,
    0,
  );

  return (
    <div className="container">
      <h1 className="page-title">Cart</h1>

      <div className="cart-info">
        <h3>Total Items: {context.cart.length}</h3>

        <h3>Total Price: ₹ {total}</h3>
      </div>

      {context.cart.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <div className="grid">
          {context.cart.map((item, index) => (
            <div
              className="card"
              key={`${item.id}-${index}`}
            >
              <img
                src={item.images?.[0]}
                alt={item.title}
              />

              <div className="card-content">
                <h3>{item.title}</h3>

                <p>₹ {item.price}</p>

                <button
                  onClick={() => {
                    const updated = [
                      ...context.cart,
                    ];

                    updated.splice(index, 1);

                    context.setCart(updated);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;