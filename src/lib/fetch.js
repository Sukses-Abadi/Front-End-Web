const fetchData = async (api, method, revalidate, body) => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const data = await fetch(
    `http://localhost:5000/${api}`,

    revalidate,

    options
  );
  const response = await data.json();
  return response;
};

export default fetchData;
