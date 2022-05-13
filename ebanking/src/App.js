import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import Dashboard from './components/Dashboard';
import Main from './components/Main/Index';
import Deposit from './components/Deposit/Index';
import Withdraw from './components/Withdraw/Index';
import Transfer from './components/Transfer/Index';
import Statement from './components/Statement/Index';
import Register from './components/Register';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Login />} />
          <Route path='/' element={<Login />}></Route>
          <Route path='register' element={<Register />} />
          <Route path='dashboard' element={<Dashboard />}>
            <Route index element={<Main />} />
            <Route path='deposit' element={<Deposit />} />
            <Route path='withdraw' element={<Withdraw />} />
            <Route path='transfer' element={<Transfer />} />
            <Route path='statement' element={<Statement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
