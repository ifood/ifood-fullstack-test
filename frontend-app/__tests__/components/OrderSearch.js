import Enzyme, { shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import Button from "@material-ui/core/Button";
import { OrderSearch } from "../../src/components/OrderSearch";
import React from "react";
import moment from "moment";

Enzyme.configure({ adapter: new Adapter() });

describe("Order Search component", () => {
    let wrapper;
    const props = {
        fetchOrderDetails: jest.fn(),
    };

    beforeEach(() => {
        for (var key in props) {
            if (typeof props[key] === "function") {
                spyOn(props, key).and.callThrough();
            }
        }
        wrapper = shallow(<OrderSearch {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should set the component initial state", () => {
        expect(wrapper.state()).toEqual({
            startDate: moment().subtract('3', 'days').startOf('day'),
            endDate: moment().endOf('day'),
            clientName: '',
            phone: '',
            email: '',
        });
    });

    it("should change state on field change", () => {
        const e = { target: { clientName: "clientName", value: "foo" } };
        wrapper.find("[label='Client name']").simulate("change", e);
        expect(wrapper.state()).toEqual({
            startDate: moment().subtract('3', 'days').startOf('day'),
            endDate: moment().endOf('day'),
            clientName: "foo",
            phone: "",
            email: "",
        });
    });

    it("should call fetchOrderDetails when clicking the search", () => {
        const startDate = moment().subtract('5', 'days');
        const endDate = moment();

        const searchParams = {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            clientName: "",
            phone: "",
            email: "",
        };
        wrapper.setState({
            startDate: startDate,
            endDate: endDate,
        });

        wrapper.find(Button).simulate("click");
        expect(props.fetchOrderDetails).toHaveBeenCalledWith(searchParams);
    });
});
