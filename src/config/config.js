export const fetcher = (url, method = "GET") => {
  const options = {
    method: method,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    // body: data ? JSON.stringify(data) : {},
  };

  return fetch(url, options).then((res) => res.json());
};
