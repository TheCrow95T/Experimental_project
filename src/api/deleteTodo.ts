import { RESOUCE_API } from ".";

const deleteTodo = async ({ id }: { id: string }) => {
  const response = await fetch(RESOUCE_API + "/todo" + `/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  return data;
};

export default deleteTodo;
