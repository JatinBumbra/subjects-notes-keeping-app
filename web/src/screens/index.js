import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from '../../../shared/constants/routes';
import SubjectsScreen from './Subjects';
import TopicsScreen from './Topics';
import NotesScreen from './Notes';

const Screens = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={SubjectsScreen} />
        <Route exact path={routes.Subjects} component={SubjectsScreen} />
        <Route exact path={routes.Topics} component={TopicsScreen} />
        <Route exact path={routes.Notes} component={NotesScreen} />
      </Switch>
    </Router>
  );
};

export default Screens;
