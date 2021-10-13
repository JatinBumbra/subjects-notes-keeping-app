import React, {useContext, useEffect, useState} from 'react';
// Components
import ScreenLayout from '../components/ScreenLayout';
import NoteCard from '../../shared/components/NoteCard';
import AddItemModal from '../components/AddItemModal';
import Input from '../../shared/components/Input';
// Context
import {AppContext} from '../../shared/state';

const NotesScreen = () => {
  const {subjects, topics, notes} = useContext(AppContext);
  // State variables
  const [searchInput, setSearchInput] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addNoteTitleInput, setAddNoteTitleInput] = useState('');
  const [addNoteNoteInput, setAddNoteNoteInput] = useState('');
  const [dataToRender, setDataToRender] = useState();
  const [selectedForEdit, setSelectedForEdit] = useState();

  useEffect(() => {
    topics.current &&
      notes.data &&
      setDataToRender(
        notes.data.filter(item => item.topicId === topics.current.id),
      );
  }, [topics.current, notes.data]);

  const handleAddButtonPress = () => {
    setSelectedForEdit();
    setAddModalVisible(true);
  };

  const handleAddConfirm = () => {
    selectedForEdit
      ? notes.update({
          ...selectedForEdit,
          title: addNoteTitleInput,
          note: addNoteNoteInput,
        })
      : notes.create({
          title: addNoteTitleInput,
          note: addNoteNoteInput,
          subjectId: subjects.current.id,
          topicId: topics.current.id,
        });
    handleAddCancel();
  };
  const handleAddCancel = () => {
    setAddModalVisible(false);
    setAddNoteNoteInput('');
    setAddNoteTitleInput('');
  };

  const handleDelete = item => {
    notes.delete(item);
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
      headerTitle={`${subjects.current.name} > ${topics.current.name}`}
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
