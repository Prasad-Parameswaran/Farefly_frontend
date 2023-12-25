import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Admin from './routers/adminRouter';
import User from './routers/clientRouter';
import Partner from './routers/partnerRouter';
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <div className="App">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Router>
        <Routes>
          <Route path='/*' element={<User />} />
          <Route path='admin/*' element={<Admin />} />
          < Route path='partner/*' element={<Partner />} />
        </Routes>
      </Router>

    </div >
  )
}

export default App;
