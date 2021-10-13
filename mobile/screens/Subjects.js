import React, {useState} from 'react';
import ScreenLayout from '../components/ScreenLayout';
import SubjectTopicCard from '../../shared/components/SubjectTopicCard';
import routes from '../../shared/constants/routes';

const SubjectsScreen = ({navigation}) => {
  const [searchInput, setSearchInput] = useState('');

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
    />
  );
};

export default SubjectsScreen;
