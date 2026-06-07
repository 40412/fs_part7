import { useState, useEffect } from "react";
import anecdoteService from "../services/anecdotes";

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    anecdoteService.getAll().then((data) => setAnecdotes(data));
  }, []);

  const addAnecdote = async (newAnecdote) => {
    const saved = await anecdoteService.create(newAnecdote);
    setAnecdotes(anecdotes.concat(saved));
  };

  const deleteAnecdote = async (id) => {
    await anecdoteService.remove(id);
    setAnecdotes(anecdotes.filter((a) => a.id !== id));
  };

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote,
  };
};
