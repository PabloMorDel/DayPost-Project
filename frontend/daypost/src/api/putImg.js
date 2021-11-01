async function putImg({
  url,
  file,
  fileType,
  onSuccess,
  token = '',
  onError = (error) => {
    console.error(error);
  },
}) {
  try {
    const data = new FormData();
    data.append(`${fileType}`, file);
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    });
    const body = await response.json();

    if (response.ok) {
      console.log('1');
      onSuccess(body);
      console.log('2');
    } else {
      throw new Error(body.message);
    }
  } catch (error) {
    onError(error.message);
  }
}

export default putImg;
