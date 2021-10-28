async function putSmth({
  url,

  info,
  onSuccess,
  token = '',
  onError = (error) => {
    console.error(error);
  },
}) {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(info),
    });

    const body = await response.json();

    if (response.ok) {
      onSuccess(body);
    } else {
      throw new Error(body.message);
    }
  } catch (error) {
    onError(error.message);
  }
}

export default putSmth;
