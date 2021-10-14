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
  const [addNoteTitleInputErr, setAddNoteTitleInputErr] = useState('');
  const [addNoteNoteInputErr, setAddNoteNoteInputErr] = useState('');

  const [dataToRender, setDataToRender] = useState();
  const [selectedForEdit, setSelectedForEdit] = useState();

  // This effect runs when context data, selected topic or searchInput change and filters the data to render based on searchInput and selected topic
  useEffect(() => {
    // If someone jumps to the route without selected topic, then go back to topics screen
    if (!Context.selected.topic) return history.push(routes.Topics);

    if (searchInput) {
      setDataToRender(
        Context.data.notes.filter(
          (note) =>
            note.topicId === Context.selected.topic.id &&
            note.title.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else {
      setDataToRender(
        Context.data.notes.filter(
          (note) => note.topicId === Context.selected.topic.id
        )
      );
    }
  }, [searchInput, Context.data, Context.selected.topic]);

  // Handler for the add button at the bottom. Clears the selectedForEdit and opens AddModal
  const handleAddButtonPress = () => {
    setSelectedForEdit();
    setAddModalVisible(true);
  };

  // Called when 'Save' button in pressed in AddModal.
  const handleAddConfirm = () => {
    if (!addNoteTitleInput || !addNoteNoteInput) {
      !addNoteTitleInput && setAddNoteTitleInputErr('Enter note title');
      !addNoteNoteInput && setAddNoteNoteInputErr('Enter some note');
      return;
    }

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
  // Called when 'Cancel' is pressed in AddModal. Closes the modal and clear the addNoteTitleInput and addNoteNoteInput
  const handleAddCancel = () => {
    setAddModalVisible(false);
    setAddNoteNoteInput('');
    setAddNoteTitleInput('');
    setAddNoteTitleInputErr('');
    setAddNoteNoteInputErr('');
  };

  // Deletes the payload
  const handleDelete = (item) => {
    Context.deleteNote(item);
  };
  // Sets the selected payload for edit and opens the AddModal in edit mode
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
      headerTitle={`${Context.selected.subject?.name} > ${Context.selected.topic?.name}`}
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
          {searchInput
            ? 'No Notes found'
            : 'Click "Add Note" button to add your first note to the topic'}
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
            error={addNoteTitleInputErr}
            onChangeText={setAddNoteTitleInput}
          />
          <Input
            label='Note'
            value={addNoteNoteInput}
            error={addNoteNoteInputErr}
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
