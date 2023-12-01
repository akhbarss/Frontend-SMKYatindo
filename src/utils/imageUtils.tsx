export const toDataUrl = (url) => {
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
}
export const convertToFileObject = async (
  fileName: string
): Promise<File[]> => {
  const dataUrl = await toDataUrl(
    `http://localhost:8080/uploads/${fileName}`
    // `${import.meta.env.VITE_BASE_BACKEND_URL}/${fileName}`
  );
  return [dataUrlToFile(dataUrl, fileName)];
};
export const dataUrlToFile = (dataurl, filename) => {
  console.log({dataurl, filename})
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
