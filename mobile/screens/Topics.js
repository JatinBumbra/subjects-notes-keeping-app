import React, {useState} from 'react';
// Components
import ScreenLayout from '../components/ScreenLayout';
import SubjectTopicCard from '../../shared/components/SubjectTopicCard';
// Constants
import routes from '../../shared/constants/routes';

const TopicsScreen = ({navigation}) => {
  const [searchInput, setSearchInput] = useState('');

  const DATA = [
    {
      name: 'Algebra',
      id: 'algebra',
    },
    {
      name: 'Triginometry',
      id: 'triginometry',
    },
  ];

  const handleCardPress = item => {
    console.log(item);
    navigation.navigate(routes.Notes);
  };

  return (
    <ScreenLayout
      headerTitle="Topics"
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      searchInputPlaceholder="Search for a topic"
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

export default TopicsScreen;
