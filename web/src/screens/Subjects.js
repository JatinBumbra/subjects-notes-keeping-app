import React, { useContext, useState } from 'react';
import styled from 'styled-components';
// Components
import ScreenLayout from '../components/ScreenLayout';
import AddItemModal from '../components/AddItemModal';
import SubjectTopicCard from '../../../shared/components/SubjectTopicCard';
// Constants
import routes from '../../../shared/constants/routes';
// Context
import { AppContext } from '../../../shared/state';
import Input from '../../../shared/components/Input';

const Subjects = ({ history }) => {
  const Context = useContext(AppContext);

  const [searchInput, setSearchInput] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addSubjectInput, setAddSubjectInput] = useState('');
  const [selectedForEdit, setSelectedForEdit] = useState();

  const handleCardPress = (item) => {
    Context.setSelectedSubject(item);
    history.push(routes.Topics);
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

  const handleDelete = (item) => {
    Context.deleteSubject(item);
  };
  const handleEdit = (item) => {
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
      headerTitle='Subjects'
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      searchInputPlaceholder='Search for a subject'
      addButtonLabel='Add Subject'
      addButtonOnPress={handleAddButtonPress}
    >
      {Context.data?.subjects.length ? (
        Context.data?.subjects.map((item) => (
          <SubjectTopicCard
            item={item}
            actionMenuOptions={actionMenuOptions}
            onPress={() => handleCardPress(item)}
          />
        ))
      ) : (
        <NoDataText>
          Click "Add Topic" button to add your first topic to the subject
        </NoDataText>
      )}
      {addModalVisible ? (
        <AddItemModal
          title={`${selectedForEdit ? 'Edit' : 'Add New'} Subject`}
          handleCancel={handleAddCancel}
          handleSave={handleAddConfirm}
        >
          <Input
            label='Subject Name'
            value={addSubjectInput}
            onChangeText={setAddSubjectInput}
          />
        </AddItemModal>
      ) : null}
    </ScreenLayout>
  );
};

export default Subjects;

const NoDataText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: black;
  text-align: center;
  margin: 32px 0;
`;
