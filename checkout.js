
var navMenu = document.getElementById("navMenu");

function openMenu(){
    navMenu.style.right = "0";
}

function closeMenu(){
    navMenu.style.right = "-280px";
}

  //============================
  // SAVORY PALACE CHECKOUT
   //============================
  
   //GET SAVED CART
   
   
   let cart =JSON.parse(localStorage.getItem("savoryCart")) || [ ];
   
   //SELECT HTML ELEMENTS 
   
   const checkItems = document.getElementById("checkItems");
   const checkTotal = document.getElementById("checkTotal");
   const checkForm = document.getElementById("checkForm");
   const checkoutMessage = document.getElementById("checkoutMessage");
   const deliveryOption = document.getElementById("deliveryOption");
   const deliveryAddress = document.getElementById("deliveryAddress");
   const addressGroup = document.getElementById("addressGroup");
   
   // DISPLAY ORDER SUMMARY 
    
    function displayCheckout() {
        checkoutItems.innerHTML = "";
        
        let  total = 0;
        
        if(cart.length === 0) {
        
            checkoutItems.innerHTML= "<p> Your cart is empty. Please add food before checkout.</p>";
            
            checkoutTotal.textContent = "0";
            
            checkoutForm.style.display = "none";
            
            return;
        }
        checkoutForm.style.display = "block";
        
        cart.forEach(function (item) {
        
            const itemTotal = item.price * item.quantity;
            
            total += itemTotal ;
            
            const itemElement = document.createElement("div");
            
            itemElement.className = "checkout-items";
            
            itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>Quantity: ${item.quantity} </p>
            <p>Price: ₦${item.price.toLocaleString()} </p>
            <p>Subtotal : ₦${itemTotal.toLocaleString()} </p>     
             
            `;
            checkoutItems.appendChild(itemElement);
        });
        checkoutTotal.textContent = total.toLocaleString();
    }
    
    //DISPLAY CART WHEN PAGE LOADS 
    
    displayCheckout ();
      
   //============================
  // SHOW OR HIDE DELIVERY 🚚 
   //============================
   
   deliveryOption.addEventListener("change", function () {
     
     if(deliveryOption.value === "delivery") {
     
         addressGroup.style.display = "block";
         
         deliveryAddress.required =true;
         
     }else {
         addressGroup.style.display = "none";
         
         deliveryAddress.required = false;
         
         deliveryAddress.value = "";
     }
   });
   
    //============================
   // PLACE ORDER
   //============================
   
   checkoutForm.addEventListener("submit", function (event) {
   
       event.preventDefault();
       
       // CHECK CART 
       if(cart.length === 0) {
           alert("Your cart is empty. Please add food first.");
           
           return;
              }
              
              // GET CUSTOMER DETAILS 
              
       const customerName = document.getElementById("customerName").value.trim();
       const customerPhone =
    document.getElementById("customerPhone").value.trim();
       const orderMethod = deliveryOption.value;
       const address = deliveryAddress.value.trim();
       
       //CHECK PHONE NUMBER ₦
       
       if(!/^0[0-9]{10}$/.test(customerPhone)){
       
           alert("Please enter a valid 11-digit Nigerian phone number.");
           return;
       }
       
       // CHECK DELIVERY ADDRESS 
       
       if(orderMethod === "delivery" && address === "") {
       
           alert("Please enter your delivery address");
           
           return;
       }
       
       // CALCULATE TOTAL 
       let total = 0;
       cart.forEach(function (item) {
           total += item.price * item.quantity;
       });
       
       //GENERATE ORDER ID 
       
      // const orderID = "SP-" + Date.now();
      
       const  orderID = "SP-" + Math.floor(10000 + Math.random() * 90000 );
       
       
       //CREATE ORDER OBJECT 
    
    const order = {
        
        orderID: orderID,
        customerName: customerName,
        customerPhone: customerPhone,
        orderMethod: orderMethod,
        deliveryAddress: orderMethod === "delivery" ? address: "Restaurant Pickup",
        items: cart,
         total,
        orderDate: new Date().toLocaleString(),
        status: "Order Placed"
          }  ;
       
       //============================
          // SAVE THE ORDER HISTORY 
          //============================         
       let orders = JSON.parse(localStorage.getItem("savoryOrders")) ||  [] ;
       
       // SAVE NEW ORDER
       
       orders.push(order);
       
       localStorage.setItem("savoryOrders", JSON.stringify(orders));
       
         //============================
          // SAVE THE MOST RECENT ORDER
          //============================ 
      localStorage.setItem("savoryLastOrder",JSON.stringify(order));  
          
       // CLEAR CART
       
       localStorage.removeItem("savoryCart");
       
       cart = [];
       
        //============================
          // GO TO ORDER CONFIRMATION PAGE
          //============================ 
      window.location.href = "order-confirmation.html" ; 
                  
     // DISPLAY CONFIRMATION 
       
      checkoutForm.style.display = "none";

   const checkoutSummary =     document.querySelector(".checkout-summary");

    if (checkoutSummary) {
    checkoutSummary.style.display = "none";
}

       checkoutMessage.innerHTML = `
       <div class ="order-success">
           <h2> 🎉 Order Placed Successfully! </h2>
           <p> Thank you, ${customerName}!</p>
           <p>Your Order ID is:</p>
           <h3> ${orderID} </h3>
           <p> Total Amount:₦${total.toLocaleString()} </p>
          <p>Order Method: ${orderMethod === "delivery" ? "Home Delivery": "Restaurant Pickup"}</p>
          <p> Please save your Order ID for future reference.</p>
          <a href="index.html" class="btn">Back to Home </a>
          </div>    
       `;
       
   });
   