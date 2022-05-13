import { Card, DatePicker, Form, Select, Table } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetTransactionsMutation } from '../../store/features/apiSlice';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Statement = () => {
  const [transactionsQuery, transactionsQueryResponse] =
    useGetTransactionsMutation();
  const [selected, setSelected] = useState('1');
  const [tableSource, setTableSource] = useState([]);
  const [customRange, setCustomRange] = useState([moment(), moment()]);

  useEffect(() => {
    transactionsQuery();
  }, []);

  useEffect(() => {
    if (transactionsQueryResponse?.data) {
      let startDate;
      let endDate;
      switch (selected) {
        case '1':
          startDate = moment().subtract('week', 1).startOf('isoWeek');
          endDate = moment().subtract('week', 1).endOf('isoWeek');
          setTableSource([
            ...transactionsQueryResponse?.data?.filter(
              (td) =>
                moment(td?.transactionDate)?.isBetween(startDate, endDate) ||
                moment(td?.transactionDate)?.isSame(startDate) ||
                moment(td?.transactionDate)?.isSame(endDate)
            ),
          ]);
          break;
        case '2':
          startDate = moment().subtract('weeks', 2).startOf('isoWeek');
          endDate = moment().subtract('weeks', 1).endOf('isoWeek');
          setTableSource([
            ...transactionsQueryResponse?.data?.filter(
              (td) =>
                moment(td?.transactionDate)?.isBetween(startDate, endDate) ||
                moment(td?.transactionDate)?.isSame(startDate) ||
                moment(td?.transactionDate)?.isSame(endDate)
            ),
          ]);
          break;
        case '3':
          startDate = moment().subtract('month', 1).startOf('month');
          endDate = moment().subtract('month', 1).endOf('month');
          setTableSource([
            ...transactionsQueryResponse?.data?.filter(
              (td) =>
                moment(td?.transactionDate)?.isBetween(startDate, endDate) ||
                moment(td?.transactionDate)?.isSame(startDate) ||
                moment(td?.transactionDate)?.isSame(endDate)
            ),
          ]);
          break;
        case '4':
          setTableSource([
            ...transactionsQueryResponse?.data?.filter(
              (td) =>
                moment(td?.transactionDate)?.isBetween(
                  customRange[0],
                  customRange[1]
                ) ||
                moment(td?.transactionDate)?.isSame(customRange[0]) ||
                moment(td?.transactionDate)?.isSame(customRange[1])
            ),
          ]);
          break;
        default:
          setTableSource([...transactionsQueryResponse?.data]);
          break;
      }
    }
  }, [selected, transactionsQueryResponse, customRange]);

  const columns = [
    {
      title: 'Source',
      dataIndex: 'transactionSourceAccount',
      key: 'transactionSourceAccount',
    },
    {
      title: 'Destination',
      dataIndex: 'transactionDestination',
      key: 'transactionDestination',
    },
    {
      title: 'Ammount',
      dataIndex: 'transactionAmount',
      key: 'transactionAmount',
    },
    {
      title: 'Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
      render: (val) =>
        val === 0 ? 'Deposit' : val === 1 ? 'Withdrawl' : 'Transfer',
    },
    {
      title: 'Currency',
      dataIndex: 'transactionCurrency',
      key: 'transactionCurrency',
    },
    {
      title: 'Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      render: (val) => val?.slice(0, 10),
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
  // console.log({
  //   weekStart: moment().subtract('week', 1).startOf('isoWeek'),
  //   weekEnd: moment().subtract('week', 1).endOf('isoWeek'),
  // });
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
            <RangePicker
              onChange={(val) => setCustomRange(val)}
              value={customRange}
            />
          </Form.Item>
        </div>
      )}
      <hr />
      <Table columns={columns} dataSource={tableSource} scroll={{ y: 260 }} />
    </Card>
  );
};

export default Statement;
