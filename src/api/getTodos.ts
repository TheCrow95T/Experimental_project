import { RESOUCE_API } from "."

const getTodos = async() => {
  const response = await fetch(RESOUCE_API + "/todo")

  const data = await response.json()
  return data;
}

export default getTodos;
