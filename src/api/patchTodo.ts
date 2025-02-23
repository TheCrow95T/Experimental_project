import { RESOUCE_API } from ".";

const patchTodo = async (title:string, content:string) => {
  const response = await fetch(RESOUCE_API + "/todo", {
    method: "PATCH",
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const data = await response.json();

  return data;
};

export default patchTodo;
