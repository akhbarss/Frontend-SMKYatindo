export const toDataUrl = (url) => {
  return fetch(url)
    .then((response) => {
      return response.blob()
    })
    .then(
      (blob) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
      }
    )
    .catch(err => { throw new Error("Failed Fetch Image") })
}
export const convertToFileObject = async (
  fileName: string
): Promise<File[]> => {
  const dataUrl = await toDataUrl(
    `${import.meta.env.VITE_BASE_BACKEND_URL}/uploads/${fileName}`
  );
  return [dataUrlToFile(dataUrl, fileName)];
};
export const dataUrlToFile = (dataurl, filename) => {
  let arr = dataurl.split(",");
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
