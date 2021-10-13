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
  const [dataToRender, setDataToRender] = useState();
  const [selectedForEdit, setSelectedForEdit] = useState();

  useEffect(() => {
    Context.selected.subject &&
      setDataToRender(
        Context.data.topics.filter(
          item => item.subjectId === Context.selected.subject.id,
        ),
      );
  }, [Context.data.topics, Context.selected]);

  const handleCardPress = item => {
    Context.setSelectedTopic(item);
    navigation.navigate(routes.Notes);
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

  const handleDelete = item => {
    Context.deleteTopic(item);
  };
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
      noDataText='Click "Add Topic" button to add your first topic to the subject'>
      <AddItemModal
        visible={addModalVisible}
        title={`${selectedForEdit ? 'Edit' : 'Add New'} Topic`}
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
