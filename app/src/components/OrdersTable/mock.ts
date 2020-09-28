import { OrderDetails, OrdersData, toCurrencyText } from '.';

interface OrderDetailsInput {
  description: string;
  quantity: number;
  unitPrice: number;
}

const createData = (
  date: string,
  clientName: string,
  phone: string,
  email: string,
  totalValue: string,
  detailsInput: OrderDetailsInput[],
): OrdersData => {
  const details: OrderDetails[] = detailsInput.map(
    (input): OrderDetails => ({
      ...input,
      total: toCurrencyText(input.quantity * input.unitPrice),
      unitPrice: toCurrencyText(input.unitPrice),
    }),
  );
  return {
    clientName,
    date,
    details,
    email,
    phone,
    totalValue,
  };
};

// TODO: replace with data from back-end
const rows = [
  createData(
    '01/11/2020',
    'John Doe',
    '1234-5678',
    'john@doe.com',
    toCurrencyText(55),
    [
      {
        description: 'Item A',
        quantity: 1,
        unitPrice: 5,
      },
      {
        description: 'Item B',
        quantity: 5,
        unitPrice: 10,
      },
    ],
  ),
  createData(
    '01/11/2020',
    'Mary Doe',
    '1234-8765',
    'mary@doe.com',
    toCurrencyText(43),
    [
      {
        description: 'Item B',
        quantity: 3,
        unitPrice: 10,
      },
      {
        description: 'Item C',
        quantity: 1,
        unitPrice: 12,
      },
      {
        description: 'Item D',
        quantity: 6,
        unitPrice: 1,
      },
    ],
  ),
  createData(
    '02/11/2020',
    'Billy Bob',
    '1111-2345',
    'billy@bob.com',
    toCurrencyText(99),
    [
      {
        description: 'Item D',
        quantity: 2,
        unitPrice: 1,
      },
      {
        description: 'Item E',
        quantity: 2,
        unitPrice: 7,
      },
      {
        description: 'Item F',
        quantity: 8,
        unitPrice: 2,
      },
    ],
  ),
  createData(
    '02/11/2020',
    'John Doe',
    '1234-5678',
    'john@doe.com',
    toCurrencyText(15),
    [
      {
        description: 'Item G',
        quantity: 1,
        unitPrice: 4,
      },
    ],
  ),
  createData(
    '02/11/2020',
    'Mary Doe',
    '1234-8765',
    'mary@doe.com',
    toCurrencyText(28),
    [
      {
        description: 'Item H',
        quantity: 2,
        unitPrice: 3,
      },
      {
        description: 'Item I',
        quantity: 15,
        unitPrice: 1,
      },
      {
        description: 'Item J',
        quantity: 4,
        unitPrice: 13,
      },
    ],
  ),
  createData(
    '02/11/2020',
    'John Doe',
    '1234-5678',
    'john@doe.com',
    toCurrencyText(5),
    [
      {
        description: 'Item K',
        quantity: 1,
        unitPrice: 5,
      },
    ],
  ),
];

export default rows;
