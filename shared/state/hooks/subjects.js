import { useState } from 'react';
import { nanoid } from 'nanoid';

const useSubjects = ({ db }) => {
  const [current, setCurrent] = useState();
  const [data, setData] = useState();

  const read = () => {};
  const create = (payload) => {
    payload.id = nanoid();
    data ? setData((prev) => prev.push(payload)) : setData([payload]);
  };
  const edit = () => {};
  const deleteItem = () => {};

  return {
    data,
    current,
    setCurrent,
    read,
    create,
    edit,
    delete: deleteItem,
  };
};

export default useSubjects;
