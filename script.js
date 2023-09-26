// Function to add a product
function addProduct() {
  // Get the values from the input fields
  var sellingPrice = document.getElementById("sellingPrice").value; // Get the selling price from the input field
  var productName = document.getElementById("productName").value; // Get the product name from the input field

  // Create a new product object
  var product = {
    sellingPrice: sellingPrice, // Assign selling price to the product object
    productName: productName, // Assign product name to the product object
  };

  // Store the product in localStorage
  var products = JSON.parse(localStorage.getItem("products")) || []; // Retrieve existing products from localStorage or create an empty array
  products.push(product); // Add the new product to the products array
  localStorage.setItem("products", JSON.stringify(products)); // Store the updated products array in localStorage

  // Send the product data to the REST API
  fetch(
    "https://crudcrud.com/api/ec4763a716fd4464875f4492b6422861/allow-cors",
    {
      method: "POST", // HTTP POST request
      mode: "cors",
      headers: {
        "Content-Type": "application/json", // Set the request content type to JSON
      },
      body: JSON.stringify(product), // Send the product object as JSON in the request body
    }
  )
    .then((response) => response.json()) // Parse the response JSON
    .then((data) => console.log(data)) // Log the response data to the console
    .catch((error) => console.error("Error sending data to API:", error)); // Log any errors that occur

  // Clear the input fields
  document.getElementById("sellingPrice").value = ""; // Clear the selling price input field
  document.getElementById("productName").value = ""; // Clear the product name input field

  // Update the product list
  updateProductList(); // Call the function to update the product list on the page
}

// Function to delete a product
function deleteProduct(index) {
  // Retrieve the products from localStorage
  var products = JSON.parse(localStorage.getItem("products")) || [];

  // Remove the product at the specified index
  products.splice(index, 1);

  // Update the products in localStorage
  localStorage.setItem("products", JSON.stringify(products));

  // Update the product list
  updateProductList(); // Call the function to update the product list on the page
}

// Function to edit a product
function editProduct(index) {
  // Retrieve the products from localStorage
  var products = JSON.parse(localStorage.getItem("products")) || [];

  // Get the updated values from the input fields
  var sellingPrice = document.getElementById("sellingPrice").value; // Get the updated selling price from the input field
  var productName = document.getElementById("productName").value; // Get the updated product name from the input field

  // Update the product at the specified index
  products[index].sellingPrice = sellingPrice; // Update the selling price of the product at the specified index
  products[index].productName = productName; // Update the product name of the product at the specified index

  // Update the products in localStorage
  localStorage.setItem("products", JSON.stringify(products));

  // Clear the input fields
  document.getElementById("sellingPrice").value = ""; // Clear the selling price input field
  document.getElementById("productName").value = ""; // Clear the product name input field

  // Update the product list
  updateProductList(); // Call the function to update the product list on the page
}

// Function to update the product list
function updateProductList() {
  // Retrieve the products from localStorage
  var products = JSON.parse(localStorage.getItem("products")) || [];

  // Clear the product list
  var productList = document.getElementById("productList");
  productList.innerHTML = "";

  // Update the total value
  var totalValue = 0;

  // Iterate over the products and create list items
  products.forEach(function (product, index) {
    // Create a list item
    var listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.innerHTML =
      product.sellingPrice +
      " - " +
      product.productName +
      ' <button onclick="editProduct(' +
      index +
      ')" class="btn btn-primary btn-sm">Edit Product</button>' +
      ' <button onclick="deleteProduct(' +
      index +
      ')" class="btn btn-danger btn-sm">Delete Product</button>';

    // Add the list item to the product list
    productList.appendChild(listItem);

    // Update the total value
    totalValue += parseInt(product.sellingPrice); // Add the selling price to the total value
  });

  // Update the total value on the page
  document.getElementById("totalValue").textContent = totalValue; // Display the total value on the page
}

// Load the product list on page load
updateProductList(); // Call the function to update the product list when the page loads
