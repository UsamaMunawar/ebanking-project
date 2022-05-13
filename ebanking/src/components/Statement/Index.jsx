import { Card, DatePicker, Form, Select, Table } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const { Option } = Select;

const Statement = () => {
  const transactionHistory = useSelector(
    (state) => state.account.transactionHistory
  );
  const [selected, setSelected] = useState('1');
  const columns = [
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'Ammount',
      dataIndex: 'ammount',
      key: 'ammount',
    },
    {
      title: 'Tyoe',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
  ];

  const data = () => {
    var cData = [];
    for (let i = 0; i < 15; i++) {
      cData.push({
        from: `Sender ${i}`,
        to: `Receiver ${i}`,
        ammount: Math.floor(1000 + Math.random() * 9000),
        type: 'Transfer',
        currency: 'EUR',
        date: '2022-4-5 12:00:12',
      });
    }
    return cData;
  };

  return (
    <Card
      title='Statement'
      style={{ width: '100%', height: '100%' }}
      extra={
        <Select
          defaultValue='1'
          style={{ width: 120, marginLeft: '1rem' }}
          onChange={(val) => {
            console.log({ val });
            setSelected(val);
          }}
          value={selected}
        >
          <Option value='1'>Last Week</Option>
          <Option value='2'>Two Week</Option>
          <Option value='3'>Last Month</Option>
          <Option value='4'>Custom</Option>
        </Select>
      }
    >
      {selected === '4' && (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Form.Item label='Date From'>
            <DatePicker />
          </Form.Item>
          <Form.Item label='Date To'>
            <DatePicker />
          </Form.Item>
        </div>
      )}
      <hr />
      <Table
        columns={columns}
        dataSource={transactionHistory}
        scroll={{ y: 260 }}
      />
    </Card>
  );
};

export default Statement;
