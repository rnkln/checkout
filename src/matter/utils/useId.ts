import { useId as useIdBase } from 'react';

export const useId = (override?: string): string => {
  const id = useIdBase();

  return override ?? id;
};
