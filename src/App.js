import { Link, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <div className='nav'>
        <nav>
          <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/login"}>Login</Link></li>
            <li><Link to={"/signup"}>Signup</Link></li>
          </ul>
        </nav>
      </div>

      <Route path='/' element={<Dashboard/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>

    </div>
  );
}

export default App;
