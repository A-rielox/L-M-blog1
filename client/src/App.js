import Topbar from './components/topbar/Topbar';
import Homepage from './pages/homepage/Homepage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Settings from './pages/settings/Settings';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import { useContext } from 'react';
import { Context } from './context/Context';

import { BrowserRouter, Routes, Route /* Navigate */ } from 'react-router-dom';

/* 

GRAN FAIL Q LOS POST LOS BUSCA POR NOMBRE, ENTONCES DESPUES DE CAMBIAR A MI CUENTA DE NOMBRE NO RECONOCE LOS POST ANTERIORES COMO MIOS

hay q hacerlo por _id


*/

function App() {
   const { user } = useContext(Context);

   return (
      <BrowserRouter>
         <Topbar />

         <Routes>
            <Route exact path="/" element={<Homepage />} />

            <Route path="/posts" element={<Homepage />} />

            <Route
               path="/register"
               element={user ? <Homepage /> : <Register />}
            />

            <Route path="/login" element={user ? <Homepage /> : <Login />} />

            <Route path="/post/:id" element={<Single />} />

            <Route path="/write" element={user ? <Write /> : <Login />} />

            <Route path="/settings" element={user ? <Settings /> : <Login />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
