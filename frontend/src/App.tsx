import './App.css';

import { Routes, Route } from 'react-router-dom';

import RecipesPage from './Pages/Recipes';
import AccountPage from './Pages/Account';
import MainPage from './Pages/MainPage';
import LandingPage from './Pages/Landing';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={ <LandingPage /> }/>
        <Route path="/account" element={ <AccountPage /> }/>
        <Route path="/recipes" element={ <RecipesPage /> }/>
        <Route path="/home" element={ <MainPage /> }/>
        <Route path="*" element={ <h1>ERROR</h1> }/>
      </Routes>
    </Provider>
  );
}

export default App;
