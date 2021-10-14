import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const AppState = ({ children, db }) => {
  const [userData, setUserData] = useState();
  const [selected, setSelected] = useState({
    subject: null,
    topic: null,
    note: null,
  });

  useEffect(() => {
    const unsubscribe = db.onSnapshot((docSnap) => {
      if (!docSnap.data()) {
        db.set({
          subjects: [],
          topics: [],
          notes: [],
        });
      } else {
        setUserData(docSnap.data());
      }
    });
    return unsubscribe;
  }, []);

  const addItem = async (payload, type) => {
    payload.id = nanoid();
    await db.update({
      [type]: [...userData[type], payload],
    });
  };

  const updateItem = async (payload, type) => {
    await db.update({
      [type]: userData[type].map((item) =>
        item.id === payload.id ? payload : item
      ),
    });
  };

  const deleteItem = async (payload, type) => {
    const newData = {
      [type]: userData[type].filter((item) => item.id !== payload.id),
    };
    // If type is topic, then we remove the notes related to it
    if (type === 'topics') {
      newData.notes = userData.notes.filter(
        (note) => note.topicId !== payload.id
      );
    }
    // If type is subject, then we remove the topics and notes related to it
    if (type === 'subjects') {
      newData.notes = userData.notes.filter(
        (note) => note.subjectId !== payload.id
      );
      newData.topics = userData.topics.filter(
        (topic) => topic.subjectId !== payload.id
      );
    }
    await db.update(newData);
  };

  return (
    <AppContext.Provider
      value={{
        data: userData,
        addSubject: (payload) => addItem(payload, 'subjects'),
        addTopic: (payload) => addItem(payload, 'topics'),
        addNote: (payload) => addItem(payload, 'notes'),
        updateSubject: (payload) => updateItem(payload, 'subjects'),
        updateTopic: (payload) => updateItem(payload, 'topics'),
        updateNote: (payload) => updateItem(payload, 'notes'),
        deleteSubject: (payload) => deleteItem(payload, 'subjects'),
        deleteTopic: (payload) => deleteItem(payload, 'topics'),
        deleteNote: (payload) => deleteItem(payload, 'notes'),
        selected,
        setSelectedSubject: (payload) =>
          setSelected((prev) => ({ ...prev, subject: payload })),
        setSelectedTopic: (payload) =>
          setSelected((prev) => ({ ...prev, topic: payload })),
        setSelectedNote: (payload) =>
          setSelected((prev) => ({ ...prev, note: payload })),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
