const API_KEY = '36fe2ef3638245a8b222e5f4ec543734';  // Replace with a valid NewsAPI key
const NEWS_URL = `https://newsapi.org/v2/everything?q=cybersecurity&sortBy=publishedAt&apiKey=${API_KEY}`;

document.addEventListener("DOMContentLoaded", fetchCyberNews); // Automatically fetch on page load

async function fetchCyberNews() {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "<p>Loading news...</p>"; // Show loading message

    try {
        const response = await fetch(NEWS_URL);
        const data = await response.json();
        
        if (data.status !== "ok" || !data.articles.length) {
            throw new Error("No cybersecurity news found.");
        }

        displayNews(data.articles);
    } catch (error) {
        newsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        console.error("News Fetch Error:", error);
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";  // Clear previous content

    articles.forEach(article => {
        const newsCard = document.createElement("div");
        newsCard.classList.add("news-card");

        newsCard.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
            <h3>${article.title}</h3>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(newsCard);
    });
}
