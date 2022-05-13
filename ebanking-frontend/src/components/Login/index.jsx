import { useEffect, useState } from 'react';
import LoginViaACNumber from './LoginViaACNumber';
import LoginViaUsername from './LoginViaUsername';
import { message, Switch } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const validUser = useSelector((state) => state.account.loggedUser);
  const [loginModel, setLoginModel] = useState(true);

  console.log({ fromlogin: validUser });

  useEffect(() => {
    if (validUser) {
      navigate('dashboard');
    }
  }, [validUser]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <div style={{ marginBottom: '1rem' }}>
          Login Via :
          <Switch
            checked={loginModel}
            onChange={(val) => setLoginModel(val)}
            style={{ marginLeft: '1rem', width: '130px' }}
            checkedChildren='Username'
            unCheckedChildren='Account Number'
            defaultChecked
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          {loginModel ? <LoginViaUsername /> : <LoginViaACNumber />}
        </div>
        <div>
          <Link to='register'>Register a new account</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
