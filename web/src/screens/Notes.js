import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
// Components
import ScreenLayout from '../components/ScreenLayout';
import AddItemModal from '../components/AddItemModal';
import Input from '../../../shared/components/Input';
import NoteCard from '../../../shared/components/NoteCard';
// Constants
import routes from '../../../shared/constants/routes';
// Context
import { AppContext } from '../../../shared/state';

const Notes = ({ history }) => {
  const Context = useContext(AppContext);
  // State variables
  const [searchInput, setSearchInput] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addNoteTitleInput, setAddNoteTitleInput] = useState('');
  const [addNoteNoteInput, setAddNoteNoteInput] = useState('');
  const [dataToRender, setDataToRender] = useState();
  const [selectedForEdit, setSelectedForEdit] = useState();

  useEffect(() => {
    Context.selected.topic &&
      setDataToRender(
        Context.data.notes.filter(
          (item) => item.topicId === Context.selected.topic.id
        )
      );
  }, [Context.data.notes, Context.selected.topic]);

  const handleAddButtonPress = () => {
    setSelectedForEdit();
    setAddModalVisible(true);
  };

  const handleAddConfirm = () => {
    selectedForEdit
      ? Context.updateNote({
          ...selectedForEdit,
          title: addNoteTitleInput,
          note: addNoteNoteInput,
        })
      : Context.addNote({
          title: addNoteTitleInput,
          note: addNoteNoteInput,
          subjectId: Context.selected.subject.id,
          topicId: Context.selected.topic.id,
        });
    handleAddCancel();
  };
  const handleAddCancel = () => {
    setAddModalVisible(false);
    setAddNoteNoteInput('');
    setAddNoteTitleInput('');
  };

  const handleDelete = (item) => {
    Context.deleteNote(item);
  };
  const handleEdit = (item) => {
    setSelectedForEdit(item);
    setAddModalVisible(true);
    setAddNoteNoteInput(item.note);
    setAddNoteTitleInput(item.title);
  };
  const actionMenuOptions = [
    {
      label: 'Edit',
      onPress: handleEdit,
    },
    {
      label: 'Delete',
      onPress: handleDelete,
    },
  ];

  return (
    <ScreenLayout
      headerTitle={`${Context.selected.subject.name} > ${Context.selected.topic.name}`}
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      searchInputPlaceholder='Search for a note'
      addButtonLabel='Add Note'
      addButtonOnPress={handleAddButtonPress}
    >
      {dataToRender && dataToRender?.length ? (
        dataToRender.map((item) => (
          <NoteCard item={item} actionMenuOptions={actionMenuOptions} />
        ))
      ) : (
        <NoDataText>
          Click "Add Note" button to add your first note to the topic
        </NoDataText>
      )}
      {addModalVisible ? (
        <AddItemModal
          title={`${selectedForEdit ? 'Edit' : 'Add New'} Note`}
          handleCancel={handleAddCancel}
          handleSave={handleAddConfirm}
        >
          <Input
            label='Title'
            value={addNoteTitleInput}
            onChangeText={setAddNoteTitleInput}
          />
          <Input
            label='Note'
            value={addNoteNoteInput}
            onChangeText={setAddNoteNoteInput}
          />
        </AddItemModal>
      ) : null}
    </ScreenLayout>
  );
};

export default Notes;

const NoDataText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: black;
  text-align: center;
  margin: 32px 0;
`;
