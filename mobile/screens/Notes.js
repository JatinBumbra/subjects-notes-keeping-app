import React, {useState} from 'react';
// Components
import ScreenLayout from '../components/ScreenLayout';
import NoteCard from '../../shared/components/NoteCard';
import AddItemModal from '../components/AddItemModal';
import Input from '../../shared/components/Input';

const NotesScreen = () => {
  const [searchInput, setSearchInput] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addTopicTitleInput, setAddTopicTitleInput] = useState('');
  const [addTopicNoteInput, setAddTopicNoteInput] = useState('');

  const DATA = [
    {
      title: 'Note Title 1',
      note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, incidunt.',
      id: 'Note-Title-1',
    },
    {
      title: 'Note Title 2',
      note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, incidunt.',
      id: 'Note-Title-2',
    },
  ];

  const handleAddButtonPress = () => setAddModalVisible(true);

  const handleAddConfirm = () => handleAddCancel();
  const handleAddCancel = () => {
    setAddModalVisible(false);
    setAddTopicTitleInput('');
  };

  return (
    <ScreenLayout
      headerTitle="Notes"
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      searchInputPlaceholder="Search for a note"
      renderData={DATA}
      renderComponent={props => <NoteCard {...props} />}
      addButtonLabel="Add Note"
      addButtonOnPress={handleAddButtonPress}>
      <AddItemModal
        visible={addModalVisible}
        title="Add New Note"
        handleCancel={handleAddCancel}
        handleSave={handleAddConfirm}>
        <Input
          label="Title"
          value={addTopicTitleInput}
          onChangeText={setAddTopicTitleInput}
        />
        <Input
          label="Note"
          value={addTopicNoteInput}
          onChangeText={setAddTopicNoteInput}
        />
      </AddItemModal>
    </ScreenLayout>
  );
};

export default NotesScreen;
