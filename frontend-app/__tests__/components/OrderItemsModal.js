import Enzyme, { shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import { OrderItemsModal } from "../../src/components/OrderItemsModal";
import React from "react";
import { items } from "../../__mocks__/objectMocks";

Enzyme.configure({ adapter: new Adapter() });

describe("Order Items Modal component", () => {
    let wrapper;
    const newItems = [items[0], items[0], items[0]];
    const props = {
        toggleItemsModal: jest.fn(),
    };

    beforeEach(() => {
        for (var key in props) {
            if (typeof props[key] === "function") {
                spyOn(props, key).and.callThrough();
            }
        }
        wrapper = shallow(<OrderItemsModal {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should set the component initial state", () => {
        expect(wrapper.prop("open")).not.toBeDefined();
        expect(wrapper.state()).toEqual({
            items: []
        });
    });

    it("new props are saved to the state", () => {
        wrapper.setProps({
            items
        });
        expect(wrapper.state()).toEqual({
            items
        });
    });

    it("should render table with all orders items", () => {
        wrapper.setProps({
            open: true,
            items: newItems
        });
        expect(wrapper.find(".row")).toHaveLength(newItems.length);
    });

    it("should close the modal after clicking outside modal", () => {
        wrapper.setProps({
            items,
            open: true
        });
        wrapper.find(".items-dialog").simulate("close");
        expect(props.toggleItemsModal).toHaveBeenCalled();
    });
});