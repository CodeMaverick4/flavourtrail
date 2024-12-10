import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './component/landingPage';
import RecipeDetailPage from './component/recipedetailpage';
import ErrorPage from './component/errorPage';

function App() {

  return (
    <BrowserRouter>
      <div className='px-12 bg-[#e5e1de]'>
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
