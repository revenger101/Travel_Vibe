import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import './transitions.css';
import Home from './Pages/Home';

function App() {
  return (
    <AuthProvider>
     
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" 
        element={<ProtectedRoute><Home /></ProtectedRoute>} //bach mat5alich user yod5el men ghir el login
        />
      </Routes>
    </BrowserRouter>
    </AuthProvider>

  );
}

export default App;