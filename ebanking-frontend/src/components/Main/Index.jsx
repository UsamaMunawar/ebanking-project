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
        title={`${validUser?.firstName} ${validUser?.lastName}`}
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
        <span style={{ fontWeight: 'normal' }}>
          {validUser?.accountNumberGenerated}
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
        First Name:{' '}
        <span style={{ fontWeight: 'normal' }}>{validUser?.firstName}</span>
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
        <span style={{ fontWeight: 'normal' }}>{validUser?.lastName}</span>
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
        <span style={{ fontWeight: 'normal' }}>{validUser?.phoneNumber}</span>
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
          {validUser?.accountType === 0
            ? 'Current'
            : validUser?.accountType === 1
            ? 'Savings'
            : 'Setlement'}
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
            Number(validUser?.currentAccountBalance) *
              (selectedCurrency === 'GBP' ? 1 : 1.2)
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
