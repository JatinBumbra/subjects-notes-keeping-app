import React, {useContext, useEffect, useState} from 'react';
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
  // State variables
  const [searchInput, setSearchInput] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addSubjectInput, setAddSubjectInput] = useState('');
  const [selectedForEdit, setSelectedForEdit] = useState();
  const [dataToRender, setDataToRender] = useState([]);

  // This effect runs when context data or searchInput change and filters the data to render based on searchInput
  useEffect(() => {
    if (searchInput) {
      setDataToRender(
        Context.data.subjects.filter(subject =>
          subject.name.toLowerCase().includes(searchInput.toLowerCase()),
        ),
      );
    } else {
      setDataToRender(Context.data?.subjects);
    }
  }, [searchInput, Context.data]);

  // Handler to handle a subject card press. Sets the selected subject to payload and navigates to Topics screen to display related topics
  const handleCardPress = payload => {
    Context.setSelectedSubject(payload);
    navigation.navigate(routes.Topics);
  };

  // Handler for the add button at the bottom. Clears the selectedForEdit and opens AddModal
  const handleAddButtonPress = () => {
    setSelectedForEdit();
    setAddModalVisible(true);
  };

  // Called when 'Save' button in pressed in AddModal.
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
  // Called when 'Cancel' is pressed in AddModal. Closes the modal and clear the addSubjectInput
  const handleAddCancel = () => {
    setAddModalVisible(false);
    setAddSubjectInput('');
  };

  // Deletes the payload
  const handleDelete = payload => {
    Context.deleteSubject(payload);
  };
  // Sets the selected payload for edit and opens the AddModal in edit mode
  const handleEdit = payload => {
    setSelectedForEdit(payload);
    setAddModalVisible(true);
    setAddSubjectInput(payload.name);
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
      renderData={dataToRender}
      renderComponent={props => (
        <SubjectTopicCard
          {...props}
          actionMenuOptions={actionMenuOptions}
          onPress={() => handleCardPress(props.item)}
        />
      )}
      addButtonLabel="Add Subject"
      addButtonOnPress={handleAddButtonPress}
      noDataText={
        searchInput
          ? 'No Subjects found'
          : 'Click "Add Subject" button to add your first subject'
      }>
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
