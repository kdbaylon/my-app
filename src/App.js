import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';

function App() {
  
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/home/index' element={<Home/>}></Route>
        <Route path='/account/login' element={<Login/>}></Route>
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}


export default App;
