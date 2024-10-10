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
                data-product-id="${product.id}"
                data-product-image="${product.image}"
                data-product-price="${product.priceCents}">
                    Add to Cart
                </button>
            </div>
    `;
});

document.querySelector(".products-grid")
    .innerHTML = productsHTML;


renderCartSite()

document.querySelectorAll('.add-to-cart-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productName = button.dataset.productName;
      let matchingItem;
      const productId = button.dataset.productId;
      const productPrice = button.dataset.productPrice;
      const productImage = button.dataset.productImage;
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
          priceCents: productPrice,
          image: productImage
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart))

      let cartQuantity = calTotalCartQuantity(cart);

      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity

      renderCartSite();
    });

});

/* HELPER FUNCTION */
function calTotalCartQuantity(cart) {
   let total = 0;

   cart.forEach((item) => {
     total += item.quantity;
   });

   return total;
}

function calTotalPrice(cart) {
  let total = 0;

  cart.forEach((item) => {
    total += item.priceCents * item.quantity; 
  });

  return total
}

function renderCartSite() {
  document.querySelector(".cart-quantity")
    .innerHTML = cart.length ? calTotalCartQuantity(cart) : 0;
  if (cart.length === 0) {
    /* remove cart site*/
    document.querySelector(".cart-site")
      .innerHTML = ""

    document.querySelector("body").style.gridTemplateColumns = '1fr'
    document.querySelector(".amazon-header").style.right = '150px';
  } else {
    document.querySelector(".cart-site")
      .innerHTML = `
         <div class="cart-site">
          <div class="cart-summary">
              <p style="margin-bottom: 0px; font-size: 13px; font-weight: bold;">Subtotal</p>
              <p class="sub-total" style="margin-top: 5px; color: red; font-weight: bold; font-size: 12px;">$7.99</p>
              <a href="./checkout.html" style="display: flex; justify-content: center; text-decoration: none; width: 100%;">
                  <button style="font-size: 11px; border-radius: 10px; border: solid 1px; width: 100%; padding: 3px 0px; margin-bottom: 10px;"> Go to cart</button>
              </a>

              <button class="remove-all-button" style="font-size: 11px; border-radius: 10px; border: solid 1px; width: 100%; padding: 3px 0px;">Remove all</button>
          </div> 

          <div class="item-container"></div>
      </div>  
      ` 
  document.querySelector("body").style.gridTemplateColumns = '1fr 150px'
  document.querySelector(".amazon-header").style.right = '150px';
  document.querySelector(".sub-total")
    .innerHTML = (calTotalPrice(cart) / 100).toFixed(2)

  let cartHTML = '';
  cart.forEach((product) => {
    cartHTML += `
                <div class="item">
                    <div class="item-img-container" style="display: flex; justify-content: center;">
                        <img style="width:150px" src="${product.image}" alt="">
                    </div>

                    <p style="font-size: 13px;">
                        $${(product.priceCents / 100).toFixed(2)}
                    </p>

                    <div class="change-quantity" style="display: flex; justify-content: space-around;">
                        <p class="" style="margin: 0px; font-size: 11px;">Quantity: ${product.quantity}</p>

                        <button class="remove-item-button" data-product-id=${product.productId}>Remove</button>
                    </div>
                </div> 
                `;
              })

    document.querySelector(".item-container")
      .innerHTML = cartHTML;
    
    document.querySelectorAll(".remove-item-button").forEach((button) => {
      button.addEventListener('click', () => {
          const itemId =  button.dataset.productId;

          cart.forEach((item, index) => {
            if (item.productId === itemId) {
              item.quantity -= 1;
              if (item.quantity == 0) {
                cart.splice(index, 1)
              }
              localStorage.setItem("cart", JSON.stringify(cart))
              renderCartSite()
            }
          })
      })
    })
    const removeAllButton = document.querySelector(".remove-all-button")

    removeAllButton.addEventListener('click', () => {
    cart.splice(0, cart.length)
    localStorage.setItem("cart", JSON.stringify(cart))
    renderCartSite()
    removeAllButton.remove()
    })
  }
}
