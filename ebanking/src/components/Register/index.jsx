import { Button, Form, Input, message, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addAccount } from '../../store/features/account/accountSlice';

const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{ fontSize: '20px', marginLeft: '4rem', marginBottom: '2rem' }}
      >
        Register New Account
      </div>
      <Form
        form={form}
        initialValues={{
          actype: '1',
        }}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        onFinish={() => {
          let data = form.getFieldsValue();
          const acNum = Math.floor(Math.random() * 9000000000) + 1000000000;
          dispatch(
            addAccount({
              ...data,
              balance: 1000,
              acnumber: acNum,
            })
          );
          message.success(
            `Account Created Successfully, ACNumber: ${acNum}`,
            3
          );
          navigate('login');
        }}
        name='register'
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 10 }}
        autoComplete='off'
      >
        <Form.Item
          style={{ width: '100%' }}
          label='First Name'
          name='firstname'
          autoComplete='off'
          rules={[{ required: true, message: 'Please Input your First Name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Last Name'
          style={{ width: '100%' }}
          name='lastname'
          autoComplete='off'
          rules={[{ required: true, message: 'Please Input your Last Name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Phone Number'
          style={{ width: '100%' }}
          name='phone'
          autoComplete='off'
          rules={[
            { required: true, message: 'Please Input your Phone Number' },
          ]}
        >
          <Input type='number' showCount={false} />
        </Form.Item>
        <Form.Item
          style={{ width: '100%' }}
          label='Username'
          name='username'
          autoComplete='off'
          rules={[{ required: true, message: 'Please Input your Username' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Email'
          style={{ width: '100%' }}
          name='email'
          autoComplete='off'
          rules={[
            { required: true, message: 'Please Input your Email' },
            {
              pattern:
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Please enter a valid email',
            },
          ]}
        >
          <Input type='email' />
        </Form.Item>
        <Form.Item
          label='Account Type'
          style={{ width: '100%' }}
          name='actype'
          rules={[{ required: true, message: 'Please Select Account Type' }]}
        >
          <Select>
            <Option value='1'>Curent</Option>
            <Option value='2'>Savings</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label='Password'
          style={{ width: '100%' }}
          name='password'
          autoComplete='new-password'
          rules={[
            { required: true, message: 'Please Input your Password' },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                'Password must be at least 8 characters long and must have at least one lower case, one upper case, one number and one special character',
            },
          ]}
        >
          <Input type='password' />
        </Form.Item>
        <Form.Item
          label='Confirm Password'
          style={{ width: '100%' }}
          name='confirmpassword'
          autoComplete='new-password'
          rules={[
            { required: true, message: 'Please re-enter your Password' },
            {
              validator: (rule, value, callback) => {
                if (value && value !== form.getFieldValue('password')) {
                  callback('It must be same as Password');
                } else {
                  callback();
                }
              },
            },
          ]}
        >
          <Input type='password' />
        </Form.Item>
        <Form.Item
          label='Pincode'
          style={{ width: '100%' }}
          name='pin'
          autoComplete='new-password'
          rules={[
            { required: true, message: 'Please Input your 6-Digit Pin' },
            {
              pattern: /^[0-9]\d{5}$/,
              message: 'Please enter a valid 6-Digit Pincode',
            },
          ]}
        >
          <Input type='password' />
        </Form.Item>
        <Form.Item
          label='ConfirmPincode'
          style={{ width: '100%' }}
          name='confirmpin'
          autoComplete='new-password'
          rules={[
            { required: true, message: 'Please re-enter your 6-Digit Pin' },
            {
              validator: (rule, value, callback) => {
                if (value && value !== form.getFieldValue('pin')) {
                  callback('It must be same as Pincode');
                } else {
                  callback();
                }
              },
            },
          ]}
        >
          <Input type='password' />
        </Form.Item>
        <Form.Item style={{ width: '100%' }} label=' '>
          <Button type='primary' htmlType='submit' color='primary' block>
            Create Account
          </Button>
        </Form.Item>
      </Form>
      <Link to='login'>Back to Login</Link>
    </div>
  );
};

export default Register;
