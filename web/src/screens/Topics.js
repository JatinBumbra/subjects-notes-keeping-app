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
  const [selectedForEdit, setSelectedForEdit] = useState();
  const [dataToRender, setDataToRender] = useState();

  useEffect(() => {
    // If someone jumps to the route without selected subject, then go back to subjects screen
    if (!Context.selected.subject) history.push(routes.Subjects);
    // Find the topic related to the selected subject
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

  const handleCardPress = (item) => {
    Context.setSelectedTopic(item);
    history.push(routes.Notes);
  };

  const handleAddButtonPress = () => {
    setSelectedForEdit();
    setAddModalVisible(true);
  };

  const handleAddConfirm = () => {
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
  const handleAddCancel = () => {
    setAddModalVisible(false);
    setAddTopicInput('');
  };

  const handleDelete = (item) => {
    Context.deleteTopic(item);
  };
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
