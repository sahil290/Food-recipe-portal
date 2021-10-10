import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import style from "./App.css";
const App = () => {
  const APP_ID = "ed71c48e";
  const APP_KEY = "c68fa3b11899f1e30fa01ef1197a8dd0";

  const [recipes, setRecipe] = useState([]);
  const [search, setSearch] = useState("");

  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipe(data.hits);
    };
    getRecipes();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className = "recipes">
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients = {recipe.recipe.ingredients}
        />
      ))}
      ;
      </div>
    </div>
  );
};
export default App;
