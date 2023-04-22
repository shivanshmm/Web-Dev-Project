// Get all the billing items
const billingItems = document.querySelectorAll(".billing-item");

// Add a click event listener to each billing item
billingItems.forEach((billingItem) => {
  // Set the initial quantity to zero
  billingItem.dataset.quantity = 0;

  // Add a click event listener
  billingItem.addEventListener("click", () => {
    // Increment the quantity
    updateQuantity(billingItem, 1);

    // Update the selected items list and the total cost
    updateSelectedItems();
  });
});

// Update the selected items list and the total cost
function updateSelectedItems() {
  // Get the selected items list element
  const selectedItemsList = document.querySelector(".selected-items-list");

  // Get the total cost element
  const totalCost = document.querySelector(".total span");

  // Clear the selected items list
  selectedItemsList.innerHTML = "";

  // Initialize the total cost to zero
  let cost = 0;

  // Loop through each billing item
  billingItems.forEach((billingItem) => {
    // Get the quantity of the billing item
    const quantity = parseInt(billingItem.dataset.quantity);
    // If the quantity is greater than zero, add the item to the selected items list
    if (quantity > 0) {
      const name = billingItem.dataset.name;
      const price = parseFloat(billingItem.dataset.price);
      const itemCost = quantity * price;
      const listItem = document.createElement("li");
      listItem.innerText = `${name} x ${quantity} = $${itemCost.toFixed(2)}`;

      // Create a button element
      const plusbtn = document.createElement("button");
      plusbtn.innerHTML = "+";
      plusbtn.classList.add("add-btn");
      plusbtn.addEventListener("click", () => {
        updateQuantity(billingItem, 1);
        updateSelectedItems();
      });
      const minbtn = document.createElement("button");
      minbtn.innerHTML = "-";
      minbtn.classList.add("remove-btn");
      minbtn.addEventListener("click", () => {
        updateQuantity(billingItem, -1);
        updateSelectedItems();
      });

      // Append the button to the list item
      listItem.appendChild(minbtn);
      listItem.appendChild(plusbtn);

      // Append the list item to the selected items list
      selectedItemsList.appendChild(listItem);
      cost += itemCost;
    }
  });

  // Update the total cost
  totalCost.innerText = cost.toFixed(2);
}

// Add a click event listener to the checkout button
const checkoutButton = document.getElementById("checkout-button");
checkoutButton.addEventListener("click", () => {
  alert("Thank you for your order!");

  // Reset the quantity of all billing items to zero
  billingItems.forEach((billingItem) => {
    billingItem.dataset.quantity = 0;
  });

  // Update the selected items list and the total cost
  updateSelectedItems();

  // Update the total cost to zero
  const totalCost = document.querySelector(".total span");
  totalCost.innerText = "0.00";
});

// Add a click event listener to the refresh button
const refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener("click", () => {
  // Reset the quantity of all billing items to zero
  billingItems.forEach((billingItem) => {
    billingItem.dataset.quantity = 0;
  });

  // Update the selected items list and the total cost
  updateSelectedItems();

  // Update the total cost to zero
  const totalCost = document.querySelector(".total span");
  totalCost.innerText = "0.00";
});

function updateQuantity(billingItem, increment) {
  let quantity = parseInt(billingItem.dataset.quantity);
  quantity += increment;
  if (quantity < 0) {
    quantity = 0;
  }
  billingItem.dataset.quantity = quantity;
}
