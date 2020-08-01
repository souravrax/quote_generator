const quoteContainer = document.getElementById("quote-container");
const newQuoteBtn = document.querySelector("#new-quote");
const quoteText = document.querySelector("#quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const facebookButton = document.getElementById("facebook");
const instagramButton = document.getElementById("instagram");
const loader = document.getElementById("loader");

// Show Loading
function loading () {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

window.fbAsyncInit = function () {
    FB.init({
        appId: "315854099777043",
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v7.0'
    });
};


// Get quote from http://forismatic.com/en/api

async function getQuote() {
    // Show Loader
    loading();
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const URL = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const res = await fetch(proxyURL + URL);
        const data = await res.json();
        changeDOM(data);
    } catch (er) {
        getQuote();
        console.log("Error : ", er);
    }
};


function changeDOM(data) {
    // Stop Loader Animation
    complete();

    if (data["quoteAuthor"] === "") data["quoteAuthor"] = "unknown";

    if (data.quoteText.length >= 120) {
        quoteText.classList.add('long-quote');
    }
    else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = data.quoteText;
    authorText.innerText = data.quoteAuthor;
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const URL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(URL, '_blank');
}

function shareQuoteOnFacebook() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    FB.ui({
        method: "share",
        href: "https://cors-anywhere.herokuapp.com/",
        quote: `${quote} - ${author}`
    }, (res) => {
        console.log(res);
    })
}

twitterButton.addEventListener('click', tweetQuote);
facebookButton.addEventListener('click', shareQuoteOnFacebook);


newQuoteBtn.addEventListener('click', async () => {
    getQuote()
});

getQuote();