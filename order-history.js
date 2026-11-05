
var navMenu = document.getElementById("navMenu");

function openMenu(){
    navMenu.style.right = "0";
}

function closeMenu(){
    navMenu.style.right = "-280px";
}


       // =====================================
      // GET HTML ELEMENTS
      // =====================================

   const orderHistory = document.getElementById("orderHistory");

   const clearHistory = document.getElementById("clearHistory");


     // =====================================
    // GET SAVED ORDERS
    // =====================================

   let orders = JSON.parse(localStorage.getItem("savoryOrders")) || [];


   // =====================================
    // DISPLAY ORDER HISTORY
    // =====================================

      function displayOrderHistory() {

    // Clear previous content

    orderHistory.innerHTML = "";


    // Check if orders exist

    if (orders.length === 0) {

        orderHistory.innerHTML = `
            <div class="empty-history">
                <i class="bx bx-receipt"></i>

                <h2>No Order History Yet</h2>

                <p>Your previous orders will appear here.</p>

                <a href="menu.html" class="btn">
                    Explore Our Menu
                </a>
            </div>
        `;

        return;
    }


    // DISPLAY EACH ORDER

    orders.forEach(function(order, index) {

        const orderCard = document.createElement("div");

        orderCard.className = "order-history-card";


        // ORDER INFORMATION

        const orderHeading = document.createElement("h2");

        orderHeading.textContent = "Order " + order.orderID;

        const orderDate = document.createElement("p");

        orderDate.textContent = "Date: " + order.orderDate;

        const orderStatus = document.createElement("p");

        orderStatus.textContent = "Status: " + order.status;

        const orderMethod = document.createElement("p");

        orderMethod.textContent =
            "Method: " +
            (order.orderMethod === "delivery"
                ? "Home Delivery"
                : "Restaurant Pickup");


        // DISPLAY FOOD ITEMS

        const foodHeading = document.createElement("h3");

        foodHeading.textContent = "Items Ordered:";


        const foodList = document.createElement("ul");

        order.items.forEach(function(item) {

            const food = document.createElement("li");

            food.textContent =
                item.name +
                " × " +
                item.quantity +
                " — ₦" +
                (item.price * item.quantity).toLocaleString();

            foodList.appendChild(food);

        });


        // DISPLAY TOTAL

        const orderTotal = document.createElement("h3");

        orderTotal.textContent =
            "Total: ₦" + order.total.toLocaleString();


        // VIEW ORDER DETAILS BUTTON

        const viewButton = document.createElement("button");

        viewButton.type = "button";

        viewButton.className = "btn view-order";

        viewButton.textContent = "View Order Details";


        viewButton.addEventListener("click", function() {

            localStorage.setItem(
                "savoryLastOrder",
                JSON.stringify(order)
            );

            window.location.href = "order-confirmation.html";

        });


        // DELETE ORDER BUTTON

        const deleteButton = document.createElement("button");

        deleteButton.type = "button";

        deleteButton.className = "btn delete-order";

        deleteButton.textContent = "Remove from History";

        deleteButton.addEventListener("click", function() {

            const confirmDelete = confirm(
                "Are you sure you want to remove this order from your history?"
            );

            if (confirmDelete) {

                orders.splice(index, 1);

                localStorage.setItem("savoryOrders",JSON.stringify(orders));

                displayOrderHistory();

            }

        });


        // ADD EVERYTHING TO THE ORDER CARD

        orderCard.appendChild(orderHeading);

        orderCard.appendChild(orderDate);

        orderCard.appendChild(orderStatus);

        orderCard.appendChild(orderMethod);

        orderCard.appendChild(foodHeading);

        orderCard.appendChild(foodList);

        orderCard.appendChild(orderTotal);

        orderCard.appendChild(viewButton);

        orderCard.appendChild(deleteButton);


        // ADD CARD TO THE PAGE

        orderHistory.appendChild(orderCard);

    });

}


// =====================================
// CLEAR ALL ORDER HISTORY
// =====================================

clearHistory.addEventListener("click", function() {

    if (orders.length === 0) {

        alert("There is no order history to clear.");

        return;
    }


    const confirmClear = confirm(
        "Are you sure you want to clear your entire order history?"
    );


    if (confirmClear) {

        orders = [];

        localStorage.setItem("savoryOrders", JSON.stringify(orders) );

        displayOrderHistory();

    }

});


// =====================================
// RUN THE FUNCTION
// =====================================

displayOrderHistory();