import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js"

let productsHTML = '';
products.forEach((product) => {
    productsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image" src="${product.image}" alt="">
                </div>

                <div class="product-name">
                    ${product.name} 
                </div>

                <div class="starts-rating-container">
                    <img class="start-img" src="./images/ratings/rating-${product.rating.stars * 10}.png" alt="0 starts rating">
                    <div class="number-ratings">
                        $${product.rating.count}
                    </div>

                </div>

                
                <div class="price">
                    $${(product.priceCents / 100).toFixed(2)}
                </div>

                <div class="product-quantity-container">
                    <select class="js-quantity-selector-${product.id}">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                
                <button class="add-to-cart-button"
                data-product-name="${product.name}"
                data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
    `;
});

document.querySelector(".products-grid")
    .innerHTML = productsHTML;

document.querySelectorAll('.add-to-cart-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productName = button.dataset.productName;
      let matchingItem;
      const productId = button.dataset.productId;

      cart.forEach((item) => {
        if (item.productId === productId) {
          matchingItem = item;
        }
      });

      const quantity = parseInt(document.querySelector(`.js-quantity-selector-${productId}`).value, 10)

      if (matchingItem) {
        // Because matchingItem is reference variable
        matchingItem.quantity += quantity;

        if (matchingItem.quantity > 99) document.querySelector(".cart-quantity").style.fontSize = '13px';
      } else {
        cart.push({
          productId: productId,
          productName: productName,
          quantity : quantity,
        });
      }

      let cartQuantity = 0;
      cart.forEach((item) => {
        cartQuantity += item.quantity; 
      })

      document.querySelector(".js-cart-quantity")
        .innerHTML = cartQuantity
    });
 });
