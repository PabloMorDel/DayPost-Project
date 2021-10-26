async function getPost({
  url,
  onSuccess,
  token = '',
  onError = (error) => {
    console.error(error);
  },
}) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
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

export default getPost;
