function addDuck() {
  const pond = document.getElementById("pond");
  const duckSize = 2; // Font-size in em units, adjust as necessary
  const duck = {
    element: document.createElement("div"),
    x: Math.random() * (pond.clientWidth - duckSize * 16), // Convert em to pixels (16px per em)
    y: Math.random() * (pond.clientHeight - duckSize * 16),
    speed: 1, // Adjust speed as necessary
    direction: Math.random() * 2 * Math.PI, // Random initial direction
  };

  duck.element.innerHTML = "🦆";
  duck.element.className = "duck";
  duck.element.style.position = "absolute"; // Ensure ducks are positioned absolutely
  duck.element.style.left = `${duck.x}px`;
  duck.element.style.top = `${duck.y}px`;
  pond.appendChild(duck.element);

  // Function to update duck position
  function moveDuck() {
    // Calculate new position based on speed and direction
    duck.x += Math.cos(duck.direction) * duck.speed;
    duck.y += Math.sin(duck.direction) * duck.speed;

    // Update duck element position
    duck.element.style.left = `${duck.x}px`;
    duck.element.style.top = `${duck.y}px`;

    // Check for collision with bread
    const breads = document.getElementsByClassName("bread");
    for (let i = 0; i < breads.length; i++) {
      const bread = breads[i];
      if (isColliding(duck.element, bread)) {
        pond.removeChild(bread); // Remove bread from the pond
      }
    }

    // Boundary checking to keep ducks within pond
    if (duck.x < 0 || duck.x > pond.clientWidth - duck.element.clientWidth) {
      duck.direction = Math.PI - duck.direction;
    }
    if (duck.y < 0 || duck.y > pond.clientHeight - duck.element.clientHeight) {
      duck.direction = -duck.direction;
    }
  }

  // Update duck position every 50 milliseconds (adjust as needed for desired speed)
  setInterval(moveDuck, 50);
}

function isColliding(duck, bread) {
  const duckRect = duck.getBoundingClientRect();
  const breadRect = bread.getBoundingClientRect();

  return !(
    duckRect.right < breadRect.left ||
    duckRect.left > breadRect.right ||
    duckRect.bottom < breadRect.top ||
    duckRect.top > breadRect.bottom
  );
}

function removeDuck() {
  const pond = document.getElementById("pond");
  const ducks = document.getElementsByClassName("duck");

  if (ducks.length > 0) {
    // Remove the last duck added to the pond
    pond.removeChild(ducks[ducks.length - 1]);
  } else {
    alert("No more ducks to remove");
  }
}

function addBread() {
  const pond = document.getElementById("pond");
  const breadSize = 1; // Font-size in em units, adjust as necessary
  const bread = {
    element: document.createElement("div"),
    x: Math.random() * (pond.clientWidth - breadSize * 16), // Convert em to pixels (16px per em)
    y: Math.random() * (pond.clientHeight - breadSize * 16),
    speed: 0.5, // Adjust speed as necessary
    direction: Math.random() * 2 * Math.PI, // Random initial direction
  };

  bread.element.innerHTML = "🍞";
  bread.element.className = "bread";
  bread.element.style.position = "absolute"; // Ensure bread is positioned absolutely
  bread.element.style.left = `${bread.x}px`;
  bread.element.style.top = `${bread.y}px`;
  pond.appendChild(bread.element);

  // Function to update bread position
  function moveBread() {
    // Calculate new position based on speed and direction
    bread.x += Math.cos(bread.direction) * bread.speed;
    bread.y += Math.sin(bread.direction) * bread.speed;

    // Update bread element position
    bread.element.style.left = `${bread.x}px`;
    bread.element.style.top = `${bread.y}px`;

    // Boundary checking to keep bread within pond
    if (bread.x < 0 || bread.x > pond.clientWidth - bread.element.clientWidth) {
      bread.direction = Math.PI - bread.direction;
    }
    if (
      bread.y < 0 ||
      bread.y > pond.clientHeight - bread.element.clientHeight
    ) {
      bread.direction = -bread.direction;
    }
  }

  // Update bread position every 50 milliseconds (adjust as needed for desired speed)
  setInterval(moveBread, 50);
}

function removeBread() {
  const pond = document.getElementById("pond");
  const lastBread = pond.lastChild; // Get the last bread added to the pond

  if (lastBread && lastBread.className === "bread") {
    pond.removeChild(lastBread); // Remove the last bread element from the pond
  } else {
    alert("No more bread to remove");
  }
}


// Get the button elements and add event listeners
const addDuckButton = document.getElementById("addDuck");
const removeDuckButton = document.getElementById("removeDuck");
const addBreadButton = document.getElementById("addBread");
const removeBreadButton = document.getElementById("removeBread");

addDuckButton.addEventListener("click", addDuck);
removeDuckButton.addEventListener("click", removeDuck);
addBreadButton.addEventListener("click", addBread);
removeBreadButton.addEventListener("click", removeBread);