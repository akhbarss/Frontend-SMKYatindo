import { useEffect, useState } from "react";
import useFilter from "../utils/useFilter";

const useQueryFilter = (defaultValue: Record<string, any>) => {
  const [filter, setFilter] = useState<Record<string, any>>(defaultValue);

  const queryFilter = useFilter(defaultValue);

  useEffect(() => {
    setFilter(
      queryFilter?.initialValues as { step: number; stagingId?: number }
    );
  }, [queryFilter]);

  return filter;
};

export default useQueryFilter;
