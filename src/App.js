import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { auth } from './firebase';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="App">
      <div className='nav'>
        <nav>
          <ul>
            <Link to={"/"}><li>Home</li></Link>
            {
              !user && <Link to={"/login"}><li>Login</li></Link>
            }
            {
              !user && <Link to={"/signup"}><li>Signup</li></Link>
            }
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
