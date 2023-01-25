// ** React Imports
import React from 'react'

// ** React Router Dom Imports
import { Routes, Route } from 'react-router-dom'

// ** Pages Imports
import Dashboard from 'src/pages/Dashboard'

const App = () => {
  return (
    <>
      <Routes> 
          <Route path ="/dashboard" element= {<Dashboard />}/>

          {/* <Route path ="/*" element= {<NotFound />}/>  */}
      </Routes> 
    </>
  )
}

export default App
