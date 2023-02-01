import React, { useEffect, useRef, useState } from "react";
 import { faDeleteOutLine } from "react-icons/fa";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchTerm, setPrevSearch, prevSearch, searchTerm } =
    useGlobalContext();
  const searchValue = useRef("")
  const [searchValueOn , setSearchValueOn] = useState(false)
  
  useEffect(()=>{
    searchValue.current.focus()
  },[])

  function searchCocktail(){
    setSearchTerm(searchValue.current.value, placeSearch);
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (prevSearch) {
      const newItem = {
        id: new Date().getTime().toString(),
        title: searchTerm,
      };
      setPrevSearch([...prevSearch, newItem]);
    }
  }


  useEffect(() => {
    localStorage.setItem("Cocktial", JSON.stringify(prevSearch));
  }, [prevSearch]);

  function filter() {
    
    }
  

  useEffect(() => {
    placeSearch();
  }, [searchTerm]);

function placeSearch(titles) {
  setSearchTerm(titles);


  const ben = Object.values(prevSearch);
  console.log(ben);
  console.log(prevSearch);

  const result = ben.reduce((acc, current) => {
    const duplicate = acc.find((item) => item.title === current.title);
    if (!duplicate) {
      acc.push(current);
    }
    return acc;
  }, []);

  setPrevSearch(result);

}

function deleteSearch(id) {
 const del = prevSearch.filter((del)=> del.id !== id)
 return setPrevSearch(del)
}
 

  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name"> search your favourite cocktail</label>
          <input
            type="text"
            id="name"
            ref={searchValue}
            onChange={searchCocktail}
            onClick={() => setSearchValueOn(true)}
          />
          <button className="btn" type="Submit">
            Search
          </button>
          {searchValueOn &&
            prevSearch.map((cap) => {
              const { title, id } = cap;
              if (!id) {
                return[]
              }
              return (
                <div
                  className="place"
                  key={id}
                  onClick={() => placeSearch(title)}
                >
                  {title}
                  {/* <button onClick={() => deleteSearch(id)}>del</button> */}
                </div>
              );
            })}
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
