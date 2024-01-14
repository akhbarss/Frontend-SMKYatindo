import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useFilter = (defaultValue: Record<string, any>): Record<string, any> => {
  const router = useLocation();

  const filter = useMemo(() => {
    let payload = defaultValue;
    const getQueryParam = router.search.split("?");
    if (getQueryParam.length > 0) {
      const queryString = new URLSearchParams(getQueryParam[1]);
      for (const [key, value] of queryString.entries()) {
        if (value !== "undefined" && value !== "null") {
          const val = decodeURIComponent(value);
          try {
            payload[key] = JSON.parse(val);
          } catch (e) {
            payload[key] = val;
          }
        } else {
          payload[key] = null;
        }
      }
      return payload;
    } else {
      return payload;
    }
  }, [router.search]);

  return { initialValues: filter };
};

export default useFilter;
