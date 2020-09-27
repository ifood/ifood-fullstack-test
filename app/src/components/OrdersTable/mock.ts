import { OrdersData, toCurrencyText } from '.';

const createData = (
  date: string,
  clientName: string,
  phone: string,
  email: string,
  totalValue: string,
): OrdersData => ({ clientName, date, email, phone, totalValue });

// TODO: replace with data from back-end
const rows = [
  createData(
    '01/11/2020',
    'John Doe',
    '1234-5678',
    'john@doe.com',
    toCurrencyText(55),
  ),
  createData(
    '01/11/2020',
    'Mary Doe',
    '1234-8765',
    'mary@doe.com',
    toCurrencyText(43),
  ),
  createData(
    '02/11/2020',
    'Billy Bob',
    '1111-2345',
    'billy@bob.com',
    toCurrencyText(99),
  ),
  createData(
    '02/11/2020',
    'John Doe',
    '1234-5678',
    'john@doe.com',
    toCurrencyText(15),
  ),
  createData(
    '02/11/2020',
    'Mary Doe',
    '1234-8765',
    'mary@doe.com',
    toCurrencyText(28),
  ),
  createData(
    '02/11/2020',
    'John Doe',
    '1234-5678',
    'john@doe.com',
    toCurrencyText(5),
  ),
];

export default rows;
