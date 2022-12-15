import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const res = await fetch(`${url}${id}`);
        const data = await res.json();
        const { drinks } = data;
        console.log(drinks[0]);
        if (drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: Category,
            strGlass: glass,
            strInstructions: instruction,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = drinks[0];

          const ingredient = {
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          };

          console.log(ingredient);

          const newCocktail = {
            name,
            image,
            info,
            Category,
            glass,
            instruction,
            ingredient,
          };

          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getCocktail();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  }
  const { name, image, info, Category, glass, instruction, ingredient } =
    cocktail;

  // const ben = ingredient.map((item,index) => {
  //   return item ? <span key={index}>{item}</span> :null;
  // });
  return (
    <section className="section coctail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name} </h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">Category :</span>
            {Category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instruction :</span>
            {instruction}
          </p>
          <p>
            <span className="drink-data">ingredient :</span>
            {ingredient.strIngredient1},  {ingredient.strIngredient2}, {ingredient.strIngredient3},{ingredient.strIngredient4}
, {ingredient.strIngredient5}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
