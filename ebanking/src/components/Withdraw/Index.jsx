import { Button, Card, Form, Input, message, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withdrawFunds } from '../../store/features/account/accountSlice';
const { Option } = Select;
const Withdraw = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const validUser = useSelector((state) => state.account.loggedUser);
  const [selectedCurrency, setSelectedCurrency] = useState('GBP');
  const [newAmmount, setNewAmmount] = useState(0);
  return (
    <Card title='Withdraw' style={{ width: '100%', height: '100%' }}>
      <Form
        layout={{
          labelCol: {
            span: 8,
          },

          wrapperCol: {
            span: 16,
          },
        }}
        form={form}
        onFinish={() => {
          const data = form.getFieldsValue();
          if (
            Number(
              Number(
                Number(validUser?.balance) *
                  (selectedCurrency === 'GBP' ? 1 : 1.2)
              ) - Number(newAmmount)
            ).toFixed(2) < 0
          ) {
            message.error('Insufficient Balance');
            return 0;
          } else {
            dispatch(withdrawFunds(data));
            message.success('Funds Withdrawn Successfully', 2);
            navigate('/dashboard');
          }
        }}
        initialValues={{ acnumber: validUser?.acnumber, currency: 'GBP' }}
      >
        <Form.Item
          name='acnumber'
          label='From Account #'
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>
        <div style={{ display: 'flex' }}>
          <Form.Item
            style={{ width: '60%', marginRight: '1.5rem' }}
            name='ammount'
            label='Ammount:'
            rules={[{ required: true }]}
          >
            <Input
              value={newAmmount}
              onChange={(e) => {
                if (
                  Number(
                    Number(
                      validUser?.balance *
                        (selectedCurrency === 'GBP' ? 1 : 1.2)
                    ) - Number(e.target.value)
                  ).toFixed(2) < 0
                ) {
                  message.error('Insufficient Balance');
                  return 0;
                } else {
                  setNewAmmount(Number(e.target.value || 0));
                }
              }}
              placeholder='Please enter ammount'
              type='number'
            />
          </Form.Item>
          <Form.Item
            name='currency'
            label='Currency'
            rules={[{ required: true }]}
            style={{ width: '36.5%' }}
          >
            <Select
              style={{ marginLeft: '1rem' }}
              onSelect={(val) => {
                setSelectedCurrency(val);
              }}
            >
              <Option value='GBP'>GBP</Option>
              <Option value='EUR'>EUR</Option>
            </Select>
            {/* <Input placeholder='Please enter ammount' type='number' /> */}
          </Form.Item>
        </div>
        <div>
          <span style={{ fontWeight: 'bold' }}>New Balance: </span>
          {Number(
            Number(
              Number(validUser?.balance) *
                (selectedCurrency === 'GBP' ? 1 : 1.2)
            ) - newAmmount
          ).toFixed(2)}
        </div>
        <Form.Item style={{ float: 'right' }}>
          <Button type='primary' htmlType='submit'>
            Transfer
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Withdraw;
