import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // ✅ Calculate subtotal for each item
  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.substring(1)) * item.quantity;
  };

  // ✅ Calculate total cart amount
  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach((item) => {
      total += parseFloat(item.cost.substring(1)) * item.quantity;
    });

    return total.toFixed(2);
  };

  // ✅ Increase quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  // ✅ Decrease quantity OR remove if 1
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // ✅ Remove item completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // ✅ Continue shopping
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // ✅ Checkout (as per instruction)
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">

      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <h3>Your cart is empty</h3>
      ) : (
        <>
          {/* CART ITEMS */}
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>

              <img src={item.image} alt={item.name} />

              <div className="cart-details">

                <h3>{item.name}</h3>

                <p>Unit Price: {item.cost}</p>

                <p>
                  Subtotal: ${calculateTotalCost(item).toFixed(2)}
                </p>

                {/* QUANTITY CONTROLS */}
                <div className="quantity-controls">

                  <button onClick={() => handleDecrement(item)}>
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => handleIncrement(item)}>
                    +
                  </button>

                </div>

                {/* REMOVE BUTTON */}
                <button onClick={() => handleRemove(item)}>
                  Delete
                </button>

              </div>
            </div>
          ))}

          {/* TOTAL SECTION */}
          <div className="cart-summary">
            <h2>Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}</h2>

            <h2>Total Amount: ${calculateTotalAmount()}</h2>
          </div>

          {/* ACTION BUTTONS */}
          <div className="cart-actions">

            <button onClick={handleContinueShopping}>
              Continue Shopping
            </button>

            <button onClick={handleCheckoutShopping}>
              Checkout
            </button>

          </div>
        </>
      )}

    </div>
  );
};

export default CartItem;