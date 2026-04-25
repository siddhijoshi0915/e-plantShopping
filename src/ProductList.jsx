import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});

    const plantsArray = [ /* your same array unchanged */ ];

    // ✅ Total quantity in cart
    const calculateTotalQuantity = () => {
        return cartItems
            ? cartItems.reduce((total, item) => total + item.quantity, 0)
            : 0;
    };

    // ✅ Add to cart
    const handleAddToCart = (product) => {
        dispatch(addItem(product));

        setAddedToCart((prev) => ({
            ...prev,
            [product.name]: true
        }));
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>

            {/* NAVBAR */}
            <div className="navbar">
                <div>
                    <h3>Paradise Nursery</h3>
                    <i>Where Green Meets Serenity</i>
                </div>

                {/* CART ICON + COUNT */}
                <div>
                    <a href="#" onClick={handleCartClick}>
                        🛒 {calculateTotalQuantity()}
                    </a>
                </div>
            </div>

            {/* MAIN CONTENT */}
            {!showCart ? (
                <div className="product-grid">

                    {plantsArray.map((category, index) => (
                        <div key={index}>

                            <h2>{category.category}</h2>

                            <div className="product-list">

                                {category.plants.map((plant, plantIndex) => (

                                    <div className="product-card" key={plantIndex}>

                                        <img src={plant.image} alt={plant.name} />

                                        <h3>{plant.name}</h3>
                                        <p>{plant.description}</p>
                                        <p>{plant.cost}</p>

                                        {/* ✅ ADD TO CART BUTTON */}
                                        <button
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]}
                                            style={{
                                                backgroundColor: addedToCart[plant.name] ? 'gray' : 'green',
                                                cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            {addedToCart[plant.name]
                                                ? "Added to Cart"
                                                : "Add to Cart"}
                                        </button>

                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}

        </div>
    );
}

export default ProductList;