const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

//use let because we want to get the random quotes
let apiQuotes = []

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}


//Show New Quote // method 1: apiQuotes + async // methods 2: localQuotes (import quotes.js)
function newQuote() {
  showLoadingSpinner()
  //Pick a random quote from apiQuote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Check if AUthor field is blank and replace it with 'unknown'
  !quote.author
    ? authorText.textContent = 'Unknown'
    : authorText.textContent = quote.author


  quote.text.length > 120
    ? quoteText.classList.add('long-quote')
    : quoteText.classList.remove('long-quote')

  quoteText.textContent = quote.text;
  removeLoadingSpinner()
}


// Get Quotes From API
async function getQuotes() {
  showLoadingSpinner()
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {

  }
}

//Tweet Quote 
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} -${authorText.textContent}`
  window.open(twitterUrl, '_blank')
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// on Load
getQuotes()

//How to hard code 
// quote.text = "<insert long quote here>";
// quote.text.length > 120
//   ? quoteText.classList.add('long-quote')
//   : quoteText.classList.remove('long-quote')