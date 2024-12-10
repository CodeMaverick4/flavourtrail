import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './component/landingPage';

import ErrorPage from './component/errorPage';
import RecipeDetailPage from './component/recipeDetail';

function App() {

  return (
    <BrowserRouter>
      <div className=' bg-[#fcf5eb]'>
      <Routes>      
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />       
        <Route path="/err" element={<ErrorPage err={"akljdlasjd"}/>} />        
      </Routes>
      </div>
    </BrowserRouter>    
  )
}

export default App
