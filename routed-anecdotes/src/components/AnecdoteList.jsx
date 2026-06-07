import { useAnecdotes } from "../hooks/useAnecdotes";

const AnecdoteList = () => {
  const { anecdotes, deleteAnecdote, voteAnecdote } = useAnecdotes();

  return (
    <div>
      {anecdotes.map((a) => (
        <div key={a.id}>
          {a.content}
          <button onClick={() => deleteAnecdote(a.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};
export default AnecdoteList;
