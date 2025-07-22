const quotes = [
    'Guys have underestimated me my entire life. And for years, I never understood why. It used to really bother me. But then one day, I was driving my little boy to school, and I saw this quote by Walt Whitman, and it was painted on the wall there. It said, "Be curious, not judgmental." I like that.',
    'The actuality of death and the experience of grief sinks in at different times for everyone.',
    'Getting rid of perfectly good items may seem wasteful, but that is not where we went wrong. It was wasteful to purchase it. Now we are just acknowledging it.',
    'Positive thinking, or an optimistic attitude, is the practice of focusing on the good in any given situation.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
    'The world has the habit of making room for the man whose actions show that he knows where he is going.',
    'Enjoy the little things, for one day you may look back and realize they were the big things.',
    'I realized when you look at your mother, you are looking at the purest love you will ever know.',
    'Life is a gift, and it offers us the privilege, opportunity, and responsibility to give something back by becoming more'
];

let words = [];
let wordIndex = 0;

let startTime = Date.now();

const quoteElement = document.getElementById("quote"); // Element to display the quote
const messageElement = document.getElementById("message"); // Element to display result message
const typeValueElement = document.getElementById("type-value"); // Input field for typing (Where the user types the quote)

// Event listener for the start button (When the user clicks the blue start button, an event is triggered)
document.getElementById('start').addEventListener('click', () => {
  const quoteIndex = Math.floor(Math.random() * quotes.length);
    /*
    Math.random() generates a random number between 0 (inclusive) and 1 (exclusive).
    Multiplying by quotes.length gives a number between 0 and the length of the quotes array.
    Math.floor() rounds down to the nearest whole number, ensuring we get a valid index for the quotes array.
    */
  const quote = quotes[quoteIndex];
  words = quote.split(' '); // Split the quote into words for easier tracking
  wordIndex = 0; // Reset the word index to start from the first word

  const spanWords = words.map(word => `<span>${word}</span>`); // Wraps each word in a span element for styling
  quoteElement.innerHTML = spanWords.join(' '); // Joins the words back into a single string with spaces
  quoteElement.children[0].className = 'highlight'; // Highlights the first word by adding a yellow background

  messageElement.innerText = '';
  typeValueElement.value = '';
  typeValueElement.focus();
  typeValueElement.disabled = false;
  /*
  innerText sets the text content of the message element to an empty string, clearing any previous messages.
  value sets the input field to an empty string, clearing any previous input.
  Focus() sets the input field as the active element, allowing the user to start typing immediately.
  Disabled is set to false to ensure the input field is active and ready for user input.
  */
  startTime = new Date().getTime(); // Stores the current time in milliseconds to calculate the elapsed time later
});

typeValueElement.addEventListener('input', () => {
  const currentWord = words[wordIndex];
  const typedValue = typeValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    const elapsedTime = new Date().getTime() - startTime;
    messageElement.innerText = `🎉 CONGRATULATIONS! You finished in ${(elapsedTime / 1000).toFixed(2)} seconds.`;
    typeValueElement.disabled = false;
    /*
    This condition checks if the typed value matches the current word and if it is the last word in the quote.
    If both conditions are true, it calculates the elapsed time since the start of the game and
    displays a congratulatory message with the time taken to complete the typing game.
    The elapsed time is calculated by subtracting the start time from the current time, and it is formatted to two decimal places.
    The input field is then disabled to prevent further typing.
    */
  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    typeValueElement.value = '';
    wordIndex++;
    /*
    This condition checks if the typed value ends with a space and matches the current word.
    If true, it clears the input field, increments the word index to move to the next word,
    and highlights the next word in the quote. 
    */
    for (const wordElement of quoteElement.children) {
      wordElement.className = ''; // Clears the highlight from all words in the quote
    }

    if (wordIndex < quoteElement.children.length) {
      quoteElement.children[wordIndex].className = 'highlight'; // Highlights the next word by adding a yellow background
    }
  } else if (currentWord.startsWith(typedValue)) {
    typeValueElement.className = '';
  } else {
    typeValueElement.className = 'error';
  }
  /*
  This condition checks if the typed value matches the beginning of the current word.
  If true, it clears any error styling from the input field.
  If the typed value does not match, it adds an error class to the input field, which can be styled to indicate an error.
  The error class can be used to change the appearance of the input field, such as changing the border color to red or adding a background color.
  */
});
