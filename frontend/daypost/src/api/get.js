export async function get(
  url,
  onSuccess,
  token,
  onError = (response) => {
    console.error('Request error', response.status, response.statusText);
  },
  onConnectionError = (msg) => {
    console.error('ERROR', msg);
  }
) {
  console.log('token', token);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const body = await response.json();
      onSuccess(body);
    } else {
      onError(response);
    }
  } catch (msg) {
    onConnectionError(msg);
  }
}
