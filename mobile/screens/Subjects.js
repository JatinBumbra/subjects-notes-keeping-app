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
  const Context = useContext(AppContext);

  const [searchInput, setSearchInput] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addSubjectInput, setAddSubjectInput] = useState('');
  const [selectedForEdit, setSelectedForEdit] = useState();

  const handleCardPress = item => {
    Context.setSelectedSubject(item);
    navigation.navigate(routes.Topics);
  };

  const handleAddButtonPress = () => {
    setSelectedForEdit();
    setAddModalVisible(true);
  };

  const handleAddConfirm = () => {
    selectedForEdit
      ? Context.updateSubject({
          id: selectedForEdit.id,
          name: addSubjectInput,
        })
      : Context.addSubject({
          name: addSubjectInput,
        });
    handleAddCancel();
  };
  const handleAddCancel = () => {
    setAddModalVisible(false);
    setAddSubjectInput('');
  };

  const handleDelete = item => {
    Context.deleteSubject(item);
  };
  const handleEdit = item => {
    setSelectedForEdit(item);
    setAddModalVisible(true);
    setAddSubjectInput(item.name);
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
      headerTitle="Subjects"
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      searchInputPlaceholder="Search for a subject"
      renderData={Context.data?.subjects}
      renderComponent={props => (
        <SubjectTopicCard
          {...props}
          actionMenuOptions={actionMenuOptions}
          onPress={() => handleCardPress(props.item)}
        />
      )}
      addButtonLabel="Add Subject"
      addButtonOnPress={handleAddButtonPress}
      noDataText='Click "Add Subject" button to add your first subject'>
      <AddItemModal
        visible={addModalVisible}
        title={`${selectedForEdit ? 'Edit' : 'Add New'} Subject`}
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
