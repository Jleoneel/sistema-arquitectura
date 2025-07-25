import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './pages/PrivateRoute'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App  () {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/Register" element={<Register/>} />
       <Route path="/Dashboard" element={
        <PrivateRoute>
          <Dashboard />
          </PrivateRoute>
      } />
      </Routes>
  );
};

export default App

