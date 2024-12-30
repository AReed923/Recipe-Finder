document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const recipesDiv = document.getElementById('recipes');
    const apiKey = "12c62d8d379d49b0a836b5d10ac238ba";

    searchButton.addEventListener('click', async () => {
        const query = searchBar.value.trim();
        if (!query) {
            alert("Please enter an ingredient!");
            return;
        }
        recipesDiv.innerHTML = "";
        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=12&apiKey=${apiKey}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch recipes.");
            }
            const recipes = await response.json();
            if (recipes.length === 0) {
                recipesDiv.innerHTML = "<p>No recipes found. Try a different ingredient!</p>";
                return;
            }
            recipes.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.classList.add('recipe-card');

                const recipeLink = document.createElement('a');
                recipeLink.href = `https://spoonacular.com/recipes/${recipe.title.replace(/ /g, '-').toLowerCase()}-${recipe.id}`;
                recipeLink.target = '_blank'; // Open in a new tab
                recipeLink.style.textDecoration = 'none'; // Optional: Remove underline from the link

                const recipeImage = document.createElement('img');
                recipeImage.src = recipe.image;
                recipeImage.alt = recipe.title;

                const recipeTitle = document.createElement('h3');
                recipeTitle.textContent = recipe.title;

                recipeLink.appendChild(recipeImage);
                recipeLink.appendChild(recipeTitle);
                recipeCard.appendChild(recipeLink);
                recipesDiv.appendChild(recipeCard);
            });
        } catch (error) {
            console.error(error);
            recipesDiv.innerHTML = "<p>There was an error fetching recipes. Please try again later.</p>";
        }
    });

    // Add keypress listener to trigger search on Enter key
    searchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click(); // Simulates clicking the search button
        }
    });
});