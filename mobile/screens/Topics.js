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

const TopicsScreen = ({navigation}) => {
  const Context = useContext(AppContext);
  // State variables
  const [searchInput, setSearchInput] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addTopicInput, setAddTopicInput] = useState('');
  const [addTopicInputErr, setAddTopicInputErr] = useState('');
  const [dataToRender, setDataToRender] = useState();
  const [selectedForEdit, setSelectedForEdit] = useState();

  // This effect runs when context data, selected subject or searchInput change and filters the data to render based on searchInput and selected subject
  useEffect(() => {
    if (searchInput) {
      setDataToRender(
        Context.data.topics.filter(
          topic =>
            topic.subjectId === Context.selected.subject.id &&
            topic.name.toLowerCase().includes(searchInput.toLowerCase()),
        ),
      );
    } else {
      setDataToRender(
        Context.data.topics.filter(
          topic => topic.subjectId === Context.selected.subject.id,
        ),
      );
    }
  }, [searchInput, Context.data.topics, Context.selected]);

  // Handler to handle a topic card press. Sets the selected topic to payload and navigates to Notes screen to display related notes
  const handleCardPress = item => {
    Context.setSelectedTopic(item);
    navigation.navigate(routes.Notes);
  };

  // Handler for the add button at the bottom. Clears the selectedForEdit and opens AddModal
  const handleAddButtonPress = () => {
    setSelectedForEdit();
    setAddModalVisible(true);
  };

  // Called when 'Save' button in pressed in AddModal.
  const handleAddConfirm = () => {
    if (!addTopicInput) {
      return setAddTopicInputErr('Enter topic name');
    }

    selectedForEdit
      ? Context.updateTopic({
          ...selectedForEdit,
          name: addTopicInput,
        })
      : Context.addTopic({
          name: addTopicInput,
          subjectId: Context.selected.subject.id,
        });
    handleAddCancel();
  };
  // Called when 'Cancel' is pressed in AddModal. Closes the modal and clear the addTopicInput
  const handleAddCancel = () => {
    setAddModalVisible(false);
    setAddTopicInput('');
    setAddTopicInputErr('');
  };

  // Deletes the payload
  const handleDelete = item => {
    Context.deleteTopic(item);
  };
  // Sets the selected payload for edit and opens the AddModal in edit mode
  const handleEdit = item => {
    setSelectedForEdit(item);
    setAddModalVisible(true);
    setAddTopicInput(item.name);
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
      headerTitle={Context.selected.subject.name}
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      searchInputPlaceholder="Search for a topic"
      renderData={dataToRender}
      renderComponent={props => (
        <SubjectTopicCard
          {...props}
          actionMenuOptions={actionMenuOptions}
          onPress={() => handleCardPress(props.item)}
        />
      )}
      addButtonLabel="Add Topic"
      addButtonOnPress={handleAddButtonPress}
      noDataText={
        searchInput
          ? 'No Topics found'
          : 'Click "Add Topic" button to add your first topic to the subject'
      }>
      <AddItemModal
        visible={addModalVisible}
        title={`${selectedForEdit ? 'Edit' : 'Add New'} Topic`}
        handleCancel={handleAddCancel}
        handleSave={handleAddConfirm}>
        <Input
          label="Topic Name"
          value={addTopicInput}
          error={addTopicInputErr}
          onChangeText={setAddTopicInput}
        />
      </AddItemModal>
    </ScreenLayout>
  );
};

export default TopicsScreen;
