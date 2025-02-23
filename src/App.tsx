import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import getTodos from "./api/getTodos";
import { useState } from "react";
import postTodo from "./api/postTodo";
import patchTodo from "./api/patchTodo";
import deleteTodo from "./api/deleteTodo";

type todoType = {
  id: string;
  status: string;
  title: string;
  content: string;
};

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const queryClient = useQueryClient();
  const {
    data: todoList,
    //    ^? const todoList: todoType[] | undefined
    error,
    isLoading,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const mutatePost = useMutation({
    mutationFn: (todo) => {
      return postTodo(todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => {
      alert("Adding new todo failed");
    },
  });

  const mutatePatch = useMutation({
    mutationFn: (todo) => {
      return patchTodo(todo);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['todos', {id: data.id}], data)
    },
    onError: () => {
      alert("Edit todo failed");
    },
  });

  const mutateDelete = useMutation({
    mutationFn: (todo) => {
      return deleteTodo(todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => {
      alert("Delete todo failed");
    },
  });

  if (isLoading) return <div>Loading lists.....</div>;
  if (error) alert("Failed to retrieve lists");

  return (
    <>
      {/*
       */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          mutatePost.mutate({ title: title, content: content });
        }}
      >
        {mutatePost.isPending ? "Adding new post..." : "Submit"}
      </button>

      <h2>To-do list</h2>
      {todoList.map((todo: todoType) => {
        return (
          <div key={todo.id} className="p-3 border-amber-900 border-2">
            <form method="post" onSubmit={(e)=>{
              e.preventDefault();
              mutatePatch.mutate({id:todo.id, status:e.target.status.value})
            }}>
              <select name="status" defaultValue={todo.status}>
                <option value="Todo">Todo</option>
                <option value="In progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <button type="submit">Save</button>
            </form>
            <h3>{todo.title}</h3>
            <div>{todo.content}</div>
            <button onClick={() => mutateDelete.mutate({ id: todo.id })}>
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
}

export default App;
