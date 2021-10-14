import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
// Components
import ScreenLayout from '../components/ScreenLayout';
import SubjectTopicCard from '../../../shared/components/SubjectTopicCard';
// Constants
import routes from '../../../shared/constants/routes';
// Context
import { AppContext } from '../../../shared/state';
import AddItemModal from '../components/AddItemModal';
import Input from '../../../shared/components/Input';

const Topics = ({ history }) => {
  const Context = useContext(AppContext);

  const [searchInput, setSearchInput] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addTopicInput, setAddTopicInput] = useState('');
  const [addTopicInputErr, setAddTopicInputErr] = useState('');
  const [selectedForEdit, setSelectedForEdit] = useState();
  const [dataToRender, setDataToRender] = useState();

  // This effect runs when context data, selected subject or searchInput change and filters the data to render based on searchInput and selected subject
  useEffect(() => {
    // If someone jumps to the route without selected subject, then go back to subjects screen
    if (!Context.selected.subject) return history.push(routes.Subjects);

    if (searchInput) {
      setDataToRender(
        Context.data.topics.filter(
          (topic) =>
            topic.subjectId === Context.selected.subject.id &&
            topic.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else {
      setDataToRender(
        Context.data.topics.filter(
          (topic) => topic.subjectId === Context.selected.subject.id
        )
      );
    }
  }, [searchInput, Context.data, Context.selected]);

  // Handler to handle a topic card press. Sets the selected topic to payload and navigates to Notes screen to display related notes
  const handleCardPress = (item) => {
    Context.setSelectedTopic(item);
    history.push(routes.Notes);
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
  const handleDelete = (item) => {
    Context.deleteTopic(item);
  };
  // Sets the selected payload for edit and opens the AddModal in edit mode
  const handleEdit = (item) => {
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
      headerTitle={Context.selected.subject?.name}
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      searchInputPlaceholder='Search for a topic'
      addButtonLabel='Add Topic'
      addButtonOnPress={handleAddButtonPress}
    >
      {dataToRender && dataToRender?.length ? (
        dataToRender.map((item) => (
          <SubjectTopicCard
            item={item}
            actionMenuOptions={actionMenuOptions}
            onPress={() => handleCardPress(item)}
          />
        ))
      ) : (
        <NoDataText>
          {searchInput
            ? 'No Topics found'
            : 'Click "Add Topic" button to add your first topic to the subject'}
        </NoDataText>
      )}
      {addModalVisible ? (
        <AddItemModal
          title={`${selectedForEdit ? 'Edit' : 'Add New'} Topic`}
          handleCancel={handleAddCancel}
          handleSave={handleAddConfirm}
        >
          <Input
            label='Topic Name'
            value={addTopicInput}
            error={addTopicInputErr}
            onChangeText={setAddTopicInput}
          />
        </AddItemModal>
      ) : null}
    </ScreenLayout>
  );
};

export default Topics;

const NoDataText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: black;
  text-align: center;
  margin: 32px 0;
`;
