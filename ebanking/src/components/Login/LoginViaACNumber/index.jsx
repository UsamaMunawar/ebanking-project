import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { acNumberLogin } from '../../../store/features/account/accountSlice';

const LoginViaACNumber = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(acNumberLogin(values));
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
        autoComplete='off'
        style={{ width: '30vw' }}
      >
        <Form.Item
          label='Account Number'
          name='acnumber'
          rules={[
            { required: true, message: 'Please input your account number!' },

            {
              pattern: /^[0][1-9]\d{10}$|^[1-9]\d{9}$/,
              message: 'Please enter a valid 10-Digit Account Number',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Pin-Code'
          name='pin'
          rules={[
            { required: true, message: 'Please input your pincode!' },
            {
              pattern: /^[0-9]\d{5}$/,
              message: 'Please enter a valid 6-Digit Pincode',
            },
          ]}
        >
          <Input />
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

export default LoginViaACNumber;
