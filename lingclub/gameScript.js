// 1. Reference the canvas element from the HTML
const canvas = document.getElementById('gameCanvas');

// 2. Get the 2D rendering context


const img = document.createElement("img");
img.style.width = "100px";
img.style.height = "100px";
img.style.imageRendering = 'pixelated';
// Step 2: Set the image source and alternative description
img.src = "cat.png";
img.alt = "A descriptive text for accessibility";

// Step 3: Append the image to the HTML body or a specific container
document.body.appendChild(img);

let posX = 0;
    let posY = 0;
    const speed = 20; 

    // 3. Listen for keydown events globally
    document.addEventListener("keydown", (event) => {
      // Normalize key value to lowercase to catch both 'W' and 'w'
      const key = event.key.toLowerCase(); 

      switch (key) {
        case "w": // Move Up
          up()
          break;
        case "s": // Move Down
          down()
          break;
        case "a": // Move Left
          left()
          break;
        case "d": // Move Right
          right()
          break;
        default:
          return; // Exit function if any other key is pressed
      }
      event.preventDefault(); 
    });

    function up() {
      posY -= speed;
      img.style.transform = `translate(${posX}px, ${posY}px)`;
    }
    function down() {
      posY += speed;
      img.style.transform = `translate(${posX}px, ${posY}px)`;
    }
    function left() {
      posX -= speed;
      img.style.transform = `translate(${posX}px, ${posY}px)`;
    }
    function right() {
      posX += speed;
      img.style.transform = `translate(${posX}px, ${posY}px)`;
    }