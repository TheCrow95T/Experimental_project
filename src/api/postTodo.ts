import { RESOUCE_API } from ".";

type newTodo = {
  title: string,
  content: string
}

const postTodo = async (todo:newTodo) => {
  const response = await fetch(RESOUCE_API + "/todo", {
    method: "POST",
    body: JSON.stringify({
      ...todo,
      status: 'Todo'
    }),
  });

  const data = await response.json();

  return data;
};

export default postTodo;
