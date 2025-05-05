async function fetchQuote() {
    try {
        const response = await fetch("https://zenquotes.io/api/random");
        const data = await response.json();

        const quoteElement = document.getElementById("quote");
        if (data && data[0] && data[0].q) {
            quoteElement.textContent = `"${data[0].q}" - ${data[0].a}`;
        } else {
            quoteElement.textContent = "No quote available at the moment.";
        }
    } catch (error) {
        console.error("Error fetching quote:", error);
        document.getElementById("quote").textContent =
            "Failed to load quote. Please try again.";
    }
}

document.addEventListener("DOMContentLoaded", fetchQuote);

document.getElementById('btn-stocks').addEventListener('click', () => {
    window.location.href = 'stocks.html';
});

document.getElementById('btn-dogs').addEventListener('click', () => {
    window.location.href = 'dogs.html';
});
