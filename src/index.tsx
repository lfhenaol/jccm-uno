import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import './app.less';
import {getMaterials, Team} from './config/materials';

export const MaterialsContext = createContext<{teams:Team[], materials: any}>({teams: [], materials: {}});
const {teams, newMaterials: materials} = getMaterials();

ReactDOM.render(
  <MaterialsContext.Provider value={{teams, materials}}>
    <App />
  </MaterialsContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
