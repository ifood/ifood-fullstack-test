import Axios from 'axios';
import setFilteredData from '../actions/order';
import { objectToQuerystring } from './Util';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default class OrderService {
    static search = (filterParameters) => async (dispatch) => {
        const queryString = objectToQuerystring(filterParameters);
        const { data } = await Axios.get(`${BASE_API_URL}/order-service${queryString}`);
        dispatch(setFilteredData(data));
    }
}
