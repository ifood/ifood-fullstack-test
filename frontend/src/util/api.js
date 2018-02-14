export const handleApiErrors = (response) => {
  if (!response.ok){
    return response.json()
      .then(json => {
        return Promise.reject(json.error)
      });
  } else {
    return response
  }
};
export const handle404Error = (response) => {
  if (response.status === 404){
    throw new Error(`URL ${response.url} não encontrada`);
  }
  return response;
};
export const unauthenticatedRequest = (method, url, json, opts) => {

  return innerRequest(
    method,
    url,
    JSON.stringify(json),
    opts,
    new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }));
};

const innerRequest = (method, url, body, opts, headers) => {
  if (!opts || !opts.extended){
    url = `${process.env.REACT_APP_API_BASE_URL}${url}`;
  }

  return fetch(url, {
    method,
    body,
    headers: headers
  }).then(handle404Error)
    .then(handleApiErrors)
};