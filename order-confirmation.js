
var navMenu = document.getElementById("navMenu");

function openMenu(){
    navMenu.style.right = "0";
}

function closeMenu(){
    navMenu.style.right = "-280px";
}


     //============================
     // GET THE LAST ORDER 
    //=============================
    
    const lastOrder = JSON.parse(localStorage.getItem("savoryLastOrder"));
    
    
        //============================
       // GET HTML ELEMENTS 
        //============================
   const orderID = document.getElementById("orderID");
   const orderDate = document.getElementById("orderDate");
   const orderStatus = document.getElementById("orderStatus");
   
   const customerName = document.getElementById("customerName");
   const customerPhone = document.getElementById("customerPhone");
   
   const orderMethod = document.getElementById("orderMethod");
   const deliveryAddress = document.getElementById("deliveryAddress");
   const addressRow = document.getElementById("addressRow");
   
   const confirmedItems = document.getElementById("confirmedItems");
   const orderTotal = document.getElementById("orderTotal");
   
          //============================
          // DISPLAY ORDER INFORMATION 
          //============================
   
   function displayOrderConfirmation() {
   
       // check whether an order exists 
       
       if(!lastOrder) {
           document.querySelector(".confirmation-header").innerHTML = `
           <i class="bx bx-info-circle"></i>
           
           <h1> No Recent Order Found </h1>
           
           <p> we couldn't find a recent order.
           Please place an order before visiting this page.
           </p>
           
           `;
           document.querySelector(".confirmation-details").style.display = "none";
           
           return;
       }
       
         //============================
          // DISPLAY CUSTOMER AND ORDER DETAILS 
          //============================
       orderID.textContent = lastOrder.orderID;
       
       orderDate.textContent = lastOrder.orderDate;
       
       orderStatus.textContent = lastOrder.status;
       
       customerName.textContent = lastOrder.customerName;
       
       customerPhone.textContent = lastOrder.customerPhone;
       
          //============================
          // DISPLAY ORDER METHOD 
          //============================
          
          if(lastOrder.orderMethod === "delivery") {
          
              orderMethod.textContent = "Home Delivery";

deliveryAddress.textContent = lastOrder.deliveryAddress;

addressRow.style.display = "block";
} else {
orderMethod.textContent = "Restaurant Pickup";

addressRow.style.display = "none";
}
          
          
          
          //============================
          // DISPLAY FOOD ITEMS
          //============================
          
          confirmedItems.innerHTML = "";
          
          let total = 0;
          
          lastOrder.items.forEach(function (item) {
          
              const itemTotal = item.price * item.quantity;
              
              total += itemTotal ;
              
              const foodItem = document.createElement("div");
              
              foodItem.className = "confirmed-item";
              
              // FOOD NAME 
              const foodName = document.createElement("h3");
              
              foodName.textContent = item.name;
              
              //QUANTITY 
              const foodQuantity = document.createElement("p");
              
              foodQuantity.textContent = "Quantity: " + item.quantity;
              
              //PRICE
              const foodPrice = document.createElement("p");
              
              foodPrice.textContent = "Price: ₦" + item.price.toLocaleString();
              
              //SUBTOTAL 
              const foodSubtotal = document.createElement("p");
              
              foodSubtotal.textContent = "Subtotal: ₦" + itemTotal.toLocaleString();
              
              foodItem.appendChild(foodName);
              foodItem.appendChild(foodQuantity);
              foodItem.appendChild(foodPrice);
              foodItem.appendChild(foodSubtotal);
              
              //ADD CONFIRMATION TO THE PAGE 
              
              confirmedItems.appendChild(foodItem);
              
          });
          
           //============================
          // DISPLAY TOTAL AMOUNT 
          //============================
          
          orderTotal.textContent = "₦" + total.toLocaleString();
   }
   
          //============================
          // RUN THE FUNCTION 
          //============================
          
          displayOrderConfirmation ();