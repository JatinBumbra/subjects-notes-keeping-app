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

const SubjectsScreen = ({navigation}) => {
  const {subjects} = useContext(AppContext);

  const [searchInput, setSearchInput] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addSubjectInput, setAddSubjectInput] = useState('');

  const handleCardPress = item => {
    subjects.setCurrent(item);
    navigation.navigate(routes.Topics);
  };

  const handleAddButtonPress = () => setAddModalVisible(true);

  const handleAddConfirm = () => {
    subjects.create({
      name: addSubjectInput,
    });
    handleAddCancel();
  };
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
      renderData={subjects.data}
      renderComponent={props => (
        <SubjectTopicCard
          {...props}
          onPress={() => handleCardPress(props.item)}
        />
      )}
      addButtonLabel="Add Subject"
      addButtonOnPress={handleAddButtonPress}
      noDataText='Click "Add Subject" button to add your first subject'>
      <AddItemModal
        visible={addModalVisible}
        title="Add New Subject"
        handleCancel={handleAddCancel}
        handleSave={handleAddConfirm}>
        <Input
          label="Subject Name"
          value={addSubjectInput}
          onChangeText={setAddSubjectInput}
        />
      </AddItemModal>
    </ScreenLayout>
  );
};

export default SubjectsScreen;
