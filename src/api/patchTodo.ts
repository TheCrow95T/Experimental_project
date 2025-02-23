import { RESOUCE_API } from ".";

const patchTodo = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {

  const response = await fetch(RESOUCE_API + "/todo" + `/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      status: status,
    }),
  });

  const data = await response.json();

  return data;
};

export default patchTodo;
