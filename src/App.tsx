import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import UserWrapper from './users';
import EditForm from './users/edit-form';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path={`/`}
            element={<UserWrapper />}
          />
          <Route
            path={`/edit`}
            element={<EditForm />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
