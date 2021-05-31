import Enzyme, { mount, shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import { OrderSearchResults } from "../../src/components/OrderSearchResults";
import React from "react";
import { orders } from "../../__mocks__/objectMocks";

Enzyme.configure({ adapter: new Adapter() });

describe("Order Search results component", () => {
    let wrapper;
    const newOrders = [orders[0], orders[0], orders[0]];
    const props = {
        toggleItemsModal: jest.fn(),
        fetchOrderItems: jest.fn(),
    };

    beforeEach(() => {
        for (var key in props) {
            if (typeof props[key] === "function") {
                spyOn(props, key).and.callThrough();
            }
        }
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should set the component initial props", () => {
        wrapper = mount(<OrderSearchResults {...props} />);
        expect(wrapper.props().orders).toEqual([]);
    });

    it("should render table with all orders", () => {
        wrapper = shallow(<OrderSearchResults {...props} />);
        wrapper.setProps({
            orders: newOrders
        });
        expect(wrapper.find(".row")).toHaveLength(newOrders.length);
    });

    it("should call to open items modal", () => {
        wrapper = shallow(<OrderSearchResults {...props} />);
        wrapper.setProps({
            orders: newOrders
        });
        wrapper.find(".row").at(1).simulate("click");
        expect(props.toggleItemsModal).toBeCalled();
        expect(props.fetchOrderItems).toBeCalledWith(newOrders[1].items);
    });
});