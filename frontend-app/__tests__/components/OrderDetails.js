import Enzyme, { shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import { OrderDetails } from "../../src/components/OrderDetails";
import OrderItemsModal from "../../src/components/OrderItemsModal"
import OrderSearch from "../../src/components/OrderSearch"
import OrderSearchResults from "../../src/components/OrderSearchResults"
import React from "react";

Enzyme.configure({ adapter: new Adapter() });

describe("Order Details component", () => {
    let wrapper;
    const props = {
        orders: [{}]
    };

    beforeEach(() => {
        wrapper = shallow(<OrderDetails {...props} />);
    });

    it("should load components", () => {
        expect(wrapper.find(OrderSearch)).toHaveLength(1);
        expect(wrapper.find(OrderSearchResults)).toHaveLength(1);
        expect(wrapper.find(OrderItemsModal)).toHaveLength(1);
    });

    it("should NOT load OrderSearchResults if there are no orders", () => {
        wrapper.setProps({
            orders: []
        });
        expect(wrapper.find(OrderSearch)).toHaveLength(1);
        expect(wrapper.find(OrderSearchResults)).toHaveLength(0);
        expect(wrapper.find(OrderItemsModal)).toHaveLength(1);
    });
});