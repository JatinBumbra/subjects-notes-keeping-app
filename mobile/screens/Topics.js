import React, {useContext, useState} from 'react';
// Components
import ScreenLayout from '../components/ScreenLayout';
import SubjectTopicCard from '../../shared/components/SubjectTopicCard';
import AddItemModal from '../components/AddItemModal';
import Input from '../../shared/components/Input';
// Constants
import routes from '../../shared/constants/routes';
// Context
import {AppContext} from '../../shared/state';

const TopicsScreen = ({navigation}) => {
  const {subjects} = useContext(AppContext);
  // State variables
  const [searchInput, setSearchInput] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addTopicInput, setAddTopicInput] = useState('');

  const DATA = [
    {
      name: 'Algebra',
      id: 'algebra',
    },
    {
      name: 'Triginometry',
      id: 'triginometry',
    },
  ];

  console.log('Topics screen', subjects);

  const handleCardPress = item => {
    navigation.navigate(routes.Notes);
  };

  const handleAddButtonPress = () => setAddModalVisible(true);

  const handleAddConfirm = () => handleAddCancel();
  const handleAddCancel = () => {
    setAddModalVisible(false);
    setAddTopicInput('');
  };

  return (
    <ScreenLayout
      headerTitle={subjects.current.name}
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      searchInputPlaceholder="Search for a topic"
      renderData={DATA}
      renderComponent={props => (
        <SubjectTopicCard
          {...props}
          onPress={() => handleCardPress(props.item)}
        />
      )}
      addButtonLabel="Add Topic"
      addButtonOnPress={handleAddButtonPress}>
      <AddItemModal
        visible={addModalVisible}
        title="Add New Topic"
        handleCancel={handleAddCancel}
        handleSave={handleAddConfirm}>
        <Input
          label="Topic Name"
          value={addTopicInput}
          onChangeText={setAddTopicInput}
        />
      </AddItemModal>
    </ScreenLayout>
  );
};

export default TopicsScreen;
