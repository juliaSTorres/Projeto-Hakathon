document.addEventListener("DOMContentLoaded", function() {
    // Function to calculate and display the images
    function displayImages() {
        const inputValue = document.getElementById("numberInput").value; // Get the value from the input field
        
        if (inputValue === "") {
            alert("Please enter a number.");
            return;
        }

        // Convert input to a number and calculate the result
        const result = Math.floor((inputValue * 13 * 365) / 25);

        // Display the calculated result in the HTML with "liters per year"
        document.getElementById("calculatedResult").textContent = `Calculated result: ${result} water jugs per year`;

        // Get the container where images will be displayed
        const imagesContainer = document.getElementById("imagesContainer");

        // Clear the container before adding new images
        imagesContainer.innerHTML = "";

        // Create and display images based on the calculated result
        for (let i = 0; i < result; i++) {
            const imgElement = document.createElement("img");
            imgElement.src = "/../static/images/gallon.png"; // Image path
            imgElement.alt = `Image ${i + 1}`;
            imagesContainer.appendChild(imgElement);
        }
    }

    // Add event listener for the submit button
    document.getElementById("submitButton").addEventListener("click", displayImages);

    // Add event listener to trigger displayImages when Enter key is pressed
    document.getElementById("numberInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();  // Prevent default form submission
            displayImages();
        }
    });
});
