// Step 1: Select the button element from the DOM using its ID
const button = document.getElementById("myBtn");
const image = document.getElementById("diceLogo");

// Step 2: Create a function that defines what happens on click
function handleButtonClick() {
    //alert("Button was clicked!");
    if (image.style.display == "displayed") {
      image.style.display = "none"
    }
    else {
      image.style.display = "displayed"
    }

}

// Step 3: Attach the event listener to the button
button.addEventListener("click", handleButtonClick);
