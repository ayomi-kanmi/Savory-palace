
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

const trackOrderForm = document.getElementById("trackOrderForm");

const orderIDInput = document.getElementById("orderIDInput");

const trackingMessage = document.getElementById("trackingMessage");

const trackingResult = document.getElementById("trackingResult");


// =====================================
// GET SAVED ORDERS
// =====================================

function getOrders() {

    return JSON.parse(
        localStorage.getItem("savoryOrders")
    ) || [];

}


// =====================================
// TRACK ORDER
// =====================================

   trackOrderForm.addEventListener("submit", function(event) {

    // Prevent the page from refreshing

    event.preventDefault();


    // Clear previous results

    trackingMessage.textContent = "";

    trackingResult.innerHTML = "";


    // Get the Order ID entered by the customer

    const enteredOrderID = orderIDInput.value.trim().toUpperCase();


    // Retrieve saved orders

    const orders = getOrders();


    // Find the matching order

    const foundOrder = orders.find(function(order) {

        return order.orderID.toUpperCase() === enteredOrderID;

    });


    // =====================================
    // CHECK WHETHER ORDER EXISTS
    // =====================================

    if (!foundOrder) {

        trackingMessage.textContent =
            "Sorry, we couldn't find that order. Please check your Order ID.";

        return;

    }


    // =====================================
    // DISPLAY ORDER DETAILS
    // =====================================

    const resultCard = document.createElement("div");

    resultCard.className = "tracking-card";


    // ORDER ID

    const orderHeading = document.createElement("h2");

    orderHeading.textContent = "Order ID: " + foundOrder.orderID;


    // ORDER STATUS
const status = document.createElement("p");

status.className = "status-container";

status.textContent = "Order Status: ";

const statusBadge = document.createElement("span");

statusBadge.textContent = foundOrder.status;

statusBadge.className = "status-badge";

statusBadge.classList.add(
    foundOrder.status.toLowerCase().replace(/\s+/g, "-")
);

status.appendChild(statusBadge);


    // ORDER DATE

    const date = document.createElement("p");

    date.textContent = "Order Date: " + foundOrder.orderDate;


    // ORDER METHOD

    const method = document.createElement("p");

    method.textContent =
        "Order Method: " +
        (foundOrder.orderMethod === "delivery"
            ? "Home Delivery"
            : "Restaurant Pickup");


    // FOOD ITEMS HEADING

    const foodHeading = document.createElement("h3");

    foodHeading.textContent = "Your Order";


    // FOOD ITEMS LIST

    const foodList = document.createElement("ul");


    foundOrder.items.forEach(function(item) {

        const foodItem = document.createElement("li");

        foodItem.textContent =
            item.name +
            " × " +
            item.quantity;

        foodList.appendChild(foodItem);

    });


    // TOTAL AMOUNT

    const total = document.createElement("h3");

    total.textContent =
        "Total Amount: ₦" +
        foundOrder.total.toLocaleString();


    // DELIVERY ADDRESS

    if (foundOrder.orderMethod === "delivery") {

        const address = document.createElement("p");

        address.textContent =
            "Delivery Address: " +
            foundOrder.deliveryAddress;

        resultCard.appendChild(address);

    }


    // ADD DETAILS TO THE RESULT CARD

    resultCard.appendChild(orderHeading);

    resultCard.appendChild(status);

    resultCard.appendChild(date);

    resultCard.appendChild(method);

    resultCard.appendChild(foodHeading);

    resultCard.appendChild(foodList);

    resultCard.appendChild(total);


    // DISPLAY RESULT

    trackingResult.appendChild(resultCard);

});
       


