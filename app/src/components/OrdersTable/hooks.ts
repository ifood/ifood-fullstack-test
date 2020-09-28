import { useCallback, useState } from 'react';

interface Hooks {
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  page: number;
  rowsPerPage: number;
}

const DEFAULT_ROWS_PER_PAGE = 10;

const useOrdersTable = (): Hooks => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_ROWS_PER_PAGE);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    },
    [],
  );

  return {
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
  };
};

export default useOrdersTable;
