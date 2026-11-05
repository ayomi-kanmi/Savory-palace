
var navMenu = document.getElementById("navMenu");

function openMenu(){
    navMenu.style.right = "0";
}

function closeMenu(){
    navMenu.style.right = "-280px";
}


  let cart = JSON.parse(localStorage.getItem("savoryCart")) || [];

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const clearCartButton = document.getElementById("clearCart");

function displayCart() {
    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty</p>";
        cartTotal.textContent = "0";
        return;
    }

    cart.forEach(function (item, index) {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <h3>${item.name}</h3>

            <p>Price: ${formatPrice(item.price)}</p>

            <p>
                Quantity:
                <button type="button" class="decrease" data-index="${index}">-</button>

                <span class="number">${item.quantity}</span>

                <button type="button" class="increase" data-index="${index}">+</button>
            </p>

            <p>Subtotal: ${formatPrice(itemTotal)}</p>

            <button type="button" class="remove" data-index="${index}">
                Remove
            </button>
        `;

        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = formatPrice(total);
    }

function formatPrice(price) {
    return "₦" + price.toLocaleString("en-NG");
}

function saveCart() {
    localStorage.setItem("savoryCart", JSON.stringify(cart));
}

cartItems.addEventListener("click", function (event) {
    const index = Number(event.target.dataset.index);

    if (event.target.classList.contains("increase")) {
        cart[index].quantity += 1;

    } else if (event.target.classList.contains("decrease")) {
        cart[index].quantity -= 1;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

    } else if (event.target.classList.contains("remove")) {
        cart.splice(index, 1);

    } else {
        return;
    }

    saveCart();
    displayCart();
});

clearCartButton.addEventListener("click", function () {
    
      let confirmClear = confirm("Are you sure you want to clear this cart?");
      if(confirmClear) {
          cart = [];
    saveCart();
    displayCart();
   
      }
      
});
displayCart();
