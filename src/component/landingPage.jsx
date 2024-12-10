import React, { useEffect, useState } from 'react'
import { Search, X} from 'lucide-react'
import RecepiCard from './card'
import ErrorPage from './errorPage';
import Loading from './loading';

export default function HomePage() {
  const [recipes, setRecipes] = useState([]); // for search recepies
  const [allRecipes, setAllRecipes] = useState([]); // for all recipes 
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButonLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState(''); // for search input 

  
  const searchRecipe = () => {    
    if (searchQuery.trim() === '') {
      setRecipes(allRecipes); // If no search query, show all recipes
    } else {
      const filtered = allRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) // Assuming each recipe has a 'name' property
      );
      setRecipes(filtered);
    }
  };


  const clearSearch = ()=>{
    setSearchQuery('')
    setRecipes(allRecipes);
  }

  //  load more recepi 
  const fetchMoreRecipes = async () => {
    if(offset === 100){      
      return
    }
    try {
      setButonLoading(true);
      const apiKey = import.meta.env.VITE_API_KEY
      
      if (!apiKey) {
        showErrorDialogue("API key is missing.");
        console.error("API key is missing. Please set it in the .env file.");
      }        
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&offset=${offset}&number=10&addRecipeInformation=true`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();        

      setAllRecipes(prevRecipes => {
        const updatedRecipes = [...prevRecipes, ...data.results];
        localStorage.setItem('AllRecipes', JSON.stringify(updatedRecipes));
        setRecipes(updatedRecipes) // maintaing the all recipes 
        return updatedRecipes;
      });

      setOffset(offset + 10)      
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setButonLoading(false);
    }
  };
  
  useEffect(() => {    
    const fetchRecipes = async () => {
      const cachedRecipe = localStorage.getItem(`AllRecipes`);
      
      if (cachedRecipe) {
        setRecipes(JSON.parse(cachedRecipe));
        setAllRecipes(JSON.parse(cachedRecipe)) // maintaing the all recipes
        setLoading(false);
        return;
      }
  
      try {
        setLoading(true);
        const apiKey = import.meta.env.VITE_API_KEY
        
        if (!apiKey) {
          setError("API key is missing.");
          console.error("API key is missing. Please set it in the .env file.");
        }        
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&offset=${offset}&number=10&addRecipeInformation=true`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();        
        setRecipes(data.results);    
        setAllRecipes(data.results)    
        localStorage.setItem('AllRecipes',JSON.stringify(data.results))
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);


  if (loading) return <Loading/> ;
  if (error) return <ErrorPage err={error}/> ;
  
  return (
    <>
    <div className='px-5 sm:px-16 py-10 sm:py-20 flex justify-between bg-white'>
      <div className='flex flex-col justify-center'>
        <h1 className='text-3xl sm:text-6xl'>Cook with <span className='text-orange-500'>Love,</span>"</h1>
        <h1 className='text-3xl sm:text-6xl'> Live with  <span className='text-orange-500'>Flavor.</span></h1>
      </div>
      <img src="landingPageImage1.jpg" alt="" className=' sm:h-96'  />
    
  </div>

  <div className='px-5 sm:px-16'>
    <h1 className='text-5xl font-semibold text-center my-10'>All Recipes</h1>
    
    <div className='flex flex-col sm:flex-row gap-8 justify-between items-center my-5'>
      
      <div className='flex  gap-3  items-center flex-grow '>
        <div className='flex items-center w-full'>
          <input onChange={(e)=> setSearchQuery(e.target.value)} value={searchQuery} className='outline-none bg-white py-4 px-2 w-full' type="search" name="" id=""  placeholder='Enter Recepi Name'/>
          <button onClick={searchRecipe} className='bg-[#ffcb91] py-4 px-3'><Search size={28}/></button>
        </div>
        {searchQuery !== '' && <div onClick={clearSearch} className='cursor-pointer flex items-center bg-white p-2  rounded-3xl'>clear <X/></div>}
      </div>

      {/* {searchQuery === '' &&  */}
      <div className=''>
        <h1 className='text-2xl'>Total Recipes {recipes.length} </h1>
      </div>

    </div>
    
    <div className='flex flex-wrap justify-center sm:justify-between  items-center space-y-4'>
      {recipes.map((recepi,index)=>(
        <RecepiCard key={index} recipeId={recepi.id} imgAddress={recepi.image} recepiTitle={recepi.title}  prepTime={recepi.readyInMinutes} recepiType={recepi.vegetarian} dishType={recepi.vegetarian} />
      ))}  
    </div>

      {offset !== 100 &&<div className='flex justify-center mt-10 pb-10'>
        <button 
          onClick={fetchMoreRecipes} 
          className='border-2 border-orange-500 p-4'
          disabled={buttonLoading}  // Disable button if loading is true
        >
          {buttonLoading ? 'Loading...' : 'Load More'}
        </button>
      </div>}
  </div>
  </>
  )
}
