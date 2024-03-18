function createNewCard() {
	/* Creates a new div element and assigns it to a variable called cardElement. */
	let cardElement = document.createElement("div");

	/* Adds the "card" class to the variable 'cardElement' */
	cardElement.classList.add("card");

	/* Writes the HTML for the children of the card element (card-down and card-up) as a normal string and assign it as the innerHTML of cardElement. */
	cardElement.innerHTML = "\n<div class=\"card-down\"></div>\n<div class=\"card-up\"></div>";

  /* Return the cardElement. */
	return cardElement;
}
createNewCardTest();


function appendNewCard(parentElement) {
	/* Creates a new card by calling createNewCard() and assigns it to a variable named cardElement. */
	let cardElement = createNewCard();
  
	/* Appends the card element to the parentElement (making the card element a "child").  */
	parentElement.appendChild(cardElement);

  /* Return the card element. */
	return cardElement;
}
appendNewCardTest();


function shuffleCardImageClasses() {
  /* Creates a new array that contains two of each image class string in order and stores the array in a variable called 'cardClasses'.  */
	let cardClasses = ["image-1", "image-1", "image-2", "image-2", "image-3", "image-3", "image-4", "image-4", "image-5", "image-5", "image-6", "image-6"];

	/* Uses "underscore.js" library to randomly "shuffle" the array.  
  CDN: https://cdnjs.com/libraries/underscore.js/1.4.1
  Shuffle: https://www.tutorialspoint.com/underscorejs/underscorejs_shuffle.htm */
   let shuffledCards = _.shuffle(cardClasses);
  
	/* Return the shuffled array of class names. */
  return shuffledCards;
}
shuffleCardImageClassesTest();


function createCards(parentElement, shuffledImageClasses) {
	/* Makes an empty array to hold our card objects. */
  let cardObjects = [];
  
  /* Writes a for loop that loops 12 times to create the 12 cards we need. */
  for (let i = 0; i < 12; i++) {
    /* Use appendNewCard to create/append a new card and store the result in a variable. */
    let newCard = appendNewCard(parentElement);
		/* Adds an image class to the new card element using shuffledImageClasses[i]. */
    newCard.classList.add(shuffledImageClasses[i]);
    /* Append a new object to the card object array. The object contains the following properties:
			"index" -- Which iteration of the loop this is.
			"element" -- The DOM element for the card.
			"imageClass" -- The string of the image class on the card. */	
    let newObject = {
      index: i,
      element: newCard,
      imageClass: shuffledImageClasses[i],
    }
    cardObjects.push(newObject);
    }
	
  /* Return the array of 12 card objects. */
  return cardObjects;
	
}
createCardsTest();


function doCardsMatch(cardObject1, cardObject2) {
	/* Determines if two cards match. */
  if (cardObject1.imageClass == cardObject2.imageClass) {
    return true;
  } else {
    return false;
  }
}
doCardsMatchTest();


/* The 'counters' object below is used as a dictionary to store our counter names and their respective values. */
let counters = {};


function incrementCounter(counterName, parentElement) {
  /* If the 'counterName' property is not defined in the 'counters' object, initialize it with a value of 0. */
	if (counters[counterName] === undefined) {
    counters[counterName] = 0;
  }
  
  /* Increments the counter for 'counterName'. */
	counters[counterName]++;

  /* Changes the HTML within 'parentElement' to display the new counter value. */
	parentElement.innerHTML = counters[counterName];

}
incrementCounterTest();

/* The 'onCardFlipped' function below will be called each time the user flips a card. The 'lastCardFlipped' variable is used to remember the first card flipped while we wait for the user to flip another card. */
let lastCardFlipped = null;


function onCardFlipped(newlyFlippedCard) {
  /* Use the 'incrementCounter' function to add one to the flip counter UI.  */
	incrementCounter("flipCounter", document.getElementById("flip-count"));

	/* If 'lastCardFlipped' is null (this is the first card flipped), update 'lastCardFlipped' and return (nothing else to do) */
	if (lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }

  /* If the above condition was not met, we know there are two cards flipped that should be stored in 'lastCardFlipped' and 'newlyFlippedCard', respectively. */
  

  /* If the cards don't match, remove the "flipped" class from each, reset 'lastCardFlipped' to null, and use a 'return' to exit the function. */
	if (doCardsMatch(lastCardFlipped, newlyFlippedCard) === false) {
    lastCardFlipped.element.classList.remove("flipped");
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  }
  	
  /* Increments the match counter and adds a "glow" effect to the matching cards. */
	incrementCounter("matchCounter", document.getElementById("match-count"));
  lastCardFlipped.element.classList.add("border-glow");
  newlyFlippedCard.element.classList.add("border-glow");
  lastCardFlipped.element.classList.add("glow");
  newlyFlippedCard.element.classList.add("glow");

  /* Plays either the win audio or match audio based on whether the user has the number of matches needed to win. */
  if (counters["matchCounter"] === 6) {
    winAudio.play();
  } else {
    matchAudio.play();
  }
  
  /* Reset 'lastCardFlipped' to null */
  lastCardFlipped = null;
}

/* This function removes all children from the #card-container, resets the flip and match counts displayed in the HTML, resets the counters dictionary to an empty object, resets lastCardFlipped to null, and sets up a new game. */
function resetGame() {
	/* Get the card container by its id and store it in a variable. */
  let container = document.getElementById("card-container");
	
	/* Clear all the cards by using a while loop to remove the first child of the card container as long as a first child exists. */
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
	/* Get the HTML elements that display the flip and match counts and reset their inner text to 0. */ 
  document.getElementById("match-count").innerHTML = 0;
  document.getElementById("flip-count").innerHTML = 0;
  
  
  /* Reassign the value of the `counters` dictionary to an empty object  */
  counters = {};
	
	/* Sets lastCardFlipped back to null. */
  lastCardFlipped = null;
	
	/* Sets up a new game. */
  setUpGame();
}

// ⛔️ Sets up the game. Do not edit below this line! ⛔
setUpGame();
