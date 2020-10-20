/* eslint-disable */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import './setupTests';
import Home from '../pages/Home';
import { CONSTANTS } from '../services/Util';

const setup = () => {
    const mockStore = configureMockStore();
    const store = mockStore({
        themeReducer: { theme: CONSTANTS.italian },
        orderReducer: {
            orders: [
                {
                    id: '123',
                    name: 'Thiago Resende',
                    email: 'thiago.gcresende@gmail.com',
                    phone: '(31)99768-0765',
                    orders: [
                        {
                            id: '42',
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
                    ],
                },
            ],
        },
    });
    const wrapper = mount(shallow(
        <Provider store={store}>
            <Home.WrappedComponent search={() => { }} theme={CONSTANTS.italian} />
        </Provider>,
    ).get(0));
    return wrapper;
};

const wrapper = setup();

describe('Teste de renderização do componente <Home>', () => {
    it('Deve renderizar um background com video', () => {
        expect(wrapper.find("video")).toHaveLength(1);
    });

    it('Deve renderizar audio caso no tema italia ', () => {
        expect(wrapper.find("audio")).toHaveLength(1);
    });
});