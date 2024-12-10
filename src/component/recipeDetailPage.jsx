import { MoveLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function RecipeDetailPage() {
  const params = useParams()
  const apiKey = import.meta.env.VITE_API_KEY
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const cachedRecipe = localStorage.getItem(`recipe_${params.id}`);
      
      if (cachedRecipe) {
        console.log("from local")
        setRecipe(JSON.parse(cachedRecipe));
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${apiKey}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        localStorage.setItem(`recipe_${params.id}`,JSON.stringify(data))
        setRecipe(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  
  return (
    <div className='flex flex-col gap-9 py-20'>
      <Link className="flex gap-1 items-center " to={'/'} ><MoveLeft/>Back</Link>
      <div className='flex justify-between gap-6 '>
        <div className='flex flex-col flex-wrap gap-7 w-[70%]'>
          <h1 className='text-xl font-semibold'>{recipe.title}</h1>
          <div className='text-sm' dangerouslySetInnerHTML={{ __html: recipe.summary }} />
          {/* <p>{recipe.summary}</p> */}
          <div className='flex justify-between items-center px-5'>
            <div className='flex flex-col items-center gap-2'>
              <span>Prep Time</span>
              <span>{recipe.readyInMinutes}</span>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <span>Type</span>
              {recipe.vegetarian ?               
                <span>Veg</span>
              :
              <span>Non Veg</span>}
            </div>
          </div>
        </div>

        <div>
          <img src={recipe.image} alt="" className='w-96'/>        
        </div>       
      </div>
{/* ingredients  */}
        <div className='flex flex-col'>
          <h1 className='text-xl font-semibold mb-4'>Ingredients:</h1>
          {recipe.extendedIngredients.map((ing,index)=>(
              <span key={index}>{ing.amount} {ing.unit} {ing.name}</span>
          ))}
        </div>

{/* steps  */}
        <div className='flex flex-col'>
          <h1 className='text-xl font-semibold mb-4'>Instruction:</h1>
          {recipe.analyzedInstructions.map(ins=>(
            ins.steps.map((step,index) =>(
              <span key={index}>{step.number}  {step.step} </span>
            )
          )))}

          <h1>Enjoy the meal </h1>
        </div>
    </div>
  )
}
