export async function post(
  url,
  body,
  onSuccess,
  headers,
  onError = defaultError,
  onConnectionError = defaultConectionError
) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
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
const defaultConectionError = (msg) => {
  console.error('ERROR', msg);
};
const defaultError = (response) => {
  console.error('Request error', response.status, response.statusText);
};
