const generateQueryparam = (payload: Record<string, any>) => {
  return Object.keys(payload)
    .map((k) => k + "=" + encodeURIComponent(payload[k]))
    .join("&");
};

export default generateQueryparam;
