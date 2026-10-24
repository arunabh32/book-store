import { useState } from 'react';
import Register from './Register';
import AddBook from './AddBook';
import {Routes, Route, Router} from 'react-router';
import Home from './Home';
import Showbook from './Showbook';
import Logo from './Logo';

function App() {


  return (
    <>
     <Routes>
       <Route path='/logo' element={ <Logo/>}/>
      <Route path='/register' element={ <Register/>}/>
      <Route path='/all' element={ <Home/>}/>
      <Route path='/addBook' element={<AddBook/>}/>
      <Route path='/showbook' element={<Showbook/>}/>
    
      </Routes>
   

     
    </>
  )
}

export default App
