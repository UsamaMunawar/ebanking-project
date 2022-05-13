import { Card, Avatar, Select } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const { Meta } = Card;
const { Option } = Select;

const Main = () => {
  const validUser = useSelector((state) => state.account.loggedUser);
  const [selectedCurrency, setSelectedCurrency] = useState('GBP');
  const handleChange = (value) => {
    setSelectedCurrency(value);
  };
  return (
    <Card title='Accounts' style={{ width: '100%', height: '100%' }}>
      <Meta
        avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
        title={`${validUser?.firstname} ${validUser?.lastname}`}
        // description='50,000 GBP'
        style={{ marginBottom: '2rem' }}
      />
      <div
        style={{
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          width: '30%',
        }}
      >
        Account #:{' '}
        <span style={{ fontWeight: 'normal' }}>{validUser?.acnumber}</span>
      </div>
      <div
        style={{
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          width: '30%',
        }}
      >
        First Name:{' '}
        <span style={{ fontWeight: 'normal' }}>{validUser?.firstname}</span>
      </div>
      <div
        style={{
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          width: '30%',
        }}
      >
        Last Name:{' '}
        <span style={{ fontWeight: 'normal' }}>{validUser?.lastname}</span>
      </div>
      <div
        style={{
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          width: '30%',
        }}
      >
        Email: <span style={{ fontWeight: 'normal' }}>{validUser?.email}</span>
      </div>
      <div
        style={{
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          width: '30%',
        }}
      >
        Phone Number:{' '}
        <span style={{ fontWeight: 'normal' }}>{validUser?.phone}</span>
      </div>
      <div
        style={{
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          width: '30%',
        }}
      >
        Account Type:{' '}
        <span style={{ fontWeight: 'normal' }}>
          {validUser?.actype === '1' ? 'Current' : 'Savings'}
        </span>
      </div>
      <div
        style={{
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          width: '30%',
        }}
      >
        Current Balance:{' '}
        <span style={{ fontWeight: 'normal' }}>
          {Number(
            Number(validUser?.balance) * (selectedCurrency === 'GBP' ? 1 : 1.2)
          ).toFixed(2)}
        </span>
        <Select
          value={selectedCurrency}
          style={{ width: 120, marginLeft: '1rem' }}
          onChange={handleChange}
        >
          <Option value='GBP'>GBP</Option>
          <Option value='EUR'>EUR</Option>
        </Select>
      </div>
    </Card>
  );
};

export default Main;
