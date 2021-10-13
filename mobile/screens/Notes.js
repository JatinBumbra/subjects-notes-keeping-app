import React, {useState} from 'react';
// Components
import ScreenLayout from '../components/ScreenLayout';
// import NoteCard from '../../shared/components/NoteCard';

const NotesScreen = () => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <ScreenLayout
      headerTitle="Notes"
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      searchInputPlaceholder="Search for a note"
    />
  );
};

export default NotesScreen;
