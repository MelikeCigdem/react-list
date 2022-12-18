import { Container } from '@mui/system';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Provider from "./components/Provider";
import ListDetail from "./pages/detail/ListDetail";

function App() {
    return (
        <div className="App">
        <Provider>
            <BrowserRouter>
                <Navbar/>
                <Container>
                    <Routes>
                        <Route path='/' element={localStorage.getItem('user-info') ? <Home/>: <Login/>}/>
                        <Route path='/login' element={!localStorage.getItem('user-info') ? <Login/> : <Home/>}/>
                        <Route path='/signup'  element={!localStorage.getItem('user-info') ? <Signup/>: <Home/>}/>
                        <Route path='/detail/:id' element={<ListDetail/>}/>
                    </Routes>
                </Container>
            </BrowserRouter>
        </Provider>
        </div>
    );
}

export default App;
