import { useCallback, useEffect, useState } from 'react';

import { DatePickerCallbacks } from '../DatePicker';
import { OrdersData } from '../OrdersTable';
import rows from '../OrdersTable/mock';
import { TextInputCallbacks } from '../TextInput';
import { FilterList } from '.';

interface Hooks {
  filterTableData: () => void;
  setInputCallbacks: (
    field: keyof Omit<FilterList, 'startDate' | 'endDate'>,
  ) => TextInputCallbacks;
  setDatePickerCallbacks: (
    field: keyof Pick<FilterList, 'startDate' | 'endDate'>,
  ) => DatePickerCallbacks;
  tableData: OrdersData[] | null;
}

const compareTextFilters = (
  filters: FilterList,
  data: OrdersData,
  field: keyof Omit<FilterList, 'startDate' | 'endDate'>,
): boolean => (filters[field] ? data[field] === filters[field] : true);

const checkDateBoundaries = (
  curDate: string,
  startDate?: Date | null,
  endDate?: Date | null,
): boolean => {
  const parsedDate = new Date(curDate);
  if (!startDate && !endDate) {
    // none are set, return true
    return true;
  }

  if (!startDate && endDate) {
    // just compare against end date
    if (parsedDate <= endDate) {
      return true;
    }
    return false;
  }

  if (startDate && !endDate) {
    // just compare against start date
    if (parsedDate >= startDate) {
      return true;
    }
    return false;
  }

  if (startDate && endDate) {
    // compare against both
    if (parsedDate >= startDate && parsedDate <= endDate) {
      return true;
    }
    return false;
  }

  return true;
};

const useFilters = (): Hooks => {
  const [orders, setOrders] = useState<OrdersData[] | null>(null);
  const [tableData, setTableData] = useState<OrdersData[] | null>(orders);
  const [filterList, setFilterList] = useState<FilterList>({
    endDate: null,
    startDate: null,
  });

  // Get the data on didMount
  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      // TODO: request from back-end
      setOrders(rows);
      setTableData(rows);
    };
    fetchData();
  }, []);

  const setInputCallbacks = useCallback(
    (
      field: keyof Omit<FilterList, 'startDate' | 'endDate'>,
    ): TextInputCallbacks => ({
      onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterList({ ...filterList, [field]: event.target.value });
      },
      value: filterList[field],
    }),
    [filterList],
  );

  const setDatePickerCallbacks = useCallback(
    (field: keyof Pick<FilterList, 'startDate' | 'endDate'>) => ({
      onChange: (date: Date | null | undefined): void => {
        setFilterList({ ...filterList, [field]: date });
      },
      value: filterList[field],
    }),
    [filterList],
  );

  const filterTableData = useCallback((): void => {
    const filteredData = orders?.filter(
      (data) =>
        compareTextFilters(filterList, data, 'clientName') &&
        compareTextFilters(filterList, data, 'phone') &&
        compareTextFilters(filterList, data, 'email') &&
        checkDateBoundaries(
          data.date,
          filterList.startDate,
          filterList.endDate,
        ),
    );
    setTableData(filteredData ?? []);
  }, [filterList, orders]);

  return {
    filterTableData,
    setDatePickerCallbacks,
    setInputCallbacks,
    tableData,
  };
};

export default useFilters;
