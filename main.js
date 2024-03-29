const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");

const APP_ID = "0a6ff652";
const APP_key = "7755b6de1ad03ab8caf4cb23a69f8519";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});
async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}
function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHtml = "";
  results.map((result) => {
    generatedHtml += `
      <div class="item">
        <img src="${result.recipe.image}" alt="" />
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-button" href="${
            result.recipe.url
          }" target="_blank">View Recipe
          </a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(1)}</p>
        <p class="item-data">Health label: ${result.recipe.healthLabels}</p>
        <p class="item-data">Diet label: ${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "No Data"
        }</p>
        <p class="item-data">Total time: ${
          result.recipe.totalTime > 0 ? result.recipe.totalTime : "No Data"
        }</p>
        
      </div>
  `;
  });
  searchResultDiv.innerHTML = generatedHtml;
}
