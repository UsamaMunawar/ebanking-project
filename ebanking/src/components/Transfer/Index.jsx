import { Button, Card, Form, Input, message, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  transferFunds,
  validateDest,
} from '../../store/features/account/accountSlice';
const { Option } = Select;

const Transfer = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifyEnabled, setIsVerifyEnabled] = useState(false);
  const validUser = useSelector((state) => state.account.loggedUser);
  const destUser = useSelector((state) => state.account.destAccout);
  const [selectedCurrency, setSelectedCurrency] = useState('GBP');
  const [newAmmount, setNewAmmount] = useState(0);

  useEffect(() => {
    return () => dispatch(validateDest(''));
  });

  useEffect(() => {
    if (isVerifyEnabled) {
      if (destUser) {
        setIsVerified(true);
      }
    }
  }, [destUser]);

  return (
    <Card title='Transfer' style={{ width: '100%', height: '100%' }}>
      <Form
        form={form}
        layout={{
          labelCol: {
            span: 8,
          },

          wrapperCol: {
            span: 16,
          },
        }}
        onFinish={() => {
          const data = form.getFieldsValue();
          console.log({ validUser });
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
            console.log({ data });
            dispatch(transferFunds(data));
            message.success('Funds Transfered Successfully', 2);
            navigate('/dashboard');
          }
        }}
        initialValues={{ src_acnumber: validUser?.acnumber, currency: 'GBP' }}
      >
        <Form.Item
          name='src_acnumber'
          label='From Account #'
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>
        <div style={{ display: 'flex' }}>
          <Form.Item
            name='dest_acnumber'
            label='To Account #'
            style={{ width: '80%', marginRight: '1.5rem' }}
            rules={[
              { required: true },
              {
                pattern: /^[0][1-9]\d{10}$|^[1-9]\d{9}$/,
                message: 'Please enter a valid 10-Digit Account Number',
              },
            ]}
          >
            <Input
              onChange={(e) => {
                const regex = /[0][1-9]\d{10}$|^[1-9]\d{9}$/g;
                if (e.target.value.match(regex)) {
                  setIsVerifyEnabled(true);
                } else {
                  setIsVerifyEnabled(false);
                  setIsVerified(false);
                }
              }}
            />
          </Form.Item>
          <Form.Item style={{ width: '20%' }}>
            <Button
              disabled={!isVerifyEnabled}
              style={{ width: '100%' }}
              icon={isVerified ? <CheckCircleOutlined /> : ''}
              onClick={(e) => {
                // setIsVerified(true);
                dispatch(validateDest(form.getFieldValue('dest_acnumber')));
              }}
            >
              Verify
            </Button>
          </Form.Item>
        </div>
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
              disabled={!isVerified}
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
              disabled={!isVerified}
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
          <Button type='primary' htmlType='submit' disabled={!isVerified}>
            Transfer
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Transfer;
