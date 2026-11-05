
var navMenu = document.getElementById("navMenu");

function openMenu(){
    navMenu.style.right = "0";
}

function closeMenu(){
    navMenu.style.right = "-280px";
}

alert("Welcome To Savory Palace!");

   /*   Create Food array */
   
   const foods = [
       {
           id:1,
           name: "Jollof Rice with Grilled Chicken",
           price: 3900 
           },
       
       
       {
           id: 2,
           name: "Fried Rice with Chicken",
           price: 3800
       },
       
       {
         id: 3,
           name: "Spaghetti Bolognese" ,
           price: 4800  
       },
       
       {
         id: 4,
           name: "Beef Suya" ,
           price: 2800 
       },
       
       {
         id: 5,
           name: "Pounded Yam with Egusi Soup" ,
           price: 4000 
       },
       
       {
          id: 6,
           name: "Cheesy Grilled Chicken" ,
           price: 3800
       }, 
       
       {
           id: 7,
           name: "Chicken and Chips" ,
           price: 4500       
           }, 
           
           {
           id: 8,
           name: "Burger" ,
           price: 2500       
           }, 
   ];
      
      // ===============================
        // Create a cart array
        // ===============================
  
 let cart = JSON.parse(localStorage.getItem("savoryCart")) ||  [];
 
       // ===============================
        // ADD TO CART FUNCTIONAL 
        // ===============================
     const addToCartButtons =  document.querySelectorAll(".add-to-cart");
     
     addToCartButtons.forEach(function (button) {
       button.addEventListener("click", function(event) {
         const index = Number(event.currentTarget.dataset.index);
                
             const selectedFood = foods[index];
             if(!selectedFood) {
                 alert("Food not found");
                 return;
             }
             
             const existingFood = cart.find(function (item) {
                 return item.id === selectedFood.id;
             });
             
             if(existingFood) {
                 existingFood.quantity += 1;
             }else {
                 cart.push ({
                     id: selectedFood.id,
                     name: selectedFood.name,
                     price: selectedFood.price,
                     quantity:1
                 });
             }
             localStorage.setItem("savoryCart", JSON.stringify(cart));
             alert( selectedFood.name + " added to cart");
             
         });
     });