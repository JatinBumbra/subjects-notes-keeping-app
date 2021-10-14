import React, { useContext, useState, useEffect } from 'react';
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
  // State variables
  const [searchInput, setSearchInput] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addSubjectInput, setAddSubjectInput] = useState('');
  const [addSubjectInputErr, setAddSubjectInputErr] = useState('');
  const [selectedForEdit, setSelectedForEdit] = useState();
  const [dataToRender, setDataToRender] = useState([]);

  // This effect runs when context data or searchInput change and filters the data to render based on searchInput
  useEffect(() => {
    if (searchInput) {
      setDataToRender(
        Context.data.subjects.filter((subject) =>
          subject.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else {
      setDataToRender(Context.data?.subjects);
    }
  }, [searchInput, Context.data]);

  // Handler to handle a subject card press. Sets the selected subject to payload and navigates to Topics screen to display related topics
  const handleCardPress = (item) => {
    Context.setSelectedSubject(item);
    history.push(routes.Topics);
  };

  // Handler for the add button at the bottom. Clears the selectedForEdit and opens AddModal
  const handleAddButtonPress = () => {
    setSelectedForEdit();
    setAddModalVisible(true);
  };

  // Called when 'Save' button in pressed in AddModal.
  const handleAddConfirm = () => {
    if (!addSubjectInput) {
      return setAddSubjectInputErr('Enter subject name');
    }

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
    setAddSubjectInputErr('');
  };

  // Deletes the payload
  const handleDelete = (payload) => {
    Context.deleteSubject(payload);
  };
  // Sets the selected payload for edit and opens the AddModal in edit mode
  const handleEdit = (payload) => {
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
      headerTitle='Subjects'
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      searchInputPlaceholder='Search for a subject'
      addButtonLabel='Add Subject'
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
            ? 'No Subjects found'
            : 'Click "Add Topic" button to add your first topic to the subject'}
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
            error={addSubjectInputErr}
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
