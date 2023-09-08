// Function to add a new product
function addProduct() {
    var sellingPrice = document.getElementById("sellingPrice").value;
    var productName = document.getElementById("productName").value;
  
    // Create a new product object
    var product = {
      sellingPrice: sellingPrice,
      productName: productName
    };
  
    // Send the new product to the server
    $.ajax({
      url: "https://crudcrud.com/api/f4aaa73b861842879ad5d520517d03aa/products",
      type: "POST",
      data: product,
      success: function(data) {
        // Add the new product to the list
        addProductToList(data);
  
        // Clear the input fields
        document.getElementById("sellingPrice").value = "";
        document.getElementById("productName").value = "";
  
        // Update the total value
        updateTotalValue();
      }
    });
  }
  
  // Function to add a product to the list
  function addProductToList(product) {
    var productList = document.getElementById("productList");
  
    // Create a new list item
    var listItem = document.createElement("li");
    listItem.innerHTML = product.productName + " - $" + product.sellingPrice;
  
    // Create a delete button for the list item
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function() {
      deleteProduct(product._id);
    };
  
    // Append the delete button to the list item
    listItem.appendChild(deleteButton);
  
    // Append the list item to the product list
    productList.appendChild(listItem);
  }
  
  // Function to delete a product
  function deleteProduct(productId) {
    // Send a DELETE request to the server
    $.ajax({
      url: "https://crudcrud.com/api/f4aaa73b861842879ad5d520517d03aa/products/" + productId,
      type: "DELETE",
      success: function() {
        // Remove the product from the list
        $("#" + productId).remove();
  
        // Update the total value
        updateTotalValue();
      }
    });
  }
  
  // Function to update the total value
  function updateTotalValue() {
    // Fetch all products from the server
    $.ajax({
      url: "https://crudcrud.com/api/f4aaa73b861842879ad5d520517d03aa/products",
      type: "GET",
      success: function(data) {
        var totalValue = 0;
  
        // Calculate the total value
        data.forEach(function(product) {
          totalValue += parseInt(product.sellingPrice);
        });
  
        // Update the total value on the page
        document.getElementById("totalValue").innerHTML = totalValue;
      }
    });
  }
  