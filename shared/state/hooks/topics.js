import { useState } from 'react';
import { nanoid } from 'nanoid';

const useTopics = ({ db }) => {
  const [current, setCurrent] = useState();
  const [data, setData] = useState();

  const read = () => {};

  const create = (payload) => {
    payload.id = nanoid();
    data ? setData((prev) => [...prev, payload]) : setData([payload]);
  };

  const update = (payload) => {
    setData((prev) =>
      prev.map((item) => (item.id === payload.id ? payload : item))
    );
  };

  const deleteItem = (itemToDelete) => {
    setData((prev) => prev.filter((item) => item.id !== itemToDelete.id));
  };

  return {
    data,
    current,
    setCurrent,
    read,
    create,
    update,
    delete: deleteItem,
  };
};

export default useTopics;
