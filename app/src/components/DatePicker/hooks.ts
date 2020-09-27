import { useCallback, useState } from 'react';

import { DatePickerCallbacks } from '.';

interface Hooks {
  handleDateChange: (date: Date | null) => void;
  selectedDate: Date | undefined | null;
}

const useDatePicker = ({ value, onChange }: DatePickerCallbacks): Hooks => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined | null>(
    value,
  );

  const handleDateChange = useCallback(
    (date: Date | null) => {
      setSelectedDate(date);
      onChange(date);
    },
    [onChange],
  );

  return {
    handleDateChange,
    selectedDate,
  };
};

export default useDatePicker;
