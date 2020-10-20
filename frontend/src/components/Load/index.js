import React from 'react';
import axios from 'axios';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const Load = () => {
    const loadData = async () => {
        const data = [
            {
                name: 'Thiago Resende',
                email: 'thiago.gcresende@gmail.com',
                phone: '(31)99768-0765',
                orders: [
                    {
                        restaurantId: 'e05b4845-8f46-4964-9235-876e8b7bf844',
                        createdAt: '2020-02-02T12:23:01',
                        confirmedAt: '2020-02-02T12:26:32',
                        items: [
                            {
                                description: 'Hambuguer',
                                quantity: 2,
                                price: 50.0,
                            },
                            {
                                description: 'Pizza',
                                quantity: 1,
                                price: 46.21,
                            },
                        ],
                    },
                    {
                        restaurantId: 'e05b4845-8f46-4964-9235-876e8b7bf844',
                        createdAt: '2020-02-03T19:02:19',
                        confirmedAt: '2020-02-03T19:04:23',
                        items: [
                            {
                                description: 'Batata Frita',
                                quantity: 1,
                                price: 14.40,
                            },
                            {
                                description: 'Cerveja',
                                quantity: 4,
                                price: 32.0,
                            },
                        ],
                    },
                    {
                        restaurantId: 'e05b4845-8f46-4964-9235-876e8b7bf844',
                        createdAt: '2020-02-03T19:02:19',
                        confirmedAt: '2020-02-03T19:04:23',
                        items: [
                            {
                                description: 'Marmita Fitness',
                                quantity: 1,
                                price: 18.90,
                            },
                            {
                                description: 'Açaí',
                                quantity: 1,
                                price: 12.0,
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Hommer Simpson',
                email: 'hsimpson@gmail.com',
                phone: '(27)99282-01923',
                orders: [
                    {
                        restaurantId: 'e05b4845-8f46-4964-9235-876e8b7bf844',
                        createdAt: '2020-02-06T12:23:01',
                        confirmedAt: '2020-02-07T12:26:32',
                        items: [
                            {
                                description: 'Cerveja de Trigo',
                                quantity: 2,
                                price: 24.0,
                            },
                            {
                                description: 'Cerveja Preta',
                                quantity: 1,
                                price: 13.22,
                            },
                        ],
                    },
                    {
                        restaurantId: 'e05b4845-8f46-4964-9235-876e8b7bf844',
                        createdAt: '2020-08-12T08:01:38',
                        confirmedAt: '2020-08-11T09:01:23',
                        items: [
                            {
                                description: 'Cerveja Duff',
                                quantity: 3,
                                price: 14.40,
                            },
                        ],
                    },
                    {
                        restaurantId: 'e05b4845-8f46-4964-9235-876e8b7bf844',
                        createdAt: '2020-08-19T22:43:03',
                        confirmedAt: '2020-08-19T22:54:07',
                        items: [
                            {
                                description: 'Cerveja Hipster',
                                quantity: 2,
                                price: 89.0,
                            },
                            {
                                description: 'Pizza Peperoni',
                                quantity: 1,
                                price: 48.90,
                            },
                            {
                                description: 'Cerveja Moe',
                                quantity: 3,
                                price: 33.30,
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Richard Hendricks',
                email: 'hendricks@piepdpiper.com',
                phone: '(11)82173-8435',
                orders: [
                    {
                        restaurantId: 'e05b4845-8f46-4964-9235-876e8b7bf844',
                        createdAt: '2020-02-02T12:23:01',
                        confirmedAt: '2020-02-02T12:26:32',
                        items: [
                            {
                                description: 'Salada',
                                quantity: 2,
                                price: 33.90,
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Elliot Alderson',
                email: 'mr.robot@protonmail.com',
                phone: '(99)01293-0982',
                orders: [
                    {
                        restaurantId: 'e05b4845-8f46-4964-9235-876e8b7bf844',
                        createdAt: '2020-02-06T12:02:19',
                        confirmedAt: '2020-02-06T12:02:20',
                        items: [
                            {
                                description: 'Hacked Juice',
                                quantity: 99,
                                price: 0.1,
                            },
                        ],
                    },
                ],
            },
        ];

        data.map(async (item) => {
            const response = await axios.post(`${BASE_API_URL}/client-service`, item);
            const { id } = response.data;
            item.orders.map(async (order) => {
                // eslint-disable-next-line no-param-reassign
                order.clientId = id;
                await axios.post(`${BASE_API_URL}/order-service`, order);
            });
        });
    };
    return <button type="button" onClick={loadData}>Load data</button>;
};
export default Load;
