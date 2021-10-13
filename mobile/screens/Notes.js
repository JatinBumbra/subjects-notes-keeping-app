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
    Context.selected.topic &&
      setDataToRender(
        Context.data.notes.filter(
          item => item.topicId === Context.selected.topic.id,
        ),
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

  const handleDelete = item => {
    Context.deleteNote(item);
  };
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
      noDataText='Click "Add Note" button to add your first note to the topic'>
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
