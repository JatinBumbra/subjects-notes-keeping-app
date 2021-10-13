import { useState } from 'react';
import { nanoid } from 'nanoid';

const useNotes = ({ db }) => {
  const [current, setCurrent] = useState();
  const [data, setData] = useState();

  const read = async () => {
    try {
      db.get().then((doc) => setData(doc.data()?.notes));
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (payload) => {
    try {
      payload.id = nanoid();
      await db.update({
        notes: data ? [...data, payload] : [payload],
      });
      data ? setData((prev) => [...prev, payload]) : setData([payload]);
    } catch (error) {
      console.log(error);
    }
  };

  const update = async (payload) => {
    try {
      await db.update({
        notes: data.map((item) => (item.id === payload.id ? payload : item)),
      });
      setData((prev) =>
        prev.map((item) => (item.id === payload.id ? payload : item))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (itemToDelete) => {
    try {
      await db.update({
        notes: data.filter((item) => item.id !== itemToDelete.id),
      });
      setData((prev) => prev.filter((item) => item.id !== itemToDelete.id));
    } catch (error) {
      console.log(error);
    }
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

export default useNotes;
