import { MutableRefObject, useRef } from 'react';

interface Hooks {
  input: MutableRefObject<string | undefined>;
}

const useTextInput = (value: string | undefined): Hooks => {
  const input = useRef<string | undefined>(value);
  return {
    input,
  };
};

export default useTextInput;
