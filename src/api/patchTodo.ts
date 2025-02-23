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

  return response.json();
};

export default patchTodo;
