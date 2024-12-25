import React from 'react'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddUser from './components/AddUser'
import EditUser from './components/EditUser'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/add" element={<AddUser/>}/>
      {/* <Route path="/edit/:id" element={<EditUser/>}/> */}
      </Routes>
      </BrowserRouter>
    </div>
  )
}
