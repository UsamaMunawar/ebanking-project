import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usernameLogin } from '../../../store/features/account/accountSlice';
import { useAuthByUsernameMutation } from '../../../store/features/apiSlice';

const LoginViaUsername = () => {
  const [authByUsername, authByUsernameResponse] = useAuthByUsernameMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    // console.log('Success:', values);
    // dispatch(usernameLogin(values));
    authByUsername({
      username: values?.username,
      password: values?.password,
    }).then((res) => {
      if (res?.error) {
        message.error('Invalid Credentials', 3);
        return;
      }
      if (res?.data) {
        dispatch(usernameLogin(res?.data));
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
        name='basic'
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='new-password'
        style={{ width: '30vw' }}
      >
        <Form.Item
          label='Username'
          name='username'
          autoComplete='new-password'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          autoComplete='new-password'
          rules={[
            { required: true, message: 'Please input your password!' },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                'Password must be at least 8 characters long and must have at least one lower case, one upper case, one number and one special character',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginViaUsername;
