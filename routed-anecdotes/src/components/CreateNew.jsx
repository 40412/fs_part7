import { useAnecdotes } from "../hooks/useAnecdotes";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = () => {
  const { addAnecdote } = useAnecdotes();
  const navigate = useNavigate();

  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnecdote({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      Content <input {...content} />
      Author <input {...author} />
      Url <input {...info} />
      <button>create</button>
    </form>
  );
};

export default CreateNew;
