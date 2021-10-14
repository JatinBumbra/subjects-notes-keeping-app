import React, {useContext, useEffect, useState} from 'react';
// Components
import ScreenLayout from '../components/ScreenLayout';
import NoteCard from '../../shared/components/NoteCard';
import AddItemModal from '../components/AddItemModal';
import Input from '../../shared/components/Input';
// Context
import {AppContext} from '../../shared/state';

const NotesScreen = () => {
  const Context = useContext(AppContext);
  // State variables
  const [searchInput, setSearchInput] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addNoteTitleInput, setAddNoteTitleInput] = useState('');
  const [addNoteNoteInput, setAddNoteNoteInput] = useState('');
  const [dataToRender, setDataToRender] = useState();
  const [selectedForEdit, setSelectedForEdit] = useState();

  useEffect(() => {
    if (searchInput) {
      setDataToRender(
        Context.data.notes.filter(
          note =>
            note.topicId === Context.selected.topic.id &&
            note.title.toLowerCase().includes(searchInput.toLowerCase()),
        ),
      );
    } else {
      setDataToRender(
        Context.data.notes.filter(
          note => note.topicId === Context.selected.topic.id,
        ),
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
  };

  // Deletes the payload
  const handleDelete = item => {
    Context.deleteNote(item);
  };
  // Sets the selected payload for edit and opens the AddModal in edit mode
  const handleEdit = item => {
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
      searchInputPlaceholder="Search for a note"
      renderData={dataToRender}
      renderComponent={props => (
        <NoteCard {...props} actionMenuOptions={actionMenuOptions} />
      )}
      addButtonLabel="Add Note"
      addButtonOnPress={handleAddButtonPress}
      noDataText={
        searchInput
          ? 'No Notes found'
          : 'Click "Add Note" button to add your first note to the topic'
      }>
      <AddItemModal
        visible={addModalVisible}
        title={`${selectedForEdit ? 'Edit' : 'Add New'} Note`}
        handleCancel={handleAddCancel}
        handleSave={handleAddConfirm}>
        <Input
          label="Title"
          value={addNoteTitleInput}
          onChangeText={setAddNoteTitleInput}
        />
        <Input
          label="Note"
          value={addNoteNoteInput}
          onChangeText={setAddNoteNoteInput}
        />
      </AddItemModal>
    </ScreenLayout>
  );
};

export default NotesScreen;
