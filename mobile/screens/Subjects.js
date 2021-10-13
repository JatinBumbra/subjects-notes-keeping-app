import React, {useState} from 'react';
// Components
import ScreenLayout from '../components/ScreenLayout';
import SubjectTopicCard from '../../shared/components/SubjectTopicCard';
import AddItemModal from '../components/AddItemModal';
import Input from '../../shared/components/Input/input.index';
// Constants
import routes from '../../shared/constants/routes';

const SubjectsScreen = ({navigation}) => {
  const [searchInput, setSearchInput] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addSubjectInput, setAddSubjectInput] = useState('');

  const DATA = [
    {
      name: 'Computer Science',
      id: 'computerscience',
    },
    {
      name: 'Maths',
      id: 'maths',
    },
  ];

  const handleCardPress = item => {
    console.log(item);
    navigation.navigate(routes.Topics);
  };
  const handleAddButtonPress = () => setAddModalVisible(true);

  const handleAddConfirm = () => handleAddCancel();
  const handleAddCancel = () => {
    setAddModalVisible(false);
    setAddSubjectInput('');
  };

  return (
    <ScreenLayout
      headerTitle="Subjects"
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      searchInputPlaceholder="Search for a subject"
      renderData={DATA}
      renderComponent={props => (
        <SubjectTopicCard
          {...props}
          onPress={() => handleCardPress(props.item)}
        />
      )}
      addButtonLabel="Add Subject"
      addButtonOnPress={handleAddButtonPress}>
      <AddItemModal
        visible={addModalVisible}
        title="Add New Subject"
        handleCancel={handleAddCancel}
        handleSave={handleAddConfirm}>
        <Input
          value={addSubjectInput}
          onChangeText={setAddSubjectInput}
          placehodler="Enter Subject Name"
        />
      </AddItemModal>
    </ScreenLayout>
  );
};

export default SubjectsScreen;
