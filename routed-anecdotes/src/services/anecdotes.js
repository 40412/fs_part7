const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const res = await fetch(baseUrl);
  return res.json();
};

const create = async (anecdote) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  });
  return res.json();
};

const remove = async (id) => {
  await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
};

export default { getAll, create, remove };
