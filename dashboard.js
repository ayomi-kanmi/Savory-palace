   
   var navMenu = document.getElementById("navMenu");

function openMenu(){
    navMenu.style.right = "0";
}

function closeMenu(){
    navMenu.style.right = "-280px";
}

   
   
    //============================
     // GET HTML ELEMENTS 
    //=============================
    const totalOrder = document.getElementById("totalOrder");
    const PendingOrder = document.getElementById("PendingOrder");
    const completeOrder = document.getElementById("completeOrder");
    const totalRevenue = document.getElementById("totalRevenue");
    const adminOrders = document.getElementById("adminOrders");
    
   //============================
     // GET SAVED ORDERS
    //=============================
    
    function getOrders() {
        return JSON.parse(localStorage.getItem("savoryOrders")) || [];
       }
       
        //============================
     // SAVE ORDER 
    //=============================
    
    function savedOrders(orders) {
        localStorage.setItem("savoryOrders", JSON.stringify(orders));
    }
    
     //============================
     // UPDATE DASHBOARD STATISTICS 
    //=============================
    function updateDashboard(orders) {
        totalOrder.textContent = orders.length;
        
        //count pending orders
        const pending = orders.filter(function (order) {
            return [ "Order Placed",
                      "Confirmed",
                       "Preparing"].includes(order.status);
        });
        PendingOrder.textContent = pending.length;
        
        //count complete orders 
        
       const completed = orders.filter(function (order) {
           return [
               "Delivered",
               "Collected"
           ].includes(order.status);
       });
       completeOrder.textContent = completed.length;
       
       // calculatetotal order value 
       let  revenue = 0 ;
       orders.forEach(function (order) {
           // Exclude cancelled orders from the total 
           
           if(order.status !== "cancelled") {
               revenue += Number(order.total) ||  0;
           }
       });
       
       totalRevenue.textContent = "₦" + revenue.toLocaleString();
          
    }
    
    //============================
     // DISPLAY CUSTOMER ORDER 
    //=============================
    
    function displayOrder() {
        const orders = getOrders();
        adminOrders.innerHTML = "";
        
        //Update statistics 
        
        updateDashboard(orders);
        
        // check whether orders exist 
        
        if(orders.length === 0) {
            adminOrders.innerHTML = `
            <div class="empty-orders">
                <I class="bx bx-receipt"></i>
                <h3>No Orders Yet </h3>
                <p> Customer order will appear here.</p>
                </div>
            `;
            return;
        }
          // Display each order
          
          orders.forEach(function (order) {
          
              const orderCard = document.createElement("div");
              
              orderCard.className = "admin-order-card";
              
              //ORDER ID
              
              const orderHeading = document.createElement("h3");
              
              orderHeading.textContent = "Order ID: " + order.orderID;
              
              // CUSTOMER NAME 
              
              const customer = document.createElement("p");
              
              customer.textContent = "Customer: " + order.customerName;
              
              //Phone number 
              
              const phone = document.createElement("p");
              
              phone.textContent = "Phone: " + order.customerPhone ;
              
              //Order date 
              
              const date = document.createElement("p");
              
              date.textContent = "Order Date: " + order.orderDate;
              
              // Order Method 
              
              const method = document.createElement("p"); 
              method.textContent = "Order Method: " + (
                  order.orderMethod === "delivery" ? "Home Delivery" : "Restaurant Pickup"
              );
              
              // Delivery address 
              
              const address = document.createElement("p");    
              
              address.textContent = "Address: " + (
                  order.orderMethod === "delivery" ? order.deliveryAddress : "Restaurant Pickup"
              );
              
              // FOOD ITEMS 
              
              const foodHeading = document.createElement("h4");
              
              foodHeading.textContent = "Food Ordered: ";
              
              const foodList= document.createElement("ul");
               
               order.items.forEach(function(item) {
                   
              const food = document.createElement("li");
             
              food.textContent = item.name + " + " + item.quantity;
              
            foodList.appendChild(food);
               });
               

        // TOTAL AMOUNT

        const total = document.createElement("h4");

        total.textContent =  "Total: ₦" + (Number(order.total) || 0).toLocaleString();

       // CURRENT STATUS

        const statusLabel = document.createElement("label");

        statusLabel.textContent = "Update Order Status: ";

        // STATUS DROPDOWN

        const statusSelect = document.createElement("select");

        statusSelect.className = "order-status-select";

        const statuses = [

            "Order Placed",
             "Confirmed",
             "Preparing",
             "Ready for Pickup",
             "Out for Delivery",
               "Delivered",
               "Collected",
               "Cancelled"
             ];  

        statuses.forEach(function(status) {

            const option = document.createElement("option");

            option.value = status;

            option.textContent = status;

            if (status === order.status) {

                option.selected = true;

            }

            statusSelect.appendChild(option);

        });

        // UPDATE STATUS BUTTON

        const updateButton = document.createElement("button");

        updateButton.type = "button";

        updateButton.className = "btn update-status";

        updateButton.textContent = "Update Status";

        updateButton.addEventListener("click", function() {

            const latestOrders = getOrders();

            const orderIndex = latestOrders.findIndex(function(savedOrder) {

                return savedOrder.orderID === order.orderID;

            });

            if (orderIndex === -1) {

                alert("This order could not be found.");

                displayOrders();

                return;

            }

            latestOrders[orderIndex].status = statusSelect.value;

            // Save the updated order

            savedOrders(latestOrders);

            // Refresh the dashboard

            displayOrder();

            alert("Order status updated successfully!");

        });

        // REMOVE FROM DISPLAYED ORDER LIST

        const deleteButton = document.createElement("button");

        deleteButton.type = "button";

        deleteButton.className = "btn delete-admin-order";

        deleteButton.textContent = "Remove Order";

        deleteButton.addEventListener("click", function() {

            const confirmDelete = confirm(

                "Are you sure you want to permanently remove this order from the saved order list?"

            );

            if (!confirmDelete) {

                return;

            }

            const latestOrders = getOrders();

            const updatedOrders = latestOrders.filter(function(savedOrder) {

                return savedOrder.orderID !== order.orderID;

            });

            savedOrders(updatedOrders);

            // Refresh the dashboard

            displayOrder();

        });

        // ADD ELEMENTS TO ORDER CARD

        orderCard.appendChild(orderHeading);

        orderCard.appendChild(customer);

        orderCard.appendChild(phone);

        orderCard.appendChild(date);

        orderCard.appendChild(method);

        orderCard.appendChild(address);

        orderCard.appendChild(foodHeading);

        orderCard.appendChild(foodList);

        orderCard.appendChild(total);

        orderCard.appendChild(statusLabel);

        orderCard.appendChild(statusSelect);

        orderCard.appendChild(updateButton);

        orderCard.appendChild(deleteButton);

        // ADD ORDER CARD TO THE PAGE

        adminOrders.appendChild(orderCard);
        });

    };   
/*       DASHBOARD N*/
if(sessionStorage.getItem("dashboardLoggedIn") !== "true") {
    window.location.href = "Login.html"
} else {
    // =====================================
// RUN THE DASHBOARD
// =====================================

    displayOrder();
         
}

