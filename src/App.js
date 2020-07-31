import React from 'react';
import { Provider } from "react-redux";
import { store } from './redux';
import UsersSection from './blocks/UsersSection';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <UsersSection />
    </Provider>
  );
}

export default App;
