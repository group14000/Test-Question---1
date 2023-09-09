
      // Function to add a product
      function addProduct() {
        // Get the values from the input fields
        var sellingPrice = document.getElementById("sellingPrice").value;
        var productName = document.getElementById("productName").value;

        // Create a new product object
        var product = {
          sellingPrice: sellingPrice,
          productName: productName
        };

        // Store the product in localStorage
        var products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));

        // Send the product data to the REST API
        fetch("https://crudcrud.com/api/f4aaa73b861842879ad5d520517d03aa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(product)
        })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.log(error));

        // Clear the input fields
        document.getElementById("sellingPrice").value = "";
        document.getElementById("productName").value = "";

        // Update the product list
        updateProductList();
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
        updateProductList();
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
        products.forEach(function(product, index) {
          // Create a list item
          var listItem = document.createElement("li");
          listItem.className = "list-group-item";
          listItem.innerHTML =
            product.sellingPrice +
            " - " +
            product.productName +
            ' <button onclick="deleteProduct(' +
            index +
            ')" class="btn btn-danger btn-sm">Delete Product</button>';

          // Add the list item to the product list
          productList.appendChild(listItem);

          // Update the total value
          totalValue += parseInt(product.sellingPrice);
        });

        // Update the total value on the page
        document.getElementById("totalValue").textContent = totalValue;
      }

      // Load the product list on page load
      updateProductList();
